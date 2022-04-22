import {
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  NgModuleRef,
  ViewContainerRef,
} from '@angular/core';
import { CmsComponentMapping, Priority } from '@spartacus/core';
import { from, Observable } from 'rxjs';
import { DefaultComponentHandler } from './default-component.handler';
import { switchMap } from 'rxjs/operators';
import { ComponentHandler } from './component-handler';

/**
 * Lazy component handler used for launching lazy loaded cms components implemented
 * as native Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class LazyComponentHandler implements ComponentHandler {
  constructor(protected defaultHandler: DefaultComponentHandler) {}

  /**
   * We want to mach dynamic import signature () => import('')
   */
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
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return from(componentMapping.component()).pipe(
      switchMap((component) =>
        this.defaultHandler.launcher(
          { ...componentMapping, component },
          viewContainerRef,
          elementInjector,
          module
        )
      )
    );
  }
}
