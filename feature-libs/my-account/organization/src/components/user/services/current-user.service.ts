import { Injectable } from '@angular/core';
import { B2BUser, CostCenter, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { B2BUserService } from '../../../core/services/b2b-user.service';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentOrganizationItemService } from '../../shared/current-organization-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService extends CurrentOrganizationItemService<
  CostCenter
> {
  readonly name$: Observable<string> = this.item$.pipe(
    map((user: B2BUser) => user.name)
  );

  constructor(
    protected routingService: RoutingService,
    protected b2bUserService: B2BUserService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.userCode;
  }

  protected getItem(code: string): Observable<CostCenter> {
    return this.b2bUserService.get(code);
  }
}
