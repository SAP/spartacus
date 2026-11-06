/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { SyntaxKind, type SourceFile } from 'ts-morph';
import {
  getServerTsPathForApplicationBuilder,
  isSsrUsed,
  readPackageJson,
  updatePackageJsonDependencies,
} from '../../../../shared/utils/package-utils';
import { createProgram, saveAndFormat } from '../../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../../shared/utils/workspace-utils';

function findServerFile(
  tree: Tree,
  basePath: string,
  tsconfigPath: string,
  expectedServerPath: string
): SourceFile | undefined {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
  return appSourceFiles.find((sourceFile: SourceFile) =>
    sourceFile.getFilePath().endsWith(expectedServerPath)
  );
}

function getExpressInstanceName(serverFile: SourceFile): string | undefined {
  const variableDeclarations = serverFile.getDescendantsOfKind(
    SyntaxKind.VariableDeclaration
  );

  for (const varDecl of variableDeclarations) {
    const initializer = varDecl.getInitializer();
    if (initializer?.getKind() !== SyntaxKind.CallExpression) {
      continue;
    }

    const callExpr = initializer.asKind(SyntaxKind.CallExpression);
    if (callExpr?.getExpression().getText() === 'express') {
      return varDecl.getName();
    }
  }
}

function updateExpressWildcardRoutes(
  serverFile: SourceFile,
  expressInstanceName: string
): boolean {
  const callExpressions = serverFile.getDescendantsOfKind(
    SyntaxKind.CallExpression
  );

  let replacementsMade = false;
  for (const callExpr of callExpressions) {
    const expression = callExpr.getExpression();

    if (expression.getKind() !== SyntaxKind.PropertyAccessExpression) {
      continue;
    }

    const propAccess = expression.asKind(SyntaxKind.PropertyAccessExpression);
    if (
      !propAccess ||
      propAccess.getExpression().getText() !== expressInstanceName ||
      propAccess.getName() !== 'get'
    ) {
      continue;
    }

    const args = callExpr.getArguments();
    if (args.length === 0) {
      continue;
    }

    const firstArg = args[0];
    if (firstArg.getKind() !== SyntaxKind.StringLiteral) {
      continue;
    }

    const argText = firstArg.getText().slice(1, -1);

    if (argText === '*.*') {
      firstArg.replaceWithText('/.*\\..*/');
      replacementsMade = true;
      continue;
    }

    if (argText === '*') {
      firstArg.replaceWithText('/.*/');
      replacementsMade = true;
    }
  }

  return replacementsMade;
}

/**
 * Updates server.ts file to replace wildcard strings with regex patterns for Express 5 compatibility.
 * Uses ts-morph to parse and manipulate the AST.
 */
function updateServerTsFile(): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    context.logger.info(
      '\n⌛️ Updating server.ts for Express 5 compatibility...'
    );

    const project = getDefaultProjectNameFromWorkspace(tree);
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

    if (!buildPaths.length) {
      context.logger.info(
        '  ↳ No server.ts file found - skipping server.ts updates'
      );
      return;
    }

    const basePath = process.cwd();
    let serverFileFound = false;

    const expectedServerPath = getServerTsPathForApplicationBuilder(tree);

    if (!expectedServerPath) {
      context.logger.warn(
        '  ↳ Could not determine server.ts path from angular.json - skipping server.ts updates'
      );
      return;
    }

    for (const tsconfigPath of buildPaths) {
      const serverFile = findServerFile(
        tree,
        basePath,
        tsconfigPath,
        expectedServerPath
      );

      if (!serverFile) {
        continue;
      }

      serverFileFound = true;

      const expressInstanceName = getExpressInstanceName(serverFile);

      if (!expressInstanceName) {
        context.logger.warn(
          `  ↳ Could not find Express app instance (e.g., 'const app = express()') in:`
        );
        context.logger.warn(`     ${serverFile.getFilePath()}`);
        context.logger.info(
          `  ↳ Skipping server.ts update - please update manually if needed`
        );
        continue;
      }

      const replacementsMade = updateExpressWildcardRoutes(
        serverFile,
        expressInstanceName
      );

      if (replacementsMade) {
        saveAndFormat(serverFile);
        context.logger.info(
          `✅ Updated ${serverFile.getFilePath()} for Express 5 compatibility`
        );
      } else {
        context.logger.info(
          `  ↳ ${serverFile.getFilePath()} already uses Express 5 compatible patterns or no changes needed`
        );
      }
      return;
    }

    if (!serverFileFound) {
      context.logger.info(
        '  ↳ No server.ts file found - skipping server.ts updates'
      );
    }
  };
}

/**
 * Updates Express dependency to version 5.1.0 in package.json.
 */
function updateExpressDependency(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    const dependencies: NodeDependency[] = [];

    if (packageJson.dependencies?.express) {
      dependencies.push({
        name: 'express',
        version: '^5.1.0',
        type: NodeDependencyType.Default,
        overwrite: true,
      });
    }

    if (packageJson.devDependencies?.express) {
      dependencies.push({
        name: 'express',
        version: '^5.1.0',
        type: NodeDependencyType.Dev,
        overwrite: true,
      });
    }

    if (dependencies.length === 0) {
      context.logger.info(
        '  ↳ Express is not installed - skipping Express dependency update'
      );
      return noop();
    }

    return updatePackageJsonDependencies(dependencies, packageJson)(
      tree,
      context
    );
  };
}

/**
 * Migration to upgrade Express to v5.1.0 and update server.ts for Express 5 compatibility.
 *
 * This migration:
 * 1. Updates Express dependency to ^5.1.0 in package.json
 * 2. Updates server.ts to replace wildcard strings with regex patterns:
 *    - '*.*' becomes regex pattern matching files with extensions
 *    - '*' becomes regex pattern matching all routes
 *
 * This migration only runs for apps that use SSR (Server-Side Rendering).
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!isSsrUsed(tree)) {
      context.logger.info(
        '\n  ↳ SSR is not configured - skipping Express 5 migration'
      );
      return noop();
    }

    return chain([updateExpressDependency(), updateServerTsFile()])(
      tree,
      context
    );
  };
}
