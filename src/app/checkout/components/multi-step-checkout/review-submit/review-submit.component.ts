import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-review-submit',
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewSubmitComponent {
  @Input() deliveryAddress: Address;
  @Input() deliveryModeCode: string;
  @Input() paymentDetails: any;

  @Output() backStep = new EventEmitter<any>();

  constructor() {}

  back() {
    this.backStep.emit();
  }
}
