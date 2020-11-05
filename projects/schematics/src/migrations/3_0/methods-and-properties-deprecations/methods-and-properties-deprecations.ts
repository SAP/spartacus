import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CHECKOUT_ADAPTER_MIGRATION } from './data/checkout.adapter.migration';
import { CHECKOUT_CONNECTOR_MIGRATION } from './data/checkout.connector.migration';
import { CHECKOUT_SERVICE_MIGRATION } from './data/checkout.service.migration';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CHECKOUT_CONNECTOR_MIGRATION,
  ...CHECKOUT_ADAPTER_MIGRATION,
  ...CHECKOUT_SERVICE_MIGRATION,
  ...CMS_COMPONENTS_SERVICE_MIGRATION,
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
