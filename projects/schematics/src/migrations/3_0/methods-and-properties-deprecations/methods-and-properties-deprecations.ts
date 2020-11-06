import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { BREAKPOINT_SERVICE_MIGRATION } from './data/breakpoint.service.migration';
import { CHECKOUT_AUTH_GUARD_MIGRATION } from './data/checkout-auth.guard.migration';
import { CHECKOUT_CONFIG_SERVICE_MIGRATION } from './data/checkout-config.service.migration';
import { CHECKOUT_GROUP_ACTIONS_MIGRATION } from './data/checkout-group.actions.migration';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CHECKOUT_GROUP_ACTIONS_MIGRATION,
  ...CHECKOUT_CONFIG_SERVICE_MIGRATION,
  ...CHECKOUT_AUTH_GUARD_MIGRATION,
  ...CMS_COMPONENTS_SERVICE_MIGRATION,
  ...BREAKPOINT_SERVICE_MIGRATION,
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
