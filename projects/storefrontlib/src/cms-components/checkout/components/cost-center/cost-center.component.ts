import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterService,
  CostCenter,
  PaymentTypeService,
  UserCostCenterService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center',
  templateUrl: 'cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterComponent {
  protected costCenterId: string;

  cartCostCenter$: Observable<
    string
  > = this.checkoutCostCenterService.getCostCenter();

  isAccountPayment$ = this.paymentTypeService.isAccountPayment();

  costCenters$: Observable<
    CostCenter[]
  > = this.userCostCenterService.getActiveCostCenters().pipe(
    filter((costCenters: CostCenter[]) => Boolean(costCenters)),
    tap((costCenters: CostCenter[]) => {
      if (!Boolean(this.costCenterId)) {
        this.setCostCenter(costCenters[0].code);
      }
    })
  );

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterService,
    protected paymentTypeService: PaymentTypeService
  ) {}

  setCostCenter(selectCostCenter: string): void {
    this.costCenterId = selectCostCenter;
    this.checkoutCostCenterService.setCostCenter(this.costCenterId);
  }
}
