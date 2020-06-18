import { Component } from '@angular/core';
import {
  CostCenter,
  CostCenterService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center-create',
  templateUrl: './cost-center-create.component.html',
})
export class CostCenterCreateComponent {
  parentUnit$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.queryParams?.['parentUnit']));

  constructor(
    protected routingService: RoutingService,
    protected costCenterService: CostCenterService,
    protected globalMessageService: GlobalMessageService
  ) {}

  createCostCenter(costCenter: CostCenter): void {
    this.costCenterService.create(costCenter);
    this.routingService.go({
      cxRoute: 'costCenterDetails',
      params: costCenter,
    });
  }

  showFormRestoredMessage(show: boolean): void {
    if (show) {
      this.globalMessageService.add(
        { key: 'form.restored' },
        GlobalMessageType.MSG_TYPE_INFO
      );
    }
  }

  getFormKey(): string {
    return `cost-center-create`;
  }
}
