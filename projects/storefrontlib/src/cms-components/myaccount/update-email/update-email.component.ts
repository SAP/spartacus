import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
  UserService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
  constructor(
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  private subscription = new Subscription();
  private newUid: string;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.userService.resetUpdateEmailResultState();
    this.subscription.add(
      this.userService
        .getUpdateEmailResultSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
    this.isLoading$ = this.userService.getUpdateEmailResultLoading();
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ newUid, password }: { newUid: string; password: string }): void {
    this.newUid = newUid;
    this.userService.updateEmail(password, newUid);
  }

  async onSuccess(success: boolean): Promise<void> {
    if (success) {
      this.globalMessageService.add(
        {
          key: 'updateEmailForm.emailUpdateSuccess',
          params: { newUid: this.newUid },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      // TODO(#9638): Use logout route when it will support passing redirect url
      await this.authService.coreLogout();
      this.routingService.go({ cxRoute: 'login' }, null, {
        state: {
          newUid: this.newUid,
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userService.resetUpdateEmailResultState();
  }
}
