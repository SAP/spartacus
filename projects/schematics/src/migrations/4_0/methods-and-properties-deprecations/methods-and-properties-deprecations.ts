import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION } from './data/added-to-cart-dialog-component.migration';
import { CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION } from './data/configurator-attribute-drop-down.component.migration';
import { CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION } from './data/configurator-attribute-numeric-input-field.component.migration';
import { CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION } from './data/configurator-attribute-radio-button.component.migration';
import { CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION } from './data/configurator-product-title.component.migration';
import { CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION } from './data/configurator-group-menu.component.migration';
import {
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
} from './data/content-page-meta.resolver.migration';
import { CURRENCY_SERVICE_MIGRATION } from './data/currency.service.migration';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { LANGUAGE_SERVICE_MIGRATION } from './data/language.service.migration';
import {
  GET_URL_MIGRATION,
  OCC_ENDPOINTS_SERVICE_MIGRATION,
} from './data/occ-endpoints.service.migration';
import { PAGE_EVENT_BUILDER_MIGRATION } from './data/page-event.builder.ts.migration';
import { SELECTIVE_CART_SERVICE_MIGRATION } from './data/selective-cart.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...LANGUAGE_SERVICE_MIGRATION,
  ...CURRENCY_SERVICE_MIGRATION,
  ...OCC_ENDPOINTS_SERVICE_MIGRATION,
  ...CONTENT_PAGE_META_RESOLVER_MIGRATION,
  ...PAGE_META_SERVICE_MIGRATION,
  ...SELECTIVE_CART_SERVICE_MIGRATION,
  ...ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION,
  ...PAGE_EVENT_BUILDER_MIGRATION,
  ...DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
  ...GET_URL_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
  ...CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION,
  ...CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
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
