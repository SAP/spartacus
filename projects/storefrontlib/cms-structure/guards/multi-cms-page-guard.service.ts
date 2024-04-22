import { Injectable, inject } from '@angular/core';
import { CX_PAGE_GUARD } from './cms-page-guard.provider';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, concat, endWith, first, of, skipWhile } from 'rxjs';
import { CmsGuardsService } from '../services';
import { CmsActivatedRouteSnapshot, UnifiedInjector } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class MultiCmsPageGuardService {
  protected cx_guards = inject(CX_PAGE_GUARD);
  protected cmsGuardService = inject(CmsGuardsService);
  protected unifiedInjector = inject(UnifiedInjector);

  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const guards = this.cx_guards;

    if (guards.length) {
      const canActivateObservables = guards.map((guard) =>
        this.cmsGuardService.canActivateGuard(guard, route, state)
      );
      return concat(...canActivateObservables).pipe(
        skipWhile((canActivate: boolean | UrlTree) => canActivate === true),
        endWith(true),
        first()
      );
    }
    return of(true);
  }
}
