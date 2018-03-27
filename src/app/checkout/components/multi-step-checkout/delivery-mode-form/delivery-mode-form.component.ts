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

@Component({
  selector: 'y-delivery-mode-form',
  templateUrl: './delivery-mode-form.component.html',
  styleUrls: ['./delivery-mode-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeFormComponent {
  @Input() parent: FormGroup;

  @Input() modes$: Observable<any>;

  @Output() setMode = new EventEmitter<any>();

  constructor() {}
}
