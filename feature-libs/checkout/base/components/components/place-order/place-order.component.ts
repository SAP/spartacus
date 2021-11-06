import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutFacade } from '@spartacus/checkout/base/root';
import { RoutingService } from '@spartacus/core';
import { LaunchDialogService, LAUNCH_CALLER } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-place-order',
  templateUrl: './place-order.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceOrderComponent implements OnDestroy {
  placedOrder: void | Observable<ComponentRef<any> | undefined>;

  checkoutSubmitForm: FormGroup = this.fb.group({
    termsAndConditions: [false, Validators.requiredTrue],
  });

  get termsAndConditionInvalid(): boolean {
    return this.checkoutSubmitForm.invalid;
  }

  constructor(
    protected checkoutService: CheckoutFacade,
    protected routingService: RoutingService,
    protected fb: FormBuilder,
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef
  ) {}

  submitForm(): void {
    if (this.checkoutSubmitForm.valid) {
      this.placedOrder = this.launchDialogService.launch(
        LAUNCH_CALLER.PLACE_ORDER_SPINNER,
        this.vcr
      );
      this.checkoutService.placeOrder(this.checkoutSubmitForm.valid).subscribe({
        error: () => {
          if (!this.placedOrder) {
            return;
          }

          this.placedOrder
            .subscribe((component) => {
              this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
              if (component) {
                component.destroy();
              }
            })
            .unsubscribe();
        },
        next: () => this.onSuccess(),
      });
    } else {
      this.checkoutSubmitForm.markAllAsTouched();
    }
  }

  onSuccess(): void {
    this.routingService.go({ cxRoute: 'orderConfirmation' });
  }

  ngOnDestroy(): void {
    this.launchDialogService.clear(LAUNCH_CALLER.PLACE_ORDER_SPINNER);
  }
}
