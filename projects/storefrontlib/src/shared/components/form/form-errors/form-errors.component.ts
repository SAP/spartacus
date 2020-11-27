import {
  ChangeDetectionStrategy,
  Component,
  Host,
  HostBinding,
  Input,
  Optional,
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
export class FormErrorsComponent {
  _parent: FormGroupDirective;
  _control: FormControl;
  error$: Observable<string>;

  constructor(@Optional() @Host() parent: FormGroupDirective) {
    this._parent = parent;
  }

  @Input()
  translationParams: { [key: string]: string };

  @Input()
  set control(control: FormControl) {
    this._control = control;
    this.setErrors();
  }

  /**
   * The name of the control is enough
   * @param controlName
   */
  @Input()
  set controlName(controlName: string) {
    this._control = this.getFormGroup()?.get(controlName) as FormControl;
    this.setErrors();
  }

  get control(): FormControl {
    return this._control;
  }

  @HostBinding('class.control-invalid') get invalid() {
    return this.control?.invalid;
  }
  @HostBinding('class.control-dirty') get dirty() {
    return this.control?.dirty;
  }
  @HostBinding('class.control-touched') get touched() {
    return this.control?.touched;
  }

  /**
   * get the form from the FormGroupDirective
   * @private
   */
  private getFormGroup(): FormGroup {
    return this._parent ? this._parent.form : null;
  }

  /**
   * Get all errors of the control and show the first one only
   * according to the order in the formControl declaration
   * @private
   */
  private setErrors(): void {
    this.error$ = this._control?.statusChanges.pipe(
      startWith({}),
      map(() => this._control.errors || {}),
      map(
        (errors) =>
          Object.entries(errors)
            .filter((error) => error[1])
            .map((error) => error[0])[0]
      )
    );
  }
}
