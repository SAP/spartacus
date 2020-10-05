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
import { CustomFormValidators } from '../../../shared/index';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loginForm: FormGroup;

  constructor(
    protected auth: AuthService,
    protected globalMessageService: GlobalMessageService,
    protected fb: FormBuilder,
    protected authRedirectService: AuthRedirectService,
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

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  protected loginUser(): void {
    const { userId, password } = this.loginForm.controls;
    this.auth.authorize(
      userId.value.toLowerCase(), // backend accepts lowercase emails only
      password.value
    );

    if (!this.sub) {
      this.sub = this.auth.isUserLoggedIn().subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
        }
      });
    }
  }
}
