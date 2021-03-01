import {
  AbstractType,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';

const NOT_FOUND_SYMBOL = {};

/**
 * CombinedInjector is able to combine more than one injector together.
 *
 * Can be used to instantiate lazy loaded modules with dependency modules,
 * so lazy loaded module can use instances provided in all dependency modules.
 *
 * Injector tries to resolve token in all Injector, taking into account the order
 * in which they were provided in complementaryInjectors and fallbacks to the
 * mainInjector.
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
    // eslint-disable-next-line no-bitwise
    if (flags & InjectFlags.Self) {
      if (notFoundValue !== undefined) {
        return notFoundValue;
      }
      throw new Error(
        "CombinedInjector should be used as a parent injector / doesn't support self dependencies"
      );
    }

    for (const injector of this.complementaryInjectors) {
      // First we are resolving providers provided at Self level
      // in all complementary injectors...
      const service = injector.get(token, NOT_FOUND_SYMBOL, InjectFlags.Self);
      if (service !== NOT_FOUND_SYMBOL) {
        return service;
      }
    }

    for (const injector of this.complementaryInjectors) {
      // next we try to resolve tokens from all levels
      const service = injector.get(token, NOT_FOUND_SYMBOL);
      if (service !== NOT_FOUND_SYMBOL) {
        return service;
      }
    }
    // ...and then fallback to main injector
    return this.mainInjector.get(token, notFoundValue);
  }
}
