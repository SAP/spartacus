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
import * as fromCheckoutStore from '../../../store';
import { Address } from '../../../models/address-model';

@Component({
  selector: 'y-delivery-mode-form',
  templateUrl: './delivery-mode-form.component.html',
  styleUrls: ['./delivery-mode-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeFormComponent implements OnInit {
  deliveryModes$: Observable<any>;

  @Output() selecteMode = new EventEmitter<any>();
  @Input() deliveryAddress: Address;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required]
  });

  constructor(
    protected store: Store<fromCheckoutStore.CheckoutState>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    /*
    this.deliveryModes$ = this.store
      .select(fromCheckoutStore.getAllDeliveryCountries)
      .pipe(
        tap(countries => {
          if (Object.keys(countries).length === 0) {
            this.store.dispatch(new fromCheckoutStore.LoadDeliveryCountries());
          }
        })
      );
      */
  }

  next() {
    this.selecteMode.emit(this.mode.value);
  }

  back() {}

  get deliveryModeInvalid() {
    const control = this.mode.get('deliveryModeId');
    return control.hasError('required') && control.touched;
  }
}
