/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ArrowFunction, Node, SourceFile, SyntaxKind } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SERVER_TS } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

// Proxy route inserted before the Angular catch-all. Keeps the { value: "..." }
// wrapper intact so the browser's getRuntimeEnvironment() parses ConfigJson itself.
// Flattening here (parseConfigJson) causes a double-parse bug where entry.value
// becomes undefined and provideRuntimeOccConfig() receives no OCC URL.
const CONFIG_JSON_PROXY_ROUTE = `server.get('/config.json', async (_req, res) => {
    const configUrl = process.env['CONFIG_URL'];
    if (!configUrl) {
      res.json({});
      return;
    }
    try {
      const response = await fetch(configUrl);
      if (!response.ok) {
        res.json({});
        return;
      }
      const raw = await response.json();
      const filtered = Object.fromEntries(
        Object.entries(raw).filter(
          ([, entry]) =>
            !(entry && ((entry as any).secret === true || (entry as any).secret === 'true'))
        )
      );
      res.json(filtered);
    } catch {
      res.json({});
    }
  });`;

export function updateServerTs(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${SERVER_TS}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const serverFile = appSourceFiles.find((file) => {
        const p = file.getFilePath();
        return p.endsWith(`/${SERVER_TS}`) || p.endsWith(`\\${SERVER_TS}`);
      });

      if (!serverFile) {
        continue;
      }

      updateServerTsLegacy(serverFile, tree, context, options);
    }

    return tree;
  };
}

// ─── Spartacus ngExpressEngine pattern ───────────────────────────────────────

function updateServerTsLegacy(
  sourceFile: SourceFile,
  tree: Tree,
  context: SchematicContext,
  options: SpartacusOptions
): void {
  if (sourceFile.getFullText().includes('getServerRuntimeEnvironment')) {
    if (options.debug) {
      context.logger.info(
        `⏭️ Skipping ${SERVER_TS} — already contains getServerRuntimeEnvironment.`
      );
    }
    return;
  }

  createImports(sourceFile, [
    {
      moduleSpecifier: '@spartacus/setup',
      namedImports: ['getServerRuntimeEnvironment', 'RUNTIME_ENVIRONMENT'],
    },
  ]);

  addConfigJsonProxyRoute(sourceFile);
  makeRunAsyncWithFetch(sourceFile);

  formatFile(sourceFile);
  tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

  if (options.debug) {
    context.logger.info(`✅ Updated ${SERVER_TS} (Angular ≤17)`);
  }
}

function addConfigJsonProxyRoute(sourceFile: SourceFile): void {
  if (sourceFile.getFullText().includes("server.get('/config.json'")) {
    return;
  }

  const appFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'app' && fn.isExported());

  if (!appFunction) {
    return;
  }

  const body = appFunction.getBody();
  if (!body || !Node.isBlock(body)) {
    return;
  }

  const statements = body.getStatements();
  const catchAllIndex = statements.findIndex((stmt) => {
    if (!Node.isExpressionStatement(stmt)) {
      return false;
    }
    const expr = stmt.getExpression();
    if (!Node.isCallExpression(expr)) {
      return false;
    }
    if (expr.getExpression().getText() !== 'server.get') {
      return false;
    }
    const firstArg = expr.getArguments()[0];
    // Match only the all-routes regex /.*/, not the static-asset regex /.*.*/
    return !!firstArg && firstArg.getText() === '/.*/';
  });

  if (catchAllIndex === -1) {
    return;
  }

  body.insertStatements(catchAllIndex, CONFIG_JSON_PROXY_ROUTE);
}

function makeRunAsyncWithFetch(sourceFile: SourceFile): void {
  const appFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'app' && fn.isExported());
  if (!appFunction) {
    return;
  }
  const body = appFunction.getBody();
  if (!body || !Node.isBlock(body)) {
    return;
  }
  const catchAllCallback = findCatchAllCallback(body.getStatements());
  if (!catchAllCallback) {
    return;
  }
  catchAllCallback.setIsAsync(true);
  const callbackBody = catchAllCallback.getBody();
  if (!callbackBody || !Node.isBlock(callbackBody)) {
    return;
  }
  // IMPORTANT: RUNTIME_ENVIRONMENT must be provided here (res.render providers),
  // NOT at engine level (ngExpressEngine providers). Angular's CommonEngine
  // appends engine-level providers AFTER per-request ones — engine-level wins
  // on conflicts (last-wins DI). If RUNTIME_ENVIRONMENT were in ngExpressEngine,
  // it would be frozen at server startup and silently override the fresh
  // per-request value on every subsequent render, breaking the DevOps contract
  // that config changes take effect on the next request without a server restart.
  callbackBody.insertStatements(
    0,
    `const runtimeEnvironment = await getServerRuntimeEnvironment({ url: process.env['CONFIG_URL'] });`
  );
  addRuntimeEnvironmentToResRender(callbackBody);
}

function findCatchAllCallback(statements: Node[]): ArrowFunction | undefined {
  for (const stmt of statements) {
    if (!Node.isExpressionStatement(stmt)) {
      continue;
    }
    const expr = stmt.getExpression();
    if (
      !Node.isCallExpression(expr) ||
      expr.getExpression().getText() !== 'server.get'
    ) {
      continue;
    }
    const args = expr.getArguments();
    if (args[0]?.getText() !== '/.*/') {
      continue;
    }
    const cb = args[1];
    if (cb && Node.isArrowFunction(cb)) {
      return cb;
    }
  }
  return undefined;
}

function addRuntimeEnvironmentToResRender(callbackBody: Node): void {
  const resRenderCall = callbackBody
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((call) => call.getExpression().getText() === 'res.render');
  if (!resRenderCall) {
    return;
  }
  const renderOptionsArg = resRenderCall.getArguments()[1];
  if (!renderOptionsArg || !Node.isObjectLiteralExpression(renderOptionsArg)) {
    return;
  }
  const providersProperty = renderOptionsArg
    .getProperties()
    .find((p) => Node.isPropertyAssignment(p) && p.getName() === 'providers');
  if (providersProperty && Node.isPropertyAssignment(providersProperty)) {
    const providersArray = providersProperty.getInitializerIfKind(
      SyntaxKind.ArrayLiteralExpression
    );
    if (providersArray) {
      providersArray.addElement(
        '// IMPORTANT: per-request only — must NOT be moved to ngExpressEngine providers\n        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }'
      );
    }
  } else {
    renderOptionsArg.addPropertyAssignment({
      name: 'providers',
      initializer:
        '[\n        { provide: APP_BASE_HREF, useValue: req.baseUrl },\n        // IMPORTANT: per-request only — must NOT be moved to ngExpressEngine providers\n        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment },\n      ]',
    });
  }
}
