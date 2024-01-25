/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@schematics/angular/utility/ast-utils';
import { ReplaceChange } from '@schematics/angular/utility/change';
import { UTF_8 } from '../../../shared/constants';
import {
  buildSpartacusComment,
  commitChanges,
  ComponentData,
  getAllTsSourceFiles,
  getHtmlFiles,
  getTsSourceFile,
  insertCommentAboveIdentifier,
  insertComponentSelectorComment,
  InsertDirection,
  insertHtmlComment,
  isInheriting,
} from '../../../shared/utils/file-utils';
import { getTemplateInfo } from '../../../shared/utils/module-file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';

export function migrateComponentMigration(
  tree: Tree,
  context: SchematicContext,
  componentData: ComponentData[],
  angularCompiler: typeof import('@angular/compiler')
): Tree {
  context.logger.info('Checking component selectors...');

  const project = getSourceRoot(tree, {});
  const sourceFiles = getAllTsSourceFiles(tree, project);
  for (const originalSource of sourceFiles) {
    const nodes = getSourceNodes(originalSource);
    const sourcePath = originalSource.fileName;

    for (const deprecatedComponent of componentData) {
      // check for usages of inputs / outputs of the deprecated component
      const sourceRoot = getSourceRoot(tree);
      const allHtmlFiles = getHtmlFiles(tree, '.html', sourceRoot);
      for (const htmlFile of allHtmlFiles) {
        overwriteRemovedProperties(
          tree,
          context,
          htmlFile,
          deprecatedComponent
        );
      }

      // check for usages of the deprecated component properties in the .ts and the corresponding template (.html) files
      if (isInheriting(nodes, deprecatedComponent.componentClassName)) {
        overwriteInheritedRemovedProperties(
          tree,
          context,
          angularCompiler,
          sourcePath,
          sourceRoot,
          deprecatedComponent
        );
      }
    }
  }

  return tree;
}

function overwriteRemovedProperties(
  tree: Tree,
  context: SchematicContext,
  htmlFile: string,
  deprecatedComponent: ComponentData
) {
  for (const removedProperty of deprecatedComponent.removedInputOutputProperties ||
    []) {
    const buffer = tree.read(htmlFile);
    if (!buffer) {
      context.logger.warn(`Could not read file (${htmlFile}).`);
      continue;
    }
    const content = buffer.toString(UTF_8);

    const contentChange = insertComponentSelectorComment(
      content,
      deprecatedComponent.selector,
      removedProperty
    );

    overwriteChanges(tree, htmlFile, contentChange);
  }
}

function overwriteInheritedRemovedProperties(
  tree: Tree,
  context: SchematicContext,
  angularCompiler: typeof import('@angular/compiler'),
  sourcePath: string,
  sourceRoot: string | undefined,
  deprecatedComponent: ComponentData
) {
  for (const removedProperty of deprecatedComponent.removedProperties || []) {
    // 'source' has to be reloaded after each committed change
    const source = getTsSourceFile(tree, sourcePath);
    const changes = insertCommentAboveIdentifier(
      sourcePath,
      source,
      removedProperty.name,
      buildSpartacusComment(removedProperty.comment)
    );

    const templateInfo = getTemplateInfo(source);
    if (!templateInfo) {
      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
      continue;
    }

    const htmlFileName = templateInfo.templateUrl;
    if (htmlFileName) {
      const htmlFilePath = getHtmlFiles(tree, htmlFileName, sourceRoot)[0];
      const buffer = tree.read(htmlFilePath);
      if (!buffer) {
        context.logger.warn(`Could not read file (${htmlFilePath}).`);
        commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
        continue;
      }
      const content = buffer.toString(UTF_8);

      const contentChange = insertHtmlComment(
        content,
        removedProperty,
        angularCompiler
      );
      overwriteChanges(tree, htmlFilePath, contentChange);
    } else if (templateInfo.inlineTemplateContent) {
      const oldContent = templateInfo.inlineTemplateContent;
      const contentChange = insertHtmlComment(
        oldContent,
        removedProperty,
        angularCompiler
      );
      if (contentChange) {
        const replaceChange = new ReplaceChange(
          sourcePath,
          templateInfo.inlineTemplateStart || 0,
          oldContent,
          contentChange
        );
        changes.push(replaceChange);
      }
    }
    commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
  }
}

function overwriteChanges(
  tree: Tree,
  htmlFile: string,
  contentChange: string | Buffer | undefined
) {
  if (contentChange) {
    tree.overwrite(htmlFile, contentChange);
  }
}
