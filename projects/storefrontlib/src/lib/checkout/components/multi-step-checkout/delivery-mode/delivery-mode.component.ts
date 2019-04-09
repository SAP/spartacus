import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DeliveryMode, CheckoutService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  styleUrls: ['./delivery-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryModeComponent implements OnInit {
  @Output()
  goToStep = new EventEmitter<number>();

  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  currentDeliveryModeId: string;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
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

  next(): void {
    this.setDeliveryMode(this.mode.value.deliveryModeId);
    if (this.currentDeliveryModeId) {
      this.goToStep.emit(3);
    }
  }

  back(): void {
    this.goToStep.emit(1);
  }

  get deliveryModeInvalid(): boolean {
    return this.mode.controls['deliveryModeId'].invalid;
  }

  private setDeliveryMode(deliveryModeId: string): void {
    if (
      !this.currentDeliveryModeId ||
      this.currentDeliveryModeId !== deliveryModeId
    ) {
      this.checkoutService.setDeliveryMode(deliveryModeId);
    }
  }
}
