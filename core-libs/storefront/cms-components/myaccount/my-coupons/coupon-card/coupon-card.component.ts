/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, LowerCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewContainerRef,
  inject,
  output,
  input,
  viewChild,
} from '@angular/core';
import { CustomerCoupon, CxDatePipe, TranslatePipe } from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FocusDirective } from '../../../../layout/a11y/keyboard-focus/focus.directive';
import { LAUNCH_CALLER, LaunchDialogService } from '../../../../layout/index';
import { MyCouponsComponentService } from '../my-coupons.component.service';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    LowerCasePipe,
    TranslatePipe,
    CxDatePipe,
    FocusDirective,
  ],
})
export class CouponCardComponent {
  protected myCouponsComponentService = inject(MyCouponsComponentService);
  protected launchDialogService = inject(LaunchDialogService);
  protected vcr = inject(ViewContainerRef);

  readonly coupon = input<CustomerCoupon>();
  readonly couponSubscriptionLoading$ = input<Observable<boolean>>();

  readonly notificationChanged = output<{
    couponId: string;
    notification: boolean;
  }>();

  readonly element = viewChild<ElementRef>('element');

  onSubscriptionChange(): void {
    const coupon = this.coupon();
    if (!coupon) {
      return;
    }
    this.notificationChanged.emit({
      couponId: coupon.couponId ?? '',
      notification: !coupon.notificationOn,
    });
  }

  readMore() {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.COUPON,
      this.element(),
      this.vcr,
      { coupon: this.coupon() }
    );

    if (dialog) {
      dialog.pipe(take(1)).subscribe();
    }
  }

  findProducts(): void {
    const coupon = this.coupon();
    if (coupon) {
      this.myCouponsComponentService.launchSearchPage(coupon);
    }
  }
}
