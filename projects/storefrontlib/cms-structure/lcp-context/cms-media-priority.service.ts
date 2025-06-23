/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LcpContext } from './lcp-context.model';

@Injectable({ providedIn: 'root' })
export class CmsMediaPriorityService {
  protected readonly LCP_MARKER = '__CX_LCP__';

  getContext(componentData: ContentSlotComponentData): Observable<LcpContext> {
    // SPIKE TODO: document this custom marker!

    if (componentData?.uid?.includes(this.LCP_MARKER)) {
      return of(LcpContext.CONTAINS_LCP);
    }
    return of(LcpContext.NONE);
  }
}
