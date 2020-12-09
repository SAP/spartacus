import { Injectable } from '@angular/core';
import { CostCenter, RoutingService } from '@spartacus/core';
import {
  CostCenterService,
  OrganizationItemStatus,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { ItemService } from '../../shared/item.service';
import { CostCenterFormService } from '../form/cost-center-form.service';
import { CurrentCostCenterService } from './current-cost-center.service';

@Injectable({
  providedIn: 'root',
})
export class CostCenterItemService extends ItemService<CostCenter> {
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

  update(
    code,
    value: CostCenter
  ): Observable<OrganizationItemStatus<CostCenter>> {
    this.costCenterService.update(code, value);
    return this.costCenterService.getLoadingStatus(value.code);
  }

  protected create(
    value: CostCenter
  ): Observable<OrganizationItemStatus<CostCenter>> {
    this.costCenterService.create(value);
    return this.costCenterService.getLoadingStatus(value.code);
  }

  protected getDetailsRoute(): string {
    return 'orgCostCenterDetails';
  }
}
