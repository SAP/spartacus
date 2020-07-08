import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';
import { CustomerCoupon } from '@spartacus/core';

@Component({
  selector: 'cx-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
})
export class CouponDialogComponent {
  iconTypes = ICON_TYPE;
  coupon: CustomerCoupon;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  constructor(protected modalService: ModalService) {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
