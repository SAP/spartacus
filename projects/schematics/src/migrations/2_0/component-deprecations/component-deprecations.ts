import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getSourceNodes } from '@angular/cdk/schematics';
import { UTF_8 } from '../../../shared/constants';
import {
  buildSpartacusComment,
  commitChanges,
  getAllHtmlFiles,
  getAllTsSourceFiles,
  insertCommentAboveIdentifier,
  InsertDirection,
  insertHtmlComment,
  isInheriting,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';
import { COMPONENT_DEPRECATION_DATA } from './component-deprecations-data';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking component selectors...');

    const sourceRoot = getSourceRoot(tree);
    const allHtmlFilePaths = getAllHtmlFiles(tree, sourceRoot);
    for (const htmlFilePath of allHtmlFilePaths) {
      for (const deprecatedComponent of COMPONENT_DEPRECATION_DATA) {
        for (const removedProperty of deprecatedComponent.removedProperties) {
          const buffer = tree.read(htmlFilePath);
          if (!buffer) {
            context.logger.warn(`Could not read file (${htmlFilePath}).`);
            continue;
          }
          const content = buffer.toString(UTF_8);
          const change = insertHtmlComment(
            content,
            deprecatedComponent.selector,
            removedProperty
          );
          if (change) {
            tree.overwrite(htmlFilePath, change);
          }
        }
      }
    }

    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const originalSource of sourceFiles) {
      const sourcePath = originalSource.fileName;
      const nodes = getSourceNodes(originalSource);

      for (const deprecatedComponent of COMPONENT_DEPRECATION_DATA) {
        if (isInheriting(nodes, deprecatedComponent.componentClassName)) {
          for (const removedProperty of deprecatedComponent.removedProperties ||
            []) {
            const changes = insertCommentAboveIdentifier(
              sourcePath,
              originalSource,
              removedProperty.name,
              buildSpartacusComment(removedProperty.comment)
            );
            if (changes.length) {
              commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
            }
          }
        }
      }
    }

    return tree;
  };
}
