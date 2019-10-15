import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '../../services/checkout-config.service';

export abstract class AbstractCheckoutStepComponent implements OnInit {
  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: string;

  backButtonText = 'common.back';

  constructor(
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    if (this.checkoutStepUrlPrevious === 'cart') {
      this.backButtonText = 'checkout.backToCart';
    }
  }
}
