import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { take, filter, tap } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { Address } from '../../../models/address-model';
import { CheckoutService } from '../../../services';

@Component({
  selector: 'y-delivery-mode-form',
  templateUrl: './delivery-mode-form.component.html',
  styleUrls: ['./delivery-mode-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeFormComponent implements OnInit, OnDestroy {
  supportedDeliveryModes$: Observable<any>;

  @Output() selectMode = new EventEmitter<any>();
  @Output() backStep = new EventEmitter<any>();

  @Input() deliveryAddress: Address;

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
        tap(supportedModes => {
          if (Object.keys(supportedModes).length === 0) {
            console.log('load');
            this.service.loadSupportedDeliveryModes();
          }
        })
      );
  }

  ngOnDestroy() {
    console.log('destroy');
  }

  next() {
    console.log(this.mode.value);
    this.selectMode.emit(this.mode.value);
  }

  back() {
    this.backStep.emit();
  }

  get deliveryModeInvalid() {
    const control = this.mode.get('deliveryModeId');
    return control.hasError('required') && control.touched;
  }
}
