import { Injectable, Injector } from '@angular/core';
import { concat, from, isObservable, Observable, of } from 'rxjs';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { endWith, first, skipWhile } from 'rxjs/operators';
import { CmsMappingService } from './cms-mapping.service';

/**
 * Please don't put that service in public API.
 * */
@Injectable({
  providedIn: 'root',
})
export class CmsGuardsService {
  constructor(
    private cmsMapping: CmsMappingService,
    private injector: Injector
  ) {}

  cmsPageCanActivate(
    componentTypes: string[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guards = this.cmsMapping.getGuardsForComponents(componentTypes);

    if (guards.length) {
      const canActivateObservables = guards.map(guardClass => {
        const guard = this.injector.get<CanActivate>(guardClass, null);
        if (isCanActivate(guard)) {
          return wrapIntoObservable(guard.canActivate(route, state)).pipe(
            first()
          );
        } else {
          throw new Error('Invalid CanActivate guard in cmsMapping');
        }
      });

      return concat(...canActivateObservables).pipe(
        skipWhile((canActivate: boolean | UrlTree) => canActivate === true),
        endWith(true),
        first()
      );
    } else {
      return of(true);
    }
  }
}

function wrapIntoObservable<T>(
  value: T | Promise<T> | Observable<T>
): Observable<T> {
  if (isObservable(value)) {
    return value;
  }

  if (isPromise(value)) {
    return from(Promise.resolve(value));
  }

  return of(value);
}

function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function';
}

function isCanActivate(guard: any): guard is CanActivate {
  return guard && isFunction<CanActivate>(guard.canActivate);
}

function isFunction<T>(v: any): v is T {
  return typeof v === 'function';
}
