import { Component } from '@angular/core';
import {
  CostCenter,
  CostCenterService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
})
export class CostCenterEditComponent {
  code$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(map((routingData) => routingData.state.params['code']));
  costCenter$: Observable<CostCenter> = this.code$.pipe(
    tap((code) => this.costCentersService.loadCostCenter(code)),
    switchMap((code) => this.costCentersService.get(code))
  );

  constructor(
    protected routingService: RoutingService,
    protected costCentersService: CostCenterService,
    protected globalMessageService: GlobalMessageService
  ) {}

  updateCostCenter(costCenter: CostCenter): void {
    this.code$
      .pipe(take(1))
      .subscribe((costCenterCode) =>
        this.costCentersService.update(costCenterCode, costCenter)
      );
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

  getFormKey(costCenter: CostCenter): string {
    return `cost-center-edit-${costCenter.code}-${costCenter.unit?.uid}`;
  }
}
