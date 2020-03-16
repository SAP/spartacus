import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, throttleTime } from 'rxjs/operators';

/**
 * This component renders form errors.
 */
@Component({
  selector: 'cx-form-errors',
  templateUrl: './form-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnInit {
  @Input() control: FormControl;
  errors$: Observable<string[]>;

  ngOnInit() {
    this.errors$ = this.control.statusChanges.pipe(
      startWith({}),
      throttleTime(500),
      map(() => this.control.errors || {}),
      map(errors =>
        Object.entries(errors)
          .filter(error => error[1])
          .map(error => error[0])
      )
    );
  }
}
