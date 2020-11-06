import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { CMS_COMPONENTS_SERVICE_MIGRATION } from './data/cms-components.service.migration';
import { PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION } from './data/product-list-component.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...PRODUCT_LIST_COMPONENT_SERVICE_MIGRATION,
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
