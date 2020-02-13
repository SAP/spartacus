import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { relative } from 'path';
import {
  FEATURE_CONFIG_SERVICE,
  PAGE_META_SERVICE,
  SPARTACUS_CORE,
} from '../../../shared/constants';
import {
  ClassType,
  commitChanges,
  findConstructor,
  getAllTsSourceFiles,
  InsertDirection,
  isCandidateForConstructorDeprecation,
  removeConstructorParam,
} from '../../../shared/utils/file-utils';

const DEPRECATED_CONSTRUCTOR_PARAMETERS: ClassType[] = [
  {
    className: FEATURE_CONFIG_SERVICE,
    importPath: SPARTACUS_CORE,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info(
      'Handling constructor deprecation for page-meta service'
    );

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        const sourcePath = relative(basePath, source.fileName);
        if (
          !isCandidateForConstructorDeprecation(
            source,
            PAGE_META_SERVICE,
            DEPRECATED_CONSTRUCTOR_PARAMETERS
          )
        ) {
          continue;
        }

        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);
        for (const deprecatedConstructorParam of DEPRECATED_CONSTRUCTOR_PARAMETERS) {
          const changes = removeConstructorParam(
            source,
            sourcePath,
            constructorNode,
            deprecatedConstructorParam
          );
          commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
        }
      }
    }

    return tree;
  };
}
