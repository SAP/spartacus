import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AddToCartContainerContext } from '@spartacus/cart/base/components/add-to-cart';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { combineLatest, EMPTY, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-delivery-options.component.html',
})
export class PickupDeliveryOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();

  deliveryOptionsForm = new FormGroup({
    deliveryOption: new FormControl('delivery'),
  });

  private productCode: string;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    @Optional() protected outlet?: OutletContextData<AddToCartContainerContext>
  ) {}

  ngOnInit() {
    const productCode$ =
      this.outlet?.context$?.pipe(
        map(({ productCode }) => {
          this.productCode = productCode;
          return productCode;
        })
      ) ?? EMPTY;

    this.subscription.add(
      combineLatest([
        productCode$,
        this.launchDialogService.dialogClose.pipe(
          filter((reason) => reason !== undefined),
          startWith(undefined)
        ),
      ])
        .pipe(
          switchMap(([productCode]) =>
            this.intendedPickupLocationService.getIntendedLocation(productCode)
          ),
          tap((intendedLocation) =>
            this.deliveryOptionsForm
              .get('deliveryOption')
              ?.setValue(intendedLocation ? 'pickup' : 'delivery')
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialog(): void {
    const dialog = this.launchDialogService.openDialog(
      LAUNCH_CALLER.PICKUP_IN_STORE,
      this.element,
      this.vcr,
      { productCode: this.productCode }
    );

    if (dialog) {
      this.subscription.add(dialog.pipe(take(1)).subscribe());
    }
  }

  clearIntendedPickupLocation(): void {
    this.intendedPickupLocationService.removeIntendedLocation(this.productCode);
  }
}
