import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
  form: FormGroup = this.service.form;

  constructor(protected service: ForgotPasswordService) {}

  onSubmit(): void {
    this.service.submit();
  }

  ngOnDestroy() {
    // Form has to be reset in order to have a clean form
    // next time component is called
    this.service.reset();
  }
}
