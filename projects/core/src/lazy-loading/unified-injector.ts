import {
  AbstractType,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { asapScheduler, Observable } from 'rxjs';
import { auditTime, filter, map, scan, startWith } from 'rxjs/operators';

const NOT_FOUND_SYMBOL: any = {};

/**
 * UnifiedInjector provides a way to get instances of tokens not only once, from the root injector,
 * but also from lazy loaded module injectors that can be initialized over time.
 */
@Injectable({
  providedIn: 'root',
})
export class UnifiedInjector {
  /**
   * Gather all the injectors, with the root injector as a frist one
   *
   * @private
   */
  private injectors$: Observable<Injector> = this.lazyModules.modules$.pipe(
    map((moduleRef) => moduleRef.injector),
    startWith(this.rootInjector)
  );

  constructor(
    protected rootInjector: Injector,
    protected lazyModules: LazyModulesService
  ) {}

  /**
   * Gen instances for specified tokens.
   *
   * When notFoundValue is provided, it will consistently emit once per injector,
   * even if injector doesn't contain instances for specified token.
   * Otherwise, emissions will only involve cases, where new instances will be found.
   *
   * @param token
   * @param notFoundValue
   */
  get<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>,
    notFoundValue?: T
  ): Observable<T> {
    return this.injectors$.pipe(
      map((injector, index) =>
        injector.get<T>(
          token,
          notFoundValue ?? NOT_FOUND_SYMBOL,
          index ? InjectFlags.Self : undefined
        )
      ),
      filter((instance) => instance !== NOT_FOUND_SYMBOL)
    );
  }

  /**
   * Get multi provided instances for a specified token
   *
   * @param token
   */
  getMulti<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T>
  ): Observable<T | T[]> {
    return this.get(token as any, []).pipe(
      filter((instances) => {
        if (!Array.isArray(instances)) {
          throw new Error("Can't mix multi-providers with single providers!");
        }
        return instances.length > 0;
      }),
      scan((acc, services) => [...acc, ...services], []),
      auditTime(0, asapScheduler)
    );
  }
}
