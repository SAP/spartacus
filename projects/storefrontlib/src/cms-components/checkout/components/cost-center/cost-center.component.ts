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

  cartCostCenterId: string;

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterService,
    protected paymentTypeService: PaymentTypeService
  ) {}

  get costCenters$(): Observable<CostCenter[]> {
    return this.userCostCenterService.getActiveCostCenters().pipe(
      filter((costCenters) => costCenters && costCenters.length > 0),
      tap((costCenters) => {
        if (this.costCenterId === undefined) {
          this.setCostCenter(costCenters[0].code);
        }
      })
    );
  }

  setCostCenter(selectCostCenter: string): void {
    this.costCenterId = selectCostCenter;
    this.checkoutCostCenterService.setCostCenter(this.costCenterId);
  }
}
