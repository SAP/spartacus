import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * This component renders form errors.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent implements OnChanges {
  _formGroup: FormGroupDirective;
  errors$: Observable<string[]>;

  constructor(@Optional() @Host() protected formGroup: FormGroupDirective) {
    this._formGroup = formGroup;
  }

  // set to false to show all errors
  @Input() showOnlyOne = true;

  @Input() prefix = 'formErrors';

  @Input()
  translationParams: { [key: string]: string };

  @Input()
  control: FormControl;

  @Input()
  controlName: string;

  @HostBinding('class.control-invalid') get invalid() {
    return this.control?.invalid;
  }
  @HostBinding('class.control-dirty') get dirty() {
    return this.control?.dirty;
  }
  @HostBinding('class.control-touched') get touched() {
    return this.control?.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.control) {
      this.control = changes.control.currentValue;
    } else if (changes.controlName) {
      this.control = this.getFormGroup()?.get(
        changes.controlName.currentValue
      ) as FormControl;
    }
    this.setErrors();
  }

  /**
   * get the form from the FormGroupDirective
   * @private
   */
  private getFormGroup(): FormGroup {
    return this._formGroup ? this._formGroup.form : null;
  }

  /**
   * Get all errors of the control and show the first one only
   * according to the order in the formControl declaration
   * @private
   */
  private setErrors(): void {
    this.errors$ = this.control?.statusChanges.pipe(
      startWith({}),
      map(() => this.control.errors || {}),
      map((errors) => {
        const filteredErrors = Object.entries(errors)
          .filter((error) => error[1])
          .map((error) => error[0]);
        return this.showOnlyOne
          ? filteredErrors[0]
            ? [filteredErrors[0]]
            : []
          : filteredErrors;
      })
    );
  }
}
