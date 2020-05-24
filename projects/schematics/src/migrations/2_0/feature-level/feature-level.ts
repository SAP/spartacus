import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { findNodes } from '@angular/cdk/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import * as ts from 'typescript';
import {
  bumpFeatureLevel,
  commitChanges,
  findConfigProperty,
  getTsSourceFile,
} from '../../../shared/utils/file-utils';
import { getSpartacusCurrentFeatureLevel } from '../../../shared/utils/package-utils';
import { getDefaultProjectNameFromWorkspace } from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = getSpartacusCurrentFeatureLevel();
    const defaultProject = getDefaultProjectNameFromWorkspace(tree);
    const projectTargets = getProjectTargets(tree, defaultProject);
    if (!projectTargets.build) {
      context.logger.warn(`Project target "build" not found.`);
      context.logger.warn(
        `Please manually increment 'features.level' config property to ${spartacusVersion}.`
      );
      return tree;
    }

    const appModulePath = getAppModulePath(
      tree,
      projectTargets.build.options.main
    );
    const appModuleSource = getTsSourceFile(tree, appModulePath);

    const levelNode = findConfigProperty(appModuleSource, 'level')[0];
    const currentFeatureLevelNode = findNodes(
      levelNode,
      ts.SyntaxKind.StringLiteral
    )[0] as ts.StringLiteral;

    if (
      !currentFeatureLevelNode ||
      isNaN(Number(currentFeatureLevelNode.text))
    ) {
      context.logger.debug(
        `No 'features.level' config found, or the level is not a number`
      );
      return tree;
    }

    if (Number(spartacusVersion) > Number(currentFeatureLevelNode.text)) {
      context.logger.info(
        `Bumping the Spartacus feature level version to: ${spartacusVersion}`
      );
      const change = bumpFeatureLevel(
        appModulePath,
        currentFeatureLevelNode,
        spartacusVersion
      );
      commitChanges(tree, appModulePath, [change]);
    }

    return tree;
  };
}
