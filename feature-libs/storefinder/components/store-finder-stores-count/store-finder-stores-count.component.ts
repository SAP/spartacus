/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, Optional, inject } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { Observable } from 'rxjs';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../../../../projects/storefrontlib/shared/components/spinner/spinner.component';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

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
        MockTranslatePipe,
    ],
})
export class StoreFinderStoresCountComponent implements OnInit {
  // TODO: CXSPA-6884 Make service required in next major.
  @Optional() protected routingService? = inject(RoutingService, {
    optional: true,
  });
  locations$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private storeFinderService: StoreFinderService) {}

  ngOnInit() {
    this.storeFinderService.viewAllStores();
    this.locations$ = this.storeFinderService.getViewAllStoresEntities();
    this.isLoading$ = this.storeFinderService.getViewAllStoresLoading();
  }

  navigateToLocation(isoCode: string, event?: Event): void {
    if (this.routingService) {
      event?.preventDefault();
      this.routingService.go(['/store-finder/country', isoCode]);
    }
  }
}
