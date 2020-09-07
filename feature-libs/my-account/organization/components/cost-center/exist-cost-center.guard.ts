import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import {
  CostCenter,
  CostCenterService,
  SemanticPathService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExistCostCenterGuard implements CanActivate {
  constructor(
    protected costCenterService: CostCenterService,
    protected router: Router,
    protected semanticPathService: SemanticPathService
  ) {}

  canActivate(
    activatedRoute: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> {
    const urlParams = {
      code: '',
    };

    urlParams.code = activatedRoute.params['code'];

    return this.costCenterService.get(urlParams.code).pipe(
      map((costCenter) => {
        if (costCenter && this.isValid(costCenter)) {
          return true;
        }

        return this.getRedirectUrl(urlParams);
      })
    );
  }

  protected isValid(costCenter: CostCenter): boolean {
    return Object.keys(costCenter).length !== 0;
  }

  protected getRedirectUrl(_urlParams?: any): UrlTree {
    return this.router.parseUrl(this.semanticPathService.get('costCenter'));
  }
}
