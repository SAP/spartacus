import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Handling constructor deprecation for user-address');

    return tree;
  };
}
