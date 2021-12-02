import { Injectable, Injector } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  getLastValueSync,
  UnifiedInjector,
} from '@spartacus/core';
import { concat, from, isObservable, Observable, of } from 'rxjs';
import { endWith, first, skipWhile } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';

@Injectable({
  providedIn: 'root',
})
export class CmsGuardsService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector,
    // TODO:#checkout - handle breaking changes
    protected unifiedInjector: UnifiedInjector
  ) {}

  cmsPageCanActivate(
    componentTypes: string[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guards = this.cmsComponentsService.getGuards(componentTypes);

    if (guards.length) {
      const canActivateObservables = guards.map((guardClass) => {
        // TODO:#checkout - be smarter here, and start the return stream with this, if possible
        const guard = getLastValueSync(
          this.unifiedInjector.get<CanActivate>(guardClass)
        );
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
