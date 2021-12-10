import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UpdateEmailComponentService {
  constructor(
    protected userEmail: UserEmailFacade,
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService
  ) {}

  protected busy$ = new BehaviorSubject(false);

  isUpdating$ = this.busy$.pipe(
    tap((state) => (state === true ? this.form.disable() : this.form.enable()))
  );

  form: FormGroup = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ]),
      confirmEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    },
    {
      validators: CustomFormValidators.emailsMustMatch('email', 'confirmEmail'),
    }
  );

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.userEmail.update(password, newEmail).subscribe({
      next: () => this.onSuccess(newEmail),
      error: (error: Error) => this.onError(error),
    });
  }

  /**
   * Handles successful updating of the user email.
   */
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.busy$.next(false);
    this.form.reset();
    // sets the redirect url after login
    this.authRedirectService.setRedirectUrl(
      this.routingService.getUrl({ cxRoute: 'home' })
    );
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().then(() => {
      this.routingService.go(
        { cxRoute: 'login' },
        {
          state: {
            newUid,
          },
        }
      );
    });
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
  }
}
