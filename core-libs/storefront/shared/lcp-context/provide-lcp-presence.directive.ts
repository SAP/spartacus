/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, inject, Input, OnChanges } from '@angular/core';
import {
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  shareReplay,
} from 'rxjs';
import { LcpPresence } from './lcp-presence.model';
import { LCP_PRESENCE } from './lcp-presence.token';

/**
 * Directive that provides the information whether the template contains
 * the LCP (Largest Contentful Paint) element.
 *
 * For CMS components, it's already defined by the `[cxComponentWrapper]` directive,
 * based on the dynamic CMS component data.
 */
@Directive({
  selector: '[cxProvideLcpPresence]',
  providers: [
    {
      provide: LCP_PRESENCE,
      useFactory: (): Observable<LcpPresence> =>
        inject(ProvideLcpPresenceDirective).lcpPresence$,
    },
  ],
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
}
