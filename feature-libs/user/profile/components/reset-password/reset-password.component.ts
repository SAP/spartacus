import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';

@Component({
  selector: 'cx-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-form' },
})
export class ResetPasswordComponent {
  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  token$: Observable<string> = this.service.resetToken$;

  constructor(protected service: ResetPasswordComponentService) {}

  onSubmit(token: string) {
    this.service.resetPassword(token);
  }
}
