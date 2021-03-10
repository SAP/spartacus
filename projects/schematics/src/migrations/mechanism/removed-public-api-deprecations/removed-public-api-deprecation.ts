import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { TODO_SPARTACUS } from '../../../shared/constants';
import {
  commitChanges,
  DeprecatedNode,
  getAllTsSourceFiles,
  getTsSourceFile,
  insertCommentAboveImportIdentifier,
  InsertDirection,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';

export function removedPublicApiDeprecation(
  tree: Tree,
  context: SchematicContext,
  removedNodes: DeprecatedNode[]
): Tree {
  context.logger.info('Checking removed public api...');

  const project = getSourceRoot(tree, {});
  const sourceFiles = getAllTsSourceFiles(tree, project);
  for (const originalSource of sourceFiles) {
    const sourcePath = originalSource.fileName;

    for (const removedNode of removedNodes) {
      // 'source' has to be reloaded after each committed change
      const source = getTsSourceFile(tree, sourcePath);
      const changes = insertCommentAboveImportIdentifier(
        sourcePath,
        source,
        removedNode.node,
        removedNode.importPath,
        buildComment(
          removedNode.comment ??
            `'${removedNode.node}' is no longer part of the public API. Please look into migration guide for more information`
        )
      );
      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
    }
  }

  return tree;
}

function buildComment(content: string): string {
  return `// ${TODO_SPARTACUS} ${content}\n`;
}
