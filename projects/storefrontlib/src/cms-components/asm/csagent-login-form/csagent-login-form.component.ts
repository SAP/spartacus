import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/utils/forms/form-utils';

@Component({
  selector: 'cx-csagent-login-form',
  templateUrl: './csagent-login-form.component.html',
})
export class CSAgentLoginFormComponent implements OnInit {
  form: FormGroup;
  private submitClicked = false;

  @Input()
  csAgentTokenLoading = false;

  @Output()
  submitEvent = new EventEmitter<{ userId: string; password: string }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }

    this.submitEvent.emit({
      userId: this.form.controls.userId.value,
      password: this.form.controls.password.value,
    });
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }
}
