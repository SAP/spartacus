import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { BASE_SITE_SERVICE_MIGRATION } from './data/base-site.service.migration';
import { BREAKPOINT_SERVICE_MIGRATION } from './data/breakpoint.service.migration';
import { CART_NOT_EMPTY_GUARD_MIGRATION } from './data/cart-not-empty.guard.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_GROUP_ACTIONS_MIGRATION } from './data/checkout-group.actions.migration';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';
import { ITEM_COUNTER_COMPONENT_MIGRATION } from './data/item-counter.component.migration';
import { LOGOUT_GUARD_MIGRATION } from './data/logout.guard.migration';
import { NOT_CHECKOUT_AUTH_GUARD_MIGRATION } from './data/not-checkout-auth.guard.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { PRODUCT_CAROUSEL_SERVICE_MIGRATION } from './data/product-carousel.service.migration';
import { PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION } from './data/product-list-component.service.migration';
import { PRODUCT_REFERENCE_SERVICE_MIGRATION } from './data/product-reference.service.migration';
import { STORE_FINDER_ACTIONS_MIGRATION } from './data/store-finder-group.actions.migration';
import { STOREFRONT_COMPONENT_MIGRATION } from './data/storefront-component.migration';
import { UPDATE_EMAIL_COMPONENT_MIGRATION } from './data/update-email.component.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION,
  ...CHECKOUT_GROUP_ACTIONS_MIGRATION,
  ...CHECKOUT_CONFIG_SERVICE_MIGRATION,
  ...CHECKOUT_AUTH_GUARD_MIGRATION,
  ...CMS_COMPONENTS_SERVICE_MIGRATION,
  ...BREAKPOINT_SERVICE_MIGRATION,
  ...LOGIN_FORM_COMPONENT_MIGRATION,
  ...ITEM_COUNTER_COMPONENT_MIGRATION,
  ...STORE_FINDER_ACTIONS_MIGRATION,
  ...UPDATE_EMAIL_COMPONENT_MIGRATION,
  ...BASE_SITE_SERVICE_MIGRATION,
  ...CART_NOT_EMPTY_GUARD_MIGRATION,
  ...NOT_CHECKOUT_AUTH_GUARD_MIGRATION,
  ...PRODUCT_CAROUSEL_SERVICE_MIGRATION,
  ...PRODUCT_REFERENCE_SERVICE_MIGRATION,
  ...STOREFRONT_COMPONENT_MIGRATION,
  ...LOGOUT_GUARD_MIGRATION,
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
