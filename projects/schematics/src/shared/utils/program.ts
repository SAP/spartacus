import { Tree } from '@angular-devkit/schematics';
import { Project, SourceFile } from 'ts-morph';
import { TreeFileSystem } from './tree-file-system';

export function createProgram(
  tree: Tree,
  basePath: string,
  tsconfigPath: string
): { program: Project; appSourceFiles: SourceFile[] } {
  const fs = new TreeFileSystem(tree, basePath);
  const program = new Project({
    tsConfigFilePath: tsconfigPath,
    fileSystem: fs,
  });
  program.getTypeChecker();

  const appSourceFiles = program.getSourceFiles().filter((sourceFile) => {
    return (
      !sourceFile.isDeclarationFile() &&
      !sourceFile.isFromExternalLibrary() &&
      !sourceFile.isInNodeModules()
    );
  });

  return {
    program,
    appSourceFiles,
  };
}

export function saveAndFormat(sourceFile: SourceFile): void {
  sourceFile.organizeImports();
  sourceFile.formatText({
    ensureNewLineAtEndOfFile: true,
    indentSize: 2,
  });
  sourceFile.saveSync();
}
