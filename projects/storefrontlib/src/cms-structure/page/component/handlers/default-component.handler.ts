import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  NgModuleRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentHandler } from './component-handler';
import { Observable } from 'rxjs';
import { CmsComponentMapping, Priority } from '@spartacus/core';

/**
 * Default component handler used for dynamically launching cms components implemented
 * as native Angular components.
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultComponentHandler implements ComponentHandler {
  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return typeof componentMapping.component === 'function';
  }

  getPriority(): Priority {
    return Priority.FALLBACK;
  }

  launcher(
    componentMapping: CmsComponentMapping,
    viewContainerRef: ViewContainerRef,
    elementInjector?: Injector,
    module?: NgModuleRef<any>
  ): Observable<{ elementRef: ElementRef; componentRef?: ComponentRef<any> }> {
    return new Observable<{
      elementRef: ElementRef;
      componentRef?: ComponentRef<any>;
    }>((subscriber) => {
      let componentRef: ComponentRef<any>;

      const injector = elementInjector ?? viewContainerRef.injector;

      const dispose = () => {
        if (componentRef) {
          componentRef.destroy();
        }
      };

      const factory = this.getComponentFactory(
        injector,
        componentMapping.component
      );

      if (factory) {
        componentRef = viewContainerRef.createComponent(
          factory,
          undefined,
          injector,
          undefined,
          module
        );
        subscriber.next({ elementRef: componentRef.location, componentRef });
      }

      return dispose;
    });
  }

  protected getComponentFactory(injector: Injector, component: any): any {
    if (!component) {
      return null;
    }
    const factory = injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(component);

    return factory;
  }
}
