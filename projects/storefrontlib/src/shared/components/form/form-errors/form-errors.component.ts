import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

/**
 * This component renders form errors.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnInit {
  errors$: Observable<string[]>;

  private _control = new BehaviorSubject<FormControl>(null);

  @Input()
  set control(control: FormControl) {
    this._control.next(control);
  }

  ngOnInit() {
    this.errors$ = this._control.pipe(
      switchMap(control =>
        control.statusChanges.pipe(
          startWith({}),
          map(() => control.errors || {}),
          map(errors =>
            Object.entries(errors)
              .filter(error => error[1])
              .map(error => error[0])
          )
        )
      )
    );
  }
}
