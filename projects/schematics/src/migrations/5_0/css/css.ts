import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { CSS_V5_DOCS_URL } from '../../../shared/constants';

export function migrate(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.warn(
      `For a CSS migration guide, please visit this URL: ${CSS_V5_DOCS_URL}`
    );
  };
}
