import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AddToCartContainerContext } from '@spartacus/cart/base/components/add-to-cart';
import {
  LaunchDialogService,
  LAUNCH_CALLER,
  OutletContextData,
} from '@spartacus/storefront';
import { IntendedPickupLocationFacade } from 'feature-libs/pickup-in-store/root';
import { Subscription } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-pickup-delivery-options',
  templateUrl: './pickup-delivery-options.component.html',
})
export class PickupDeliveryOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('open') element: ElementRef;
  subscription = new Subscription();

  private productCode: string;
  public pickUpInStore = false;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    @Optional() protected outlet?: OutletContextData<AddToCartContainerContext>
  ) {}

  ngOnInit() {
    this.outlet?.context$
      .pipe(
        tap(({ productCode }) => (this.productCode = productCode)),
        switchMap(({ productCode }) =>
          this.intendedPickupLocationService.getIntendedLocation(productCode)
        ),
        tap((intendedLocation) => {
          this.pickUpInStore = !!intendedLocation;
        })
      )
      .subscribe();
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
