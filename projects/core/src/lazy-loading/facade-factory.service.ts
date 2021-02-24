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
import { CmsConfig, FeatureModulesService } from '@spartacus/core';

export interface FacadeDescriptor<T> {
  facade: AbstractType<T>;
  feature: string | string[];
  methods?: (keyof T)[];
  properties?: (keyof T)[];
  /**
   * Feature should have to be initialized with an async delay in mind.
   * Required to make lazy NgRx store feature ready.
   */
  async?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FacadeFactoryService {
  protected facades = new Map<any, Observable<any>>();

  constructor(
    protected featureModules: FeatureModulesService,
    protected cmsConfig: CmsConfig,
    protected injector: Injector
  ) {}

  protected getFacade<T>(
    feature: string | string[],
    facadeClass: AbstractType<T>
  ): Observable<T> {
    const featureToLoad = this.findConfiguredFeature(feature);

    if (!featureToLoad) {
      return throwError(
        new Error(`Feature ${[].concat(feature)[0]} is not configured properly`)
      );
    }

    return this.featureModules.resolveFeature(featureToLoad).pipe(
      debounceTime(0),
      map((moduleRef) => moduleRef.injector),
      map((injector) => injector.get(facadeClass))
    );
  }

  protected findConfiguredFeature(feature: string | string[]): string {
    for (const feat of [].concat(feature)) {
      if (this.featureModules.isConfigured(feat)) {
        return feat;
      }
    }
  }

  protected define(facade: AbstractType<any>, feature: string | string[]) {
    const resolver$ = this.getFacade(feature, facade).pipe(shareReplay());
    this.facades.set(facade, resolver$);
  }

  protected call(
    facade: AbstractType<any>,
    method: string,
    args: unknown[]
  ): Observable<any> {
    const callResult$ = this.facades.get(facade).pipe(
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

  protected get(facade: AbstractType<any>, property: string): Observable<any> {
    return this.facades
      .get(facade)
      .pipe(switchMap((service) => service[property]));
  }

  create<T>({ facade, feature, methods, properties }: FacadeDescriptor<T>): T {
    console.log('creating the facade', facade);
    this.define(facade, feature);

    const result: any = {};
    (methods ?? []).forEach((method) => {
      result[method] = (...args) => this.call(facade, method as string, args);
    });
    (properties ?? []).forEach((property) => {
      result[property] = this.get(facade, property as string);
    });

    return result;
  }
}

export function facadeFactory<T>(descriptor: FacadeDescriptor<T>): T {
  return inject(FacadeFactoryService).create(descriptor);
}
