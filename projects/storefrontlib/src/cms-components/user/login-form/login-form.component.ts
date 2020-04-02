import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CheckoutConfigService } from '../../checkout/services/checkout-config.service';
import { CustomFormValidators } from '../../../shared/index';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loginForm: FormGroup;
  loginAsGuest = false;

  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected authRedirectService: AuthRedirectService,
    protected winRef: WindowRef,
    protected activatedRoute: ActivatedRoute,
    protected checkoutConfigService: CheckoutConfigService
  ) {}

  ngOnInit(): void {
    const routeState = this.winRef.nativeWindow?.history?.state;
    const prefilledEmail = routeState?.['newUid'];

    this.loginForm = this.fb.group({
      userId: [
        prefilledEmail?.length ? prefilledEmail : '',
        [Validators.required, CustomFormValidators.emailValidator],
      ],
      password: ['', Validators.required],
    });

    if (this.checkoutConfigService.isGuestCheckout()) {
      this.loginAsGuest = this.activatedRoute?.snapshot?.queryParams?.[
        'forced'
      ];
    }
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.login();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private login(): void {
    const { userId, password } = this.loginForm.controls;
    this.auth.authorize(
      userId.value.toLowerCase(), // backend accepts lowercase emails only
      password.value
    );

    if (!this.sub) {
      this.sub = this.auth.getUserToken().subscribe((data) => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      });
    }
  }
}
