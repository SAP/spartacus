import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateEmailService {
  isUpdating$ = new BehaviorSubject(false);

  constructor(
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService,
    protected userEmail: UserEmailFacade,
    protected authService: AuthService
  ) {}

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

  reset(): void {
    this.form.reset();
  }

  save(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isUpdating$.next(true);

    const newEmail = this.form.get('confirmEmail')?.value;
    const password = this.form.get('password')?.value;

    this.userEmail.update(password, newEmail).subscribe({
      next: () => this.onSuccess(newEmail),
      complete: () => this.isUpdating$.next(false),
    });

    this.form.disable();
  }

  /**
   * Show global message then log the user out
   * and redirect to login page
   *
   * @param newUid
   * @protected
   */
  protected onSuccess(newUid: string): void {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.form.reset();
    this.form.enable();
    // TODO(#9638): Use logout route when it will support passing redirect url
    this.authService.coreLogout().then(() => {
      this.routingService.go({ cxRoute: 'login' }, undefined, {
        state: {
          newUid,
        },
      });
    });
  }
}
