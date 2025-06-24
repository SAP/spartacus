import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import { LCP_CONTEXT, LcpElementInfo } from './lcp-context.model';

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

  @Input() cxProvideLcpContext: LcpElementInfo | null = LcpElementInfo.NONE;

  ngOnChanges(): void {
    let value = this.cxProvideLcpContext ?? LcpElementInfo.NONE;
    this._value$.next(value);
  }

  protected _value$ = new ReplaySubject<LcpElementInfo>(1);
  protected readonly value$ = this._value$.pipe(distinctUntilChanged());
}
