import { Tree } from '@angular-devkit/schematics';
// import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { createProgram } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';
import { RenamedSymbol } from '../../../shared/utils/file-utils';


export function migrateRenamedSymbols(
  tree: Tree,
  renamedSymbols: RenamedSymbol[]
): Tree {
    const project = getDefaultProjectNameFromWorkspace(tree);

    const { buildPaths } = getProjectTsConfigPaths(tree, project);
    const basePath = process.cwd();

    for (const tsconfigPath of buildPaths) {

        const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

        // let desiredImportDeclarations = [];

        appSourceFiles.map((sourceFile) => {
            const desiredImportDeclarations = sourceFile.getImportDeclarations().filter((el) => {
                return el.getImportClause().getNamedImports().filter(ni => {
                    return renamedSymbols.some(rs => ni.getName() === rs.previousNode);
                })  
            });

            // return desiredImportDeclarations.length > 0;
            desiredImportDeclarations.forEach((i) => {
                // console.log(sourceFile.getFilePath(), i.getText());
                renamedSymbols.forEach((rs) => {
                    if (i.getText().includes(rs.previousNode)) {
                        console.log('DELETE!');                   }
                        i.remove();
                        sourceFile.addImportDeclaration({
                            defaultImport: rs.newNode,
                            moduleSpecifier: rs.newImportPath
                        });
                })
                // if (i.getText().includes(renamedSymbols))
            })
            sourceFile.saveSync();
        });
        // .forEach((file) => {
            // console.log(file.getImportDeclarations())
        // });
    }

    return tree;
}