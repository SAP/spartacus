import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { UpdateEmailService } from './update-email.service';
import { takeUntil } from 'rxjs/operators';
import { UpdateEmailFormService } from './update-email.form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnInit {
  constructor(
    protected updateEmailService: UpdateEmailService,
    protected updateEmailFormService: UpdateEmailFormService
  ) {
  }
  updateEmailForm: FormGroup;
  isLoading$: Observable<boolean>;
  protected newUid: string;

  ngOnInit() {
    this.isLoading$ = this.updateEmailService.getUpdateEmailResultLoading();
    this.updateEmailService.resetUpdateEmailResultState();
    this.updateEmailForm = this.updateEmailFormService.updateEmailForm;
  }

  onCancel(): void {
    this.updateEmailService.goToRoute({ cxRoute: 'home' });
  }

  onSubmit(): void {
    if (this.updateEmailForm.valid) {
      this.newUid = this.updateEmailForm.get('confirmEmail').value;
      this.updateEmailService.updateEmail(this.updateEmailForm.get('password').value, this.newUid);

      this.updateEmailService
        .getUpdateEmailResultSuccess()
        .pipe(takeUntil(this.updateEmailService.destroy$))
        .subscribe((success) => this.onSuccess(success))
    } else {
      this.updateEmailForm.markAllAsTouched();
    }
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
      this.updateEmailForm.reset();
      await this.updateEmailService.logout();
      this.updateEmailService.resetUpdateEmailResultState();
      this.updateEmailService.destroySubscription();
      this.updateEmailService.goToRoute({ cxRoute: 'login' }, null, {
        state: {
          newUid: this.newUid,
        },
      });
    }
  }
}
