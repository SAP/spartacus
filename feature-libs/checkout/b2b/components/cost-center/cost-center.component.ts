import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CostCenter, UserCostCenterService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center',
  templateUrl: 'cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostCenterComponent {
  costCenterId: string | undefined;

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterService: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeService: CheckoutPaymentTypeFacade
  ) {}

  get isAccountPayment$(): Observable<boolean> {
    return this.checkoutPaymentTypeService.isAccountPayment();
  }

  get costCenters$(): Observable<CostCenter[]> {
    return combineLatest([
      this.userCostCenterService
        .getActiveCostCenters()
        .pipe(filter((costCenters) => !!costCenters)),
      this.checkoutCostCenterService.getCostCenterState().pipe(
        filter((state) => !state.loading),
        map((state) => state.data),
        distinctUntilChanged()
      ),
    ]).pipe(
      tap(([costCenters, costCenterCode]) => {
        if (!Boolean(costCenterCode)) {
          this.setCostCenter(costCenters[0].code as string);
        } else {
          this.costCenterId = costCenterCode;
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
