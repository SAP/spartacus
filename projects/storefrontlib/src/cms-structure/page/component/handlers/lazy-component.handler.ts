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
      this.isNotClass(componentMapping.component)
    );
  }

  private isNotClass(symbol: any): boolean {
    const signature = symbol.toString().substr(0, 20).replace(' ', '');
    return signature.startsWith('function()') || signature.startsWith('()=>');
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
