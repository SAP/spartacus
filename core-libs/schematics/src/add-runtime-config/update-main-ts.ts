/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SourceFile, SyntaxKind } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { MAIN_TS } from '../shared/constants';
import { createImports, formatFile } from '../shared';
import { createProgram } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

export function updateMainTs(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${MAIN_TS}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const sourceFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(MAIN_TS)
      );

      if (!sourceFile) {
        context.logger.warn(
          `⚠️ Could not find ${MAIN_TS} — skipping runtime config wiring.`
        );
        continue;
      }

      if (sourceFile.getFullText().includes('getRuntimeEnvironment')) {
        if (options.debug) {
          context.logger.info(
            `⏭️ Skipping ${MAIN_TS} — already contains getRuntimeEnvironment.`
          );
        }
        continue;
      }

      wrapBootstrapApplicationWithRuntimeConfig(sourceFile);
      formatFile(sourceFile);
      tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());

      if (options.debug) {
        context.logger.info(`✅ Updated ${MAIN_TS}`);
      }
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
