/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import ts from 'typescript';

/**
 * Extracts package names that are loaded via `createRequire` (from `node:module`)
 * rather than via static `import` declarations.
 *
 * @remarks
 * The static dependency checker discovers used packages by walking
 * `ImportDeclaration` AST nodes. This misses packages loaded at runtime through
 * a `createRequire`-derived function. Without this function, such packages are
 * never recorded as dependencies and the checker flags them as unused in
 * `optionalDependencies`.
 *
 * The canonical example in this codebase is `core-libs/setup/dev-proxy/config-proxy-server.ts`,
 * which loads `fastify` and `@fastify/http-proxy` via `cwdRequire` so they resolve
 * from the consuming app's `node_modules` rather than the published package dist.
 *
 * @example
 * ```ts
 * import { createRequire } from 'node:module';
 * const cwdRequire = createRequire(path.join(process.cwd(), 'package.json'));
 * const Fastify = cwdRequire('fastify');           // detected
 * const httpProxy = cwdRequire('@fastify/http-proxy'); // detected
 * ```
 *
 * @remarks
 * Detection works in three passes over the AST:
 *
 * 1. Locate the local binding name for `createRequire` — handles aliased imports
 *    such as `import { createRequire as cr } from 'node:module'`.
 * 2. Find every variable initialised by calling that binding:
 *    `const cwdRequire = createRequire(...)` → records `cwdRequire` as a require function.
 * 3. Collect string-literal arguments at call sites of those require functions:
 *    `cwdRequire('fastify')` → records `'fastify'`.
 *
 * @remarks
 * Known limitations (by design — not worth the added complexity):
 *
 * - Dynamic arguments are ignored: `cwdRequire(someVariable)` cannot be resolved statically.
 * - Only one level of indirection is tracked: `const r = cwdRequire; r('pkg')` is not detected.
 * - Other dynamic-load mechanisms (`require()`, `import()` with a variable) are not covered.
 *
 * @param sourceFile - Parsed TypeScript source file
 * @returns Set of package names loaded via `createRequire`-derived functions
 */
export function getCreateRequireImports(
  sourceFile: ts.SourceFile
): Set<string> {
  const result = new Set<string>();

  // Step 1: collect every local name that IS `createRequire` (handles aliases).
  // e.g. `import { createRequire }` → 'createRequire'
  //      `import { createRequire as cr }` → 'cr'
  const createRequireLocalNames = new Set<string>();

  // Step 2: variable names that hold the result of calling createRequire(...)
  // e.g. `const cwdRequire = createRequire(...)` → 'cwdRequire'
  const requireFnNames = new Set<string>();

  function visit(node: ts.Node): void {
    // ── Step 1: named import of createRequire from node:module ──────────────
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier
        .getText(sourceFile)
        .replace(/['"]/g, '');
      if (moduleSpecifier === 'node:module' || moduleSpecifier === 'module') {
        const namedBindings = node.importClause?.namedBindings;
        if (namedBindings && ts.isNamedImports(namedBindings)) {
          for (const specifier of namedBindings.elements) {
            // propertyName is present when `import { createRequire as cr }`
            const importedName = (
              specifier.propertyName ?? specifier.name
            ).text;
            if (importedName === 'createRequire') {
              createRequireLocalNames.add(specifier.name.text);
            }
          }
        }
      }
    }

    // ── Step 2: `const foo = createRequire(...)` ────────────────────────────
    if (ts.isVariableDeclaration(node)) {
      const init = node.initializer;
      if (
        init &&
        ts.isCallExpression(init) &&
        ts.isIdentifier(init.expression) &&
        createRequireLocalNames.has(init.expression.text)
      ) {
        if (ts.isIdentifier(node.name)) {
          requireFnNames.add(node.name.text);
        }
      }
    }

    // ── Step 3: `requireFn('pkg-name')` call expressions ────────────────────
    if (ts.isCallExpression(node)) {
      if (
        ts.isIdentifier(node.expression) &&
        requireFnNames.has(node.expression.text)
      ) {
        const [firstArg] = node.arguments;
        if (firstArg && ts.isStringLiteral(firstArg)) {
          result.add(firstArg.text);
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return result;
}
