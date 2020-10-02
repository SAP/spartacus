import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterService,
  CostCenter,
  PaymentTypeService,
  UserCostCenterService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center',
  templateUrl: 'cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterComponent {
  costCenterId: string;

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterService,
    protected paymentTypeService: PaymentTypeService
  ) {}

  get isAccountPayment$(): Observable<boolean> {
    return this.paymentTypeService.isAccountPayment();
  }

  get costCenters$(): Observable<CostCenter[]> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      withLatestFrom(this.checkoutCostCenterService.getCostCenter()),
      filter(([costCenters]) => Boolean(costCenters)),
      tap(([costCenters, cartCostCenter]) => {
        if (!Boolean(cartCostCenter)) {
          this.setCostCenter(costCenters[0].code);
        } else {
          this.costCenterId = cartCostCenter;
        }
      }),
      map(([costCenters]) => costCenters)
    );
  }

  setCostCenter(selectCostCenter: string): void {
    this.costCenterId = selectCostCenter;
    this.checkoutCostCenterService.setCostCenter(this.costCenterId);
  }
}
