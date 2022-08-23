import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  WindowRef,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { BehaviorSubject, from } from 'rxjs';
import { tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class LoginFormComponentService {
  constructor(
    protected auth: AuthService,
    protected globalMessage: GlobalMessageService,
    protected winRef: WindowRef
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => {
      const userId = this.winRef.nativeWindow?.history?.state?.['newUid'];
      if (userId) {
        this.form.patchValue({ userId });
      }
      state === true ? this.form.disable() : this.form.enable();
    })
  );

  form: UntypedFormGroup = new UntypedFormGroup({
    userId: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    password: new UntypedFormControl('', Validators.required),
  });

  login() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    from(
      this.auth.loginWithCredentials(
        // TODO: consider dropping toLowerCase as this should not be part of the UI,
        // as it's too opinionated and doesn't work with other AUTH services
        this.form.value.userId.toLowerCase(),
        this.form.value.password
      )
    )
      .pipe(
        withLatestFrom(this.auth.isUserLoggedIn()),
        tap(([_, isLoggedIn]) => this.onSuccess(isLoggedIn))
      )
      .subscribe();
  }

  protected onSuccess(isLoggedIn: boolean): void {
    if (isLoggedIn) {
      // We want to remove error messages on successful login (primary the bad
      // username/password combination)
      this.globalMessage.remove(GlobalMessageType.MSG_TYPE_ERROR);
      this.form.reset();
    }

    this.busy$.next(false);
  }
}
