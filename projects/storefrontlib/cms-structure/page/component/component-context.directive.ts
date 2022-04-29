import {
  Directive,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { ComponentContextData, Context } from '../model/cms-component-context';

@Directive({
  selector: '[cxComponentContext]',
  providers: [
    {
      provide: ComponentContextData,
      useFactory: (compContext: ComponentContextDirective) => ({
        context$: compContext.context,
      }),
      deps: [forwardRef(() => ComponentContextDirective)],
    },
  ],
})
export class ComponentContextDirective implements OnDestroy, OnChanges {
  /**
   * Context data to be provided to created inner components
   */
  @Input() cxComponentContext: Context;

  /**
   * Observable with current context
   */
  private readonly cxComponentContext$ = new ReplaySubject<Context>(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cxComponentContext) {
      this.cxComponentContext$.next(this.cxComponentContext);
    }
  }

  get context(): Observable<Context> {
    return this.cxComponentContext$;
  }

  ngOnDestroy(): void {
    this.cxComponentContext$.complete();
  }
}
