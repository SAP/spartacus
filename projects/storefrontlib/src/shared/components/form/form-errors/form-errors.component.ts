import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
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
  _control: FormControl;
  errors$: Observable<string[]>;

  @Input()
  translationParams: { [key: string]: string };

  @Input()
  set control(control: FormControl) {
    this._control = control;

    this.errors$ = control?.statusChanges.pipe(
      startWith({}),
      map(() => control.errors || {}),
      map((errors) =>
        Object.entries(errors)
          .filter((error) => error[1])
          .map((error) => error[0])
      )
    );
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
}
