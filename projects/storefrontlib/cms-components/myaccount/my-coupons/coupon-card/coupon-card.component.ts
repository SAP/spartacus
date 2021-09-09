import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { CustomerCoupon } from '@spartacus/core';
import { MyCouponsComponentService } from '../my-coupons.component.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
})
export class CouponCardComponent {
  @Input() coupon: CustomerCoupon;
  @Input() couponSubscriptionLoading$: Observable<boolean>;
  modalRef: ModalRef;

  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();

  constructor(
    protected modalService: ModalService,
    protected myCouponsComponentService: MyCouponsComponentService
  ) {}

  onSubscriptionChange(): void {
    this.notificationChanged.emit({
      couponId: this.coupon.couponId,
      notification: !this.coupon.notificationOn,
    });
  }

  readMore() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(CouponDialogComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    modalInstance.coupon = this.coupon;
  }

  findProducts(): void {
    this.myCouponsComponentService.launchSearchPage(this.coupon);
  }
}
