import { AbstractType } from '@angular/core';
import { Observable } from 'rxjs';

export interface FacadeDescriptor<T extends object> {
  /**
   * Facade class
   */
  facade: AbstractType<T>;
  /**
   * Feature name that should be used to resolve facade
   */
  feature: string;
  /**
   * Methods of the facade that will be proxied from lazy loaded services.
   *
   * All methods should either return an Observable or void. Any return type that
   * is not an Observable will be ignored.
   */
  methods?: MethodKeys<T>[];
  /**
   * Properties of the facade that will be proxied from lazy loaded services.
   *
   * Only Observable properties are supported.
   */
  properties?: PropertyKeys<T>[];
  /**
   * Denotes that feature should have to be initialized with an async delay.
   * Required to make lazy NgRx store feature ready.
   */
  async?: boolean;
}

type MethodKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type PropertyKeys<T extends object> = {
  [K in keyof T]: T[K] extends Observable<any> ? K : never;
}[keyof T];
