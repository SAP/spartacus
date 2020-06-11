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
import { CurrencyCommonFormComponentService } from './currency-common-form.service';

@Component({
  selector: 'cx-currency-common-form',
  templateUrl: './currency-common-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyCommonFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyCommonFormComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyCommonFormComponent
  implements ControlValueAccessor, Validator, OnDestroy {
  form: FormGroup = this.formService.getForm();
  currencies$: Observable<Currency[]> = this.formService.getCurrencies();

  protected subscriptions = new Subscription();
  protected onChange: (value: Currency) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(
    protected formService: CurrencyCommonFormComponentService,
    protected fb: FormBuilder
  ) {}

  writeValue(value: Currency): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(fn: (value: Currency) => void): void {
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
    return this.form.valid
      ? null
      : // TODO:#persist-forms - what to return here?
        { valid: false };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
