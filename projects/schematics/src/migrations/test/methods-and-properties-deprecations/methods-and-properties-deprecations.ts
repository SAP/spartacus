import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CMS_ACTIONS_MIGRATION } from './data/cms-group.actions.migration';
import { CMS_SELECTORS_MIGRATION } from './data/cms-group.selectors.migration';
import { CONFIGURATOR_COMMONS_SERVICE_MIGRATION } from './data/configurator-commons-service.migration';
import { CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION } from './data/configurator-group-title-component.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CMS_SELECTORS_MIGRATION,
  ...CMS_ACTIONS_MIGRATION,
  ...CONFIGURATOR_COMMONS_SERVICE_MIGRATION,
  ...CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION,
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
