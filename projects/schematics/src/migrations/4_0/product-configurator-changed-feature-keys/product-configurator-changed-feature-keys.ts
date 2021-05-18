import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { isImported } from '@schematics/angular/utility/ast-utils';
import {
  commitChanges,
  getAllTsSourceFiles,
  getTsSourceFile,
  insertCommentAboveIdentifier,
  InsertDirection,
  MethodPropertyDeprecation,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';
export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const originalSource of sourceFiles) {
      const sourcePath = originalSource.fileName;

      for (const data of methodProperties) {
        // 'source' has to be reloaded after each committed change
        const source = getTsSourceFile(tree, sourcePath);
        if (isImported(source, data.class, data.importPath)) {
          const changes = insertCommentAboveIdentifier(
            sourcePath,
            source,
            data.deprecatedNode,
            data.comment
              ? `${data.comment}\n`
              : `${buildMethodComment(data.deprecatedNode, data.newNode)}\n`
          );
          commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
        }
      }
    }

    return tree;
  };
}
