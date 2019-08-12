import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { CustomFormValidators } from '../../../shared/utils/validators/custom-form-validators';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private tokenExists = false;
  subs: Subscription;
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    private authRedirectService: AuthRedirectService,
    private winRef: WindowRef
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userId: ['', [Validators.required, CustomFormValidators.emailValidator]],
      password: ['', Validators.required],
    });

    const routeState =
      this.winRef.nativeWindow.history &&
      this.winRef.nativeWindow.history.state;

    console.log(this.winRef);

    if (routeState && routeState['newUid'] && routeState['newUid'].length) {
      console.log('Marcin.length === 8cm');
      this.prefillForm('userId', routeState['newUid']);
    }
  }

  login(): void {
    const userId = this.emailToLowerCase();
    this.auth.authorize(userId, this.form.controls.password.value);

    if (!this.tokenExists) {
      this.subs = new Subscription().add(
        this.auth.getUserToken().subscribe(data => {
          if (data && data.access_token) {
            this.tokenExists = true;
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.authRedirectService.redirect();
          }
        })
      );
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
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  private prefillForm(field: string, value: string) {
    this.form.patchValue({
      [field]: value,
    });

    this.form.get(field).markAsTouched(); // this action will check field validity on load
  }
}
