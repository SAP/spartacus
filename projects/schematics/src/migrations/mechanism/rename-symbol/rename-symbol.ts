import { Tree } from '@angular-devkit/schematics';
// import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { createProgram } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
import { ImportDeclarationStructure } from 'ts-morph';


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
                id.getImportClause().getNamedImports().forEach((namedImport) => {
                    if (renamedSymbols.some(rs => namedImport.getName() === rs.previousNode)) {
                        const renamedSymbol = renamedSymbols.find(_ => _.previousNode === namedImport.getName()); // &&
                                                                    //    _.previousImportPath === id.getModuleSpecifier().getText())
                        importDeclarationStructures.push({
                            namedImports: [renamedSymbol.newNode],
                            moduleSpecifier: renamedSymbol.newImportPath
                        } as ImportDeclarationStructure);
                    } else {
                        importDeclarationStructures.push({
                            namedImports: [namedImport.getName()],
                            moduleSpecifier: id.getModuleSpecifier().getText()
                        } as ImportDeclarationStructure);
                    }
                });
                id.remove();

            })

            // importDeclarationStructures.forEach((ids) => {
            //     sourceFile.addImportDeclaration({
            //         namedImports: ids.namedImports,
            //         moduleSpecifier: ids.moduleSpecifier
            //     });
            // })
            sourceFile.addImportDeclarations(importDeclarationStructures);

            sourceFile.saveSync();
        });

        for (const sourceFile of appSourceFiles) {
            sourceFile.organizeImports();
            sourceFile.saveSync();
        }
    }

    return tree;
}