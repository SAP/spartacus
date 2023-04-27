import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'cx-opf-checkout-payment-link',
  templateUrl: './opf-checkout-payment-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpfCheckoutPaymentLinkComponent implements OnInit {
  constructor(protected changeDetectionRef: ChangeDetectorRef) {}
  @Input() link?: string;

  ngOnInit(): void {
    this.changeDetectionRef.detectChanges();
  }
}
