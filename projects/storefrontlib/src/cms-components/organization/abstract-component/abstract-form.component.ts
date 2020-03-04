import { EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UrlCommandRoute } from '@spartacus/core';
import { FormUtils } from '../../../shared/utils/forms/form-utils';

export class AbstractFormComponent {
  form: FormGroup;

  @Input()
  actionBtnLabel: string;

  @Input()
  cancelBtnLabel: string;

  @Input()
  showCancelBtn = true;

  @Input()
  routerBackLink: UrlCommandRoute;

  @Output()
  submit = new EventEmitter<any>();

  @Output()
  clickBack = new EventEmitter<any>();

  submitClicked = false;

  back(): void {
    this.clickBack.emit();
  }

  verifyAndSubmit(): void {
    this.submitClicked = true;
    if (!this.form.invalid) {
      this.submit.emit(this.form.value);
    }
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }
}
