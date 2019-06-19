import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
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
    private auth: AuthService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    private authRedirectService: AuthRedirectService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const userId = this.emailToLowerCase();
    this.auth.authorize(userId, this.form.controls.password.value);

    if (!this.sub) {
      this.sub = this.auth.getUserToken().subscribe(data => {
        if (data && data.access_token) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          this.authRedirectService.redirect();
        }
      });
    }
  }

  /*
   * Change the inputed email to lowercase because
   * the backend only accepts lowercase emails
   */
  emailToLowerCase() {
    return this.form.controls.userId.value.toLowerCase();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
