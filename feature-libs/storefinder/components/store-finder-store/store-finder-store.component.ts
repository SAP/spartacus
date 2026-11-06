/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PointOfService, RoutingService, TranslatePipe } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import {
  ICON_TYPE,
  IconComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { StoreFinderStoreDescriptionComponent } from '../store-finder-store-description/store-finder-store-description.component';

@Component({
  selector: 'cx-store-finder-store',
  templateUrl: './store-finder-store.component.html',
  imports: [
    NgIf,
    IconComponent,
    StoreFinderStoreDescriptionComponent,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
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
