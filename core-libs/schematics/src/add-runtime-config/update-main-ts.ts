/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Project, SourceFile, SyntaxKind } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { createImports, formatFile } from '../shared';

const MAIN_TS_PATH = '/src/main.ts';

export function updateMainTs(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${MAIN_TS_PATH}...`);
    }

    if (!tree.exists(MAIN_TS_PATH)) {
      context.logger.warn(
        `⚠️ Could not find ${MAIN_TS_PATH} — skipping runtime config wiring.`
      );
      return tree;
    }

    const content = tree.read(MAIN_TS_PATH)?.toString('utf-8');
    if (!content) {
      return tree;
    }

    if (content.includes('getRuntimeEnvironment')) {
      if (options.debug) {
        context.logger.info(
          `⏭️ Skipping ${MAIN_TS_PATH} — already contains getRuntimeEnvironment.`
        );
      }
      return tree;
    }

    const project = new Project({ useInMemoryFileSystem: true });
    const sourceFile = project.createSourceFile(MAIN_TS_PATH, content, {
      overwrite: true,
    });

    wrapBootstrapApplicationWithRuntimeConfig(sourceFile);
    formatFile(sourceFile);
    tree.overwrite(MAIN_TS_PATH, sourceFile.getFullText());

    if (options.debug) {
      context.logger.info(`✅ Updated ${MAIN_TS_PATH}`);
    }

    return tree;
  };
}

function wrapBootstrapApplicationWithRuntimeConfig(
  sourceFile: SourceFile
): void {
  createImports(sourceFile, [
    {
      moduleSpecifier: '@spartacus/setup',
      namedImports: ['getRuntimeEnvironment', 'RUNTIME_ENVIRONMENT'],
    },
  ]);

  const callExpression = sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find(
      (call) =>
        call.getExpression().getText() === 'bootstrapApplication' ||
        call.getExpression().getText().endsWith('.bootstrapApplication')
    );

  if (!callExpression) {
    return;
  }

  // Walk up the AST to find the top-level ExpressionStatement
  // (the bootstrapApplication call may be part of a .catch() chain)
  let node: import('ts-morph').Node = callExpression;
  while (node.getParent() && !node.getParentIfKind(SyntaxKind.SourceFile)) {
    const parent = node.getParent();
    if (!parent) {
      break;
    }
    if (parent.getKind() === SyntaxKind.ExpressionStatement) {
      break;
    }
    node = parent;
  }

  const expressionStatement = node.getParentIfKind(
    SyntaxKind.ExpressionStatement
  );

  if (!expressionStatement) {
    return;
  }

  const args = callExpression.getArguments();
  const appComponentArg = args[0]?.getText() ?? 'AppComponent';
  const appConfigArg = args[1]?.getText() ?? 'appConfig';

  const newCode = `getRuntimeEnvironment()
  .then(({ runtimeEnvironment }) => {
    return bootstrapApplication(${appComponentArg}, {
      ...${appConfigArg},
      providers: [
        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment },
        ...(${appConfigArg}.providers ?? []),
      ],
    });
  })
  .catch((err) => console.error(err));`;

  expressionStatement.replaceWithText(newCode);
}
