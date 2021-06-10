import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  BASE_STOREFRONT_MODULE,
  SPARTACUS_MODULE,
  SPARTACUS_STOREFRONTLIB,
} from '../shared/constants';
import {
  addModuleExport,
  addModuleImport,
} from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';

/** Migration which ensures the spartacus is being correctly set up */
export function setupSpartacusModule(project: string): Rule {
  return (tree: Tree): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure SpartacusModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      configureSpartacusModules(tree, tsconfigPath, basePath);
    }
    return tree;
  };
}

function configureSpartacusModules(
  tree: Tree,
  tsconfigPath: string,
  basePath: string
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (sourceFile.getFilePath().includes(`${SPARTACUS_MODULE}.module.ts`)) {
      addModuleImport(sourceFile, {
        import: {
          moduleSpecifier: SPARTACUS_STOREFRONTLIB,
          namedImports: [BASE_STOREFRONT_MODULE],
        },
        content: BASE_STOREFRONT_MODULE,
      });
      addModuleExport(sourceFile, {
        import: {
          moduleSpecifier: SPARTACUS_STOREFRONTLIB,
          namedImports: [BASE_STOREFRONT_MODULE],
        },
        content: BASE_STOREFRONT_MODULE,
      });

      saveAndFormat(sourceFile);

      break;
    }
  }
}
