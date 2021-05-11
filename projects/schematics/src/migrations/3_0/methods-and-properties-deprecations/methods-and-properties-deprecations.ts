import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { ANONYMOUS_CONSENT_TEMPLATES_ADAPTER_MIGRATION } from './data/anonymous-consent-templates.adapter.migration';
import { ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION } from './data/anonymous-consent-templates.connector.migration';
import { ASM_AUTH_SERVICE_MIGRATION } from './data/asm-auth.service.migration';
import { ASM_ACTIONS_MIGRATION } from './data/asm-group.actions.migration';
import { ASM_SELECTORS_MIGRATION } from './data/asm-group.selectors.migration';
import { AUTH_ACTIONS_MIGRATION } from './data/auth-group.actions.migration';
import { AUTH_GUARD_MIGRATION } from './data/auth.guard.migration';
import { AUTH_SERVICE_MIGRATION } from './data/auth.service.migration';
import { BASE_SITE_SERVICE_MIGRATION } from './data/base-site.service.migration';
import { BREAKPOINT_SERVICE_MIGRATION } from './data/breakpoint.service.migration';
import { CART_NOT_EMPTY_GUARD_MIGRATION } from './data/cart-not-empty.guard.migration';
import { CDC_AUTH_SERVICE_MIGRATION } from './data/cdc-auth.service.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_GROUP_ACTIONS_MIGRATION } from './data/checkout-group.actions.migration';
import { CHECKOUT_ADAPTER_MIGRATION } from './data/checkout.adapter.migration';
import { CHECKOUT_CONNECTOR_MIGRATION } from './data/checkout.connector.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';
import { CURRENCY_SERVICE_MIGRATION } from './data/currency.service.migration';
import { FEATURE_MODULES_SERVICE_MIGRATION } from './data/feature-modules.service.migration';
import { ITEM_COUNTER_COMPONENT_MIGRATION } from './data/item-counter.component.migration';
import { LANGUAGE_SERVICE_MIGRATION } from './data/language.service.migration';
import { LOGIN_FORM_COMPONENT_MIGRATION } from './data/login-form.component.migration';
import { LOGOUT_GUARD_MIGRATION } from './data/logout.guard.migration';
import { MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION } from './data/multi-cart-state-persistence.service.migration';
import { NOT_AUTH_GUARD_MIGRATION } from './data/not-auth.guard.migration';
import { NOT_CHECKOUT_AUTH_GUARD_MIGRATION } from './data/not-checkout-auth.guard.migration';
import { OCC_CHECKOUT_ADAPTER_MIGRATION } from './data/occ-checkout.adapter.migration';
import { OCC_CMS_COMPONENT_ADAPTER_MIGRATION } from './data/occ-cms-component.adapter.migration';
import { ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION } from './data/order-confirmation-overview.component.migration';
import { ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION } from './data/order-detail-shipping.component.migration';
import { PAGE_META_SERVICE_MIGRATION } from './data/page-meta.service.migration';
import { PRODUCT_CAROUSEL_SERVICE_MIGRATION } from './data/product-carousel.service.migration';
import { PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION } from './data/product-list-component.service.migration';
import { PRODUCT_REFERENCE_SERVICE_MIGRATION } from './data/product-reference.service.migration';
import { PROTECTED_ROUTES_GUARD_MIGRATION } from './data/protected-routes.guard.migration';
import { STAR_RATING_COMPONENT_MIGRATION } from './data/star-rating-component.migration';
import { STORE_FINDER_ACTIONS_MIGRATION } from './data/store-finder-group.actions.migration';
import { STOREFRONT_COMPONENT_MIGRATION } from './data/storefront-component.migration';
import { UPDATE_EMAIL_COMPONENT_MIGRATION } from './data/update-email.component.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CHECKOUT_CONNECTOR_MIGRATION,
  ...CHECKOUT_ADAPTER_MIGRATION,
  ...CHECKOUT_SERVICE_MIGRATION,
  ...CMS_COMPONENTS_SERVICE_MIGRATION,
  ...OCC_CHECKOUT_ADAPTER_MIGRATION,
  ...PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION,
  ...CHECKOUT_GROUP_ACTIONS_MIGRATION,
  ...CHECKOUT_CONFIG_SERVICE_MIGRATION,
  ...CHECKOUT_AUTH_GUARD_MIGRATION,
  ...PROTECTED_ROUTES_GUARD_MIGRATION,
  ...BREAKPOINT_SERVICE_MIGRATION,
  ...LOGIN_FORM_COMPONENT_MIGRATION,
  ...ITEM_COUNTER_COMPONENT_MIGRATION,
  ...STORE_FINDER_ACTIONS_MIGRATION,
  ...UPDATE_EMAIL_COMPONENT_MIGRATION,
  ...BASE_SITE_SERVICE_MIGRATION,
  ...CART_NOT_EMPTY_GUARD_MIGRATION,
  ...NOT_CHECKOUT_AUTH_GUARD_MIGRATION,
  ...LOGOUT_GUARD_MIGRATION,
  ...ORDER_CONFIRMATION_OVERVIEW_COMPONENT_MIGRATION,
  ...ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION,
  ...PRODUCT_CAROUSEL_SERVICE_MIGRATION,
  ...PRODUCT_REFERENCE_SERVICE_MIGRATION,
  ...STOREFRONT_COMPONENT_MIGRATION,
  ...MULTI_CART_STATE_PERSISTENCE_SERVICE_MIGRATION,
  ...AUTH_ACTIONS_MIGRATION,
  ...NOT_AUTH_GUARD_MIGRATION,
  ...AUTH_GUARD_MIGRATION,
  ...AUTH_SERVICE_MIGRATION,
  ...ASM_SELECTORS_MIGRATION,
  ...ASM_ACTIONS_MIGRATION,
  ...ASM_AUTH_SERVICE_MIGRATION,
  ...CDC_AUTH_SERVICE_MIGRATION,
  ...LANGUAGE_SERVICE_MIGRATION,
  ...CURRENCY_SERVICE_MIGRATION,
  ...STAR_RATING_COMPONENT_MIGRATION,
  ...FEATURE_MODULES_SERVICE_MIGRATION,
  ...ANONYMOUS_CONSENT_TEMPLATES_ADAPTER_MIGRATION,
  ...ANONYMOUS_CONSENT_TEMPLATES_CONNECTOR_MIGRATION,
  ...OCC_CMS_COMPONENT_ADAPTER_MIGRATION,
  ...PAGE_META_SERVICE_MIGRATION,
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
