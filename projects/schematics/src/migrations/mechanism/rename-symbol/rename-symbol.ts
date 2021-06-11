import { Tree } from '@angular-devkit/schematics';
import { ImportDeclarationStructure } from 'ts-morph';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { createProgram, saveAndFormat } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

export function migrateRenamedSymbols(
  tree: Tree,
  renamedSymbols: RenamedSymbol[]
): Tree {
  const project = getDefaultProjectNameFromWorkspace(tree);

  const { buildPaths } = getProjectTsConfigPaths(tree, project);
  const basePath = process.cwd();

  for (const tsconfigPath of buildPaths) {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    appSourceFiles.forEach((sourceFile) => {
      const importDeclarationStructures: ImportDeclarationStructure[] = [];

      sourceFile.getImportDeclarations().forEach((id) => {
        id.getImportClause()
          ?.getNamedImports()
          .forEach((namedImport) => {
            const importName = namedImport.getName();
            const renamedSymbol = renamedSymbols.find(
              (symbol) =>
                symbol.previousNode === importName &&
                symbol.previousImportPath === id.getModuleSpecifierValue()
            );

            if (renamedSymbol) {
              const newNodeName = renamedSymbol.newNode
                ? renamedSymbol.newNode
                : importName;

              const oldAlias = namedImport.getAliasNode()?.getText();

              if (!oldAlias && renamedSymbol.newNode) {
                namedImport.renameAlias(newNodeName);
              }

              importDeclarationStructures.push({
                namedImports: [
                  {
                    name: newNodeName,
                    alias: oldAlias,
                  },
                ],
                moduleSpecifier: renamedSymbol.newImportPath,
              } as ImportDeclarationStructure);

              if ((id.getImportClause()?.getNamedImports()?.length || 0) > 1) {
                namedImport.remove();
              } else {
                id.remove();
              }
            }
          });
      });

      if (importDeclarationStructures.length) {
        sourceFile.addImportDeclarations(importDeclarationStructures);

        // organizeImports will remove unused imports
        saveAndFormat(sourceFile);
      }
    });
  }

  return tree;
}
