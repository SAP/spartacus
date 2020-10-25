import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  commitChanges,
  getAllTsSourceFiles,
  insertCommentAboveConfigProperty,
  InsertDirection,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';
import { CONFIG_DEPRECATION_DATA } from './config-deprecation-data';

export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const project = getSourceRoot(tree);
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const source of sourceFiles) {
      const sourcePath = source.fileName;

      for (const configDeprecation of CONFIG_DEPRECATION_DATA) {
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
  };
}
