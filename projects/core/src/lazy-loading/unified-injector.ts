import {
  AbstractType,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import { LazyModulesService } from './lazy-modules.service';
import { Observable } from 'rxjs';
import { filter, map, scan, startWith } from 'rxjs/operators';

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
   * Gather all the injectors, with the root injector as a first one
   *
   */
  readonly injectors$: Observable<Injector> = this.lazyModules.modules$.pipe(
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
          // we want to get only Self instances from all injectors except the
          // first one, which is a root injector
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
  ): Observable<T[]>;
  getMulti<T>(token: any): Observable<T>;
  getMulti<T>(
    token: Type<T> | InjectionToken<T> | AbstractType<T> | any
  ): Observable<T[]> {
    return this.get(token, []).pipe(
      filter((instances) => {
        if (!Array.isArray(instances)) {
          throw new Error(
            `Multi-providers mixed with single providers for ${token.toString()}!`
          );
        }
        return instances.length > 0;
      }),
      scan((acc, services) => [...acc, ...services], [])
    );
  }
}
