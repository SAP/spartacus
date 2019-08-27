import { Component, Input, OnInit } from '@angular/core';
import {
  StoreFinderService,
  PointOfService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICON_TYPE } from '../../../misc/icon';

@Component({
  selector: 'cx-store-finder-store',
  templateUrl: './store-finder-store.component.html',
})
export class StoreFinderStoreComponent implements OnInit {
  location$: Observable<any>;
  isLoading$: Observable<any>;
  iconTypes = ICON_TYPE;

  @Input() location: PointOfService;
  @Input() disableMap: boolean;

  constructor(
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    if (!this.location) {
      this.requestStoresData();
      this.location$ = this.storeFinderService.getFindStoresEntities();
      this.isLoading$ = this.storeFinderService.getStoresLoading();
    }
  }

  requestStoresData() {
    const storeId = this.route.snapshot.params.store
      .split('-')
      .map(this.capitalizeLetter)
      .join(' ');
    this.storeFinderService.viewStoreById(storeId);
  }

  goBack(): void {
    this.routingService.go([
      `store-finder/country/${this.route.snapshot.params.country}`,
    ]);
  }

  private capitalizeLetter(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }
}
