import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import { LcpPresence } from './lcp-context.model';
import { LCP_CONTEXT } from './lcp-context.token';

@Directive({
  selector: '[cxProvideLcpContext]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: () => inject(ProvideLcpContextDirective).value$,
    },
  ],
  standalone: false,
})
export class ProvideLcpContextDirective implements OnChanges {
  // SPIKE TODO: eliminate the need to handle `null`

  @Input() cxProvideLcpContext: LcpPresence | null = LcpPresence.NONE;

  ngOnChanges(): void {
    let value = this.cxProvideLcpContext ?? LcpPresence.NONE;
    this._value$.next(value);
  }

  protected _value$ = new ReplaySubject<LcpPresence>(1);
  protected readonly value$ = this._value$.pipe(distinctUntilChanged());
}
