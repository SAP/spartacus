/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SyntaxKind } from 'ts-morph';
import {
  ANGULAR_CORE,
  MAIN_TS,
  PROVIDE_ZONE_CHANGE_DETECTION,
} from '../../../shared/constants';
import { removeImports } from '../../../shared/utils/import-utils';
import { createProgram, saveAndFormat } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

/**
 * Main migration rule that removes provideZoneChangeDetection from main.ts.
 * This is part of the Angular 21 upgrade process to move zone configuration
 * from application providers to module providers.
 */
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      '⌛️ Removing provideZoneChangeDetection from main.ts...'
    );

    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const { buildPaths } = getProjectTsConfigPaths(tree, projectName);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure main.ts.'
      );
    }

    // Process each tsconfig to find and modify main.ts files
    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      removeProviderFromMainTs(tree, tsconfigPath, basePath, context);
    }

    context.logger.info(
      '✅ provideZoneChangeDetection removed from main.ts successfully.'
    );
    return tree;
  };
}

/**
 * Orchestrates the removal of provideZoneChangeDetection from main.ts.
 * Steps: find main.ts → check if provider exists → find bootstrap calls →
 * remove applicationProviders → cleanup imports → save changes.
 */
function removeProviderFromMainTs(
  tree: Tree,
  tsconfigPath: string,
  basePath: string,
  context: SchematicContext
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
  const sourceFile = findMainTsSourceFile(appSourceFiles);

  if (!sourceFile) {
    return;
  }

  // Early exit if the provider is not present in the file
  if (!hasProvideZoneChangeDetection(sourceFile)) {
    context.logger.info(
      `provideZoneChangeDetection is not present in ${MAIN_TS}. Skipping...`
    );
    return;
  }

  // Find all bootstrapModule calls to process
  const bootstrapCalls = findBootstrapModuleCalls(sourceFile);
  if (bootstrapCalls.length === 0) {
    context.logger.warn(
      `Could not find bootstrapModule call in ${MAIN_TS}. Skipping...`
    );
    return;
  }

  // Process each bootstrap call and remove applicationProviders
  const modified = processBootstrapCalls(bootstrapCalls, context);

  if (modified) {
    // Clean up unused imports and save the modified file
    cleanupUnusedImport(sourceFile, context);
    saveAndFormat(sourceFile);
  } else {
    context.logger.info(
      `No applicationProviders property found in ${MAIN_TS}. Skipping...`
    );
  }
}

/** Locates the main.ts source file from the list of application source files. */
function findMainTsSourceFile(appSourceFiles: any[]) {
  return appSourceFiles.find((sourceFile) =>
    sourceFile.getFilePath().includes(MAIN_TS)
  );
}

/** Checks if provideZoneChangeDetection is present in the source file. */
function hasProvideZoneChangeDetection(sourceFile: any): boolean {
  return sourceFile.getFullText().includes(PROVIDE_ZONE_CHANGE_DETECTION);
}

/**
 * Finds all bootstrapModule call expressions in the source file.
 * These calls are typically in the form: platformBrowserDynamic().bootstrapModule(AppModule)
 */
function findBootstrapModuleCalls(sourceFile: any) {
  return sourceFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter((callExpr: any) => {
      const expression = callExpr.getExpression();
      return (
        expression.getKind() === SyntaxKind.PropertyAccessExpression &&
        expression.getText().includes('bootstrapModule')
      );
    });
}

/**
 * Processes each bootstrapModule call to remove the applicationProviders property.
 * Returns true if any modifications were made.
 */
function processBootstrapCalls(
  bootstrapCalls: any[],
  context: SchematicContext
): boolean {
  let modified = false;

  for (const bootstrapCall of bootstrapCalls) {
    const args = bootstrapCall.getArguments();
    // Skip if there's no second argument (options object)
    if (args.length < 2) {
      continue;
    }

    const optionsArg = args[1];
    // Skip if the second argument is not an object literal
    if (optionsArg.getKind() !== SyntaxKind.ObjectLiteralExpression) {
      continue;
    }

    const objectLiteral = optionsArg.asKindOrThrow(
      SyntaxKind.ObjectLiteralExpression
    );
    const applicationProvidersProperty =
      findApplicationProvidersProperty(objectLiteral);

    if (applicationProvidersProperty) {
      // Remove the applicationProviders property from the options object
      applicationProvidersProperty.remove();
      modified = true;
      context.logger.info(
        `  ↳ Removed applicationProviders property from bootstrapModule call`
      );

      // If the options object is now empty, remove it entirely
      removeEmptyOptionsObject(objectLiteral, bootstrapCall, context);
    }
  }

  return modified;
}

/**
 * Finds the applicationProviders property within the bootstrap options object.
 * Only processes PropertyAssignment nodes to avoid errors with spread operators.
 */
function findApplicationProvidersProperty(objectLiteral: any) {
  return objectLiteral.getProperties().find((prop: any) => {
    if (prop.getKind() === SyntaxKind.PropertyAssignment) {
      const propertyAssignment = prop.asKind(SyntaxKind.PropertyAssignment);
      return propertyAssignment?.getName() === 'applicationProviders';
    }
    return false;
  });
}

/**
 * Removes the entire options object if it's empty after removing applicationProviders.
 * Example: bootstrapModule(AppModule, {}) becomes bootstrapModule(AppModule)
 */
function removeEmptyOptionsObject(
  objectLiteral: any,
  bootstrapCall: any,
  context: SchematicContext
): void {
  if (objectLiteral.getProperties().length === 0) {
    bootstrapCall.removeArgument(1);
    context.logger.info(
      `  ↳ Removed empty options object from bootstrapModule call`
    );
  }
}

/**
 * Removes the provideZoneChangeDetection import if it's no longer used in the file.
 */
function cleanupUnusedImport(sourceFile: any, context: SchematicContext): void {
  const updatedContent = sourceFile.getFullText();
  const isStillUsed = updatedContent.includes(PROVIDE_ZONE_CHANGE_DETECTION);

  if (!isStillUsed) {
    removeImports(sourceFile, [
      {
        node: PROVIDE_ZONE_CHANGE_DETECTION,
        importPath: ANGULAR_CORE,
      },
    ]);
    context.logger.info(
      `  ↳ Removed unused import of ${PROVIDE_ZONE_CHANGE_DETECTION}`
    );
  }
}
