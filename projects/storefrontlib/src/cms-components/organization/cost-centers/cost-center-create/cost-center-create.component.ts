import { Component } from '@angular/core';
import { CostCenterService, RoutingService } from '@spartacus/core';

@Component({
  selector: 'cx-costCenter-create',
  templateUrl: './cost-center-create.component.html',
})
export class CostCenterCreateComponent {
  constructor(
    protected costCenterService: CostCenterService,
    protected routingService: RoutingService
  ) {}

  createCostCenter(costCenter) {
    this.costCenterService.create(costCenter);
    this.routingService.go({
      cxRoute: 'costCenterDetails',
      params: costCenter,
    });
  }
}
