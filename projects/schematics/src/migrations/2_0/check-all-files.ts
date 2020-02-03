import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  InsertDirection,
} from '../../shared/utils/file-utils';
import {
  renameCmsGetComponentFromPageConstant,
  renameComponentEntityConstant,
  updateCmsComponentsState,
} from './update-cms-components-state';

export function checkAllFiles(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let updateCmsComponentsChangesMade = false;
    let renamedCmsGetComponentFromPageActionChangesMade = false;
    let renamedComponentEntityConstantChangesMade = false;

    const filePaths = getPathResultsForFile(tree, '.ts', '/src');
    for (const sourcePath of filePaths) {
      const source = getTsSourceFile(tree, sourcePath);

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

      const renamedComponentEntityConstant = renameComponentEntityConstant(
        sourcePath,
        source
      );
      if (renamedComponentEntityConstant.length) {
        renamedComponentEntityConstantChangesMade = true;
        commitChanges(
          tree,
          sourcePath,
          renamedComponentEntityConstant,
          InsertDirection.RIGHT
        );
      }

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
    if (renamedCmsGetComponentFromPageActionChangesMade) {
      context.logger.info(
        `Renamed action constant from 'CMS_GET_COMPONENET_FROM_PAGE' to 'CMS_GET_COMPONENT_FROM_PAGE'`
      );
    }
    if (renamedComponentEntityConstantChangesMade) {
      context.logger.info(
        `Renamed constant from '[Cms[ Component Entity' to '[Cms] Component Entity'`
      );
    }
    return tree;
  };
}
