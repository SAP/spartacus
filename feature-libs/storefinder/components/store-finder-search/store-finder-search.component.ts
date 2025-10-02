/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import {
  UntypedFormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { FeatureDirective } from '../../../../projects/core/src/features-config/directives/feature.directive';
import { IconComponent } from '../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
  selector: 'cx-store-finder-search',
  templateUrl: './store-finder-search.component.html',
  imports: [
    FeatureDirective,
    FormsModule,
    ReactiveFormsModule,
    IconComponent,
    RouterLink,
    NgClass,
    NgTemplateOutlet,
    TranslatePipe,
    MockTranslatePipe,
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
