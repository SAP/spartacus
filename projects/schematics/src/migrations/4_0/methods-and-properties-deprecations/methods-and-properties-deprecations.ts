import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { PAGE_EVENT_BUILDER_MIGRATION } from './data/page-event.builder.ts.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...PAGE_EVENT_BUILDER_MIGRATION,
  ...DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
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
