import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordComponentService } from './forgot-password-component.service';

@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  constructor(protected service: ForgotPasswordComponentService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  onSubmit(): void {
    this.service.requestEmail();
  }
}
