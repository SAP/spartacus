import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  CheckoutCostCenterFacade,
  CheckoutPaymentTypeFacade,
} from '@spartacus/checkout/b2b/root';
import { CheckoutDeliveryModesFacade } from '@spartacus/checkout/base/root';
import { CostCenter, UserCostCenterService } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'cx-cost-center',
  templateUrl: './checkout-cost-center.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutCostCenterComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  protected userCostCenters$: Observable<CostCenter[]> =
    this.userCostCenterService
      .getActiveCostCenters()
      .pipe(filter((costCenters) => !!costCenters));

  @HostBinding('class.hidden')
  get disabled() {
    return !this.isAccountPayment;
  }

  costCenterId: string | undefined;
  costCenters$: Observable<CostCenter[]>;
  isAccountPayment: boolean;

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade,
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade
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

    this.subscription.add(
      this.checkoutPaymentTypeFacade
        .isAccountPayment()
        .pipe(distinctUntilChanged())
        .subscribe((paymentType) => {
          this.isAccountPayment = paymentType;
        })
    );
  }

  setCostCenter(selectCostCenter: string): void {
    this.costCenterId = selectCostCenter;
    this.checkoutCostCenterFacade
      .setCostCenter(this.costCenterId)
      .pipe(
        switchMap(() =>
          this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()
        )
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
