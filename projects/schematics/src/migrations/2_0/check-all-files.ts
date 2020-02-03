import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
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

      const renamedCmsGetComponentFromPageAction = renameCmsGetComponentFromPageConstant(
        sourcePath,
        source
      );
      if (renamedCmsGetComponentFromPageAction.length) {
        renamedCmsGetComponentFromPageActionChangesMade = true;
      }

      const updateCmsComponentsChanges = updateCmsComponentsState(
        sourcePath,
        source
      );
      if (updateCmsComponentsChanges.length) {
        updateCmsComponentsChangesMade = true;
      }

      const changes: Change[] = [
        ...renamedCmsGetComponentFromPageAction,
        ...updateCmsComponentsChanges,
      ];
      if (changes.length) {
        commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
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
