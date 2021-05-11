import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { SITE_CONTEXT_MODULE_MIGRATION } from './data/site-context.module.migration';
import { I18N_MODULE_MIGRATION } from './data/i18n.module.migration';
import { OCC_ENDPOINT_MIGRATION } from './data/occ-endpoint.model.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...SITE_CONTEXT_MODULE_MIGRATION,
  ...I18N_MODULE_MIGRATION,
  ...OCC_ENDPOINT_MIGRATION,
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
