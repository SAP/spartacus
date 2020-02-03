import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  InsertDirection,
} from '../../shared/utils/file-utils';
import {
  renameCmsGetComponentFromPageConstant,
  updateCmsComponentsState,
} from './update-cms-components-state';

export function checkAllFiles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let updateCmsComponentsChangesMade = false;
    let renamedCmsGetComponentFromPageActionChangesMade = false;

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

      const renamedCmsGetComponentFromPageAction = renameCmsGetComponentFromPageConstant(
        sourcePath,
        source
      );
      if (renamedCmsGetComponentFromPageAction.length) {
        renamedCmsGetComponentFromPageActionChangesMade = true;
        commitChanges(
          tree,
          sourcePath,
          renamedCmsGetComponentFromPageAction,
          InsertDirection.RIGHT
        );
      }
    }

    if (updateCmsComponentsChangesMade) {
      context.logger.info('Added comments for CMS component selectors');
    }
    if (renamedCmsGetComponentFromPageActionChangesMade) {
      context.logger.info(
        `Renamed action constant from 'CMS_GET_COMPONENET_FROM_PAGE' to 'CMS_GET_COMPONENT_FROM_PAGE'`
      );
    }
    return tree;
  };
}
