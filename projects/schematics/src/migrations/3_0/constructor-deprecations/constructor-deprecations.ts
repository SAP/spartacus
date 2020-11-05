import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION } from './data/order-confirmation-overview.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { ORDER_HISTORY_COMPONENT_MIGRATION } from './data/order-history-component.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { USER_ORDER_EFFECT_MIGRATION } from './data/user-order.effect.migration';
import { USER_ORDER_SERVICE_MIGRATION } from './data/user-order.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  ROUTING_SERVICE_MIGRATION,
  ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION,
  ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
  ORDER_HISTORY_COMPONENT_MIGRATION,
  USER_ORDER_SERVICE_MIGRATION,
  USER_ORDER_EFFECT_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConstructorDeprecation(
      tree,
      context,
      CONSTRUCTOR_DEPRECATION_DATA
    );
  };
}
