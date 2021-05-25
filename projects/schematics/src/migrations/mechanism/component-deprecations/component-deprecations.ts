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
  componentData: ComponentData[]
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
          if (contentChange) {
            tree.overwrite(htmlFile, contentChange);
          }
        }
      }

      // check for usages of the deprecated component properties in the .ts and the corresponding template (.html) files
      if (isInheriting(nodes, deprecatedComponent.componentClassName)) {
        for (const removedProperty of deprecatedComponent.removedProperties ||
          []) {
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
            const htmlFilePath = getHtmlFiles(
              tree,
              htmlFileName,
              sourceRoot
            )[0];
            const buffer = tree.read(htmlFilePath);
            if (!buffer) {
              context.logger.warn(`Could not read file (${htmlFilePath}).`);
              commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
              continue;
            }
            const content = buffer.toString(UTF_8);

            const contentChange = insertHtmlComment(content, removedProperty);
            if (contentChange) {
              tree.overwrite(htmlFilePath, contentChange);
            }
          } else if (templateInfo.inlineTemplateContent) {
            const oldContent = templateInfo.inlineTemplateContent;
            const contentChange = insertHtmlComment(
              oldContent,
              removedProperty
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
    }
  }

  return tree;
}
