import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  NG_EXPRESS_ENGINE_DECORATOR,
  SPARTACUS_CORE,
  SPARTACUS_SETUP,
  SPARTACUS_SETUP_SSR,
} from '../../../shared/constants';
import {
  commitChanges,
  getServerTsPath,
  getTsSourceFile,
  removeImport,
} from '../../../shared/utils/file-utils';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../../../shared/utils/lib-utils';
import { createImportChange } from '../../../shared/utils/module-file-utils';
import {
  checkIfSSRIsUsed,
  getSpartacusSchematicsVersion,
  readPackageJson,
} from '../../../shared/utils/package-utils';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);

    return checkIfSSRIsUsed(tree)
      ? chain([
          updateImport(),
          addSetupPackageJsonDependencies(packageJson),
          installPackageJsonDependencies(),
        ])
      : noop();
  };
}

function updateImport(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const serverFilePath = getServerTsPath(tree);
    if (!serverFilePath) {
      return tree;
    }

    if (
      isImported(
        getTsSourceFile(tree, serverFilePath),
        NG_EXPRESS_ENGINE_DECORATOR,
        SPARTACUS_CORE
      )
    ) {
      const importRemovalChange = removeImport(
        getTsSourceFile(tree, serverFilePath),
        {
          className: NG_EXPRESS_ENGINE_DECORATOR,
          importPath: SPARTACUS_CORE,
        }
      );
      commitChanges(tree, serverFilePath, [importRemovalChange]);

      const addImportChange = createImportChange(
        tree,
        serverFilePath,
        NG_EXPRESS_ENGINE_DECORATOR,
        SPARTACUS_SETUP_SSR
      );
      commitChanges(tree, serverFilePath, [addImportChange]);
    }
    return tree;
  };
}

function addSetupPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_SETUP,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
