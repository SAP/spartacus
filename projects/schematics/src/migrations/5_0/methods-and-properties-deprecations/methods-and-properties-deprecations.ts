/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { AUTH_HTTP_HEADER_SERVICE_MIGRATION } from './data/auth-http-header.service.migration';
import { AUTH_REDIRECT_SERVICE_MIGRATION } from './data/auth-redirect.service.migration';
import { CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION } from './data/configurator-attribute-header.component.migration';
import { CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-multi-selection-bundle.component.migration';
import { CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-single-selection-bundle.component.migration';
import { CONFIGURATOR_COMMONS_SERVICE_MIGRATION } from './data/configurator-commons-service.migration';
import { CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION } from './data/configurator-storefront-utils.service.migration';
import { NAVIGATION_UI_COMPONENT_MIGRATION } from './data/navigation-ui.component.migration';
import { OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION } from './data/occ-configurator-variant-normalizer.migration';
import { PROGRESS_BUTTON_COMPONENT_MIGRATION } from './data/progress-button.component.migration';
import { QUICK_ORDER_SERVICE_MIGRATION } from './data/quick-order.service.migration';
import { SAVED_CART_EVENT_BUILDER_MIGRATION } from './data/saved-cart-event.builder.migration';
import { CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION } from './data/cds-merchandising-product.service.migration';

export const METHODS_AND_PROPERTIES_DEPRECATIONS_DATA: MethodPropertyDeprecation[] =
  [
    ...AUTH_REDIRECT_SERVICE_MIGRATION,
    ...AUTH_HTTP_HEADER_SERVICE_MIGRATION,
    ...QUICK_ORDER_SERVICE_MIGRATION,
    ...CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION,
    ...CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION,
    ...CONFIGURATOR_COMMONS_SERVICE_MIGRATION,
    ...CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION,
    ...OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION,
    ...NAVIGATION_UI_COMPONENT_MIGRATION,
    ...PROGRESS_BUTTON_COMPONENT_MIGRATION,
    ...SAVED_CART_EVENT_BUILDER_MIGRATION,
    ...CONFIGURATOR_STOREFRONT_UTILS_SERVICE_MIGRATION,
    ...CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION,
  ];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(
      tree,
      context,
      METHODS_AND_PROPERTIES_DEPRECATIONS_DATA
    );
  };
}
