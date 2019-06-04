import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from '../../../../../shared/components/modal/index';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/index';

@Component({
  selector: 'cx-coupon-dialog',
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.scss'],
})
export class CouponDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  coupon: any;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  constructor(protected modalService: ModalService) {}

  ngOnInit() {}

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
