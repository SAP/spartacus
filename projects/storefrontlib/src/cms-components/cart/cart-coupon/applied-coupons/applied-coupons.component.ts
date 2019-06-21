import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from '@spartacus/core';

@Component({
  selector: 'cx-applied-coupons',
  templateUrl: './applied-coupons.component.html',
})
export class AppliedCouponsComponent implements OnInit {
  userId: string;

  @Input()
  vouchers: Voucher[];

  constructor() {}

  ngOnInit() {}
}
