import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DeliveryMode, CheckoutService, CartService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
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
  deliveryMode: DeliveryMode;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.checkoutService.loadSupportedDeliveryModes();

    this.supportedDeliveryModes$ = combineLatest(
      this.checkoutService.getSupportedDeliveryModes(),
      this.checkoutService.getSelectedDeliveryMode()
    ).pipe(
      map(([supported, selected]: [DeliveryMode[], DeliveryMode]) => {
        if (selected) {
          this.mode.controls['deliveryModeId'].setValue(selected);
          this.deliveryMode = selected;
        }

        return supported;
      })
    );
  }

  next(): void {
    this.setDeliveryMode(this.mode.value);
    this.goToStep.emit(3);
  }

  back(): void {
    this.goToStep.emit(1);
  }

  get deliveryModeInvalid(): boolean {
    return this.mode.controls['deliveryModeId'].invalid;
  }

  private setDeliveryMode(deliveryModeId: string): void {
    if (!this.deliveryMode || this.deliveryMode !== deliveryModeId) {
      this.checkoutService.setDeliveryMode(deliveryModeId);
      this.refreshCart();
    }
  }

  private refreshCart(): void {
    this.cartService.loadDetails();
  }
}
