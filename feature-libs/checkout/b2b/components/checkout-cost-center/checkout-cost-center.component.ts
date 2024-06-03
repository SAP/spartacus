/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
import { CostCenter, UserCostCenterService } from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, take, tap } from 'rxjs/operators';

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

  costCenterId: string | undefined;
  costCenters$: Observable<CostCenter[]>;
  isAccountPayment: boolean;

  @HostBinding('class.hidden')
  get disabled() {
    return !this.isAccountPayment;
  }

  constructor(
    protected userCostCenterService: UserCostCenterService,
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade,
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.checkoutPaymentTypeFacade
        .isAccountPayment()
        .pipe(distinctUntilChanged())
        .subscribe((isAccountPayment) => {
          this.isAccountPayment = isAccountPayment;
        })
    );

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
