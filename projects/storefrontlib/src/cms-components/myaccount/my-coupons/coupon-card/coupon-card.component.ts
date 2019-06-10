import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { CustomerCoupon } from '@spartacus/core';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
})
export class CouponCardComponent implements OnInit {
  @Input() coupon: CustomerCoupon;
  modalRef: ModalRef;

  @Output()
  notificationChanged = new EventEmitter<{
    notification: boolean;
    couponId: string;
  }>();

  notification = false;

  constructor(protected modalService: ModalService) {}

  ngOnInit() {
    this.notification = this.coupon.notificationOn;
  }

  onNotificationChange(): void {
    this.notification = this.coupon.notificationOn;
    this.notificationChanged.emit({
      notification: !this.notification,
      couponId: this.coupon.couponId,
    });
  }

  findProduct(): void {}

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
}
