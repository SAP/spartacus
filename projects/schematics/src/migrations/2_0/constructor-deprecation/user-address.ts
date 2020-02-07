import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import {
  AUTH_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_SERVICE,
} from '../../../shared/constants';
import {
  ClassType,
  getAllTsSourceFiles,
  isCandidateForConstructorDeprecation,
} from '../../../shared/utils/file-utils';

const DEPRECATED_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  {
    className: STORE,
    importPath: NGRX_STORE,
  },
];
const NEW_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  ...DEPRECATED_CONSTRUCTOR_PARAMETERS,
  {
    className: AUTH_SERVICE,
    importPath: SPARTACUS_CORE,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Handling constructor deprecation for user-address');

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        // const sourcePath = relative(basePath, source.fileName);
        const candidate = isCandidateForConstructorDeprecation(
          source,
          USER_ADDRESS_SERVICE,
          DEPRECATED_CONSTRUCTOR_PARAMETERS
        );
        console.log('candidate: ', candidate);
      }
    }

    return tree;
  };
}
