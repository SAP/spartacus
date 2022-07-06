import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION } from './data/configurator-group-menu.component.migration';
import { CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION } from './data/configurator-overview-bundle-attribute.component.migration';
import { CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION } from './data/configurator-tab-bar.component.migration';
import { FORM_ERRORS_COMPONENT_MIGRATION } from './data/form-errors.component.migration';
import { GENERATED_CONSTRUCTOR_MIGRATIONS } from './data/generated-constructor.migration';
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

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  ...GENERATED_CONSTRUCTOR_MIGRATIONS,
  NOT_AUTH_GUARD_MIGRATION,
  LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
  LOGIN_GUARD_CONSTRUCTOR_MIGRATION,
  CONFIGURATOR_TAB_BAR_COMPONENT_MIGRATION,
  QUICK_ORDER_SERVICE_MIGRATION,
  QUICK_ORDER_FORM_COMPONENT_MIGRATION,
  SHIPPING_ADDRESS_COMPONENT_MIGRATION,
  CONFIGURATOR_GROUP_MENU_COMPONENT_MIGRATION,
  CONFIGURATOR_OVERVIEW_BUNDLE_ATTRIBUTE_COMPONENT_MIGRATION,
  NAVIGATION_UI_COMPONENT_MIGRATION,
  PAGE_LAYOUT_SERVICE_MIGRATION,
  PARAGRAPH_COMPONENT_MIGRATION,
  FORM_ERRORS_COMPONENT_MIGRATION,
  TAB_PARAGRAPH_CONTAINER_COMPONENT_MIGRATION,
  INNER_COMPONENTS_HOST_DIRECTIVE_MIGRATION,
  GENERIC_LINK_COMPONENT_MIGRATION,
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
