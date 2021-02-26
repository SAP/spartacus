import {
  CONTEXT,
  PAGE_EVENT_BUILDER,
  PARAMS,
  SEMANTIC_ROUTE,
  SPARTACUS_STOREFRONTLIB,
  TODO_SPARTACUS,
  URL,
} from '../../../../shared/constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/events/page/page-event.builder.ts
export const PAGE_EVENT_BUILDER_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CONTEXT,
    comment: `// ${TODO_SPARTACUS} Property '${CONTEXT}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: SEMANTIC_ROUTE,
    comment: `// ${TODO_SPARTACUS} Property '${SEMANTIC_ROUTE}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: URL,
    comment: `// ${TODO_SPARTACUS} Property '${URL}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT_BUILDER,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: PARAMS,
    comment: `// ${TODO_SPARTACUS} Property '${PARAMS}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
];
