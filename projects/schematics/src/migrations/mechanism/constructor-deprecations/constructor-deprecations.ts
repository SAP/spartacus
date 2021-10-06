import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import {
  addConstructorParam,
  commitChanges,
  ConstructorDeprecation,
  findConstructor,
  getAllTsSourceFiles,
  getTsSourceFile,
  InsertDirection,
  isCandidateForConstructorDeprecation,
  removeConstructorParam,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';

export function migrateConstructorDeprecation(
  tree: Tree,
  context: SchematicContext,
  constructorDeprecations: ConstructorDeprecation[]
): Tree {
  context.logger.info('Checking constructor deprecations...');

  const project = getSourceRoot(tree, {});
  const sourceFiles = getAllTsSourceFiles(tree, project);
  for (const originalSource of sourceFiles) {
    const sourcePath = originalSource.fileName;

    for (const constructorDeprecation of constructorDeprecations) {
      if (
        !isCandidateForConstructorDeprecation(
          originalSource,
          constructorDeprecation
        )
      ) {
        continue;
      }

      for (const newConstructorParam of constructorDeprecation.addParams ||
        []) {
        // 'source' has to be reloaded after each committed change
        const source = getTsSourceFile(tree, sourcePath);
        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);

        const changes = addConstructorParam(
          source,
          sourcePath,
          constructorNode,
          newConstructorParam
        );
        commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
      }

      for (const constructorParamToRemove of constructorDeprecation.removeParams ||
        []) {
        // 'source' has to be reloaded after each committed change
        const source = getTsSourceFile(tree, sourcePath);
        const nodes = getSourceNodes(source);
        const constructorNode = findConstructor(nodes);

        const changes = removeConstructorParam(
          source,
          sourcePath,
          constructorNode,
          constructorParamToRemove
        );
        commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
      }
    }
  }

  return tree;
}
