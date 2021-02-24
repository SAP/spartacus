import { AbstractType, inject, Injectable, Injector } from '@angular/core';
import {
  ConnectableObservable,
  EMPTY,
  isObservable,
  Observable,
  throwError,
} from 'rxjs';
import {
  debounceTime,
  map,
  publishReplay,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { FeatureModulesService } from './feature-modules.service';

export interface FacadeDescriptor<T> {
  /**
   * Facade class
   */
  facade: AbstractType<T>;
  /**
   * Feature name or names that should be used to resolve facade
   */
  feature: string | string[];
  /**
   * Methods of the facade that will be proxied from lazy loaded services.
   *
   * All methods should either return an Observable or void. Any return type that
   * is not an Observable will be ignored.
   */
  methods?: (keyof T)[];
  /**
   * Properties of the facade that will be proxied from lazy loaded services.
   *
   * Only Observable properties are supported.
   */
  properties?: (keyof T)[];
  /**
   * Denotes that feature should have to be initialized with an async delay.
   * Required to make lazy NgRx store feature ready.
   */
  async?: boolean;
}

/**
 * Service that can create proxy facade, which is a service that will expose
 * methods and properties from a facade implemented in the lazy loaded module.
 *
 * Returned proxy facade will lazy load the feature and facade implementation
 * at first method call or when first property observable will be subscribed.
 */
@Injectable({
  providedIn: 'root',
})
export class FacadeFactoryService {
  constructor(
    protected featureModules: FeatureModulesService,
    protected injector: Injector
  ) {}

  protected getResolver<T>(
    feature: string | string[],
    facadeClass: AbstractType<T>,
    async = false
  ): Observable<T> {
    const featureToLoad = this.findConfiguredFeature(feature);

    if (!featureToLoad) {
      return throwError(
        new Error(`Feature ${[].concat(feature)[0]} is not configured properly`)
      );
    }

    let featureModule$ = this.featureModules.resolveFeature(featureToLoad);
    if (async) {
      featureModule$ = featureModule$.pipe(debounceTime(0));
    }

    return featureModule$.pipe(
      map((moduleRef) => moduleRef.injector),
      map((injector) => injector.get(facadeClass)),
      shareReplay()
    );
  }

  protected findConfiguredFeature(feature: string | string[]): string {
    for (const feat of [].concat(feature)) {
      if (this.featureModules.isConfigured(feat)) {
        return feat;
      }
    }
  }

  /**
   * Calls a method on a facade
   *
   * Method should either return an observable or void. Any other return type
   * than observable is ignored.
   *
   * @param resolver$
   * @param method
   * @param args
   * @protected
   */
  protected call(
    resolver$: Observable<any>,
    method: string,
    args: unknown[]
  ): Observable<unknown> {
    const callResult$ = resolver$.pipe(
      map((service) => service[method](...args)),
      publishReplay()
    );
    (callResult$ as ConnectableObservable<any>).connect();

    return callResult$.pipe(
      switchMap((result) => {
        if (isObservable(result)) {
          return result;
        }
        return EMPTY;
      })
    );
  }

  /**
   * Get the property value from the facade
   *
   * Property has to be an aobservable
   *
   * @param resolver$
   * @param property
   * @protected
   */
  protected get(
    resolver$: Observable<any>,
    property: string
  ): Observable<unknown> {
    return resolver$.pipe(switchMap((service) => service[property]));
  }

  create<T>({
    facade,
    feature,
    methods,
    properties,
    async,
  }: FacadeDescriptor<T>): T {
    const resolver$ = this.getResolver(feature, facade, async);

    const result: any = new (class extends (facade as any) {})();
    (methods ?? []).forEach((method) => {
      result[method] = (...args) =>
        this.call(resolver$, method as string, args);
    });
    (properties ?? []).forEach((property) => {
      result[property] = this.get(resolver$, property as string);
    });

    return result;
  }
}

/**
 * Factory that will create proxy facade, which is a service that will expose
 * methods and properties from a facade implemented in the lazy loaded module.
 *
 * Returned proxy facade will lazy load the feature and facade implementation
 * at first method call or when first property observable will be subscribed.
 *
 * @param descriptor
 */
export function facadeFactory<T>(descriptor: FacadeDescriptor<T>): T {
  return inject(FacadeFactoryService).create(descriptor);
}
