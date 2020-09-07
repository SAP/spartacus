import { Injectable } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Budget, CostCenterService } from '../../../core/index';
import { OrganizationItemService } from '../../shared/organization-item.service';
import { CostCenterFormService } from '../form/cost-center-form.service';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterItemService extends OrganizationItemService<CostCenter> {
  constructor(
    protected currentItemService: CurrentCostCenterService,
    protected routingService: RoutingService,
    protected formService: CostCenterFormService,
    protected costCenterService: CostCenterService
  ) {
    super(currentItemService, routingService, formService);
  }

  load(code: string): Observable<CostCenter> {
    this.costCenterService.load(code);
    return this.costCenterService.get(code);
  }

  update(code, value: Budget) {
    this.costCenterService.update(code, value);
  }

  protected create(value: Budget) {
    this.costCenterService.create(value);
  }

  protected getDetailsRoute(): string {
    return 'costCenterDetails';
  }
}
