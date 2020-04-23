import { Injectable, Injector } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { concat, from, isObservable, Observable, of } from 'rxjs';
import { endWith, first, skipWhile } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';

@Injectable({
  providedIn: 'root',
})
export class CmsGuardsService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector
  ) {}

  cmsPageCanActivate(
    componentTypes: string[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guards = this.cmsComponentsService.getGuards(componentTypes);

    if (guards.length) {
      const canActivateObservables = guards.map((guardClass) => {
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
