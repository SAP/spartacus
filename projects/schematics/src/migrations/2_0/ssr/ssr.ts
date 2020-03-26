import {
  apply,
  chain, mergeWith, move,
  Rule,
  SchematicContext, SchematicsException, template,
  Tree, UpdateRecorder, url,
} from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import {strings} from "@angular-devkit/core";
import * as ts from 'typescript';
import {getDecoratorMetadata, getMetadataField} from "@schematics/angular/utility/ast-utils";
import {
  addPackageJsonDependency, NodeDependency,
  NodeDependencyType,
  removePackageJsonDependency
} from "@schematics/angular/utility/dependencies";

export function migrate(): Rule {
  return async () => {
    return chain([
      backupExistingFiles(),
      overwriteServerTsFile(),
      modifyPackageJsonScripts(),
      removeImportsInMainServerFile(),
      removeMapLoaderModule(),
      updateAngularJsonFile(),
    ]);
  };
}


export function backupExistingFiles() {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Backing up old server.ts and webpack.server.config.js files.');

    const serverPath = '/server.ts';
    const webpackPath = '/webpack.server.config.js';
    const serverBuffer = tree.read(serverPath);
    if (serverBuffer === null) {
      throw new SchematicsException('Could not find server.ts file');
    }
    const webpackBuffer = tree.read(webpackPath);
    if (webpackBuffer === null) {
      throw new SchematicsException('Could not find webpack.server.config.js file');
    }

    tree.rename(serverPath, './server.ts.bak');
    tree.rename(webpackPath, './webpack.server.config.js.bak');
  };
}

export function overwriteServerTsFile() {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Creating new server.ts file.');
    const projectName = await getProjectNameFromWorkspace(tree);

    return chain([mergeWith(apply(
      url('./files'),
      [
        template({
          ...strings,
          typescriptExt: 'ts',
          ...({} as object),
          browserDistDirectory: `dist/${projectName}/browser`,
        }),
        move('.'),
      ]
    ))]);
  };
}

export function modifyPackageJsonScripts() {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Updating package.json scripts');
    const pkgPath = '/package.json';
    const buffer = tree.read(pkgPath);
    if (!buffer) {
      throw new SchematicsException('Could not find package.json');
    }

    const packageJson = JSON.parse(buffer.toString());
    const scripts = [
      'compile:server',
      'build:ssr',
      'serve:ssr',
      'build:client-and-server-bundles',
    ];
    const packagesToAddOrUpdate: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '^9.0.0',
        name: '@nguniversal/express-engine',
        overwrite: true
      },
      {
        type: NodeDependencyType.Dev,
        version: '^9.0.0',
        name: '@nguniversal/builders',
        overwrite: true
      },
    ];
    const projectName = await getProjectNameFromWorkspace(tree);

    scripts.forEach(key => {
      const keyBackup = `${key}_bak`;
      const scriptValue = packageJson.scripts[key];
      if (scriptValue && !packageJson.scripts[keyBackup]) {
        packageJson.scripts[keyBackup] = scriptValue;
        packageJson.scripts[key] = undefined;
      }
    });

    packageJson.scripts['dev:ssr'] = `ng run ${projectName}:serve-ssr`;
    packageJson.scripts['serve:ssr'] = `node dist/${projectName}/server/main.js`;
    packageJson.scripts['build:ssr'] = `ng build --prod && ng run ${projectName}:server:production`;
    packageJson.scripts['prerender'] = `ng run ${projectName}:prerender`;

    tree.overwrite(pkgPath, JSON.stringify(packageJson, null, 2));

    removePackageJsonDependency(tree, '@nguniversal/module-map-ngfactory-loader');
    packagesToAddOrUpdate.forEach((dep) => {
      addPackageJsonDependency(tree, dep);
    });

  };
}

export function removeImportsInMainServerFile() {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Removing unnecessary ngExpressEngine import after migration'
    );
    const mainServerTsPath = 'src/main.server.ts';
    const buffer = tree.read(mainServerTsPath);

    if (!buffer) {
      throw new SchematicsException('Could not find main.server.ts');
    }

    const exportLineToRemove = "export const ngExpressEngine = NgExpressEngineDecorator.get(engine);";
    const fileContent = buffer.toString();
    const recorder = tree.beginUpdate(mainServerTsPath);
    const mainServerTsSourceFile = createSourceFileWithStrippedBOM(tree, mainServerTsPath);

    removeFullLineFromExportDeclarationsByModuleName(mainServerTsSourceFile, recorder, '@nguniversal/module-map-ngfactory-loader');
    removeFullLineFromImportDeclarationsByModuleName(mainServerTsSourceFile, recorder, '@nguniversal/express-engine');
    removeFullLineFromImportDeclarationsByModuleName(mainServerTsSourceFile, recorder, '@spartacus/core');
    recorder.remove(fileContent.indexOf(exportLineToRemove), exportLineToRemove.length);

    tree.commitUpdate(recorder);
  };
}

