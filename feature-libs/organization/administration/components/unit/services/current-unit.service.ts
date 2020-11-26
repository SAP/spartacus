import { Injectable } from '@angular/core';
import { B2BUnit, RoutingService } from '@spartacus/core';
import { OrgUnitService } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../../constants';
import { CurrentItemService } from '../../shared/current-item.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitService extends CurrentItemService<B2BUnit> {
  constructor(
    protected routingService: RoutingService,
    protected orgUnitService: OrgUnitService
  ) {
    super(routingService);
  }

  protected getParamKey() {
    return ROUTE_PARAMS.unitCode;
  }

  protected getItem(code: string): Observable<B2BUnit> {
    return this.orgUnitService.get(code);
  }

  getError(code: string): Observable<boolean> {
    return this.orgUnitService.getErrorState(code);
  }
}
