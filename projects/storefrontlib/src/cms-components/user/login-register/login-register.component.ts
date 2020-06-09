import { Component, OnInit } from '@angular/core';
import { CheckoutConfigService } from '../../checkout/services';
import { ActivatedRoute } from '@angular/router';

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
