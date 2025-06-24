/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LcpPresence } from '../lcp-context/lcp-context.model';

/**
 * Extension point allowing for custom logic to mark whether a CMS component
 * contains LCP (Largest Contentful Paint) element.
 */
@Injectable({ providedIn: 'root' })
export class CmsLcpService {
  // SPIKE TODO: document this custom marker!
  protected readonly LCP_MARKER = '__CX_LCP__';

  /**
   * Tells whether the given CMS component contains an LCP (Largest Contentful Paint) element.
   */
  getLcpPresence(
    componentData: ContentSlotComponentData
  ): Observable<LcpPresence> {
    if (componentData?.uid?.includes(this.LCP_MARKER)) {
      return of(LcpPresence.CONTAINS_LCP);
    }
    return of(LcpPresence.NONE);
  }
}
