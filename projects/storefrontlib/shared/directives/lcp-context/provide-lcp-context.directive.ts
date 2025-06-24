/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject, shareReplay } from 'rxjs';
import { LcpContext, LcpPresence } from './lcp-context.model';
import { LCP_CONTEXT } from './lcp-context.token';

@Directive({
  selector: '[cxProvideLcpContext]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: (): LcpContext =>
        inject(ProvideLcpContextDirective).lcpContext,
    },
  ],
  standalone: false,
})
export class ProvideLcpContextDirective implements OnChanges {
  @Input() cxProvideLcpContext?: LcpPresence | null;
  protected _lcpPresence$ = new ReplaySubject<LcpPresence>(1);

  ngOnChanges(): void {
    const value = this.cxProvideLcpContext ?? LcpPresence.NO_LCP;
    this._lcpPresence$.next(value);
  }

  protected lcpPresence$ = this._lcpPresence$.pipe(
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  protected lcpContext: LcpContext = {
    lcpPresence$: this.lcpPresence$,
  };
}
