import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  UpdateRecorder,
  url,
} from '@angular-devkit/schematics';
import {
  getDecoratorMetadata,
  getMetadataField,
} from '@schematics/angular/utility/ast-utils';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
  removePackageJsonDependency,
} from '@schematics/angular/utility/dependencies';
import * as ts from 'typescript';
import {
  ANGULAR_CORE,
  ANGULAR_UNIVERSAL_BUILDERS,
  ANGULAR_UNIVERSAL_EXPRESS_VERSION,
  NGUNIVERSAL_EXPRESS_ENGINE,
  UTF_8,
} from '../../../shared/constants';
import { checkIfSSRIsUsed } from '../../../shared/utils/package-utils';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (host: Tree) => {
    return checkIfSSRIsUsed(host)
      ? chain([
          backupExistingFiles(),
          overwriteServerTsFile(),
          modifyPackageJsonScripts(),
          removeImportsInMainServerFile(),
          removeMapLoaderModule(),
          updateAngularJsonFile(),
        ])
      : noop();
  };
}

export function backupExistingFiles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Backing up old server.ts and webpack.server.config.js files.'
    );

    const serverPath = '/server.ts';
    const webpackPath = '/webpack.server.config.js';
    const webpackBuffer = tree.read(webpackPath);
    if (webpackBuffer === null) {
      throw new SchematicsException(
        'Could not find webpack.server.config.js file'
      );
    }

    tree.rename(serverPath, './server.ts.bak');
    tree.rename(webpackPath, './webpack.server.config.js.bak');
  };
}

export function overwriteServerTsFile(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating new server.ts file.');
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    return chain([
      mergeWith(
        apply(url('./files'), [
          template({
            ...strings,
            typescriptExt: 'ts',
            ...({} as object),
            browserDistDirectory: `dist/${projectName}/browser`,
          }),
          move('.'),
        ])
      ),
    ]);
  };
}

export function modifyPackageJsonScripts(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Updating package.json scripts');
    const pkgPath = '/package.json';
    const buffer = tree.read(pkgPath);
    if (!buffer) {
      throw new SchematicsException('Could not find package.json');
    }

    const packageJson = JSON.parse(buffer.toString(UTF_8));
    const scripts = [
      'compile:server',
      'build:ssr',
      'serve:ssr',
      'build:client-and-server-bundles',
    ];
    const packagesToAddOrUpdate: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: ANGULAR_UNIVERSAL_EXPRESS_VERSION,
        name: NGUNIVERSAL_EXPRESS_ENGINE,
        overwrite: true,
      },
      {
        type: NodeDependencyType.Dev,
        version: ANGULAR_UNIVERSAL_BUILDERS,
        name: '@nguniversal/builders',
        overwrite: true,
      },
    ];
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    scripts.forEach((key) => {
      const keyBackup = `${key}_bak`;
      const scriptValue = packageJson.scripts[key];
      if (scriptValue && !packageJson.scripts[keyBackup]) {
        packageJson.scripts[keyBackup] = scriptValue;
        packageJson.scripts[key] = undefined;
      }
    });

    packageJson.scripts['dev:ssr'] = `ng run ${projectName}:serve-ssr`;
    packageJson.scripts[
      'serve:ssr'
    ] = `node dist/${projectName}/server/main.js`;
    packageJson.scripts[
      'build:ssr'
    ] = `ng build --prod && ng run ${projectName}:server:production`;
    packageJson.scripts['prerender'] = `ng run ${projectName}:prerender`;

    tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2));

    removePackageJsonDependency(
      tree,
      '@nguniversal/module-map-ngfactory-loader'
    );
    packagesToAddOrUpdate.forEach((dep) => {
      addPackageJsonDependency(tree, dep);
    });
  };
}

export function removeImportsInMainServerFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Removing unnecessary ngExpressEngine import after migration'
    );
    const mainServerTsPath = 'src/main.server.ts';
    const buffer = tree.read(mainServerTsPath);

    if (!buffer) {
      throw new SchematicsException('Could not find main.server.ts');
    }

    const recorder = tree.beginUpdate(mainServerTsPath);
    const mainServerTsSourceFile = createSourceFileWithStrippedBOM(
      tree,
      mainServerTsPath
    );

    removeFullLineFromExportDeclarationsByModuleName(
      mainServerTsSourceFile,
      recorder,
      '@nguniversal/module-map-ngfactory-loader'
    );
    removeFullLineFromImportDeclarationsByModuleName(
      mainServerTsSourceFile,
      recorder,
      NGUNIVERSAL_EXPRESS_ENGINE
    );
    removeFullLineFromImportDeclarationsByModuleName(
      mainServerTsSourceFile,
      recorder,
      '@spartacus/core'
    );

    removeFullLineWithCallExpressionByModuleName(
      mainServerTsSourceFile,
      recorder,
      'NgExpressEngineDecorator.get'
    );

    tree.commitUpdate(recorder);
  };
}

