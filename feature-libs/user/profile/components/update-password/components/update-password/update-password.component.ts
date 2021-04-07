import { Component } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent {
  isLoading$ = new BehaviorSubject(false);

  constructor(
    protected routingService: RoutingService,
    protected userPassword: UserPasswordFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  onSuccess(): void {
    this.globalMessageService.add(
      { key: 'updatePasswordForm.passwordUpdateSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    this.routingService.go({ cxRoute: 'home' });
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): void {
    this.isLoading$.next(true);
    this.userPassword.update(oldPassword, newPassword).subscribe({
      next: () => this.onSuccess(),
      error: () => {
        this.isLoading$.next(false);
      },
      complete: () => {
        this.isLoading$.next(false);
      },
    });
  }
}
