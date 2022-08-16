import { Component, OnInit } from '@angular/core';
import { ActiveCartFacade, Cart, OrderEntry } from '@spartacus/cart/base/root';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-pickup-delivery-info-container',
  templateUrl: './pickup-delivery-info-container.component.html',
  styleUrls: ['./pickup-delivery-info-container.component.scss'],
})
export class PickupDeliveryInfoContainerComponent implements OnInit {
  cart$: Observable<Cart>;
  constructor(
    protected readonly activeCartService: ActiveCartFacade,
    protected readonly intendedPickupLocationService: IntendedPickupLocationFacade,
    protected readonly storeDetails: PickupLocationsSearchFacade
  ) {}
  ngOnInit(): void {
    this.cart$ = this.activeCartService.getActive();
    this.cart$
      .pipe(
        map((data) => data.entries),
        filter((entries): entries is OrderEntry[] => !!entries),
        map((entries) =>
          entries
            .map((entry) => entry?.deliveryPointOfService?.name)
            .filter((name): name is string => !!name)
        ),
        tap((storeNames) =>
          storeNames.forEach((storeName) =>
            this.storeDetails.loadStoreDetails(storeName)
          )
        ),
        mergeMap((storeNames) =>
          combineLatest(
            storeNames.map((storeName) =>
              this.storeDetails
                .getStoreDetails(storeName)
                .pipe(filter((details) => !!details))
            )
          )
        ),
        tap((data) => console.log('cart', data))
      )
      .subscribe();

    // this.intendedPickupLocationService
    //   .getIntendedLocation('300310300')
    //   .subscribe((code) => {
    //     console.log('location', code);
    //   });
  }
}
