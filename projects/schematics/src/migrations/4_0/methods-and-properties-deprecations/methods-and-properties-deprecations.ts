import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION } from './data/configurator-attribute-drop-down.component.migration';
import { CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION } from './data/configurator-attribute-numeric-input-field.component.migration';
import { CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION } from './data/configurator-attribute-radio-button.component.migration';
import { CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION } from './data/configurator-product-title.component.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION,
  ...CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION,
  ...CONFIGURATOR_PRODUCT_TITLE_COMPONENT_MIGRATION,
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
