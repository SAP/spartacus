import { SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  commitChanges,
  ConfigDeprecation,
  getAllTsSourceFiles,
  insertCommentAboveConfigProperty,
  InsertDirection,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';

export function migrateConfigDeprecation(
  tree: Tree,
  _context: SchematicContext,
  configDeprecations: ConfigDeprecation[]
): Tree {
  const project = getSourceRoot(tree);
  const sourceFiles = getAllTsSourceFiles(tree, project);
  for (const source of sourceFiles) {
    const sourcePath = source.fileName;

    for (const configDeprecation of configDeprecations) {
      const changes = insertCommentAboveConfigProperty(
        sourcePath,
        source,
        configDeprecation.propertyName,
        configDeprecation.comment
      );
      commitChanges(tree, sourcePath, changes, InsertDirection.RIGHT);
    }
  }

  return tree;
}
