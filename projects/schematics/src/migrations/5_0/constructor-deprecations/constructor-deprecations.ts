import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION } from './data/configurator-add-to-cart-button.component.migration';
import { CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION } from './data/configurator-cart-entry-bundle-info.component.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { QUICK_ORDER_SERVICE_MIGRATION } from './data/quick-order.service.migration';
import { QUICK_ORDER_FORM_COMPONENT_MIGRATION } from './data/quick-order-form.component.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION,
  CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION,
  QUICK_ORDER_SERVICE_MIGRATION,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
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
