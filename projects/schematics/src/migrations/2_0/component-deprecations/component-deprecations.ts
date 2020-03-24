import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@angular/cdk/schematics';
import { ReplaceChange } from '@schematics/angular/utility/change';
import { UTF_8 } from '../../../shared/constants';
import {
  buildSpartacusComment,
  commitChanges,
  getAllTsSourceFiles,
  getHtmlFiles,
  getTsSourceFile,
  insertCommentAboveIdentifier,
  InsertDirection,
  insertHtmlComment,
  isInheriting,
} from '../../../shared/utils/file-utils';
import { getTemplateInfo } from '../../../shared/utils/module-file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';
import { COMPONENT_DEPRECATION_DATA } from './component-deprecations-data';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking component selectors...');

    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const originalSource of sourceFiles) {
      const sourcePath = originalSource.fileName;
      const nodes = getSourceNodes(originalSource);

      for (const deprecatedComponent of COMPONENT_DEPRECATION_DATA) {
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
              const sourceRoot = getSourceRoot(tree);
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

              const contentChange = insertHtmlComment(
                content,
                deprecatedComponent.selector,
                removedProperty
              );
              if (contentChange) {
                tree.overwrite(htmlFilePath, contentChange);
              }
            } else if (templateInfo.inlineTemplateContent) {
              const oldContent = templateInfo.inlineTemplateContent;
              const contentChange = insertHtmlComment(
                oldContent,
                deprecatedComponent.selector,
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
  };
}
