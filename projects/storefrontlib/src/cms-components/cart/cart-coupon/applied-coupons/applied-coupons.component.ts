import { Component, Input, OnInit } from '@angular/core';
import { Voucher } from 'projects/backend/occ-client/lib/models';

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
