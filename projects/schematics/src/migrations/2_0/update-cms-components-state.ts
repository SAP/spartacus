import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  commitChanges,
  getPathResultsForFile,
  getTsSourceFile,
  insertCommentAboveMethodCall,
  InsertDirection,
} from '../../shared/utils/file-utils';

const GET_COMPONENT_STATE_OLD_API = 'getComponentState';
const GET_COMPONENTS_STATE_NEW_API = 'getComponentsState';
export const GET_COMPONENT_STATE_COMMENT = `// TODO: '${GET_COMPONENT_STATE_OLD_API}' has been removed. Please try '${GET_COMPONENTS_STATE_NEW_API}' instead.`;

const GET_COMPONENT_ENTITIES_OLD_API = 'getComponentEntities';
export const GET_COMPONENT_ENTITIES_COMMENT = `// TODO: '${GET_COMPONENT_ENTITIES_OLD_API}' has been removed, please use some of the newer API methods.`;

const COMPONENT_STATE_SELECTOR_FACTORY_OLD_API =
  'componentStateSelectorFactory';
const COMPONENT_STATE_SELECTOR_FACTORY_NEW_API =
  'componentsLoaderStateSelectorFactory';
export const COMPONENT_STATE_SELECTOR_FACTORY_COMMENT = `// TODO: '${COMPONENT_STATE_SELECTOR_FACTORY_OLD_API}' has been removed. Please try '${COMPONENT_STATE_SELECTOR_FACTORY_NEW_API}' instead.`;

// TODO:#6027 - add type safety to options?
export function updateCmsComponentsState(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const filePaths = getPathResultsForFile(tree, '.ts');
    for (const sourcePath of filePaths) {
      const source = getTsSourceFile(tree, sourcePath);

      const getComponentStateComments = insertCommentAboveMethodCall(
        sourcePath,
        source,
        GET_COMPONENT_STATE_OLD_API,
        `${GET_COMPONENT_STATE_COMMENT}\n`
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
        `${COMPONENT_STATE_SELECTOR_FACTORY_COMMENT}\n`
      );

      const changes: InsertChange[] = [
        ...getComponentStateComments,
        ...getComponentEntitiesComments,
        ...componentStateSelectorFactoryComments,
      ];

      if (changes.length) {
        context.logger.info('Updating CMS component selectors');
      }

      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
    }

    return tree;
  };
}
