import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import {
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2,
} from './data/cart-page-event.builder.migration';
import { COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION } from './data/component-wrapper.directive.migration';
import { CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION } from './data/configurator-attribute-checkbox-list.component.migration';
import { CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION } from './data/configurator-attribute-drop-down.component.migration';
import { CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION } from './data/configurator-attribute-radio-button.component.migration';
import { CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION } from './data/configurator-cart-entry-info.component.migration';
import { HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION } from './data/home-page-event.builder.migration';
import { PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION } from './data/product-page-event.builder.migration';
import { SEARCH_BOX_COMPONENT_SERVICE_MIGRATION } from './data/search-box-component.service.migration';
import { UNIT_CHILDREN_COMPONENT_MIGRATION } from './data/unit-children.component.migration';
import { UNIT_COST_CENTERS_COMPONENT_MIGRATION } from './data/unit-cost-centers.component.migration';
import { UNIT_USER_LIST_COMPONENT_MIGRATION } from './data/unit-user-list.component.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  UNIT_CHILDREN_COMPONENT_MIGRATION,
  UNIT_COST_CENTERS_COMPONENT_MIGRATION,
  UNIT_USER_LIST_COMPONENT_MIGRATION,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V1,
  CART_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION_V2,
  HOME_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
  PRODUCT_PAGE_EVENT_BUILDER_COMPONENT_MIGRATION,
  SEARCH_BOX_COMPONENT_SERVICE_MIGRATION,
  COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION,
  CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_CHECKBOX_LIST_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
  CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
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
