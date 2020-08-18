import { Injectable } from '@angular/core';
import { Budget, OrgUnitService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { CurrentOrganizationService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitService extends CurrentOrganizationService<Budget> {
  constructor(
    protected routingService: RoutingService,
    protected unitService: OrgUnitService
  ) {
    super(routingService);
  }

  protected getParam() {
    return ROUTE_PARAMS.unitCode;
  }

  protected getModel(code: string): Observable<Budget> {
    return this.unitService.get(code);
  }
}
