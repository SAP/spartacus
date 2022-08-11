import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { ConfigDeprecation } from '../../../shared/utils/file-utils';
import { migrateConfigDeprecation } from '../../mechanism/config-deprecations/config-deprecation';
import { PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_MIGRATION } from './data/product-configurator-rulebased-feature.migration';
import { PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_MIGRATION } from './data/product-configurator-textfield-feature.migration';

export const CONFIG_DEPRECATION_DATA: ConfigDeprecation[] = [
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_MIGRATION,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_MIGRATION,
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateConfigDeprecation(tree, context, CONFIG_DEPRECATION_DATA);
  };
}
