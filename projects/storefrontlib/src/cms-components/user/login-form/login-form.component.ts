import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';
import { CustomFormValidators } from '../../../shared/index';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected winRef: WindowRef
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
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loginUser();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  protected loginUser(): void {
    const { userId, password } = this.loginForm.controls;
    from(
      this.auth.loginWithCredentials(
        userId.value.toLowerCase(), // backend accepts lowercase emails only
        password.value
      )
    )
      .pipe(
        withLatestFrom(this.auth.isUserLoggedIn()),
        tap(([_, isLoggedIn]) => {
          if (isLoggedIn) {
            // We want to remove error messages on successful login (primary the bad username/password combination)
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
          }
        })
      )
      .subscribe();
  }
}
