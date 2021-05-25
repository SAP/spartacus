import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '../../checkout/services/index';

/**
 * @deprecated since 3.2, use @spartacus/user package instead.
 */
@Component({
  selector: 'cx-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit {
  loginAsGuest = false;

  constructor(
    protected checkoutConfigService: CheckoutConfigService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.checkoutConfigService.isGuestCheckout()) {
      this.loginAsGuest = this.activatedRoute?.snapshot?.queryParams?.[
        'forced'
      ];
    }
  }
}
