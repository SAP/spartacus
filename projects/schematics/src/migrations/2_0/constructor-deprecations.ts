import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { relative } from 'path';
import {
  addConstructorParam,
  commitChanges,
  findConstructor,
  getAllTsSourceFiles,
  InsertDirection,
  isCandidateForConstructorDeprecation,
  removeConstructorParam,
} from '../../shared/utils/file-utils';
import { CONSTRUCTOR_DEPRECATION_DATA } from './constructor-deprecation-data';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking constructor deprecations...');
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        const sourcePath = relative(basePath, source.fileName);

        for (const constructorDeprecation of CONSTRUCTOR_DEPRECATION_DATA) {
          if (
            !isCandidateForConstructorDeprecation(
              source,
              constructorDeprecation.class,
              constructorDeprecation.deprecatedParams
            )
          ) {
            continue;
          }

          const nodes = getSourceNodes(source);
          const constructorNode = findConstructor(nodes);
          for (const newConstructorParam of constructorDeprecation.addParams ||
            []) {
            const changes = addConstructorParam(
              source,
              sourcePath,
              constructorNode,
              newConstructorParam
            );
            if (changes.length) {
              commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
            }
          }

          for (const constructorParamToRemove of constructorDeprecation.removeParams ||
            []) {
            const changes = removeConstructorParam(
              source,
              sourcePath,
              constructorNode,
              constructorParamToRemove
            );
            if (changes.length) {
              commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
            }
          }
        }
      }
    }

    return tree;
  };
}
