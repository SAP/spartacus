import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  userId: string;
  loading$: Observable<boolean>;

  constructor(
    private routingService: RoutingService,
    private userService: UserService,
    private globalMessageService: GlobalMessageService
  ) {}

  ngOnInit() {
    this.userService.resetUpdatePasswordProcessState();
    this.loading$ = this.userService.getUpdatePasswordResultLoading();
    this.userService
      .get()
      .pipe(take(1))
      .subscribe(user => {
        this.userId = user.uid;
      });
    this.subscription.add(
      this.userService
        .getUpdatePasswordResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.globalMessageService.add({
        text: 'Password Updated',
        type: GlobalMessageType.MSG_TYPE_CONFIRMATION,
      });
      this.routingService.go({ route: ['home'] });
    }
  }

  ngOnDestroy() {}

  onCancel(): void {
    this.routingService.go({ route: ['home'] });
  }

  onSubmit({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): void {
    this.userService.updatePassword(this.userId, oldPassword, newPassword);
  }
}
