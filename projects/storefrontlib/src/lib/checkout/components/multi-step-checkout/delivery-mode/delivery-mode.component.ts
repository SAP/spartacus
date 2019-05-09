import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { DeliveryMode, CheckoutService, RoutingService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutConfigService } from '../../../checkout-config.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  styleUrls: ['./delivery-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryModeComponent implements OnInit {
  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  currentDeliveryModeId: string;
  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: string;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private routingService: RoutingService,
    private checkoutConfigService: CheckoutConfigService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
    this.checkoutStepUrlPrevious = this.checkoutConfigService.getPreviousCheckoutStepUrl(
      this.activatedRoute
    );
    this.supportedDeliveryModes$ = this.checkoutService.getSupportedDeliveryModes();
    this.selectedDeliveryMode$ = this.checkoutService.getSelectedDeliveryMode();

    this.checkoutService.loadSupportedDeliveryModes();

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
      this.routingService.go(this.checkoutStepUrlNext);
    }
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
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
