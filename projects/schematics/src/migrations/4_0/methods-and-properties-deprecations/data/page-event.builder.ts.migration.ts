/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CONTEXT,
  PAGE_EVENT,
  PARAMS,
  SEMANTIC_ROUTE,
  TODO_SPARTACUS,
  URL,
} from '../../../../shared/constants';
import { SPARTACUS_STOREFRONTLIB } from '../../../../shared/libs-constants';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/events/page/page.events.ts
export const PAGE_EVENT_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: PAGE_EVENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: CONTEXT,
    comment: `// ${TODO_SPARTACUS} Property '${PAGE_EVENT}.${CONTEXT}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: SEMANTIC_ROUTE,
    comment: `// ${TODO_SPARTACUS} Property '${PAGE_EVENT}.${SEMANTIC_ROUTE}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: URL,
    comment: `// ${TODO_SPARTACUS} Property '${PAGE_EVENT}.${URL}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
  {
    class: PAGE_EVENT,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: PARAMS,
    comment: `// ${TODO_SPARTACUS} Property '${PAGE_EVENT}.${PARAMS}' was removed. Please use 'navigation' property instead, or subscribe to 'NavigationEvent'.`,
  },
];
