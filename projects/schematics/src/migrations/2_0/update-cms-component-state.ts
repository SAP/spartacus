import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { Change } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import {
  CMS_ACTIONS,
  CMS_GET_COMPONENT_FROM_PAGE,
  CMS_SELECTORS,
  COMPONENTS_SELECTOR_FACTORY_NEW_API,
  COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API,
  COMPONENT_SELECTOR_FACTORY_OLD_API,
  COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
  GET_COMPONENTS_STATE_NEW_API,
  GET_COMPONENT_ENTITIES_COMMENT,
  GET_COMPONENT_ENTITIES_OLD_API,
  GET_COMPONENT_STATE_OLD_API,
  LOAD_CMS_COMPONENT_CLASS,
  LOAD_CMS_COMPONENT_FAIL_CLASS,
  LOAD_CMS_COMPONENT_SUCCESS_CLASS,
  SPARTACUS_CORE,
  TODO_SPARTACUS,
} from '../../shared/constants';
import {
  commitChanges,
  getAllTsSourceFiles,
  insertCommentAboveIdentifier,
  InsertDirection,
  renameIdentifierNode,
} from '../../shared/utils/file-utils';
import { getSourceRoot } from '../../shared/utils/workspace-utils';

export function updateCmsComponentState(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let cmsComponentSelectorsChangesMade = false;
    let renamedCmsGetComponentFromPageActionChangesMade = false;
    let cmsActionsChangesMade = false;

    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const source of sourceFiles) {
      const sourcePath = source.fileName;

      // adding comments for selectors
      let selectorCommentChanges: Change[] = [];
      if (isImported(source, CMS_SELECTORS, SPARTACUS_CORE)) {
        const getComponentStateComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          GET_COMPONENT_STATE_OLD_API,
          `${buildMethodComment(
            GET_COMPONENT_STATE_OLD_API,
            GET_COMPONENTS_STATE_NEW_API
          )}\n`
        );
        const getComponentEntitiesComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          GET_COMPONENT_ENTITIES_OLD_API,
          `${GET_COMPONENT_ENTITIES_COMMENT}\n`
        );
        const componentStateSelectorFactoryComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
          `${buildMethodComment(
            COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
            COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API
          )}\n`
        );
        const componentSelectorFactoryComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          COMPONENT_SELECTOR_FACTORY_OLD_API,
          `${buildMethodComment(
            COMPONENT_SELECTOR_FACTORY_OLD_API,
            COMPONENTS_SELECTOR_FACTORY_NEW_API
          )}\n`
        );
        selectorCommentChanges = [
          ...getComponentStateComments,
          ...getComponentEntitiesComments,
          ...componentStateSelectorFactoryComments,
          ...componentSelectorFactoryComments,
        ];
        if (selectorCommentChanges.length) {
          cmsComponentSelectorsChangesMade = true;
        }
      }

      let actionCommentChanges: Change[] = [];
      if (isImported(source, CMS_ACTIONS, SPARTACUS_CORE)) {
        const loadCmsActionComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          LOAD_CMS_COMPONENT_CLASS,
          `${buildActionComment(LOAD_CMS_COMPONENT_CLASS)}\n`
        );
        const loadCmsActionFailComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          LOAD_CMS_COMPONENT_FAIL_CLASS,
          `${buildActionComment(LOAD_CMS_COMPONENT_FAIL_CLASS)}\n`
        );
        const loadCmsActionSuccessComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          LOAD_CMS_COMPONENT_SUCCESS_CLASS,
          `${buildActionComment(LOAD_CMS_COMPONENT_SUCCESS_CLASS)}\n`
        );
        const cmsGetComponentFromPageComments = insertCommentAboveIdentifier(
          sourcePath,
          source,
          CMS_GET_COMPONENT_FROM_PAGE,
          `${buildActionComment(CMS_GET_COMPONENT_FROM_PAGE)}\n`
        );

        actionCommentChanges = [
          ...loadCmsActionComments,
          ...loadCmsActionFailComments,
          ...loadCmsActionSuccessComments,
          ...cmsGetComponentFromPageComments,
        ];
        if (actionCommentChanges.length) {
          cmsActionsChangesMade = true;
        }
      }

      // Renaming the constant
      let renameCmsGetComponentFromPageConstantChanges: Change[] = [];
      if (isImported(source, CMS_ACTIONS, SPARTACUS_CORE)) {
        const constantChanges = renameCmsGetComponentFromPageConstant(
          sourcePath,
          source
        );
        renameCmsGetComponentFromPageConstantChanges = constantChanges;
        if (renameCmsGetComponentFromPageConstantChanges.length) {
          renamedCmsGetComponentFromPageActionChangesMade = true;
        }
      }

      const allChanges: Change[] = [
        ...selectorCommentChanges,
        ...renameCmsGetComponentFromPageConstantChanges,
        ...actionCommentChanges,
      ];
      if (allChanges.length) {
        commitChanges(tree, sourcePath, allChanges, InsertDirection.RIGHT);
      }
    }

    if (cmsComponentSelectorsChangesMade) {
      context.logger.info('Added comments for CMS component selectors');
    }
    if (cmsActionsChangesMade) {
      context.logger.info('Added comments for CMS actions');
    }
    if (renamedCmsGetComponentFromPageActionChangesMade) {
      context.logger.info(
        `Renamed action constant from 'CMS_GET_COMPONENET_FROM_PAGE' to 'CMS_GET_COMPONENT_FROM_PAGE'`
      );
    }
    return tree;
  };
}

function renameCmsGetComponentFromPageConstant(
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

export function buildMethodComment(
  oldApiMethod: string,
  newApiMethod: string
): string {
  return `// ${TODO_SPARTACUS} '${oldApiMethod}' has been removed. Please try '${newApiMethod}' instead.`;
}

export function buildActionComment(actionName: string): string {
  return `// ${TODO_SPARTACUS} please convert all the parameters to the 'payload' object's properties for '${actionName}' action`;
}
