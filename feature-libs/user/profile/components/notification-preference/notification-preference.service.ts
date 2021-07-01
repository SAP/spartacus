import { Injectable } from '@angular/core';
import {
  NotificationPreference,
  UserNotificationPreferenceFacade,
} from '@spartacus/user/profile/root';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NotificationPreferenceComponentService {
  constructor(protected service: UserNotificationPreferenceFacade) {}

  protected busy$ = new BehaviorSubject(false);
  isUpdating$ = this.busy$.asObservable();

  preferences$ = this.service.loadAll();

  update(preference: NotificationPreference) {
    this.busy$.next(true);

    this.service.update([preference]).subscribe({
      next: () => this.onSuccess(),
      error: (error: Error) => this.onError(error),
    });
  }

  protected onSuccess(): void {
    // this.globalMessage.add(
    //   { key: 'forgottenPassword.passwordResetEmailSent' },
    //   GlobalMessageType.MSG_TYPE_CONFIRMATION
    // );
    this.busy$.next(false);
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
  }
}
