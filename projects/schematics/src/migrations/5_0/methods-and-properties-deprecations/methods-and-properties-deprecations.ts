import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-multi-selection-bundle.component.migration';
import { CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-single-selection-bundle.component.migration';
import { METHODS_AND_PROPERTIES_DEPRECATIONS_DATA } from './data/methods-and-properties.migration';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(tree, context, [
      ...METHODS_AND_PROPERTIES_DEPRECATIONS_DATA,
      ...CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION,
      ...CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION,
    ]);
  };
}
