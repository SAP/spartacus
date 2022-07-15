import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PointOfServiceStock } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import {
  IntendedPickupLocationFacade,
  PickupLocationsSearchFacade,
} from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-list',
  templateUrl: 'store-list.component.html',
})
export class StoreListComponent implements OnInit {
  @Input()
  productCode: string;
  @Output()
  storeSelected: EventEmitter<null> = new EventEmitter<null>();

  stores$: Observable<PointOfServiceStock[]>;
  hasSearchStarted$: Observable<boolean>;
  isSearchRunning$: Observable<boolean>;

  constructor(
    private readonly pickupLocationsSearchService: PickupLocationsSearchFacade,
    private readonly preferredStoreService: PreferredStoreService,
    private readonly intendedPickupLocationService: IntendedPickupLocationFacade
  ) {}

  ngOnInit() {
    this.stores$ = this.pickupLocationsSearchService.getSearchResults(
      this.productCode
    );
    this.hasSearchStarted$ = this.pickupLocationsSearchService.hasSearchStarted(
      this.productCode
    );
    this.isSearchRunning$ = this.pickupLocationsSearchService.isSearchRunning();
  }

  onSelectStore(store: PointOfServiceStock) {
    const { stockInfo: _, ...pointOfService } = store;
    this.preferredStoreService.setPreferredStore(pointOfService.name ?? '');
    this.intendedPickupLocationService.setIntendedLocation(
      this.productCode,
      pointOfService
    );
    this.storeSelected.emit();
  }
}
