import { Component, OnInit, Input } from '@angular/core';

import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
})
export class CouponCardComponent implements OnInit {
  @Input() coupon: any;
  modalRef: ModalRef;

  constructor(protected modalService: ModalService) {}

  ngOnInit() {}

  onNotificationChange(): void {}

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
