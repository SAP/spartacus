import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CART_LIB_AND_CHECKOUT_MIGRATION } from './data/cart-lib-checkout.migration';
import { CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION } from './data/configurator-attribute-header.component.migration';
import { CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-multi-selection-bundle.component.migration';
import { CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION } from './data/configurator-attribute-single-selection-bundle.component.migration';

export const METHODS_AND_PROPERTIES_DEPRECATIONS_DATA: MethodPropertyDeprecation[] =
  [
    ...CONFIGURATOR_ATTRIBUTE_MULTI_SELECTION_BUNDLE_COMPONENT_MIGRATION,
    ...CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION,
    ...CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION,
    ...CART_LIB_AND_CHECKOUT_MIGRATION,
  ];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return migrateMethodPropertiesDeprecation(
      tree,
      context,
      METHODS_AND_PROPERTIES_DEPRECATIONS_DATA
    );
  };
}
