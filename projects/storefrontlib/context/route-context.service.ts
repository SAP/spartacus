import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, Data } from '@angular/router';
import { ActivatedRoutesService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ContextToken } from './context.service';

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

  protected readonly routeData$: Observable<Data> = this.activatedRoutesService.routes$.pipe(
    map((routes) => this.getRoutesData(routes)),
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  protected getRoutesData(routes: ActivatedRouteSnapshot[]): Data {
    return Object.assign({}, ...routes.map((route) => route['data']));
  }

  /**
   * Resolves the specified `contextToken` from `cxContext` data parameter of the activated Angular Routes.
   * @param contextKey
   *
   * @returns instance from the root injector if defined, otherwise `undefined`.
   */
  get<T>(contextToken: ContextToken): Observable<T | undefined> {
    return this.routeData$.pipe(
      map((data) => data?.cxContext),
      map((contextTokenMapping) => {
        const providerToken = contextTokenMapping?.[contextToken];
        return this.injector.get(providerToken, undefined);
      })
    );
  }
}
