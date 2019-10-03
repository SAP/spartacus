import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CheckoutDeliveryService,
  DeliveryMode,
  RoutingService,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CheckoutConfigService } from '../../services/checkout-config.service';

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
  private allowRedirect = false;

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

    this.supportedDeliveryModes$ = this.checkoutDeliveryService.getSupportedDeliveryModes();

    this.deliveryModeSub = this.checkoutDeliveryService
      .getSelectedDeliveryMode()
      .pipe(
        map((deliveryMode: DeliveryMode) =>
          deliveryMode && deliveryMode.code ? deliveryMode.code : null
        ),
        withLatestFrom(this.supportedDeliveryModes$)
      )
      .subscribe(([code, deliveryModes]: [string, DeliveryMode[]]) => {
        if (!code) {
          code = this.checkoutConfigService.getPreferredDeliveryMode(
            deliveryModes
          );
        }
        if (
          this.allowRedirect &&
          !!code &&
          code === this.currentDeliveryModeId
        ) {
          this.routingService.go(this.checkoutStepUrlNext);
        }
        this.currentDeliveryModeId = code;
        if (code) {
          this.mode.controls['deliveryModeId'].setValue(code);
        }
      });
  }

  changeMode(code: string): void {
    if (code !== this.currentDeliveryModeId) {
      this.currentDeliveryModeId = code;
    }
  }

  next(): void {
    this.allowRedirect = true;
    if (this.mode.valid && this.mode.value) {
      if (!this.currentDeliveryModeId) {
        this.currentDeliveryModeId = this.mode.value.deliveryModeId;
      }
      this.checkoutDeliveryService.setDeliveryMode(this.currentDeliveryModeId);
    }
    this.routingService.go(this.checkoutStepUrlNext);
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
