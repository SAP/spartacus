import { Component } from '@angular/core';
import {
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { UserEmailFacade } from '@spartacus/user/profile/root';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
})
export class UpdateEmailComponent {
  constructor(
    private routingService: RoutingService,
    private globalMessageService: GlobalMessageService,
    private userEmail: UserEmailFacade,
    private authService: AuthService
  ) {}

  private newUid: string;
  isLoading$ = new BehaviorSubject(false);

  onCancel(): void {
    this.routingService.go({ cxRoute: 'home' });
  }

  onSubmit({ newUid, password }: { newUid: string; password: string }): void {
    this.newUid = newUid;
    this.isLoading$.next(true);

    this.userEmail.update(password, newUid).subscribe({
      next: () => this.onSuccess(),
      error: () => {},
      complete: () => this.isLoading$.next(false),
    });
  }

  async onSuccess(): Promise<void> {
    this.globalMessageService.add(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid: this.newUid },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
    // TODO(#9638): Use logout route when it will support passing redirect url
    await this.authService.coreLogout();
    this.routingService.go({ cxRoute: 'login' }, undefined, {
      state: {
        newUid: this.newUid,
      },
    });
  }
}
