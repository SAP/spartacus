/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input, OnChanges } from '@angular/core';
import { ContentSlotComponentData } from '@spartacus/core';
import {
  distinctUntilChanged,
  ReplaySubject,
  shareReplay,
  switchMap,
} from 'rxjs';
import { LcpContext } from '../../shared/directives/lcp-context/lcp-context.model';
import { LCP_CONTEXT } from '../../shared/directives/lcp-context/lcp-context.token';
import { CmsLcpService } from './cms-lcp.service';

/**
 * Directive that provides the LCP (Largest Contentful Paint) context to descendant components
 * based on the given CMS component data.
 * Uses the `CmsLcpService` to determine whether the CMS component contains an LCP element.
 */
@Directive({
  selector: '[cxProvideLcpContextForCms]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: (): LcpContext =>
        inject(ProvideLcpContextForCmsDirective).lcpContext,
    },
  ],
  standalone: false,
})
export class ProvideLcpContextForCmsDirective implements OnChanges {
  protected cmsLcpService = inject(CmsLcpService);

  @Input() cxProvideLcpContextForCms: ContentSlotComponentData;
  protected _cmsComponentData$ = new ReplaySubject<ContentSlotComponentData>(1);

  ngOnChanges(): void {
    this._cmsComponentData$.next(this.cxProvideLcpContextForCms);
  }

  protected lcpPresence$ = this._cmsComponentData$.pipe(
    switchMap((componentData) =>
      this.cmsLcpService.getLcpPresence(componentData)
    ),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected lcpContext: LcpContext = {
    lcpPresence$: this.lcpPresence$,
  };
}
