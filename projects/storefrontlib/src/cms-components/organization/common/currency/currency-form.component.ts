import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { Currency } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { CurrencyFormComponentService } from './currency-form.service';

@Component({
  selector: 'cx-currency-form',
  templateUrl: './currency-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyFormComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyFormComponent
  implements ControlValueAccessor, Validator, OnDestroy {
  form: FormGroup = this.formService.getForm();
  currencies$: Observable<Currency[]> = this.formService.getCurrencies();

  protected subscriptions = new Subscription();
  protected onChange: (value: object) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(
    protected formService: CurrencyFormComponentService,
    protected fb: FormBuilder
  ) {}

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(fn: (value: object) => void): void {
    this.onChange = fn;

    this.subscriptions.add(
      this.form.valueChanges.subscribe((newValue) => {
        this.onChange(newValue);
        this.onTouched();
      })
    );
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(_control: AbstractControl): ValidationErrors | null {
    return this.form.valid && this.form.touched && this.form.dirty
      ? null
      : // TODO:#persist-forms - what to return here?
        { valid: false };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
