import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { CustomerCoupon } from '@spartacus/core';
import { MyCouponsComponentService } from '../my-coupons.component.service';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
})
export class CouponCardComponent implements OnInit {
  @Input() coupon: CustomerCoupon;
  @Input() couponLoading = true;
  modalRef: ModalRef;

  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();

  notification = false;

  constructor(
    protected modalService: ModalService,
    protected myCouponsComponentService: MyCouponsComponentService
  ) {}

  ngOnInit() {
    this.notification = this.coupon.notificationOn;
  }

  onNotificationChange(): void {
    this.notification = this.coupon.notificationOn;
    this.notificationChanged.emit({
      couponId: this.coupon.couponId,
      notification: !this.notification,
    });
  }

  readMore() {
    this.openModal();
  }

  private openModal() {
    let modalInstance: any;
    this.modalRef = this.modalService.open(CouponDialogComponent, {
      centered: true,
      size: 'lg',
    });

    modalInstance = this.modalRef.componentInstance;
    modalInstance.coupon = this.coupon;
  }

  findProduct(): void {
    this.myCouponsComponentService.launchSearchPage(this.coupon);
  }
}