export function removeMapLoaderModule() {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Removing MapLoaderModule import'
    );

    const mapLoaderModuleTsPath = 'src/app/app.server.module.ts';
    const buffer = tree.read(mapLoaderModuleTsPath);

    if (!buffer) {
      throw new SchematicsException('Could not find app.server.module.ts');
    }

    const recorder = tree.beginUpdate(mapLoaderModuleTsPath);
    const moduleMapLoaderToBeRemoved = '@nguniversal/module-map-ngfactory-loader';
    const appServerModuleSourceFile = createSourceFileWithStrippedBOM(tree, mapLoaderModuleTsPath);
    const printer = ts.createPrinter();

    removeFullLineFromImportDeclarationsByModuleName(appServerModuleSourceFile, recorder, moduleMapLoaderToBeRemoved);

    getDecoratorMetadata(appServerModuleSourceFile, 'NgModule', '@angular/core')
      .forEach((metadata: ts.ObjectLiteralExpression) => {
        const matchingProperties = getMetadataField(metadata, 'imports');

        if (!matchingProperties) {
          return;
        }

        const assignment = matchingProperties[0] as ts.PropertyAssignment;
        if (!ts.isArrayLiteralExpression(assignment.initializer)) {
          return;
        }

        const arrayLiteral = assignment.initializer;
        const newImports = arrayLiteral.elements
          .filter(n => !(ts.isIdentifier(n) && n.text === 'ModuleMapLoaderModule'));

        if (arrayLiteral.elements.length !== newImports.length) {
          const newImportsText = printer.printNode(
            ts.EmitHint.Unspecified,
            ts.updateArrayLiteral(arrayLiteral, newImports),
            appServerModuleSourceFile,
          );

          const index = arrayLiteral.getStart();
          const length = arrayLiteral.getWidth();

          recorder
            .remove(index, length)
            .insertLeft(index, newImportsText);
        }
      });

    tree.commitUpdate(recorder);
  };
}

export function updateAngularJsonFile() {
  return async (tree: Tree, context: SchematicContext) => {
    context.logger.info('Updating angular.json builds dist configuration');
    const projectName = await getProjectNameFromWorkspace(tree);

    const buffer = tree.read('angular.json');
    if (!buffer) {
      throw new SchematicsException('Could not find angular.json');
    }

    const angularJson = JSON.parse(buffer.toString('utf-8'));
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

export async function getProjectNameFromWorkspace(tree: Tree): Promise<string> {
  const workspace = await getWorkspace(tree);
  // No other option than guessing that main project exists on first position of projects map
  return workspace.projects.keys().next().value;
}

function createSourceFileWithStrippedBOM(tree: Tree, path: string): ts.SourceFile {
  // Strip BOM as otherwise TSC methods (Ex: getWidth) will return an offset which
  // which breaks the CLI UpdateRecorder.
  // See: https://github.com/angular/angular/pull/30719
  return ts.createSourceFile(
    path,
    tree.read(path)!.toString().replace(/^\uFEFF/, ''),
    ts.ScriptTarget.Latest,
    true,
  );
}

function removeFullLineFromImportDeclarationsByModuleName(sourceTsFile: ts.SourceFile, treeRecorder: UpdateRecorder, moduleNameString: string): void {
  sourceTsFile
    .statements
    .filter(s => (
      ts.isImportDeclaration(s) &&
      s.moduleSpecifier &&
      ts.isStringLiteral(s.moduleSpecifier) &&
      s.moduleSpecifier.text === moduleNameString
    ))
    .forEach(node => {
      const index = node.getFullStart();
      const length = node.getFullWidth();
      treeRecorder.remove(index, length);
    });
}

function removeFullLineFromExportDeclarationsByModuleName(sourceTsFile: ts.SourceFile, treeRecorder: UpdateRecorder, moduleNameString: string): void {
  sourceTsFile
    .statements
    .filter(s => (
      ts.isExportDeclaration(s) &&
      s.moduleSpecifier &&
      ts.isStringLiteral(s.moduleSpecifier) &&
      s.moduleSpecifier.text === moduleNameString
    ))
    .forEach(node => {
      const index = node.getFullStart();
      const length = node.getFullWidth();
      treeRecorder.remove(index, length);
    });
}
