/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutingService, TranslatePipe } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { SpinnerComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-store-finder-stores-count',
  templateUrl: './store-finder-stores-count.component.html',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    NgClass,
    SpinnerComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class StoreFinderStoresCountComponent implements OnInit {
  protected routingService = inject(RoutingService);
  locations$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private storeFinderService: StoreFinderService) {}

  ngOnInit() {
    this.storeFinderService.viewAllStores();
    this.locations$ = this.storeFinderService.getViewAllStoresEntities();
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
  }

  navigateToLocation(isoCode: string, event?: Event): void {
    event?.preventDefault();
    this.routingService.go(['/store-finder/country', isoCode]);
  }
}
