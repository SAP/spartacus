import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
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
import { B2BUnit, B2BUnitNode } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { UnitCommonFormComponentService } from './unit-common-form.service';

@Component({
  selector: 'cx-unit-common-form',
  templateUrl: './unit-common-form.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UnitCommonFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UnitCommonFormComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitCommonFormComponent
  implements ControlValueAccessor, Validator, OnDestroy {
  @Input() readonlyParent = false;
  @Input() required = true;

  form: FormGroup = this.formService.getForm();
  businessUnits$: Observable<
    B2BUnitNode[]
  > = this.formService.getBusinessUnits();

  protected subscriptions = new Subscription();
  protected onChange: (value: B2BUnit) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(
    protected formService: UnitCommonFormComponentService,
    protected fb: FormBuilder
  ) {}

  writeValue(value: B2BUnit): void {
    if (value) {
      this.form.setValue({ uid: value.uid });
    }
  }

  registerOnChange(fn: (value: B2BUnit) => void): void {
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
    if (!this.required) {
      return null;
    }

    return this.form.valid
      ? null
      : // TODO:#persist-forms - what to return here?
        { valid: false };
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
