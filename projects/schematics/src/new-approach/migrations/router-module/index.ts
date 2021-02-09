/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { normalize, resolve } from '@angular-devkit/core';
import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import * as path from 'path';
import { FileSystemHost, Node, Project } from 'ts-morph';
import * as ts from 'typescript';
import { getProjectTsConfigPaths } from '../../utils/project-tsconfig-paths';

/** Migration that ensures that we have correct RouterModule.forRoot set */
export function routerModule(project: string): Rule {
  return (tree: Tree) => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot set RouterModule.'
      );
    }

    for (const tsconfigPath of buildPaths) {
      runRouterModuleMigration(tree, tsconfigPath, basePath);
    }
  };
}

function runRouterModuleMigration(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
) {
  class VirtualFileSystem implements FileSystemHost {
    constructor(
      private readonly tree: Tree,
      private readonly rootDir: string
    ) {}

    private resolvePath(filePath: string) {
      const result = normalize(
        resolve(normalize(this.rootDir), normalize(filePath))
      );
      // console.log('resolvePath', result, filePath);
      return result;
    }

    isCaseSensitive(): boolean {
      return ts.sys.useCaseSensitiveFileNames;
    }
    async delete(path: string): Promise<void> {
      return this.deleteSync(path);
    }
    deleteSync(path: string): void {
      return this.tree.delete(path);
    }
    readDirSync(dirPath: string): string[] {
      // console.log('readDirSync', dirPath);
      const paths: string[] = [];
      this.tree
        .getDir(dirPath)
        .subfiles.forEach((file) =>
          paths.push(path.join(dirPath, file.toString()))
        );
      this.tree
        .getDir(dirPath)
        .subdirs.forEach((dir) =>
          paths.push(path.join(dirPath, dir.toString()))
        );
      // console.log(paths);
      return paths;
    }
    async readFile(
      filePath: string,
      encoding?: string | undefined
    ): Promise<string> {
      const file = this.readFileSync(filePath, encoding);
      // console.log('readFile', filePath);
      return file;
    }
    readFileSync(filePath: string, encoding?: string | undefined): string {
      // tslint:disable-next-line: no-non-null-assertion
      const result = this.tree
        .get(this.resolvePath(filePath))
        ?.content.toString(encoding);
      if (result) {
        return result;
      }
      // console.log('readFileSync', filePath);
      return '';
    }

    async writeFile(filePath: string, fileText: string): Promise<void> {
      return this.writeFileSync(filePath, fileText);
    }
    writeFileSync(filePath: string, fileText: string): void {
      return this.tree.overwrite(filePath, fileText);
    }
    async mkdir(dirPath: string): Promise<void> {
      return this.mkdirSync(dirPath);
    }
    mkdirSync(dirPath: string): void {
      return this.tree.create(`${dirPath}/.gitkeep`, '');
    }
    async move(srcPath: string, destPath: string): Promise<void> {
      return this.moveSync(srcPath, destPath);
    }
    moveSync(srcPath: string, destPath: string): void {
      return this.tree.rename(srcPath, destPath);
    }
    async copy(srcPath: string, destPath: string): Promise<void> {
      return this.copySync(srcPath, destPath);
    }
    copySync(_srcPath: string, _destPath: string): void {
      throw new Error('Method not implemented.');
    }
    async fileExists(filePath: string): Promise<boolean> {
      // console.log('fileExists', filePath);
      return this.fileExistsSync(filePath);
    }
    fileExistsSync(filePath: string): boolean {
      // console.log('fileExistsSync', filePath);
      return this.tree.exists(filePath);
    }
    async directoryExists(dirPath: string): Promise<boolean> {
      // console.log('dirExists', dirPath);
      return this.directoryExistsSync(dirPath);
    }
    directoryExistsSync(dirPath: string): boolean {
      // console.log('dirExistsSync', dirPath);
      return this.tree.exists(dirPath);
    }
    realpathSync(filePath: string): string {
      const result = normalize(
        resolve(normalize(this.rootDir), normalize(filePath))
      );
      // console.log('realpathSync', filePath, result);
      return result;
    }
    getCurrentDirectory(): string {
      // console.log('currentDir', this.tree.root.path.toString());
      return this.tree.root.path.toString();
    }
    glob(_patterns: readonly string[]): Promise<string[]> {
      console.log('globbb');
      throw new Error('Method not implemented.');
    }
    globSync(_patterns: readonly string[]): string[] {
      console.log('globSync');
      throw new Error('Method not implemented.');
    }
  }

  const fs = new VirtualFileSystem(tree, basePath);
  // console.log(tsconfigPath, basePath);
  const program = new Project({
    tsConfigFilePath: tsconfigPath,
    fileSystem: fs,
  });

  // const { program } = createMigrationProgram(tree, tsconfigPath, basePath);

  /*const typeChecker = */ program.getTypeChecker();
  // const sourceFiles = program
  //   .getSourceFiles()
  //   .filter((sourceFile) => canMigrateFile(basePath, sourceFile, program));
  const sourceFiles = program.getSourceFiles().filter((sourceFile) => {
    return (
      !sourceFile.isDeclarationFile() &&
      !sourceFile.isFromExternalLibrary() &&
      !sourceFile.isInNodeModules()
    );
  });
  // const deprecatedFunction = 'AuthModule';
  // const newFunction = 'NewAuthModule';

  // function syntaxKindToName(kind: ts.SyntaxKind) {
  //   return (<any>ts).SyntaxKind[kind];
  // }

  function visit(node: Node) {
    console.log(node.getText());
    // if (ts.isCallExpression((node.compilerNode as unknown) as ts.Node)) {
    //   console.log('Found call expression', node.getText());
    // }
    // console.log(
    //   syntaxKindToName(((node.compilerNode as unknown) as ts.Node).kind),
    //   node.getText()
    // );

    // Visit each Child-Node recursively with the same visit function
    node.forEachChild(visit);
  }

  sourceFiles.forEach((sourceFile) => {
    // console.log('yolo', sourceFile.getFilePath());
    if (sourceFile.getFilePath().includes('app-routing.module.ts')) {
      sourceFile.forEachChild(visit);
    }
    // const asyncImportSpecifier = getImportSpecifier(
    //   sourceFile,
    //   '@spartacus/core',
    //   deprecatedFunction
    // );
    // const asyncImport = asyncImportSpecifier
    //   ? closestNode<ts.NamedImports>(
    //       asyncImportSpecifier,
    //       ts.SyntaxKind.NamedImports
    //     )
    //   : null;

    // // If there are no imports for `async`, we can exit early.
    // if (!asyncImportSpecifier || !asyncImport) {
    //   return;
    // }

    // const update = tree.beginUpdate(relative(basePath, sourceFile.fileName));

    // // Change the `async` import to `waitForAsync`.
    // update.remove(asyncImport.getStart(), asyncImport.getWidth());
    // update.insertRight(
    //   asyncImport.getStart(),
    //   printer.printNode(
    //     ts.EmitHint.Unspecified,
    //     replaceImport(asyncImport, deprecatedFunction, newFunction),
    //     sourceFile
    //   )
    // );

    // // Change `async` calls to `waitForAsync`.
    // findAsyncReferences(sourceFile, typeChecker, asyncImportSpecifier).forEach(
    //   (node) => {
    //     update.remove(node.getStart(), node.getWidth());
    //     update.insertRight(node.getStart(), newFunction);
    //   }
    // );

    // tree.commitUpdate(update);
  });
}
