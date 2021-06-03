import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CURRENCY_SERVICE_MIGRATION } from './data/currency.service.migration';
import { LANGUAGE_SERVICE_MIGRATION } from './data/language.service.migration';
import { OCC_ENDPOINTS_SERVICE_MIGRATION } from './data/occ-endpoints.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...LANGUAGE_SERVICE_MIGRATION,
  ...CURRENCY_SERVICE_MIGRATION,
  ...OCC_ENDPOINTS_SERVICE_MIGRATION,
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
