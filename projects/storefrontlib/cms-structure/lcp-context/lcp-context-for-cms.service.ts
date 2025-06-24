/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LcpElementInfo } from './lcp-context.model';

/**
 * Extension point allowing for custom logic to mark whether a CMS component
 * contains LCP (Largest Contentful Paint) element.
 */
@Injectable({ providedIn: 'root' })
export class LcpContextForCmsService {
  // SPIKE TODO: document this custom marker!
  protected readonly LCP_MARKER = '__CX_LCP__';

  /**
   * Returns LCP context for the given component data
   */
  get(componentData: ContentSlotComponentData): Observable<LcpElementInfo> {
    if (componentData?.uid?.includes(this.LCP_MARKER)) {
      return of(LcpElementInfo.CONTAINS_LCP);
    }
    return of(LcpElementInfo.NONE);
  }
}
