/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';

/**
 * Tells whether the component contains LCP (Largest Contentful Paint) element.
 */
export enum LcpPresence {
  HAS_LCP = 'HAS_LCP',
  NO_LCP = 'NO_LCP',
}

/**
 * Context for LCP (Largest Contentful Paint) presence in a component.
 */
export interface LcpContext {
  lcpPresence$: Observable<LcpPresence>;
}
