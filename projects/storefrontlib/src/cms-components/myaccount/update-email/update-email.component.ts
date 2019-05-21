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
  styleUrls: ['./update-email.component.scss'],
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
  constructor(
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  private subscription = new Subscription();
  private uid: string;
  private newUid: string;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.userService.resetUpdateEmailResultState();
    this.subscription.add(
      this.userService.get().subscribe(result => (this.uid = result.uid))
    );
    this.subscription.add(
      this.userService
        .getUpdateEmailResultSuccess()
        .subscribe(success => this.onSuccess(success))
    );
    this.isLoading$ = this.userService.getUpdateEmailResultLoading();
  }

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ newUid, password }: { newUid: string; password: string }): void {
    this.newUid = newUid;
    this.userService.updateEmail(this.uid, password, newUid);
  }

  onSuccess(success: boolean): void {
    if (success) {
      this.globalMessageService.add(
        {
          key: 'updateEmailForm.emailUpdateSuccess',
          params: { newUid: this.newUid },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      this.authService.logout();
      this.routingService.go({ cxRoute: 'login' });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.userService.resetUpdateEmailResultState();
  }
}
