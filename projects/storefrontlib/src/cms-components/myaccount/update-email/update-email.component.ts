import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  GlobalMessageType,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { UpdateEmailService } from './update-email.service';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
  constructor(
    private updateEmailService: UpdateEmailService,
  ) {}

  private subscription = new Subscription();
  private _newUid: string;

  isLoading$: Observable<boolean>;

  get newUid(): string {
    return this._newUid;
  }

  set newUid(val: string) {
    this._newUid = val;
  }

  ngOnInit() {
    this.updateEmailService.resetUpdateEmailResultState();
    this.subscription.add(
      this.updateEmailService
        .getUpdateEmailResultSuccess()
        .subscribe((success) => this.onSuccess(success))
    );
    this.isLoading$ = this.updateEmailService.getUpdateEmailResultLoading();
  }

  onCancel(): void {
    this.updateEmailService.goToRoute({ cxRoute: 'home' });
  }

  onSubmit({ newUid, password }: { newUid: string; password: string }): void {
    this.newUid = newUid;
    this.updateEmailService.updateEmail(password, newUid);
  }

  async onSuccess(success: boolean): Promise<void> {
    if (success) {
      this.updateEmailService.addGlobalMessage(
        {
          key: 'updateEmailForm.emailUpdateSuccess',
          params: { newUid: this.newUid },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
      await this.updateEmailService.logout();
      this.updateEmailService.goToRoute({ cxRoute: 'login' }, null, {
        state: {
          newUid: this.newUid,
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.updateEmailService.resetUpdateEmailResultState();
  }
}
