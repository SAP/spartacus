import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION } from './data/configurator-add-to-cart-button.component.migration';
import { CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION } from './data/configurator-cart-entry-bundle-info.component.migration';
import { QUICK_ORDER_FORM_COMPONENT_MIGRATION } from './data/quick-order-form.component.migration';
import { AUTH_SERVICE_MIGRATION } from './data/auth.service.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION,
  CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  AUTH_SERVICE_MIGRATION,
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
