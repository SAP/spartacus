/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { of } from 'rxjs';
import { LcpContext, LcpPresence } from './lcp-context.model';

/**
 * Context for LCP (Largest Contentful Paint) presence in the component subtree.
 *
 * It's provided on DOM level by an ancestor component (likely a CMS component)
 *
 * A descendant component can use this context for possible performance optimizations
 * related to LCP (Largest Contentful Paint) element.
 *
 * Note: It's also provided in root injector with default value of `LcpPresence.NO_LCP`,
 * to avoid errors when no ancestor component provides it.
 */
export const LCP_CONTEXT = new InjectionToken<LcpContext>('LCP_CONTEXT', {
  providedIn: 'root',
  factory: () => {
    return {
      lcpPresence$: of(LcpPresence.NO_LCP),
    };
  },
});
