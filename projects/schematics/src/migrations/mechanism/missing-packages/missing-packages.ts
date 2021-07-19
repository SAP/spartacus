import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { createProgram } from '../../../shared/utils/program';
import { getProjectTsConfigPaths } from '../../../shared/utils/project-tsconfig-paths';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

export interface MissingPackageMigration {
  package: string;
  comment?: string;
}

export function migrateMissingPackage(
  tree: Tree,
  context: SchematicContext,
  missingPackageConfig: MissingPackageMigration
): Tree {
  const project = getDefaultProjectNameFromWorkspace(tree);

  const { buildPaths } = getProjectTsConfigPaths(tree, project);
  const basePath = process.cwd();

  let foundImport = false;

  for (const tsconfigPath of buildPaths) {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    for (const sourceFile of appSourceFiles) {
      const importDeclarations = sourceFile.getImportDeclarations();
      for (const id of importDeclarations) {
        if (
          id.getModuleSpecifierValue().startsWith(missingPackageConfig.package)
        ) {
          foundImport = true;
          break;
        }
      }

      if (foundImport) {
        break;
      }
    }
  }

  if (foundImport) {
    const packagePresent = getPackageJsonDependency(
      tree,
      missingPackageConfig.package
    );
    if (!packagePresent) {
      const comment =
        missingPackageConfig?.comment ??
        `We've found imports from ${missingPackageConfig.package} package which is not installed. If you are using feature from this library you can configure it by running schematics \`ng add ${missingPackageConfig.package}\`. If you only need to install package add it with npm (\`npm i ${missingPackageConfig.package}\`) or yarn (\`yarn add ${missingPackageConfig.package}\`). If you are not using this package check why you have imports from this library.`;
      context.logger.warn(`${comment}\n`);
    }
  }

  return tree;
}
