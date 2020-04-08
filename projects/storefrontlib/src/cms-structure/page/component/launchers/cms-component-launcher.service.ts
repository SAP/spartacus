import {
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { ComponentLauncherService } from './component-launcher.service';
import { Observable } from 'rxjs';

import { CmsDataService } from '../services/cms-data.service';
import { ComponentMapperService } from '../services/component-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentLauncherService implements ComponentLauncherService {
  constructor(
    protected componentFactoryResolver: ComponentFactoryResolver,
    private componentMapper: ComponentMapperService,
    private cmsData: CmsDataService
  ) {}

  getLauncher(
    componentType: string,
    uid: string,
    directiveInjector: Injector
  ): Observable<[ElementRef, ComponentRef<any>]> {
    return new Observable<any>(observer => {
      let cmpRef: ComponentRef<any>;

      const dispose = () => {
        if (cmpRef) {
          cmpRef.destroy();
        }
      };

      const factory = this.getComponentFactoryByCode(componentType);

      if (factory) {
        cmpRef = directiveInjector
          .get(ViewContainerRef)
          .createComponent(
            factory,
            undefined,
            this.cmsData.getInjectorForComponent(
              componentType,
              uid,
              directiveInjector
            )
          );
      }

      observer.next([cmpRef.location, cmpRef]);

      return dispose;
    });
  }

  private getComponentFactoryByCode(typeCode: string): any {
    const component = this.componentMapper.getComponent(typeCode);
    if (!component) {
      return null;
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );

    if (!factory) {
      console.warn(
        `No component factory found for the CMS component type '${typeCode}'.\n`,
        `Make sure you add a component to the 'entryComponents' array in the NgModule.`
      );
      return null;
    }
    return factory;
  }
}
