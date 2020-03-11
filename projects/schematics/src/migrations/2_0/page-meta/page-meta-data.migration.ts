import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  buildSpartacusComment,
  commitChanges,
  getAllTsSourceFiles,
  getTsSourceFile,
  insertCommentAboveIdentifier,
} from '../../../shared/utils/file-utils';
import { getSourceRoot } from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking changed methods...');

    const project = getSourceRoot(tree, {});
    const sourceFiles = getAllTsSourceFiles(tree, project);
    for (const originalSource of sourceFiles) {
      const sourcePath = originalSource.fileName;
      const tsSource = getTsSourceFile(tree, sourcePath);
      const changes = insertCommentAboveIdentifier(
        sourcePath,
        tsSource,
        'resolverMethods',
        buildSpartacusComment(
          'Be aware that the resolver method for the PageMetaService is no longer public, but protected instead'
        )
      );

      commitChanges(tree, sourcePath, changes);
    }
    return tree;
  };
}

// export function buildComment(content: string): string {
//   return `// ${TODO_SPARTACUS} ${content}\n`;
// }
