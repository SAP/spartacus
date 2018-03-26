import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRouting from '../../../../routing/store';

@Component({
  selector: 'y-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent {
  @Input() parent: FormGroup;

  @Input() countries$: Observable<any>;

  @Output() added = new EventEmitter<any>();

  constructor(protected store: Store<fromRouting.State>) {}

  onAdd() {
    this.added.emit(this.parent.get('address').value);
  }

  back() {
    this.store.dispatch(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
  }
}
