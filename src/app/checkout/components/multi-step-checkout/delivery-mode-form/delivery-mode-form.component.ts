import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, filter, tap, takeWhile } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { Address } from '../../../models/address-model';
import { CheckoutService } from '../../../services';

@Component({
  selector: 'y-delivery-mode-form',
  templateUrl: './delivery-mode-form.component.html',
  styleUrls: ['./delivery-mode-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeFormComponent implements OnInit {
  supportedDeliveryModes$: Observable<any>;

  @Output() selectMode = new EventEmitter<any>();
  @Output() backStep = new EventEmitter<any>();

  @Input() deliveryAddress: Address;

  leave = false;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required]
  });

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    private fb: FormBuilder,
    private service: CheckoutService
  ) {}

  ngOnInit() {
    this.supportedDeliveryModes$ = this.store
      .select(fromCheckoutStore.getSupportedDeliveryModes)
      .pipe(
        takeWhile(() => !this.leave),
        tap(supportedModes => {
          if (Object.keys(supportedModes).length === 0) {
            this.service.loadSupportedDeliveryModes();
          }
        })
      );
  }

  next() {
    this.selectMode.emit(this.mode.value);
  }

  back() {
    this.leave = true;
    this.backStep.emit();
  }

  get deliveryModeInvalid() {
    const control = this.mode.get('deliveryModeId');
    return control.hasError('required') && control.touched;
  }
}
