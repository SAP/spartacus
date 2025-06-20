/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ImageFetchPriority } from '../../shared/components/media/media.model';
import { MediaPriorityContext } from './media-priority-context.model';

@Injectable({ providedIn: 'root' })
export class CmsMediaPriorityService {
  protected readonly LCP_MARKER = '__CX_LCP__';

  getContext(
    componentData: ContentSlotComponentData
  ): Observable<MediaPriorityContext> {
    // SPIKE TODO: document this custom marker!

    if (componentData?.uid?.includes(this.LCP_MARKER)) {
      return of({ fetchPriority: ImageFetchPriority.HIGH });
    }
    return of({ fetchPriority: undefined });
  }
}
