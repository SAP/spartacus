import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import { TODO_SPARTACUS } from '../../shared/constants';
import { commitChanges, getAllTsSourceFiles, getTsSourceFile, insertCommentAboveIdentifier, InsertDirection } from '../../shared/utils/file-utils';
import { getSourceRoot } from '../../shared/utils/workspace-utils';
import { REMOVED_PUBLIC_API_DATA } from './removed-public-api-data';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking removed public api...');

    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const originalSource of sourceFiles) {
      const sourcePath = originalSource.fileName;

      for (const removedNode of REMOVED_PUBLIC_API_DATA) {
        if (
          !isImported(originalSource, removedNode.node, removedNode.importPath)
        ) {
          continue;
        }
        // 'source' has to be reloaded after each committed change
        const source = getTsSourceFile(tree, sourcePath);

        const changes = insertCommentAboveIdentifier(
          sourcePath,
          source,
          removedNode.node,
          buildComment(removedNode.comment ?? `'${removedNode.node}' is no longer part of the public API. Please look into migration guide for more information`)
        );
        if (changes.length) {
          commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
        }
      }
    }

    return tree;
  };
}

export function buildComment(
  content: string,
): string {
  return `// ${TODO_SPARTACUS} ${content}\n`;
}
