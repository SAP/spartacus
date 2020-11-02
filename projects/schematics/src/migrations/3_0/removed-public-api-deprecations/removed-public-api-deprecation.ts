import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  SEARCH_CONFIG,
  SPARTACUS_CORE,
  STORE_FINDER_SEARCH_CONFIG,
} from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
  // projects/core/src/store-finder/model/search-config.ts
  {
    node: STORE_FINDER_SEARCH_CONFIG,
    importPath: SPARTACUS_CORE,
    comment: `'${STORE_FINDER_SEARCH_CONFIG}' is no longer part of the public API. Instead use the Interface '${SEARCH_CONFIG}'.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
