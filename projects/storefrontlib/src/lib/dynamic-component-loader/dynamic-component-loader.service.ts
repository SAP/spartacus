import {
  ComponentFactory,
  Inject,
  Injectable,
  Injector,
  NgModuleFactoryLoader
} from '@angular/core';
import { Observable, from, throwError } from 'rxjs';

import {
  DYNAMIC_COMPONENT,
  DYNAMIC_COMPONENT_MANIFESTS,
  DynamicComponentManifest
} from './dynamic-component-manifest';

@Injectable()
export class DynamicComponentLoader {
  constructor(
    @Inject(DYNAMIC_COMPONENT_MANIFESTS)
    private manifests: DynamicComponentManifest[],
    private loader: NgModuleFactoryLoader,
    private injector: Injector
  ) {}

  /**
   * gets a component factory for the given componentId
   *
   * @param componentId
   * @param injector
   */
  getComponentFactory<T>(
    componentId: string,
    injector?: Injector
  ): Observable<ComponentFactory<T>> {
    const manifest = this.manifests.find(m => m.componentId === componentId);
    if (!manifest) {
      return throwError(
        `DynamicComponentLoader: Unknown componentId "${componentId}"`
      );
    }

    const p = this.loader.load(manifest.loadChildren).then(ngModuleFactory => {
      const moduleRef = ngModuleFactory.create(injector || this.injector);
      // Read from the moduleRef injector and locate the dynamic component type
      let dynamicComponentType = moduleRef.injector.get(DYNAMIC_COMPONENT);
      // support singulars and plurals
      if (dynamicComponentType[componentId]) {
        dynamicComponentType = dynamicComponentType[componentId];
      }
      if (!dynamicComponentType) {
        throw new Error(
          `DynamicComponentLoader: Dynamic module for componentId "${componentId}" does not contain DYNAMIC_COMPONENT as a provider.`
        );
      }

      return moduleRef.componentFactoryResolver.resolveComponentFactory<T>(
        dynamicComponentType
      );
    });

    return from(p);
  }
}
