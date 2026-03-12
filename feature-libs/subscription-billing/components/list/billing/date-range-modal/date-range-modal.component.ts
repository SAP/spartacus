import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@spartacus/core';
import {
  CustomFormValidators,
  DatePickerComponent,
  DatePickerService,
  FocusConfig,
  ICON_TYPE,
  IconModule,
  KeyboardFocusModule,
  LaunchDialogService,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-date-range-modal',
  imports: [
    TranslatePipe,
    DatePickerComponent,
    KeyboardFocusModule,
    IconModule,
  ],
  templateUrl: './date-range-modal.component.html',
})
export class DateRangeModalComponent {
  protected datePickerService = inject(DatePickerService);
  protected launchDialogService = inject(LaunchDialogService);

  minDate: string | null = null;
  maxDate: string | null = null;
  DATE_FILTER_PARAM = 'startAt:%s:endAt:%s';
  billsDateFilterForm = new FormGroup({
    from: new FormControl(this.minDate, { validators: [Validators.required] }),
    to: new FormControl(this.maxDate, { validators: [Validators.required] }),
  });

  constructor() {
    this.billsDateFilterForm.addValidators(
      CustomFormValidators.dateRange('from', 'to', (value: string) =>
        this.datePickerService.getDate(value)
      ) as ValidatorFn
    );
    this.launchDialogService.data$.subscribe((data) => {
      this.minDate = data.minDate;
      this.maxDate = data.maxDate;
      this.billsDateFilterForm.controls.from.setValue(data.minDate);
      this.billsDateFilterForm.controls.to.setValue(data.maxDate);
    });
  }

  iconTypes = ICON_TYPE;
  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };

  onFilterDateChange(): void {
    this.minDate = this.billsDateFilterForm.controls.from.value;
    this.maxDate = this.billsDateFilterForm.controls.to.value;

    this.billsDateFilterForm.controls['from'].updateValueAndValidity();
    this.billsDateFilterForm.controls['to'].updateValueAndValidity();
  }

  onResetFilterDate(): void {
    if (this.minDate || this.maxDate) {
      this.billsDateFilterForm.reset();
      this.minDate = null;
      this.maxDate = null;
    }
  }

  onDateFilterSubmit(): void {
    this.onDialogClose({
      minDate: this.minDate,
      maxDate: this.maxDate,
    });
  }

  onDialogClose(closingData: any): void {
    this.launchDialogService.closeDialog(closingData);
  }
}
