import { Component, OnDestroy } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserEmailFacade } from '@spartacus/user/profile/root';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
})
export class UpdateEmailComponent implements OnDestroy {
  constructor(
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private userEmail: UserEmailFacade,
    private authService: AuthService
  ) {}

  private subscription = new Subscription();
  private newUid: string;
  isLoading$ = new BehaviorSubject(false);

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ newUid, password }: { newUid: string; password: string }): void {
    this.newUid = newUid;
    this.subscription.add(
      this.userEmail
        .update(password, newUid)
        .pipe(
          tap((state) => {
            this.isLoading$.next(state.loading);
            this.onSuccess(state.success);
          })
        )
        .subscribe()
    );
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
  }
}
