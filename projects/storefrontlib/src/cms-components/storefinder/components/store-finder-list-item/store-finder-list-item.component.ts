import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDataService, RoutingService } from '@spartacus/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';

@Component({
  selector: 'cx-store-finder-list-item',
  templateUrl: './store-finder-list-item.component.html',
})
export class StoreFinderListItemComponent extends AbstractStoreItemComponent {
  @Input()
  locationIndex: number = null;
  @Input()
  listOrderLabel: any;
  @Input()
  displayDistance: boolean;
  @Input()
  useClickEvent: boolean;
  @Output()
  storeItemClick: EventEmitter<number> = new EventEmitter();

  constructor(
    protected storeDataService: StoreDataService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {
    super(storeDataService);
  }

  handleStoreItemClick() {
    if (this.locationIndex !== null) {
      this.storeItemClick.emit(this.locationIndex);
    }
  }

  viewStore(location: any): void {
    this.routingService.go([this.prepareRouteUrl(location)]);
  }

  prepareRouteUrl(location: any): string {
    const countryParam = this.route.snapshot.params.country
      ? `country/${this.route.snapshot.params.country}/`
      : '';
    const regionParam = this.route.snapshot.params.region
      ? `region/${this.route.snapshot.params.region}/`
      : '';
    return `store-finder/${countryParam}${regionParam}${location.name}`;
  }
}
