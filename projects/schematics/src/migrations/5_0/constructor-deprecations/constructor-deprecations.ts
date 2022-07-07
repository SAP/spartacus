import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { FORM_ERRORS_COMPONENT_MIGRATION } from './data/form-errors.component.migration';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  ...GENERATED_CONSTRUCTOR_MIGRATIONS,
  FORM_ERRORS_COMPONENT_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATIONS_DATA
    );
  };
}
