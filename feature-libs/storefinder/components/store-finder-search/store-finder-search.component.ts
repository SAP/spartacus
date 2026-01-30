/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  RoutingService,
  TranslatePipe,
  FeatureDirective,
} from '@spartacus/core';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IconComponent,
    RouterLink,
    NgClass,
    NgTemplateOutlet,
    TranslatePipe,
    FeatureDirective,
  ],
})
export class StoreFinderSearchComponent {
  searchBox: UntypedFormControl = new UntypedFormControl();
  iconTypes = ICON_TYPE;

  constructor(private routingService: RoutingService) {}

  findStores(address: string) {
    this.routingService.go(['store-finder/find'], {
      queryParams: {
        query: address,
      },
    });
  }

  viewStoresWithMyLoc() {
    this.routingService.go(['store-finder/find'], {
      queryParams: {
        useMyLocation: true,
      },
    });
  }

  onKey(event: any) {
    if (
      this.searchBox.value &&
      this.searchBox.value.length &&
      event.key === 'Enter'
    ) {
      this.findStores(this.searchBox.value);
    }
  }
}
