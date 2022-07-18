import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PointOfService, Product } from '@spartacus/core';
import { IntendedPickupLocationFacade } from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { PickupLocationsSearchService } from 'feature-libs/pickup-in-store/core';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { CurrentLocationService } from '../services/current-location.service';

function isProductWithCode(
  product: Product | null
): product is Required<Pick<Product, 'code'>> & Product {
  return !!product?.code;
}

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

  availableForPickup = false;
  intendedPickupLocation?: PointOfService;

  private productCode: string;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected currentProductService: CurrentProductService,
    protected currentLocationService: CurrentLocationService,
    protected pickupLocationsSearchService: PickupLocationsSearchService
  ) {}

  ngOnInit() {
    const productCode$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => {
        this.productCode = product.code;
        this.availableForPickup = !!product?.availableForPickup;

        return this.productCode;
      }),
      tap((productCode) =>
        this.currentLocationService.getCurrentLocation(
          ({ coords: { latitude, longitude } }) =>
            this.pickupLocationsSearchService.startSearch({
              productCode,
              latitude,
              longitude,
            })
        )
      )
    );

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
          tap(
            (intendedPickupLocation) =>
              (this.intendedPickupLocation = intendedPickupLocation)
          ),
          tap((intendedLocation) =>
            this.deliveryOptionsForm
              .get('deliveryOption')
              ?.setValue(intendedLocation ? 'pickup' : 'delivery')
          )
        )
        .subscribe()
    );

    // this.currentLocationService.getCurrentLocation(
    //   ({ coords: { latitude, longitude } }) =>
    //     this.pickupLocationsSearchService.startSearch({
    //       productCode: this.productCode,
    //       latitude,
    //       longitude,
    //     })
    // );

    // this.currentProductService
    //   .getProduct()
    //   .pipe(
    //     filter(isProductWithCode),
    //     map((product) => {
    //       this.productCode = product.code;
    //       this.availableForPickup = !!product?.availableForPickup;

    //       return this.productCode;
    //     }),
    //     switchMap((productCode) =>
    //       this.intendedPickupLocationService.getIntendedLocation(productCode)
    //     ),
    //     switchMap((intendedPickupLocation) =>
    //       iif(
    //         () => !!intendedPickupLocation,
    //         of(intendedPickupLocation),
    //         this.pickupLocationsSearchService
    //           .getSearchResults(this.productCode)
    //           .pipe(
    //             map(
    //               (results) =>
    //                 results.filter(
    //                   (result) => result.stockInfo?.stockLevel
    //                 )?.[0]
    //             )
    //           )
    //       )
    //     ),
    //     tap((intendedPickupLocation) =>
    //       console.log('intendedPickupLocation', intendedPickupLocation)
    //     ),
    //     tap(
    //       (intendedPickupLocation) =>
    //         (this.intendedPickupLocation = intendedPickupLocation)
    //     ),
    //     tap(() =>
    //       console.log(
    //         'this.intendedPickupLocation',
    //         this.intendedPickupLocation
    //       )
    //     )
    //   )
    //   .subscribe();
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
