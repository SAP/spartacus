import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '@spartacus/storefront';

@Component({
  selector: 'cx-login-register',
  templateUrl: './checkout-login-register.component.html',
})
export class CheckoutLoginRegisterComponent implements OnInit {
  loginAsGuest = false;

  constructor(
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: consider using events or inputs to avoid depending on checkout library
    if (this.checkoutConfigService.isGuestCheckout()) {
      this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
    }
  }
}
