import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PointOfService } from '@spartacus/core';
import { PreferredStoreService } from '@spartacus/pickup-in-store/core';
import { PickupLocationsSearchFacade } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-my-preferred-store',
  templateUrl: 'my-preferred-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyPreferredStoreComponent {
  public preferredStore$: Observable<PointOfService>;
  public content = { header: 'My Store' };

  constructor(
    private preferredStoreService: PreferredStoreService,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade
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
}
