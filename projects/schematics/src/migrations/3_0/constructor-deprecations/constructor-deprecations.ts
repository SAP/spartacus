import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConstructorDeprecation } from '../../../shared/utils/file-utils';
import { migrateConstructorDeprecation } from '../../mechanism/constructor-deprecations/constructor-deprecations';
import { AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION } from './data/auth-redirect.service.migration';
import { AUTH_GUARD_CONSTRUCTOR_MIGRATION } from './data/auth.guard.migration';
import { AUTH_SERVICE_CONSTRUCTOR_MIGRATION } from './data/auth.service.migration';
import { CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION } from './data/cdc-auth.service.migration';
import { NOT_AUTH_GUARD_CONSTRUCTOR_MIGRATION } from './data/not-auth.guard.migration';
import { ROUTING_SERVICE_MIGRATION } from './data/routing.service.migration';

export const CONSTRUCTOR_DEPRECATION_DATA: ConstructorDeprecation[] = [
  ROUTING_SERVICE_MIGRATION,
  NOT_AUTH_GUARD_CONSTRUCTOR_MIGRATION,
  AUTH_GUARD_CONSTRUCTOR_MIGRATION,
  AUTH_REDIRECT_SERVICE_CONSTRUCTOR_MIGRATION,
  AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
  CDC_AUTH_SERVICE_CONSTRUCTOR_MIGRATION,
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
