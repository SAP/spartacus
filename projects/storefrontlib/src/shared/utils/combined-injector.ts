import {
  AbstractType,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

const NOT_FOUND_SYMBOL = {};

/**
 * CombinedInjector is able to combine more than one injector together in a way
 * that main injector is supported by complementary injectors.
 */
export class CombinedInjector implements Injector {
  constructor(
    private mainInjector: Injector,
    private complementaryInjectors: Injector[]
  ) {}

  get<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  get(token: any, notFoundValue?: any): any;
  get(token, notFoundValue?: any, flags?: InjectFlags): any {
    for (const injector of [
      this.mainInjector,
      ...this.complementaryInjectors,
    ]) {
      const service = injector.get(token, NOT_FOUND_SYMBOL, InjectFlags.Self);
      if (service !== NOT_FOUND_SYMBOL) {
        return service;
      }
    }

    return this.mainInjector.get(token, notFoundValue, flags);
  }
}
