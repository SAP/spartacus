import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  ModalRef,
  ModalService,
} from '../../../../shared/components/modal/index';
import { CouponDialogComponent } from './coupon-dialog/coupon-dialog.component';
import { CustomerCoupon } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-coupon-card',
  templateUrl: './coupon-card.component.html',
})
export class CouponCardComponent implements OnInit {
  @Input() coupon: CustomerCoupon;
  @Input() couponLoading$: Observable<boolean>;
  modalRef: ModalRef;
  decodedUrl = '';

  @Output()
  notificationChanged = new EventEmitter<{
    couponId: string;
    notification: boolean;
  }>();
  constructor(protected modalService: ModalService) {}

  ngOnInit() {
    // Because the response of solarFacates is encoded and contains ' " ', we need to decode it and remove the ' " '
    this.decodedUrl = decodeURIComponent(this.coupon.solrFacets).replace(
      /\"/g,
      ''
    );
  }

  notificationChange(): void {
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
}
