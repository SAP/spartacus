import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {
  DeliveryMode,
  CheckoutDeliveryService,
  RoutingService,
} from '@spartacus/core';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { CheckoutConfigService } from '../../checkout-config.service';

@Component({
  selector: 'cx-delivery-mode',
  templateUrl: './delivery-mode.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeliveryModeComponent implements OnInit, OnDestroy {
  supportedDeliveryModes$: Observable<DeliveryMode[]>;
  selectedDeliveryMode$: Observable<DeliveryMode>;
  currentDeliveryModeId: string;
  checkoutStepUrlNext: string;
  checkoutStepUrlPrevious: string;

  changedOption: boolean;
  deliveryModeSub: Subscription;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutDeliveryService: CheckoutDeliveryService,
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
    this.changedOption = false;

    this.supportedDeliveryModes$ = this.checkoutDeliveryService.getSupportedDeliveryModes();
    this.selectedDeliveryMode$ = this.checkoutDeliveryService.getSelectedDeliveryMode();

    this.checkoutDeliveryService.loadSupportedDeliveryModes();

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
      this.checkoutDeliveryService.setDeliveryMode(this.currentDeliveryModeId);
    }

    this.deliveryModeSub = this.checkoutDeliveryService
      .getSelectedDeliveryMode()
      .subscribe(data => {
        if (data && data.code === this.currentDeliveryModeId) {
          this.routingService.go(this.checkoutStepUrlNext);
        }
      });
  }

  back(): void {
    this.routingService.go(this.checkoutStepUrlPrevious);
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
