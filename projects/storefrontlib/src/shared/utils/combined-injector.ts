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
 *
 * Should be used as a parent injector for components, when we want to have access
 * to both providers from component hierarchical injectors and providers from any
 * number of additional injectors (lazy loaded modules for example).
 */
export class CombinedInjector implements Injector {
  /**
   * @param mainInjector Component hierarchical injector
   * @param complementaryInjectors Additional injector that will be taken into an account when resolving dependencies
   */
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
    // tslint:disable-next-line:no-bitwise
    if (flags & InjectFlags.Self) {
      if (notFoundValue !== undefined) {
        return notFoundValue;
      }
      throw new Error(
        "CombinedInjector should be used as a parent injector / doesn't support self dependencies"
      );
    }

    for (const injector of [
      this.mainInjector,
      ...this.complementaryInjectors,
    ]) {
      // First we are resolving providers provided at Self level in all injectors,
      // starting with main injector and going through complementary ones...
      const service = injector.get(token, NOT_FOUND_SYMBOL, InjectFlags.Self);
      if (service !== NOT_FOUND_SYMBOL) {
        return service;
      }
    }
    // ...and then fallback to main injector passing the flag
    return this.mainInjector.get(token, notFoundValue, flags);
  }
}
