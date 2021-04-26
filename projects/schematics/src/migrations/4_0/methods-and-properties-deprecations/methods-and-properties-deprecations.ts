import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { migrateMethodPropertiesDeprecation } from '../../mechanism/methods-and-properties-deprecations/methods-and-properties-deprecations';
import {
  CONTENT_PAGE_META_RESOLVER_MIGRATION,
  PAGE_META_SERVICE_MIGRATION,
} from './data/content-page-meta.resolver.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CONTENT_PAGE_META_RESOLVER_MIGRATION,
  ...PAGE_META_SERVICE_MIGRATION,
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
