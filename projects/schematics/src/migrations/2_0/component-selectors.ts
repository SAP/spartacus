import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { UTF_8 } from '../../shared/constants';
import {
  getAllHtmlFiles,
  insertHtmlComment,
} from '../../shared/utils/file-utils';
import { getAngularJsonFile } from '../../shared/utils/workspace-utils';
import { COMPONENT_SELECTOR_DEPRECATION_DATA } from './component-selectors-data';

// TODO:#6587 - test
export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Checking component selectors...');
    const angularJson = getAngularJsonFile(tree);
    const allHtmlFilePaths = getAllHtmlFiles(tree, angularJson.sourceRoot);
    for (const htmlFilePath of allHtmlFilePaths) {
      const buffer = tree.read(htmlFilePath);
      if (!buffer) {
        context.logger.warn(`Could not read file (${htmlFilePath}).`);
        continue;
      }
      const content = buffer.toString(UTF_8);

      for (const deprecatedSelector of COMPONENT_SELECTOR_DEPRECATION_DATA) {
        const change = insertHtmlComment(content, deprecatedSelector);
        if (change) {
          tree.overwrite(htmlFilePath, change);
        }
      }
    }

    return tree;
  };
}
