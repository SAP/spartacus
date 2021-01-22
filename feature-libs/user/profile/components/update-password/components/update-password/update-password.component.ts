import { Component, OnDestroy } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserPasswordService } from '@spartacus/user/profile/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnDestroy {
  private subscription = new Subscription();

  isLoading$ = new BehaviorSubject(false);

  constructor(
    private routingService: RoutingService,
    private userPasswordService: UserPasswordService,
    private globalMessageService: GlobalMessageService
  ) {}

  onSuccess(success: boolean): void {
    if (success) {
      this.globalMessageService.add(
        { key: 'updatePasswordForm.passwordUpdateSuccess' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      this.routingService.go({ cxRoute: 'home' });
    }
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
    this.subscription.add(
      this.userPasswordService
        .update(oldPassword, newPassword)
        .pipe(
          tap((state) => {
            console.log(state);
            this.isLoading$.next(state.loading);
            this.onSuccess(state.success);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
