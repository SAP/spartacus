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
    auth: AuthService,
    globalMessageService: GlobalMessageService,
    fb: FormBuilder,
    authRedirectService: AuthRedirectService,
    winRef: WindowRef, // tslint:disable-line,
    activatedRoute: ActivatedRoute,
    checkoutConfigService: CheckoutConfigService
  );

  /**
   * @deprecated since 1.1.0
   * Use constructor(
   * auth: AuthService,
   * globalMessageService: GlobalMessageService,
   * fb: FormBuilder,
   * authRedirectService: AuthRedirectService,
   *  winRef: WindowRef,
   * activatedRoute: ActivatedRoute,
   * checkoutConfigService: CheckoutConfigService) instead
   *
   * TODO(issue:#4055) Deprecated since 1.1.0
   */
  constructor(
    auth: AuthService,
    globalMessageService: GlobalMessageService,
    fb: FormBuilder,
    authRedirectService: AuthRedirectService
  );
  constructor(
    private auth: AuthService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    private authRedirectService: AuthRedirectService,
    private winRef?: WindowRef,
    private activatedRoute?: ActivatedRoute,
    private checkoutConfigService?: CheckoutConfigService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required],
    });

    if (
      this.checkoutConfigService &&
      this.checkoutConfigService.isGuestCheckout()
    ) {
      this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
    }

    // TODO(issue:#4055) Deprecated since 1.1.0
    if (this.winRef && this.winRef.nativeWindow) {
      const routeState =
        this.winRef.nativeWindow.history &&
        this.winRef.nativeWindow.history.state;

      if (routeState && routeState['newUid'] && routeState['newUid'].length) {
        this.prefillForm('userId', routeState['newUid']);
      }
    }
  }

  login(): void {
    const { userId, password } = this.form.controls;
    this.auth.authorize(
      userId.value.toLowerCase(), // backend accepts lowercase emails only
      password.value
    );

    if (!this.sub) {
      this.sub = this.auth.getUserToken().subscribe(data => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      });
    }
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
