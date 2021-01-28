import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { PAGE_EVENT_BUILDER, SPARTACUS_STOREFRONTLIB } from '../../../shared/constants';
import { DeprecatedNode } from '../../../shared/utils/file-utils';
import { removedPublicApiDeprecation } from '../../mechanism/removed-public-api-deprecations/removed-public-api-deprecation';

export const REMOVED_PUBLIC_API_DATA: DeprecatedNode[] = [
// projects/storefrontlib/src/events/page/page-event.builder.ts
  {
    node: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    comment: `'${PAGE_EVENT_BUILDER}' was removed. Please use NavigationEventBuilder and NavigationEvent instead.`,
  },
];

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return removedPublicApiDeprecation(tree, context, REMOVED_PUBLIC_API_DATA);
  };
}
