import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  insertCommentAboveMethodCall,
  InsertDirection,
  renameIdentifierNode,
} from '../../shared/utils/file-utils';

export const GET_COMPONENT_STATE_OLD_API = 'getComponentState';
export const GET_COMPONENTS_STATE_NEW_API = 'getComponentsState';

const GET_COMPONENT_ENTITIES_OLD_API = 'getComponentEntities';
export const GET_COMPONENT_ENTITIES_COMMENT = `// TODO: '${GET_COMPONENT_ENTITIES_OLD_API}' has been removed, please use some of the newer API methods.`;

export const COMPONENT_STATE_SELECTOR_FACTORY_OLD_API =
  'componentStateSelectorFactory';
export const COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API =
  'componentsLoaderStateSelectorFactory';

export const COMPONENT_SELECTOR_FACTORY_OLD_API = 'componentSelectorFactory';
export const COMPONENTS_SELECTOR_FACTORY_NEW_API = 'componentsSelectorFactory';

// TODO:#6027 - rename method and file back to the generic name.
// TODO:#6027 - do the same for migration script name in the json file and update the test file
export function updateCmsComponentState(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let cmsComponentSelectorsChangesMade = false;
    let renamedCmsGetComponentFromPageActionChangesMade = false;

    const filePaths = getPathResultsForFile(tree, '.ts', '/src');
    for (const sourcePath of filePaths) {
      const source = getTsSourceFile(tree, sourcePath);

      // adding comments for selectors
      const getComponentStateComments = insertCommentAboveMethodCall(
        sourcePath,
        source,
        GET_COMPONENT_STATE_OLD_API,
        `${buildComment(
          GET_COMPONENT_STATE_OLD_API,
          GET_COMPONENTS_STATE_NEW_API
        )}\n`
      );
      const getComponentEntitiesComments = insertCommentAboveMethodCall(
        sourcePath,
        source,
        GET_COMPONENT_ENTITIES_OLD_API,
        `${GET_COMPONENT_ENTITIES_COMMENT}\n`
      );
      const componentStateSelectorFactoryComments = insertCommentAboveMethodCall(
        sourcePath,
        source,
        COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
        `${buildComment(
          COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
          COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API
        )}\n`
      );
      const componentSelectorFactoryComments = insertCommentAboveMethodCall(
        sourcePath,
        source,
        COMPONENT_SELECTOR_FACTORY_OLD_API,
        `${buildComment(
          COMPONENT_SELECTOR_FACTORY_OLD_API,
          COMPONENTS_SELECTOR_FACTORY_NEW_API
        )}\n`
      );
      const selectorCommentChanges = [
        ...getComponentStateComments,
        ...getComponentEntitiesComments,
        ...componentStateSelectorFactoryComments,
        ...componentSelectorFactoryComments,
      ];
      if (selectorCommentChanges.length) {
        cmsComponentSelectorsChangesMade = true;
      }

      // Renaming the constant
      const renameCmsGetComponentFromPageConstantChanges = renameCmsGetComponentFromPageConstant(
        sourcePath,
        source
      );
      if (renameCmsGetComponentFromPageConstantChanges.length) {
        renamedCmsGetComponentFromPageActionChangesMade = true;
      }

      const allChanges: Change[] = [
        ...selectorCommentChanges,
        ...renameCmsGetComponentFromPageConstantChanges,
      ];
      if (allChanges.length) {
        commitChanges(tree, sourcePath, allChanges, InsertDirection.RIGHT);
      }
    }

    if (cmsComponentSelectorsChangesMade) {
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

// TODO:#6027 - test
export function renameCmsGetComponentFromPageConstant(
  sourcePath: string,
  source: ts.SourceFile
): Change[] {
  return renameIdentifierNode(
    sourcePath,
    source,
    'CMS_GET_COMPONENET_FROM_PAGE',
    'CMS_GET_COMPONENT_FROM_PAGE'
  );
}

export function buildComment(
  oldApiMethod: string,
  newApiMethod: string
): string {
  return `// TODO: '${oldApiMethod}' has been removed. Please try '${newApiMethod}' instead.`;
}
