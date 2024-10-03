/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { ADDRESS_BOOK_COMPONENT_MIGRATION } from './data/address-book.component.migration';
import { BANNER_COMPONENT_MIGRATION } from './data/banner.component.migration';
import { CART_TOTALS_COMPONENT_MIGRATION } from './data/cart-totals.component.migration';
import { CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION } from './data/cdc-logout.guard.migration';
import { COMPONENT_WRAPPER_DIRECTIVE_MIGRATION } from './data/component-wrapper.directive.migration';
import { CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION } from './data/configurator-add-to-cart-button.component.migration';
import { CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION } from './data/configurator-attribute-drop-down.component.migration';
import { CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION } from './data/configurator-attribute-header.component.migration';
import { CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION } from './data/configurator-attribute-numeric-input-field.component.migration';
import { CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION } from './data/configurator-attribute-product-card.component.migration';
import { CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION } from './data/configurator-attribute-radio-button.component.migration';
import { CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT_MIGRATION } from './data/configurator-attribute-single-selection-base.component.migration';
import { CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION } from './data/configurator-cart-entry-bundle-info.component.migration';
import { CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION } from './data/configurator-group-menu.component.migration';
import { CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION } from './data/configurator-overview-bundle-attribute.component.migration';
import { CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION } from './data/configurator-tab-bar.component.migration';
import { FORM_ERRORS_COMPONENT_MIGRATION } from './data/form-errors.component.migration';
import { GENERIC_LINK_COMPONENT_MIGRATION } from './data/generic-link.component.migration';
import { INNER_COMPONENTS_HOST_DIRECTIVE_MIGRATION } from './data/inner-components-host.directive.migration';
import { LOGIN_GUARD_CONSTRUCTOR_MIGRATION } from './data/login.guard.migration';
import { LOGOUT_GUARD_CONSTRUCTOR_MIGRATION } from './data/logout.guard.migration';
import { NAVIGATION_UI_COMPONENT_MIGRATION } from './data/navigation-ui.component.migration';
import { NOT_AUTH_GUARD_MIGRATION } from './data/not-auth.guard.migration';
import { PAGE_LAYOUT_SERVICE_MIGRATION } from './data/page-layout.service.migration';
import { PARAGRAPH_COMPONENT_MIGRATION } from './data/paragraph.component.migration';
import { QUICK_ORDER_FORM_COMPONENT_MIGRATION } from './data/quick-order-form.component.migration';
import { QUICK_ORDER_SERVICE_MIGRATION } from './data/quick-order.service.migration';
import { SHIPPING_ADDRESS_COMPONENT_MIGRATION } from './data/shipping-address.component.migration';
import { TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION } from './data/tab-paragraph-container.component.migration';
import { CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cds-merchandising-product.service.migration';
import { CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cds-merchandising-user-context.service.migration';
import { CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/consignment-tracking.component.migration';
import { SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/suggested-addresses-dialog.component-migration';
import { ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/address-form.component.migration';
import { ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION } from './data/added-to-cart-dialog-event.listener.migration';
import { ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/added-to-cart-dialog.component.migration';
import { CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/close-account-modal.component.migration';
import { CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/close-account.component.migration';
import { COUPON_CARD_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/coupon-card.component.migration';
import { COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/coupon-dialog.component.migration';
import { STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification-dialog.component.migration';
import { STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/stock-notification.component.migration';
import { JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION } from './data/json-ld.directive.migration';
import { JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION } from './data/json-ld.script.factory.migration';
import { CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cdc-js-service.migration';
import { REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/register.component.migration';
import { TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION } from './data/tracking-events.component.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  CART_TOTALS_COMPONENT_MIGRATION,
  CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION,
  NOT_AUTH_GUARD_MIGRATION,
  LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
  LOGIN_GUARD_CONSTRUCTOR_MIGRATION,
  CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
  CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION,
  CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION,
  QUICK_ORDER_SERVICE_MIGRATION,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  ADDRESS_BOOK_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_PRODUCT_CARD_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION,
  CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
  CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
  NAVIGATION_UI_COMPONENT_MIGRATION,
  PAGE_LAYOUT_SERVICE_MIGRATION,
  PARAGRAPH_COMPONENT_MIGRATION,
  FORM_ERRORS_COMPONENT_MIGRATION,
  TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
  COMPONENT_WRAPPER_DIRECTIVE_MIGRATION,
  INNER_COMPONENTS_HOST_DIRECTIVE_MIGRATION,
  GENERIC_LINK_COMPONENT_MIGRATION,
  BANNER_COMPONENT_MIGRATION,
  CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION,
  CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION,
  CONSIGNMENT_TRACKING_COMPONENT_CONSTRUCTOR_MIGRATION,
  TRACKING_EVENTS_COMPONENT_CONSTRUCTOR_MIGRATION,
  SUGGESTED_ADDRESS_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDRESS_FORM_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION,
  CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION,
  CLOSE_ACCOUNT_MODAL_COMPONENT_CONSTRUCTOR_MIGRATION,
  COUPON_CARD_COMPONENT_CONSTRUCTOR_MIGRATION,
  COUPON_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION,
  STOCK_NOTIFICATION_COMPONENT_CONSTRUCTOR_MIGRATION,
  JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION,
  JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION,
  CDC_JS_SERVICE_CONSTRUCTOR_MIGRATION,
  REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION,
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
