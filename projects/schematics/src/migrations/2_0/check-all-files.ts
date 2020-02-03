import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  InsertDirection,
} from '../../shared/utils/file-utils';
import { updateCmsComponentsState } from './update-cms-components-state';

export function checkAllFiles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let updateCmsComponentsChangesMade = false;
    const filePaths = getPathResultsForFile(tree, '.ts', '/src');
    for (const sourcePath of filePaths) {
      const source = getTsSourceFile(tree, sourcePath);

      const updateCmsComponentsChanges = updateCmsComponentsState(
        sourcePath,
        source
      );
      if (updateCmsComponentsChanges.length) {
        updateCmsComponentsChangesMade = true;
        commitChanges(
          tree,
          sourcePath,
          updateCmsComponentsChanges,
          InsertDirection.RIGHT
        );
      }
    }

    if (updateCmsComponentsChangesMade) {
      context.logger.info('Added comments for CMS component selectors');
    }
    return tree;
  };
}
