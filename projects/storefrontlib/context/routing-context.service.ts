import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoutesService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { ContextToken } from './context.model';

/**
 * Resolves the context for the specific route, based on the property `data.cxContext`
 * defined in the Angular Route.
 */
@Injectable({ providedIn: 'root' })
export class RoutingContextService {
  constructor(
    protected activatedRoutesService: ActivatedRoutesService,
    protected injector: Injector
  ) {}

  /**
   * Combined context mapping consisting of all mappings defined in currently
   * Activated Angular Routes.
   *
   * The context mapping is read from each Route's property `data.cxContext`.
   */
  protected readonly routeContextMapping$: Observable<
    Record<ContextToken, any>
  > = this.activatedRoutesService.routes$.pipe(
    map((routes) => this.getRoutesContextsMapping(routes)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  /**
   * Returns the merged context mapping, consisting of context mappings
   * defined in all Activated Angular Routes.
   */
  protected getRoutesContextsMapping(
    routes: ActivatedRouteSnapshot[]
  ): Record<ContextToken, any> {
    return Object.assign({}, ...routes.map((route) => route?.data?.cxContext));
  }

  /**
   * Resolves the specified `contextToken` from `cxContext` data parameter of the activated Angular Routes.
   * @param contextToken
   *
   * @returns instance from the root injector if defined, otherwise `undefined`.
   */
  get<T>(contextToken: ContextToken): Observable<T | undefined> {
    return this.routeContextMapping$.pipe(
      tap(console.log), // TODO REMOVE
      map((contextTokenMapping) => {
        const providerToken =
          contextTokenMapping?.[
            // TODO: remove 'as any' after upgrading TypeScript to v4.4
            // See: https://github.com/Microsoft/TypeScript/issues/24587
            contextToken as any
          ];
        return this.injector.get(providerToken, undefined);
      })
    );
  }
}
