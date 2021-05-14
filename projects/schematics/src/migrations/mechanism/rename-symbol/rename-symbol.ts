import { Tree } from '@angular-devkit/schematics';
import { ImportDeclarationStructure } from 'ts-morph';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { createProgram } from '../../../shared/utils/program';
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
    appSourceFiles.map((sourceFile) => {
      const importDeclarationStructures: ImportDeclarationStructure[] = [];

      sourceFile.getImportDeclarations().forEach((id) => {
        id.getImportClause()
          ?.getNamedImports()
          .forEach((namedImport) => {
            const renamedSymbol = renamedSymbols.find(
              (_) =>
                _.previousNode === namedImport.getName() &&
                _.previousImportPath ===
                  id
                    .getModuleSpecifier()
                    .getText()
                    .substr(1, id.getModuleSpecifier().getText().length - 2)
            );

            if (renamedSymbol) {
              const newNodeName = renamedSymbol.newNode
                ? renamedSymbol.newNode
                : namedImport.getName();

              importDeclarationStructures.push({
                namedImports: [
                  {
                    name: newNodeName,
                    alias: namedImport.getAliasNode()?.getText(),
                  },
                ],
                moduleSpecifier: renamedSymbol.newImportPath,
              } as ImportDeclarationStructure);

              if ((id.getImportClause()?.getNamedImports()?.length || 0) > 1) {
                console.log('11111');
                namedImport.remove();
              } else {
                console.log('22222');
                id.remove();
              }
            }
          });
      });

      if (importDeclarationStructures.length) {
        console.log(
          'importDeclarationStructures',
          JSON.stringify(importDeclarationStructures)
        );

        sourceFile.addImportDeclarations(importDeclarationStructures);
        sourceFile.organizeImports();
        sourceFile.saveSync();
      }
    });
  }

  return tree;
}
