import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PointOfService, RoutingService } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-my-preferred-store',
  templateUrl: 'my-preferred-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPreferredStoreComponent {
  public preferredStore$: Observable<PointOfService>;
  public content = {
    header: 'My Store',
    actions: [
      { event: 'send', name: 'Get Directions' },
      { event: 'edit', name: 'Change Store' },
    ],
  };
  openHoursOpen = false;
  readonly ICON_TYPE = ICON_TYPE;

  constructor(
    private preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected routingService: RoutingService,
    protected storeFinderService: StoreFinderService
  ) {
    this.preferredStore$ = this.preferredStoreService.getPreferredStore$().pipe(
      filter((preferredStore) => !!preferredStore?.name),
      map((preferredStore) => preferredStore?.name),
      tap((preferredStoreName) =>
        this.pickupLocationsSearchService.loadStoreDetails(
          preferredStoreName as string
        )
      ),
      switchMap((preferredStoreName) =>
        this.pickupLocationsSearchService.getStoreDetails(
          preferredStoreName as string
        )
      )
    );
  }

  /**
   * Toggle whether the store's opening hours are visible.
   */
  toggleOpenHours(): boolean {
    this.openHoursOpen = !this.openHoursOpen;
    return false;
  }

  changeStore(): void {
    this.routingService.go(['/store-finder']);
  }

  getDirectionsToStore(): void {
    //
  }
}
