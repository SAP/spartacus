import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { FORM_ERRORS_COMPONENT_MIGRATION } from './data/form-errors.component.migration';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';
import { QUICK_ORDER_FORM_COMPONENT_MIGRATION } from './data/quick-order-form.component.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION } from './data/tab-paragraph-container.component.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  ...GENERATED_CONSTRUCTOR_MIGRATIONS,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  FORM_ERRORS_COMPONENT_MIGRATION,
  TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
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
