import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { CostCenter, SemanticPathService } from '@spartacus/core';
import { CostCenterService } from '@spartacus/my-account/organization/core';
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

    urlParams.code = activatedRoute.params['costCenterCode'];

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
