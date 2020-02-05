import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectTsConfigPaths } from '@angular/core/schematics/utils/project_tsconfig_paths';
import { Change } from '@schematics/angular/utility/change';
import { relative } from 'path';
import * as ts from 'typescript';
import {
  COMPONENTS_SELECTOR_FACTORY_NEW_API,
  COMPONENTS_STATE_SELECTOR_FACTORY_NEW_API,
  COMPONENT_SELECTOR_FACTORY_OLD_API,
  COMPONENT_STATE_SELECTOR_FACTORY_OLD_API,
  GET_COMPONENTS_STATE_NEW_API,
  GET_COMPONENT_ENTITIES_COMMENT,
  GET_COMPONENT_ENTITIES_OLD_API,
  GET_COMPONENT_STATE_OLD_API,
  TODO_SPARTACUS,
} from '../../shared/constants';
import {
  commitChanges,
  getAllTsSourceFiles,
  insertCommentAboveMethodCall,
  InsertDirection,
  renameIdentifierNode,
} from '../../shared/utils/file-utils';

export function updateCmsComponentState(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    let cmsComponentSelectorsChangesMade = false;
    let renamedCmsGetComponentFromPageActionChangesMade = false;

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree);
    for (const tsconfigPath of buildPaths) {
      const sourceFiles = getAllTsSourceFiles(tsconfigPath, tree, basePath);
      for (const source of sourceFiles) {
        const sourcePath = relative(basePath, source.fileName);

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
  return `// ${TODO_SPARTACUS} '${oldApiMethod}' has been removed. Please try '${newApiMethod}' instead.`;
}
