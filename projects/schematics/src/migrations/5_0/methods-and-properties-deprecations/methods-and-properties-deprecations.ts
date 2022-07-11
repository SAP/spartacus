import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { GENERATED_METHODS_AND_PROPERTIES_MIGRATION } from './data/generated-methods-and-properties.migration';
import { SAVED_CART_EVENT_BUILDER_MIGRATION } from './data/saved-cart-event.builder.migration';

export const METHODS_AND_PROPERTIES_DEPRECATIONS_DATA: MethodPropertyDeprecation[] =
  [
    ...SAVED_CART_EVENT_BUILDER_MIGRATION,
    ...GENERATED_METHODS_AND_PROPERTIES_MIGRATION,
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
