import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

// TODO:#6027 - add type safety to options
export function updateCmsComponentsState(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Updating CMS components state schematic');

    return tree;
  };
}
