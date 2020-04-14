import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
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
    elementInjector?: Injector
  ): Observable<[ElementRef, ComponentRef<any>]> {
    return new Observable<[ElementRef, ComponentRef<any>]>((observer) => {
      let cmpRef: ComponentRef<any>;

      const injector = elementInjector ?? viewContainerRef.injector;

      const dispose = () => {
        if (cmpRef) {
          cmpRef.destroy();
        }
      };

      const factory = this.getComponentFactoryByCode(
        injector,
        componentMapping.component
      );

      if (factory) {
        const vcRef = viewContainerRef;

        cmpRef = vcRef.createComponent(factory, undefined, injector);
        observer.next([cmpRef.location, cmpRef]);
      }

      return dispose;
    });
  }

  private getComponentFactoryByCode(injector: Injector, component: any): any {
    if (!component) {
      return null;
    }
    const factory = injector
      .get(ComponentFactoryResolver)
      .resolveComponentFactory(component);

    return factory;
  }
}
