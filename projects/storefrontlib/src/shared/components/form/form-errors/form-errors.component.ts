import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

/**
 * This component renders form errors.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  errors$: Observable<string[]>;

  @Input()
  set control(control: FormControl) {
    this.errors$ = control.statusChanges.pipe(
      startWith({}),
      map(() => control.errors || {}),
      map(errors =>
        Object.entries(errors)
          .filter(error => error[1])
          .map(error => error[0])
      )
    );
  }
}
