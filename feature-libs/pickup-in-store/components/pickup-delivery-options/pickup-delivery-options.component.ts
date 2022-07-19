import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import {
  CurrentProductService,
  LaunchDialogService,
  LAUNCH_CALLER,
} from '@spartacus/storefront';
import { combineLatest, Observable, Subscription } from 'rxjs';
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
  intendedPickupLocation$: Observable<string>;

  private productCode: string;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected vcr: ViewContainerRef,
    protected intendedPickupLocationService: IntendedPickupLocationFacade,
    protected currentProductService: CurrentProductService,
    protected currentLocationService: CurrentLocationService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected preferredStoreService: PreferredStoreService
  ) {}

  ngOnInit() {
    const productCode$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => {
        this.productCode = product.code;
        this.availableForPickup = !!product?.availableForPickup;

        return this.productCode;
      })
    );

    this.intendedPickupLocation$ = this.currentProductService.getProduct().pipe(
      filter(isProductWithCode),
      map((product) => product.code),
      tap((productCode) => {
        this.currentLocationService.getCurrentLocation(
          ({ coords: { latitude, longitude } }) => {
            this.pickupLocationsSearchService.setBrowserLocation(
              latitude,
              longitude
            );

            this.pickupLocationsSearchService.startSearch({
              productCode,
              latitude,
              longitude,
            });
          }
        );
      }),
      switchMap((productCode) =>
        this.pickupLocationsSearchService.getSearchResults(productCode)
      ),
      map((stores) => stores.filter((store) => !!store?.stockInfo?.stockLevel)),
      map((stores) => {
        const preferredStore = this.preferredStoreService.getPreferredStore();

        return (
          stores.find((store) => store.name === preferredStore) ?? stores[0]
        );
      }),
      map((store) => store?.name ?? '')
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
