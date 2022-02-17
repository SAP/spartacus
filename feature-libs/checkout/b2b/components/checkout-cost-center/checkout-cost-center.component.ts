import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CostCenter, UserCostCenterService } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center',
  templateUrl: './checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutCostCenterComponent implements OnInit {
  costCenterId: string | undefined;
  costCenters$: Observable<CostCenter[]>;

  protected userCostCenters$: Observable<CostCenter[]> =
    this.userCostCenterService
      .getActiveCostCenters()
      .pipe(filter((costCenters) => !!costCenters));

  isAccountPayment$: Observable<boolean> = this.checkoutPaymentTypeFacade
    .isAccountPayment()
    .pipe(distinctUntilChanged());

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade
  ) {}

  ngOnInit(): void {
    this.costCenters$ = combineLatest([
      this.userCostCenters$,
      this.checkoutCostCenterFacade.getCostCenterState().pipe(
        filter((state) => !state.loading),
        map((state) => state.data),
        distinctUntilChanged()
      ),
    ]).pipe(
      take(1),
      tap(([costCenters, costCenter]) => {
        if (!costCenter) {
          this.setCostCenter(costCenters[0].code as string);
        } else {
          this.costCenterId = costCenter.code;
        }
      }),
      map(([costCenters]) => costCenters)
    );
  }

  setCostCenter(selectCostCenter: string): void {
    this.costCenterId = selectCostCenter;
    this.checkoutCostCenterFacade.setCostCenter(this.costCenterId);
  }
}
