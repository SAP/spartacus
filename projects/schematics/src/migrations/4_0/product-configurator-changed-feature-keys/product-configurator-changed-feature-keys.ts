import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import ts from 'typescript';
import {
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_OBSOLETE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE,
} from '../../../shared/constants';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/index';
import {
  commitChanges,
  getTsSourceFile,
  insertCommentAboveIdentifier,
  InsertDirection,
  MethodPropertyDeprecation,
} from '../../../shared/utils/file-utils';
import { getAngularJsonFile } from '../../../shared/utils/workspace-utils';
export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [];

export function migrate(): Rule {
  return (tree: Tree) => {
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const angularJson = getAngularJsonFile(tree);
    const mainPath = (angularJson.projects[projectName]?.architect?.build
      ?.options as any)?.main;
    if (!mainPath) {
      throw new SchematicsException(`No main path specified in angular.json.`);
    }
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleSource = getTsSourceFile(tree, appModulePath);
    checkAndApplyChanges(
      appModuleSource,
      appModulePath,
      tree,
      PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE,
      'comment for textfield'
    );
    checkAndApplyChanges(
      appModuleSource,
      appModulePath,
      tree,
      PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_OBSOLETE,
      'comment for rulebased'
    );
  };

  function checkAndApplyChanges(
    appModuleSource: ts.SourceFile,
    appModulePath: string,
    tree: Tree,
    featureKey: string,
    comment: string
  ) {
    if (
      containsDeprecatedCode(
        appModuleSource,
        PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_OBSOLETE
      )
    ) {
      const changes = insertCommentAboveIdentifier(
        appModulePath,
        appModuleSource,
        featureKey,
        comment
      );
      commitChanges(tree, appModulePath, changes, InsertDirection.RIGHT);
    }
  }
  function containsDeprecatedCode(
    appModuleSource: ts.SourceFile,
    identifier: string
  ): boolean {
    console.log('CHHI ' + appModuleSource + identifier);
    return true;
  }
}
