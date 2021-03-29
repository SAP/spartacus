import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ErrorModel,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResetPasswordComponentService {
  constructor(
    protected userPasswordService: UserPasswordFacade,
    protected routingService: RoutingService,
    protected globalMessage: GlobalMessageService
  ) {}

  protected busy = new BehaviorSubject(false);

  isUpdating$ = this.busy.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  resetToken$: Observable<string> = this.routingService
    .getRouterState()
    .pipe(
      map((routerState: RouterState) => routerState.state.queryParams['token'])
    );

  form: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        CustomFormValidators.passwordValidator,
      ]),
      passwordConfirm: new FormControl('', Validators.required),
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordConfirm'
      ),
    }
  );

  resetPassword(token: string): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy.next(true);

    const password = (this.form.get('password') as FormControl).value;

    this.userPasswordService.reset(token, password).subscribe({
      next: () => this.onSuccess(),
      error: (error: HttpErrorModel) => this.onError(error),
      complete: () => {},
    });
  }

  protected onSuccess(): void {
    this.globalMessage.add(
      { key: 'forgottenPassword.passwordResetSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.resetForm();
    this.redirect();
  }

  protected onError(error: HttpErrorModel): void {
    this.busy.next(false);
    if (error.details) {
      error.details.forEach((err: ErrorModel) => {
        if (err.message) {
          this.globalMessage.add(
            { raw: err.message },
            GlobalMessageType.MSG_TYPE_ERROR
          );
        }
      });
    }
  }

  /**
   * Redirects the user to the login page.
   */
  protected redirect() {
    this.routingService.go({ cxRoute: 'login' });
  }

  protected resetForm() {
    this.busy.next(false);
    this.form.reset();
  }
}
