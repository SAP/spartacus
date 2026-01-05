/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, inject } from '@angular/core';
import { distinctUntilChanged, Observable, shareReplay, switchMap } from 'rxjs';
import { LcpPresence } from '../../shared/lcp-context/lcp-presence.model';
import { LCP_PRESENCE } from '../../shared/lcp-context/lcp-presence.token';
import { CmsComponentData } from '../page/model/cms-component-data';
import { CmsLcpService } from './cms-lcp.service';

/**
 * Provides the information whether the given CMS component contains the LCP (Largest Contentful Paint) element,
 * based on the `CmsComponentData` injection token.
 *
 * It's used in the `CmsInjectorService` to provide the `LCP_PRESENCE` at the DOM level of each CMS component.
 */
export const provideLcpPresenceForCmsComponent = (): FactoryProvider => {
  return {
    provide: LCP_PRESENCE,
    useFactory: (): Observable<LcpPresence> => {
      const cmsComponentData = inject(CmsComponentData);
      const cmsLcpService = inject(CmsLcpService);

      return cmsComponentData.data$.pipe(
        switchMap((componentData) =>
          cmsLcpService.getLcpPresence(componentData)
        ),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    },
  };
};
