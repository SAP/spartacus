import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as SpartacusWrapperOptions } from './schema';

export function generateWrapperModule(options: SpartacusWrapperOptions): Rule {
  console.log(1, options);
  return (_host: Tree, _context: SchematicContext) => {
    console.log(2);
  };
}
