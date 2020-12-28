import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ForgotPasswordService } from './forgot-password.service';
@Component({
  selector: 'cx-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnDestroy {
  form: FormGroup = this.service.form;
  onSubmit = () => this.service.submit();

  constructor(protected service: ForgotPasswordService) {}
  ngOnDestroy() {
    this.service.reset();
  }
}
