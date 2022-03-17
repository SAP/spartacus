import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CONSTRUCTOR_DEPRECATIONS_DATA } from './data/constructor-deprecations.migration';
import { FORM_ERRORS_COMPONENT_MIGRATION } from './data/form-errors.component.migration';
import { TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION } from './data/tab-paragraph-container.component.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(tree, context, [
      ...CONSTRUCTOR_DEPRECATIONS_DATA,
      FORM_ERRORS_COMPONENT_MIGRATION,
      TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
    ]);
  };
}
