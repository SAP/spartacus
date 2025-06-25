/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject, shareReplay } from 'rxjs';
import { LcpContext, LcpPresence } from './lcp-context.model';
import { LCP_PRESENCE } from './lcp-context.token';

/**
 * Directive that provides the LCP (Largest Contentful Paint) context to descendant components
 * based on the given input.
 *
 * For CMS components, please use `ProvideLcpContextForCmsDirective` instead.
 */
@Directive({
  selector: '[cxProvideLcpPresence]',
  providers: [
    {
      provide: LCP_PRESENCE,
      useFactory: (): LcpContext =>
        inject(ProvideLcpPresenceDirective).lcpContext,
    },
  ],
  standalone: false,
})
export class ProvideLcpPresenceDirective implements OnChanges {
  @Input() cxProvideLcpPresence?: LcpPresence | null;
  protected _lcpPresence$ = new ReplaySubject<LcpPresence>(1);

  ngOnChanges(): void {
    const value = this.cxProvideLcpPresence ?? LcpPresence.NO_LCP;
    this._lcpPresence$.next(value);
  }

  protected lcpPresence$ = this._lcpPresence$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected lcpContext: LcpContext = this.lcpPresence$;
}
