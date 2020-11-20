import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateEmailService } from './update-email.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-update-email',
  templateUrl: './update-email.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmailComponent implements OnInit, OnDestroy {
  constructor(
    protected updateEmailService: UpdateEmailService
  ) {
  }
  updateEmailForm: FormGroup;
  isLoading$: Observable<boolean>;

  ngOnInit() {
    this.updateEmailService.resetUpdateEmailResultState();
    this.isLoading$ = this.updateEmailService.getUpdateEmailResultLoading();
    this.updateEmailForm = this.updateEmailService.form;
  }

  ngOnDestroy() {
    this.updateEmailForm.reset();
  }

  onSubmit(): void {
    this.updateEmailService.onFormSubmit();
  }
}
