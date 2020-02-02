import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Change } from '@schematics/angular/utility/change';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  insertCommentAboveMethodCall,
  InsertDirection,
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

export function buildComment(
  oldApiMethod: string,
  newApiMethod: string
): string {
  return `// TODO: '${oldApiMethod}' has been removed. Please try '${newApiMethod}' instead.`;
}

export function updateCmsComponentsState(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const filePaths = getPathResultsForFile(tree, '.ts');
    for (const sourcePath of filePaths) {
      const source = getTsSourceFile(tree, sourcePath);

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

      const changes: Change[] = [
        ...getComponentStateComments,
        ...getComponentEntitiesComments,
        ...componentStateSelectorFactoryComments,
        ...componentSelectorFactoryComments,
      ];

      if (changes.length) {
        context.logger.info('Adding comments for CMS component(s) selectors');
      }

      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
    }

    return tree;
  };
}
