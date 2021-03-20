import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';

/**
 * @deprecated since 3.2, use @spartacus/user package instead.
 */
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
  form: FormGroup = this.service.form;

  constructor(protected service: ForgotPasswordService) {}
  ngOnDestroy() {
    this.service.reset();
  }

  onSubmit(): void {
    this.service.submit();
  }
}
