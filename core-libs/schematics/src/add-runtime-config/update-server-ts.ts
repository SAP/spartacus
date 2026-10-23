/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SourceFile, SyntaxKind } from 'ts-morph';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SERVER_TS } from '../shared/constants';
import { createImports } from '../shared/utils/import-utils';
import { createProgram, formatFile } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

export function updateServerTs(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Updating ${SERVER_TS}...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const sourceFile = appSourceFiles.find((file) =>
        file.getFilePath().includes(SERVER_TS)
      );

      if (sourceFile) {
        addServerRuntimeEnvironment(sourceFile);
        formatFile(sourceFile);
        tree.overwrite(sourceFile.getFilePath(), sourceFile.getFullText());
        if (options.debug) {
          context.logger.info(`✅ Updated ${SERVER_TS}`);
        }
      }
    }

    return tree;
  };
}

function addServerRuntimeEnvironment(sourceFile: SourceFile): void {
  if (sourceFile.getFullText().includes('getServerRuntimeEnvironment')) {
    return;
  }

  createImports(sourceFile, [
    {
      moduleSpecifier: '@spartacus/setup',
      namedImports: ['getServerRuntimeEnvironment', 'RUNTIME_ENVIRONMENT'],
    },
  ]);

  // Make `app()` function async
  const appFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'app' && fn.isExported());

  if (!appFunction) {
    return;
  }

  if (!appFunction.isAsync()) {
    appFunction.setIsAsync(true);
  }

  // Insert `const runtimeEnvironment = await getServerRuntimeEnvironment(...)` before `const server = express()`
  const serverDeclaration = appFunction
    .getVariableDeclarations()
    .find((decl) => decl.getName() === 'server');

  if (serverDeclaration) {
    const variableStatement = serverDeclaration.getVariableStatement();
    if (variableStatement) {
      const index = variableStatement.getChildIndex();
      const body = variableStatement.getParentIfKindOrThrow(
        SyntaxKind.Block
      );
      body.insertStatements(
        index,
        `const runtimeEnvironment = await getServerRuntimeEnvironment({ url: process.env['CONFIG_URL'] });`
      );
    }
  }

  // Add `{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }` to res.render providers
  const renderCalls = appFunction
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter(
      (call) =>
        call.getExpression().getText().endsWith('.render') ||
        call.getExpression().getText() === 'res.render'
    );

  for (const renderCall of renderCalls) {
    const args = renderCall.getArguments();
    // res.render(url, { bootstrap, providers: [...] }) — providers is in the second argument object
    const optionsArg = args[1];
    if (!optionsArg) {
      continue;
    }

    const providersProperty = optionsArg
      .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
      .find((prop) => prop.getName() === 'providers');

    if (providersProperty) {
      const providersArray = providersProperty.getInitializerIfKind(
        SyntaxKind.ArrayLiteralExpression
      );
      if (providersArray) {
        providersArray.addElement(
          '{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }'
        );
      }
    }
  }
}
