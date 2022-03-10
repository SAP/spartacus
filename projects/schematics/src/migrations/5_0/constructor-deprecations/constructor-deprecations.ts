import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CART_TOTALS_COMPONENT_MIGRATION } from './data/cart-totals.component.migration';
import { GLOBAL_MIGRATION } from './data/global.migration';
import { QUICK_ORDER_FORM_COMPONENT_MIGRATION } from './data/quick-order-form.component.migration';
import { QUICK_ORDER_SERVICE_MIGRATION } from './data/quick-order.service.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  CART_TOTALS_COMPONENT_MIGRATION,
  QUICK_ORDER_SERVICE_MIGRATION,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  ...GLOBAL_MIGRATION,
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
