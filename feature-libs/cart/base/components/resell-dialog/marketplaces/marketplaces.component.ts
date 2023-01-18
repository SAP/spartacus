/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cx-marketplaces',
  templateUrl: './marketplaces.component.html',
})
export class MarketplacesComponent {
  @Output() nextStep = new EventEmitter<string>();

  marketplaces = [
    {
      id: 'ebay',
      name: 'eBay',
      imageUrl: 'https://via.placeholder.com/100x50?text=Marketplace+Logo',
    },
    {
      id: 'facebook',
      name: 'Facebook Marketplace',
      imageUrl: 'https://via.placeholder.com/100x50?text=Marketplace+Logo',
    },
    {
      id: 'craigslist',
      name: 'Craigslist',
      imageUrl: 'https://via.placeholder.com/100x50?text=Marketplace+Logo',
    },
    {
      id: 'gumtree',
      name: 'Gumtree',
      imageUrl: 'https://via.placeholder.com/100x50?text=Marketplace+Logo',
    },
  ];

  constructor() {
    // Intentional empty constructor
  }

  goToNextStep(marketplaceId: string) {
    this.nextStep.emit(marketplaceId);
  }
}
