import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as DevSpartacusOptions } from '../ng-add/schema';

export default function (options: DevSpartacusOptions) {
  return (_tree: Tree, context: SchematicContext) => {
    context.logger.info('add routing to project: ' + options.project);
  };
}
