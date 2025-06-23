import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import { LCP_CONTEXT, LcpContext } from './lcp-context.model';

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

  @Input() cxProvideLcpContext: LcpContext | null = LcpContext.NONE;

  ngOnChanges(): void {
    let value = this.cxProvideLcpContext ?? LcpContext.NONE;
    this._value$.next(value);
  }

  protected _value$ = new ReplaySubject<LcpContext>(1);
  protected readonly value$ = this._value$.pipe(distinctUntilChanged());
}
