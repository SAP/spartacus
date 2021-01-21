import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { UserPasswordService } from '@spartacus/user/profile/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  loading$: Observable<boolean>;

  constructor(
    private routingService: RoutingService,
    private userPasswordService: UserPasswordService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.userPasswordService.updatePasswordCallState.clear();
    this.loading$ = this.userPasswordService.updatePasswordCallState.isLoading();
    this.subscription.add(
      this.userPasswordService.updatePasswordCallState
        .isSuccessful()
        .subscribe((success) => this.onSuccess(success))
    );
  }

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
    this.userPasswordService.update(oldPassword, newPassword);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userPasswordService.updatePasswordCallState.clear();
  }
}
