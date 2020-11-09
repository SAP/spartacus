import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { AUTH_ACTIONS_MIGRATION } from './data/auth-group.actions.migration';
import { AUTH_GUARD_MIGRATION } from './data/auth.guard.migration';
import { AUTH_SERVICE_MIGRATION } from './data/auth.service.migration';
import { NOT_AUTH_GUARD_MIGRATION } from './data/not-auth.guard.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...AUTH_ACTIONS_MIGRATION,
  ...NOT_AUTH_GUARD_MIGRATION,
  ...AUTH_GUARD_MIGRATION,
  ...AUTH_SERVICE_MIGRATION,
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
