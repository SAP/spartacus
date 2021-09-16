import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { isObject } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * Renders translated form errors for a given form control, based on its `errors` property.
 *
 * The translation key consists of the optional input `prefix`
 * concatenated with the error key.
 *
 * And the translation params object consist of the error details
 * (if only it's an object) merged with the optional input object `translationParams`.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorsComponent {
  _control: FormControl;

  /**
   * @deprecated since 4.1 - use `errorsDetails$` instead, which contains not only
   *                         the error key, but also the error details
   */
  errors$: Observable<string[]>;

  /**
   * Emits an array of errors, each represented by a tuple:
   * the error key and error details.
   */
  errorsDetails$: Observable<Array<[string, string]>>;

  /**
   * Prefix prepended to the translation key.
   */
  @Input() prefix = 'formErrors';

  /**
   * Translation params to enrich the error details object.
   */
  @Input()
  translationParams: { [key: string]: string };

  @Input()
  set control(control: FormControl) {
    this._control = control;

    this.errorsDetails$ = control?.statusChanges.pipe(
      startWith({}),
      map(() => control.errors || {}),
      map((errors) =>
        Object.entries(errors).filter(([_key, details]) => details)
      )
    );

    this.errors$ = this.errorsDetails$.pipe(
      map((errors) => errors.map(([key, _details]) => key))
    );
  }

  get control(): FormControl {
    return this._control;
  }

  /**
   * Returns translation params composed of
   * the argument `errorDetails` (if only is an object) merged with
   * the component input object `translationParams`.
   *
   * In case of a conflicting object key, the value from
   * `translationParams` takes precedence.
   */
  getTranslationParams(errorDetails?: any): object {
    errorDetails = isObject(errorDetails) ? errorDetails : {};
    return { ...errorDetails, ...this.translationParams };
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
}
