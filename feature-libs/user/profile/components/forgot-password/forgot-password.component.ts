import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
  constructor(protected service: ForgotPasswordService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.requestEmail();
  }

  ngOnDestroy() {
    this.service.resetForm();
  }
}
