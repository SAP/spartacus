/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LcpPresence } from '../../shared/directives/lcp-context/lcp-context.model';

@Injectable({ providedIn: 'root' })
export class CmsLcpService {
  // SPIKE TODO: document this custom marker!
  protected readonly LCP_MARKER = '_CX_LCP_';

  /**
   * Tells whether the given CMS component is marked as containing
   * the LCP (Largest Contentful Paint) element.
   *
   * It can be marked in various ways - for example, by using CMS component data
   * or by Spartacus configuration.
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
