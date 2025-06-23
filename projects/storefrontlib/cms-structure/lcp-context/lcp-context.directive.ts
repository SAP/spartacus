import { Directive, inject, Input, OnChanges } from '@angular/core';
import { distinctUntilChanged, ReplaySubject } from 'rxjs';
import { LCP_CONTEXT, LcpContext } from './lcp-context.model';

@Directive({
  selector: '[cxLcpContext]',
  providers: [
    {
      provide: LCP_CONTEXT,
      useFactory: () => inject(LcpContextDirective).value$,
    },
  ],
  standalone: false,
})
export class LcpContextDirective implements OnChanges {
  // SPIKE TODO: eliminate the need to handle `null`

  @Input() cxLcpContext: LcpContext | null = LcpContext.NONE;

  ngOnChanges(): void {
    let value = this.cxLcpContext ?? LcpContext.NONE;
    this._value$.next(value);
  }

  protected _value$ = new ReplaySubject<LcpContext>(1);
  protected readonly value$ = this._value$.pipe(distinctUntilChanged());
}
