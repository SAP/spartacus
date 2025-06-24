/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { LcpPresence } from '../../shared/directives/lcp-context/lcp-context.model';
import { LcpCmsComponentsConfig } from './config/lcp-cms-components.config';

@Injectable({ providedIn: 'root' })
export class CmsLcpService {
  protected readonly config = inject(LcpCmsComponentsConfig);

  /**
   * Tells whether the given CMS component is marked as containing
   * the LCP (Largest Contentful Paint) element.
   *
   * The list of CMS component IDs can be specified in 2 ways:
   * - statically in the Spartacus configuration `config.lcpCmsComponents.ids`
   * - and dynamically configuring a special marker `config.lcpCmsComponentIdMarker`
   *    (i.e. when the CMS component ID contains a specific marker, for example "__cxLCP__").
   */
  getLcpPresence(
    componentData: ContentSlotComponentData
  ): Observable<LcpPresence> {
    const idMarker = this.config?.lcpCmsComponents?.idMarker;
    const ids = this.config?.lcpCmsComponents?.ids || [];

    // Check if ID contains a special marker
    if (idMarker && componentData?.uid?.includes(idMarker)) {
      return of(LcpPresence.HAS_LCP);
    }

    // Check if ID is on the configured list of IDs
    if (ids?.length && componentData?.uid && ids.includes(componentData?.uid)) {
      return of(LcpPresence.HAS_LCP);
    }

    return of(LcpPresence.NO_LCP);
  }
}
