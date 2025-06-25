/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, inject } from '@angular/core';
import { distinctUntilChanged, shareReplay, switchMap } from 'rxjs';
import { LcpContext } from '../../shared/lcp-context/lcp-context.model';
import { LCP_CONTEXT } from '../../shared/lcp-context/lcp-context.token';
import { CmsComponentData } from '../page/model/cms-component-data';
import { CmsLcpService } from './cms-lcp.service';

/**
 * Provides the LCP (Largest Contentful Paint) context for a given CMS component,
 * based on the `CmsComponentData` injection token.
 *
 * It's used in the `CmsInjectorService` to provide the `LCP_CONTEXT` at the DOM level of each CMS component.
 */
export const provideLcpContextForCmsComponent = (): FactoryProvider => {
  return {
    provide: LCP_CONTEXT,
    useFactory: () => {
      const cmsComponentData = inject(CmsComponentData);
      const cmsLcpService = inject(CmsLcpService);

      const lcpPresence$ = cmsComponentData.data$.pipe(
        switchMap((componentData) =>
          cmsLcpService.getLcpPresence(componentData)
        ),
        distinctUntilChanged(),
        shareReplay({ bufferSize: 1, refCount: true })
      );

      const lcpContext: LcpContext = {
        lcpPresence$: lcpPresence$,
      };
      return lcpContext;
    },
  };
};
