import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoginFormComponentService } from './login-form-component.service';

@Component({
  selector: 'cx-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(protected service: LoginFormComponentService) {}

  form: FormGroup = this.service.form;
  isUpdating$ = this.service.isUpdating$;

  @HostBinding('class.user-form') style = true;

  onSubmit(): void {
    this.service.login();
  }
}
