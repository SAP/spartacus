import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-opf-verify-payment',
  templateUrl: './opf-verify-payment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfVerifyPaymentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('this is OpfVerifyPaymentComponent');
  }
}
