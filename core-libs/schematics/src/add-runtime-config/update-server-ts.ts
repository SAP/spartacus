/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Node, SourceFile, SyntaxKind } from 'ts-morph';
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
      namedImports: [
        'getServerRuntimeEnvironment',
        'RUNTIME_ENVIRONMENT',
        'ServerRuntimeEnvironment',
      ],
    },
  ]);

  addRuntimeEnvironmentParamToApp(sourceFile);
  addProviderToNgExpressEngine(sourceFile);
  makeRunAsyncWithFetch(sourceFile);
}

function addRuntimeEnvironmentParamToApp(sourceFile: SourceFile): void {
  const appFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'app' && fn.isExported());

  if (!appFunction) {
    return;
  }

  appFunction.addParameter({
    name: 'runtimeEnvironment',
    type: 'ServerRuntimeEnvironment',
    initializer: '{}',
  });
}

function addProviderToNgExpressEngine(sourceFile: SourceFile): void {
  const appFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'app' && fn.isExported());

  if (!appFunction) {
    return;
  }

  // Find the ngExpressEngine(...) call inside app()
  const engineCall = appFunction
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((call) => {
      const expr = call.getExpression().getText();
      return expr === 'ngExpressEngine' || expr.endsWith('.ngExpressEngine');
    });

  if (!engineCall) {
    return;
  }

  const optionsArg = engineCall.getArguments()[0];
  if (!optionsArg || !Node.isObjectLiteralExpression(optionsArg)) {
    return;
  }

  const providersProperty = optionsArg
    .getProperties()
    .find(
      (p) => Node.isPropertyAssignment(p) && p.getName() === 'providers'
    );

  if (providersProperty && Node.isPropertyAssignment(providersProperty)) {
    const providersArray = providersProperty.getInitializerIfKind(
      SyntaxKind.ArrayLiteralExpression
    );
    if (providersArray) {
      providersArray.addElement(
        '{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }'
      );
    }
  } else {
    // No providers property yet — add it
    optionsArg.addPropertyAssignment({
      name: 'providers',
      initializer:
        '[{ provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment }]',
    });
  }
}

function makeRunAsyncWithFetch(sourceFile: SourceFile): void {
  const runFunction = sourceFile
    .getFunctions()
    .find((fn) => fn.getName() === 'run' && !fn.isExported());

  if (!runFunction) {
    return;
  }

  runFunction.setIsAsync(true);

  // Find `const server = app()` and insert fetch before it, change app() → app(runtimeEnvironment)
  const serverDeclaration = runFunction
    .getVariableDeclarations()
    .find((decl) => decl.getName() === 'server');

  if (!serverDeclaration) {
    return;
  }

  const variableStatement = serverDeclaration.getVariableStatement();
  if (!variableStatement) {
    return;
  }

  // Insert fetch before `const server = app()`
  const index = variableStatement.getChildIndex();
  const body = variableStatement.getParentIfKindOrThrow(SyntaxKind.Block);
  body.insertStatements(
    index,
    `const runtimeEnvironment = await getServerRuntimeEnvironment({ url: process.env['CONFIG_URL'] });`
  );

  // Change app() → app(runtimeEnvironment) in the initializer
  // After insertion the variableStatement node is still valid — find the app() call in the initializer
  const initializer = serverDeclaration.getInitializer();
  if (initializer && Node.isCallExpression(initializer)) {
    const expr = initializer.getExpression().getText();
    if (expr === 'app') {
      initializer.addArgument('runtimeEnvironment');
    }
  }
}
