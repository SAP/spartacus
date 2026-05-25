/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LcpPresence } from './lcp-presence.model';

export const DEFAULT_LCP_PRESENCE: Observable<LcpPresence> = of(
  LcpPresence.NO_LCP
);

/**
 * Tells whether the component contains LCP (Largest Contentful Paint) element in its sub-tree.
 *
 * It's provided on DOM level by an ancestor component (likely a CMS component)
 *
 * A descendant component can use this context for possible performance optimizations
 * related to LCP (Largest Contentful Paint) element.
 *
 * Note: It's also provided in root injector with default fallback value of `LcpPresence.NO_LCP`,
 * to avoid errors when no ancestor component provides it.
 */
export const LCP_PRESENCE = new InjectionToken<Observable<LcpPresence>>(
  'LCP_PRESENCE',
  {
    providedIn: 'root',
    factory: () => DEFAULT_LCP_PRESENCE,
  }
);
