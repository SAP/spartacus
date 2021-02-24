import { AbstractType } from '@angular/core';

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
