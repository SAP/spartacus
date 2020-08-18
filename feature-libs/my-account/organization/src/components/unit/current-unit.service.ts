import { Injectable } from '@angular/core';
import { Budget, OrgUnitService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ROUTE_PARAMS } from '../constants';
import { BaseCurrentService } from '../shared/base-current.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUnitService extends BaseCurrentService<Budget> {
  constructor(
    protected routingService: RoutingService,
    protected unitService: OrgUnitService
  ) {
    super(routingService, ROUTE_PARAMS.unitCode);
  }

  getModel(code: string): Observable<Budget> {
    return this.unitService.get(code);
  }
}
