import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DeliveryMode, CheckoutService } from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryModeComponent implements OnInit, OnDestroy {
  @Output()
  goToStep = new EventEmitter<number>();

  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  currentDeliveryModeId: string;

  changedOption: boolean;
  deliveryModeSub: Subscription;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.changedOption = false;
    this.checkoutService.loadSupportedDeliveryModes();

    this.supportedDeliveryModes$ = this.checkoutService.getSupportedDeliveryModes();
    this.selectedDeliveryMode$ = this.checkoutService.getSelectedDeliveryMode();

    this.selectedDeliveryMode$
      .pipe(
        map((deliveryMode: DeliveryMode) =>
          deliveryMode && deliveryMode.code ? deliveryMode.code : null
        )
      )
      .subscribe(code => {
        if (code) {
          this.mode.controls['deliveryModeId'].setValue(code);
          this.currentDeliveryModeId = code;
        }
      });
  }

  changeMode(code: string): void {
    if (code !== this.currentDeliveryModeId) {
      this.changedOption = true;
      this.currentDeliveryModeId = code;
    }
  }

  next(): void {
    if (this.changedOption) {
      this.checkoutService.setDeliveryMode(this.currentDeliveryModeId);
    }

    this.deliveryModeSub = this.checkoutService
      .getSelectedDeliveryMode()
      .subscribe(data => {
        if (data && data.code === this.currentDeliveryModeId) {
          this.goToStep.emit(3);
        }
      });
  }

  back(): void {
    this.goToStep.emit(1);
  }

  get deliveryModeInvalid(): boolean {
    return this.mode.controls['deliveryModeId'].invalid;
  }

  ngOnDestroy(): void {
    if (this.deliveryModeSub) {
      this.deliveryModeSub.unsubscribe();
    }
  }
}
