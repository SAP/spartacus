import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const CSS_DOCS_URL =
  'https://sap.github.io/cloud-commerce-spartacus-storefront-docs/deprecation-guide/css';

export function migrate(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.warn(
      `For a CSS migration guide, please visit this URL: ${CSS_DOCS_URL}`
    );
  };
}
