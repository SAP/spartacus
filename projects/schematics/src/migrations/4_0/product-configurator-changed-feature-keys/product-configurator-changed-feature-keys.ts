import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_OBSOLETE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE,
} from '../../../shared/constants';
import {
  getDefaultProjectNameFromWorkspace,
  TODO_SPARTACUS,
} from '../../../shared/index';
import {
  commitChanges,
  getTsSourceFile,
  insertCommentAboveConfigProperty,
  InsertDirection,
} from '../../../shared/utils/file-utils';
import { getAngularJsonFile } from '../../../shared/utils/workspace-utils';

const COMMENT_TEXTFIELD = `// ${TODO_SPARTACUS} feature key ${PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE} has been replaced with ${PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE}\n`;
const COMMENT_RULEBASED = `// ${TODO_SPARTACUS} feature key ${PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_OBSOLETE} has been replaced with ${PRODUCT_CONFIGURATOR_RULEBASED_FEATURE}\n`;

export function migrate(): Rule {
  return (tree: Tree) => {
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const angularJson = getAngularJsonFile(tree);
    const mainPath = (angularJson.projects[projectName]?.architect?.build
      ?.options as any)?.main;
    if (!mainPath) {
      throw new SchematicsException(`No main path specified in angular.json.`);
    }
    addCommentToFeatureKey(
      tree,
      mainPath,
      PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_OBSOLETE,
      COMMENT_RULEBASED
    );
    addCommentToFeatureKey(
      tree,
      mainPath,
      PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE,
      COMMENT_TEXTFIELD
    );
  };

  function addCommentToFeatureKey(
    tree: Tree,
    mainPath: any,
    obsoleteKey: string,
    comment: string
  ) {
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleSource = getTsSourceFile(tree, appModulePath);
    const changes = insertCommentAboveConfigProperty(
      appModulePath,
      appModuleSource,
      obsoleteKey,
      comment
    );
    commitChanges(tree, appModulePath, changes, InsertDirection.RIGHT);
  }
}
