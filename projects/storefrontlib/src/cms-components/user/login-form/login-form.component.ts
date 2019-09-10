import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
  FeatureConfigService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;

  constructor(
    auth: AuthService,
    globalMessageService: GlobalMessageService,
    fb: FormBuilder,
    authRedirectService: AuthRedirectService,
    winRef: WindowRef // tslint:disable-line
  );

  /**
   * @deprecated since 1.1.0
   * NOTE: check issue:#4055 for more info
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
    protected featureConfig?: FeatureConfigService
  ) {}

  readonly isSomeNewFeatureEnabled = this.featureConfig.isLevel('1.1');

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required],
    });

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
    // TODO(issue:#xxxx) Deprecated since 1.3.0
    if (this.shouldDisableLoginButton()) {
      this.submitLogin();
    } else {
      if (this.form.valid) {
        this.submitLogin();
      } else {
        this.markFormAsDirty();
      }
    }
  }

  private submitLogin(): void {
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

  private markFormAsDirty(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
    });
  }

  /**
   * @deprecated since 1.3.0
   * This function will be removed as login button should not be disabled
   *
   * TODO(issue:#xxxx) Deprecated since 1.3.0
   */
  protected shouldDisableLoginButton(): boolean {
    if (this.featureConfig && this.featureConfig.isLevel('1.3')) {
      return false;
    }
    return this.form.invalid;
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
