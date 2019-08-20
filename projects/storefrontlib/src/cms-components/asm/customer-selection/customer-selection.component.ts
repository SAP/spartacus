import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsmService } from '@spartacus/core';
import { FormUtils } from '../../../shared/utils/forms/form-utils';

@Component({
  selector: 'cx-customer-selection',
  templateUrl: './customer-selection.component.html',
})
export class CustomerSelectionComponent implements OnInit {
  form: FormGroup;
  private submitClicked = false;

  @Output()
  submitEvent = new EventEmitter<{ customerId: string }>();

  constructor(private fb: FormBuilder, private asmService: AsmService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      customerId: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
    this.submitEvent.emit({ customerId: this.form.controls.customerId.value });
  }

  onSearch(): void {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
    this.asmService.customerSearch(this.form.controls.customerId.value);
  }

  isNotValid(formControlName: string): boolean {
    return FormUtils.isNotValidField(
      this.form,
      formControlName,
      this.submitClicked
    );
  }
}
