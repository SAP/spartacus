import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION } from './data/added-to-cart-dialog-component.migration';
import { BASE_SITE_SERVICE_MIGRATION } from './data/base-site.service.migration';
import { CART_DETAILS_COMPONENT_MIGRATION } from './data/cart-details-component.migration';
import { CART_ITEM_COMPONENT_MIGRATION } from './data/cart-item-component.migration';
import { CART_ITEM_CONTEXT_SOURCE_MIGRATION } from './data/cart-item-context-source.migration';
import { CART_ITEM_CONTEXT_MIGRATION } from './data/cart-item-context.migration';
import { CONFIG_INITIALIZER_SERVICE_MIGRATION } from './data/config-initializer.service.migration';
import { CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION } from './data/configurator-attribute-drop-down.component.migration';
import { CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION } from './data/configurator-attribute-numeric-input-field.component.migration';
import { CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION } from './data/configurator-attribute-radio-button.component.migration';
import { CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION } from './data/configurator-group-menu.component.migration';
import { CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION } from './data/configurator-product-title.component.migration';
import {
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
} from './data/content-page-meta.resolver.migration';
import { CURRENCY_SERVICE_MIGRATION } from './data/currency.service.migration';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { EXPRESS_CHECKOUT_SERVICE_MIGRATION } from './data/express-checkout.service.migration';
import { LANGUAGE_SERVICE_MIGRATION } from './data/language.service.migration';
import { OCC_ENDPOINTS_MODEL_MIGRATION } from './data/occ-endpoint.model.migration';
import { OCC_ENDPOINTS_SERVICE_MIGRATION } from './data/occ-endpoints.service.migration';
import { ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION } from './data/order-detail-items.component.migration';
import { ORDER_OVERVIEW_COMPONENT_MIGRATION } from './data/order-overview.component.migration';
import { PAGE_EVENT_MIGRATION } from './data/page-event.builder.ts.migration';
import { POPOVER_COMPONENT_MIGRATION } from './data/popover-component.migration';
import { POPOVER_DIRECTIVE_MIGRATION } from './data/popover-directive.migration';
import { PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION } from './data/product-list-component.service.migration';
import { PRODUCT_SERVICE_MIGRATION } from './data/product.service.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';
import { SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION } from './data/saved-cart-details-action.component.migration';
import { SAVED_CART_LIST_COMPONENT_MIGRATION } from './data/saved-cart-list.component.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';
import { UNIT_FORM_COMPONENT_MIGRATION } from './data/unit-form.component.migration';
import { USER_ID_SERVICE_MIGRATION } from './data/user-id.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...LANGUAGE_SERVICE_MIGRATION,
  ...CURRENCY_SERVICE_MIGRATION,
  ...BASE_SITE_SERVICE_MIGRATION,
  ...OCC_ENDPOINTS_SERVICE_MIGRATION,
  ...CONTENT_PAGE_META_RESOLVER_MIGRATION,
  ...PAGE_META_SERVICE_MIGRATION,
  ...SELECTIVE_CART_SERVICE_MIGRATION,
  ...ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION,
  ...PAGE_EVENT_MIGRATION,
  ...CART_ITEM_CONTEXT_MIGRATION,
  ...CART_ITEM_CONTEXT_SOURCE_MIGRATION,
  ...DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
  ...CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION,
  ...CART_DETAILS_COMPONENT_MIGRATION,
  ...CART_ITEM_COMPONENT_MIGRATION,
  ...UNIT_FORM_COMPONENT_MIGRATION,
  ...ORDER_DETAIL_ITEMS_COMPONENT_MIGRATION,
  ...ROUTING_SERVICE_MIGRATION,
  ...CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
  ...OCC_ENDPOINTS_MODEL_MIGRATION,
  ...ORDER_OVERVIEW_COMPONENT_MIGRATION,
  ...PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION,
  ...SAVED_CART_DETAILS_ACTION_COMPONENT_MIGRATION,
  ...SAVED_CART_LIST_COMPONENT_MIGRATION,
  ...EXPRESS_CHECKOUT_SERVICE_MIGRATION,
  ...CONFIG_INITIALIZER_SERVICE_MIGRATION,
  ...PRODUCT_SERVICE_MIGRATION,
  ...USER_ID_SERVICE_MIGRATION,
  ...POPOVER_COMPONENT_MIGRATION,
  ...POPOVER_DIRECTIVE_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(
      tree,
      context,
      METHOD_PROPERTY_DATA
    );
  };
}