export function removeMapLoaderModule(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Removing MapLoaderModule import');

    const mapLoaderModuleTsPath = 'src/app/app.server.module.ts';

    if (!tree.read(mapLoaderModuleTsPath)) {
      throw new SchematicsException('Could not find app.server.module.ts');
    }

    const recorder = tree.beginUpdate(mapLoaderModuleTsPath);
    const moduleMapLoaderToBeRemoved =
      '@nguniversal/module-map-ngfactory-loader';
    const appServerModuleSourceFile = createSourceFileWithStrippedBOM(
      tree,
      mapLoaderModuleTsPath
    );
    const printer = ts.createPrinter();

    removeFullLineFromImportDeclarationsByModuleName(
      appServerModuleSourceFile,
      recorder,
      moduleMapLoaderToBeRemoved
    );

    getDecoratorMetadata(
      appServerModuleSourceFile,
      'NgModule',
      ANGULAR_CORE
    ).forEach((metadata: ts.Node) => {
      if (ts.isObjectLiteralExpression(metadata)) {
        const matchingProperties = getMetadataField(metadata, 'imports');

        if (!matchingProperties) {
          return;
        }

        const assignment = matchingProperties[0] as ts.PropertyAssignment;
        if (!ts.isArrayLiteralExpression(assignment.initializer)) {
          return;
        }

        const arrayLiteral = assignment.initializer;
        const newImports = arrayLiteral.elements.filter(
          (n) => !(ts.isIdentifier(n) && n.text === 'ModuleMapLoaderModule')
        );

        if (arrayLiteral.elements.length !== newImports.length) {
          const newImportsText = printer.printNode(
            ts.EmitHint.Unspecified,
            ts.updateArrayLiteral(arrayLiteral, newImports),
            appServerModuleSourceFile
          );

          const index = arrayLiteral.getStart();
          const length = arrayLiteral.getWidth();

          recorder.remove(index, length).insertLeft(index, newImportsText);
        }
      }
    });

    tree.commitUpdate(recorder);
  };
}

export function updateAngularJsonFile(): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Updating angular.json builds dist configuration');
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const buffer = tree.read('angular.json');
    if (!buffer) {
      throw new SchematicsException('Could not find angular.json');
    }

    const angularJson = JSON.parse(buffer.toString(UTF_8));
    angularJson.projects[projectName].architect.build.options[
      'outputPath'
    ] = `dist/${projectName}/browser`;
    angularJson.projects[projectName].architect['server'] = {
      builder: '@angular-devkit/build-angular:server',
      options: {
        outputPath: `dist/${projectName}/server`,
        main: 'server.ts',
        tsConfig: 'tsconfig.server.json',
      },
      configurations: {
        production: {
          outputHashing: 'media',
          fileReplacements: [
            {
              replace: 'src/environments/environment.ts',
              with: 'src/environments/environment.prod.ts',
            },
          ],
          sourceMap: false,
          optimization: true,
        },
      },
    };
    tree.overwrite('angular.json', JSON.stringify(angularJson, null, 2));
  };
}

function createSourceFileWithStrippedBOM(
  tree: Tree,
  path: string
): ts.SourceFile {
  const buffer = tree.read(path);
  if (!buffer) {
    throw new SchematicsException(`No tree found for ${path}.`);
  }
  // Strip BOM as otherwise TSC methods (Ex: getWidth) will return an offset which
  // which breaks the CLI UpdateRecorder.
  // See: https://github.com/angular/angular/pull/30719
  return ts.createSourceFile(
    path,
    buffer.toString(UTF_8).replace(/^\uFEFF/, ''),
    ts.ScriptTarget.Latest,
    true
  );
}

function removeFullLineFromImportDeclarationsByModuleName(
  sourceTsFile: ts.SourceFile,
  treeRecorder: UpdateRecorder,
  moduleNameString: string
): void {
  sourceTsFile.statements
    .filter(
      (s) =>
        ts.isImportDeclaration(s) &&
        s.moduleSpecifier &&
        ts.isStringLiteral(s.moduleSpecifier) &&
        s.moduleSpecifier.text === moduleNameString
    )
    .forEach((node) => {
      const index = node.getFullStart();
      const length = node.getFullWidth();
      treeRecorder.remove(index, length);
    });
}

function removeFullLineFromExportDeclarationsByModuleName(
  sourceTsFile: ts.SourceFile,
  treeRecorder: UpdateRecorder,
  moduleNameString: string
): void {
  sourceTsFile.statements
    .filter(
      (s) =>
        ts.isExportDeclaration(s) &&
        s.moduleSpecifier &&
        ts.isStringLiteral(s.moduleSpecifier) &&
        s.moduleSpecifier.text === moduleNameString
    )
    .forEach((node) => {
      const index = node.getFullStart();
      const length = node.getFullWidth();
      treeRecorder.remove(index, length);
    });
}

function removeFullLineWithCallExpressionByModuleName(
  sourceTsFile: ts.SourceFile,
  treeRecorder: UpdateRecorder,
  moduleCallExpression: string
): void {
  sourceTsFile.statements
    .filter(
      (s) =>
        ts.isVariableStatement(s) &&
        ts.isVariableDeclarationList(s.declarationList) &&
        s.declarationList.declarations.length === 1 &&
        !!s.declarationList.declarations[0].initializer &&
        s.declarationList.declarations[0].initializer
          .getText()
          .indexOf(moduleCallExpression) !== -1
    )
    .forEach((node) => {
      const index = node.getFullStart();
      const length = node.getFullWidth();
      treeRecorder.remove(index, length);
    });
}
