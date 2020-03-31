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
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';
import { CheckoutConfigService } from '../../checkout/services/checkout-config.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;
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
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required],
    });

    if (this.checkoutConfigService.isGuestCheckout()) {
      this.loginAsGuest = this.activatedRoute?.snapshot?.queryParams?.[
        'forced'
      ];
    }

    const prefilledEmail = this.winRef?.nativeWindow?.history?.state?.[
      'newUid'
    ];

    if (prefilledEmail?.length) {
      this.prefillForm('userId', prefilledEmail);
    }
  }

  login(): void {
    if (this.form.valid) {
      this.submitLogin();
    } else {
      this.markFormAsTouched();
    }
  }

  private submitLogin(): void {
    const { userId, password } = this.form.controls;
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

  private markFormAsTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].markAsTouched();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private prefillForm(field: string, value: string): void {
    this.form.patchValue({
      [field]: value,
    });

    this.form.get(field).markAsTouched(); // this action will check field validity on load
  }
}
