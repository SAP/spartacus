import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';
import { ITEM_COUNTER_COMPONENT_MIGRATION } from './data/item-counter.component.migration';
import { STORE_FINDER_GROUP_ACTIONS_MIGRATION } from './data/store-finder-group.actions.migration';
import { UPDATE_EMAIL_COMPONENT_MIGRATION } from './data/update-email.component.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CMS_COMPONENTS_SERVICE_MIGRATION,
  ...ITEM_COUNTER_COMPONENT_MIGRATION,
  ...STORE_FINDER_GROUP_ACTIONS_MIGRATION,
  ...UPDATE_EMAIL_COMPONENT_MIGRATION,
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
