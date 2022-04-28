import {
  Directive,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ComponentContextData } from '../../model/cms-component-context';

@Directive({
  selector: '[cxComponentContext]',
  providers: [
    {
      provide: ComponentContextData,
      useFactory: (compContext: ComponentsContextDirective) => ({
        context$: compContext.context,
      }),
      deps: [forwardRef(() => ComponentsContextDirective)],
    },
  ],
})
export class ComponentsContextDirective<T = any>
  implements OnDestroy, OnChanges
{
  /**
   * Context data to be provided to created inner components
   */
  @Input() cxComponentContext: T;

  /**
   * Observable with current context
   */
  private readonly cxComponentContext$ = new ReplaySubject<T>(1);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cxComponentContext) {
      this.cxComponentContext$.next(this.cxComponentContext);
    }
  }

  get context() {
    return this.cxComponentContext$;
  }

  ngOnDestroy(): void {
    this.cxComponentContext$.complete();
  }
}
