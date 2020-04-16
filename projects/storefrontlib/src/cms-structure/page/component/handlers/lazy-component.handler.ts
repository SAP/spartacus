import {
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import { from, Observable } from 'rxjs';
import { DefaultComponentHandler } from './default-component.handler';
import { switchMap } from 'rxjs/operators';

/**
 * Lazy component handler used for launching lazy loaded cms components implemented
 * as native Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class LazyComponentHandler extends DefaultComponentHandler {
  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return (
      typeof componentMapping.component === 'function' &&
      !componentMapping.component.prototype
    );
  }

  getPriority(): Priority {
    return Priority.LOW;
  }

  launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return from(componentMapping.component()).pipe(
      switchMap((component) =>
        super.launcher(
          { ...componentMapping, component },
          viewContainerRef,
          elementInjector
        )
      )
    );
  }
}
