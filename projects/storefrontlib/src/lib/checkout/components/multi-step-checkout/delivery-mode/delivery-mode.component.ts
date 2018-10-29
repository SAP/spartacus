import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, takeWhile } from 'rxjs/operators';

import * as fromCheckoutStore from '../../../store';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'y-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  styleUrls: ['./delivery-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliveryModeComponent implements OnInit {
  @Input()
  selectedShippingMethod: string;

  @Output()
  selectMode = new EventEmitter<any>();
  @Output()
  backStep = new EventEmitter<any>();

  supportedDeliveryModes$: Observable<any>;
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
    this.supportedDeliveryModes$ = this.store.pipe(
      select(fromCheckoutStore.getSupportedDeliveryModes),
      takeWhile(() => !this.leave),
      tap(supportedModes => {
        if (Object.keys(supportedModes).length === 0) {
          this.service.loadSupportedDeliveryModes();
        } else {
          if (this.selectedShippingMethod) {
            this.mode.controls['deliveryModeId'].setValue(
              this.selectedShippingMethod
            );
          }
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
    return this.mode.controls['deliveryModeId'].invalid;
  }
}
