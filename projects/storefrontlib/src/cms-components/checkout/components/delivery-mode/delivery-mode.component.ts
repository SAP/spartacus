import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckoutDeliveryService, DeliveryMode } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { map, withLatestFrom, takeWhile } from 'rxjs/operators';
import { CheckoutConfigService } from '../../services/checkout-config.service';
import { CheckoutStepService } from '../../services/checkout-step.service';

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

  backBtnText = this.checkoutStepService.getBackBntText(this.activatedRoute);

  deliveryModeSub: Subscription;

  mode: FormGroup = this.fb.group({
    deliveryModeId: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private checkoutDeliveryService: CheckoutDeliveryService,
    private checkoutConfigService: CheckoutConfigService,
    protected checkoutStepService: CheckoutStepService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.supportedDeliveryModes$ = this.checkoutDeliveryService.getSupportedDeliveryModes();

    // Reload delivery modes on error
    this.checkoutDeliveryService
      .getLoadSupportedDeliveryModeProcess()
      .pipe(takeWhile((state) => state?.success === false))
      .subscribe((state) => {
        if (state.error && !state.loading) {
          this.checkoutDeliveryService.loadSupportedDeliveryModes();
        }
      });

    this.deliveryModeSub = this.supportedDeliveryModes$
      .pipe(
        withLatestFrom(
          this.checkoutDeliveryService
            .getSelectedDeliveryMode()
            .pipe(
              map((deliveryMode: DeliveryMode) =>
                deliveryMode && deliveryMode.code ? deliveryMode.code : null
              )
            )
        )
      )
      .subscribe(([deliveryModes, code]: [DeliveryMode[], string]) => {
        if (!code && deliveryModes && deliveryModes.length) {
          code = this.checkoutConfigService.getPreferredDeliveryMode(
            deliveryModes
          );
        }
        if (
          this.allowRedirect &&
          !!code &&
          code === this.currentDeliveryModeId
        ) {
          this.checkoutStepService.next(this.activatedRoute);
        }
        if (code) {
          this.mode.controls['deliveryModeId'].setValue(code);
          if (code !== this.currentDeliveryModeId) {
            this.checkoutDeliveryService.setDeliveryMode(code);
          }
        }
        this.currentDeliveryModeId = code;
      });
  }

  changeMode(code: string): void {
    if (code !== this.currentDeliveryModeId) {
      this.checkoutDeliveryService.setDeliveryMode(code);
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
  }

  back(): void {
    this.checkoutStepService.back(this.activatedRoute);
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
