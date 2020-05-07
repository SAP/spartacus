import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../ng-add/schema';

export default function (options: SpartacusOptions) {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('add routing to project: ' + options.project);
  };
}
