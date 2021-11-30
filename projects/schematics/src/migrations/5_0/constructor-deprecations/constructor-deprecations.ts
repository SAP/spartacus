import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION } from './data/configurator-add-to-cart-button.component.migration';
import { NOT_AUTH_GUARD_MIGRATION } from './data/not-auth.guard.migration';
import { LOGOUT_GUARD_CONSTRUCTOR_MIGRATION } from './data/logout.guard.migration';
import { LOGIN_GUARD_CONSTRUCTOR_MIGRATION } from './data/login.guard.migration';
import { CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION } from './data/cdc-logout.guard.migration';

export const CONSTRUCTOR_DEPRECATIONS_DATA: ConstructorDeprecation[] = [
  CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION,
  NOT_AUTH_GUARD_MIGRATION,
  LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
  LOGIN_GUARD_CONSTRUCTOR_MIGRATION,
  CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION,
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
