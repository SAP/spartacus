import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as MyAccountOptions } from './schema';

export function addSpartacus(_options: MyAccountOptions): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    console.log('running add my account lib schematics...');
  };
}
