/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input, OnInit } from '@angular/core';
import { PointOfService, RoutingService } from '@commerce-storefront-toolset/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ICON_TYPE } from '@commerce-storefront-toolset/storefront';
import { StoreFinderService } from '@commerce-storefront-toolset/storefinder/core';

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
      this.location$ = this.storeFinderService.getFindStoreEntityById();
      this.isLoading$ = this.storeFinderService.getStoresLoading();
    }
  }

  requestStoresData() {
    this.storeFinderService.viewStoreById(this.route.snapshot.params.store);
  }

  goBack(): void {
    this.routingService.go([
      `store-finder/country/${this.route.snapshot.params.country}`,
    ]);
  }
}
