import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
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
    private userService: UserService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit(): void {
    this.userService.resetUpdatePasswordProcessState();
    this.loading$ = this.userService.getUpdatePasswordResultLoading();
    this.subscription.add(
      this.userService
        .getUpdatePasswordResultSuccess()
        .subscribe(success => this.onSuccess(success))
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
    this.userService.updatePassword(oldPassword, newPassword);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.userService.resetUpdatePasswordProcessState();
  }
}
