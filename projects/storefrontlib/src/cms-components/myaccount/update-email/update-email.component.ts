import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  // change detection!
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
  // try to min constr arguments
  constructor(
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private userService: UserService,
    private authService: AuthService // bring in comp service
  ) {}

  // try to avoid comp subscription, we like to use the async pipe.
  private subscription = new Subscription();

  // try to avoid private accessors.
  private newUid: string;

  // try to avoid isLoading altogether, we like ghost/skeletons with startWith data
  // see organizationListService
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
      await this.authService.logout();
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
