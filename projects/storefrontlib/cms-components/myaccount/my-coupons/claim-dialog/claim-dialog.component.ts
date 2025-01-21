/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import {
  RoutingService,
  CustomerCouponService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { FocusConfig, LaunchDialogService } from '../../../../layout/index';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimDialogComponent implements OnDestroy, OnInit {
  private subscription = new Subscription();
  iconTypes = ICON_TYPE;
  protected pageSize = 10;
  couponCode: string;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };

  form: FormGroup = new FormGroup({
    couponCode: new FormControl('', [Validators.required]),
  });

  protected couponService = inject(CustomerCouponService);
  protected routingService = inject(RoutingService);
  protected messageService = inject(GlobalMessageService);
  protected launchDialogService = inject(LaunchDialogService);

  ngOnInit(): void {
    this.subscription.add(
      this.launchDialogService.data$.subscribe((data) => {
        if (data) {
          this.couponCode = data.coupon;
          this.pageSize = data.pageSize;
          (this.form.get('couponCode') as FormControl).setValue(
            this.couponCode
          );
        }
      })
    );
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const couponVal = (this.form.get('couponCode') as FormControl).value;
    if (couponVal) {
      this.couponService.claimCustomerCoupon(couponVal);
      this.subscription = this.couponService
        .getClaimCustomerCouponResultSuccess()
        .subscribe((success) => {
          if (success) {
            this.messageService.add(
              { key: 'myCoupons.claimCustomerCoupon' },
              GlobalMessageType.MSG_TYPE_CONFIRMATION
            );
          }
          this.routingService.go({ cxRoute: 'coupons' });
          this.couponService.loadCustomerCoupons(this.pageSize);
          this.close('Cross click');
        });
    } else {
      this.routingService.go({ cxRoute: 'notFound' });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  close(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  cancelEdit(): void {
    (this.form.get('couponCode') as FormControl).setValue(this.couponCode);
  }
}
