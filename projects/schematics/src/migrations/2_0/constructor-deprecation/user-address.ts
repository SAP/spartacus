import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { relative } from 'path';
import {
  AUTH_SERVICE,
  NGRX_STORE,
  SPARTACUS_CORE,
  STORE,
  USER_ADDRESS_SERVICE,
} from '../../../shared/constants';
import {
  addConstructorParam,
  ClassType,
  commitChanges,
  findConstructor,
  getAllTsSourceFiles,
  InsertDirection,
  isCandidateForConstructorDeprecation,
} from '../../../shared/utils/file-utils';

const DEPRECATED_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  {
    className: STORE,
    importPath: NGRX_STORE,
  },
];
const NEW_CONSTRUCTOR_PARAMETERS: ClassType[] = [
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
        const sourcePath = relative(basePath, source.fileName);
        if (
          !isCandidateForConstructorDeprecation(
            source,
            USER_ADDRESS_SERVICE,
            DEPRECATED_CONSTRUCTOR_PARAMETERS
          )
        ) {
          continue;
        }

        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);
        for (const newConstructorParam of NEW_CONSTRUCTOR_PARAMETERS) {
          const changes = addConstructorParam(
            source,
            sourcePath,
            constructorNode,
            newConstructorParam
          );
          commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
        }
      }
    }

    return tree;
  };
}
