import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { KYMA_ENABLED, TODO_SPARTACUS } from '../../shared/constants';
import {
  commitChanges,
  getAllTsSourceFiles,
  insertCommentAboveIdentifier,
  InsertDirection,
} from '../../shared/utils/file-utils';
import { getSourceRoot } from '../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const project = getSourceRoot(tree);
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const source of sourceFiles) {
      const sourcePath = source.fileName;

      const changes = insertCommentAboveIdentifier(
        sourcePath,
        source,
        KYMA_ENABLED,
        `// ${TODO_SPARTACUS} '${KYMA_ENABLED}' has been removed. Just remove this property, as kyma is now enabled by just importing 'KymaModule'.\n`
      );
      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
    }

    return tree;
  };
}
