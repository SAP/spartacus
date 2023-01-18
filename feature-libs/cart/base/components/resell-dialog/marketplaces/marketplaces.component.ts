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
      imageUrl: 'https://cdn.worldvectorlogo.com/logos/ebay.svg',
    },
    {
      id: 'facebook',
      name: 'Facebook Marketplace',
      imageUrl:
        'https://cdn.worldvectorlogo.com/logos/marketplace-facebook.svg',
    },
    {
      id: 'craigslist',
      name: 'Craigslist',
      imageUrl: 'https://cdn.worldvectorlogo.com/logos/craigslist.svg',
    },
    {
      id: 'gumtree',
      name: 'Gumtree',
      imageUrl:
        'https://www.logosvgpng.com/wp-content/uploads/2018/04/gumtree-logo-vector.png',
    },
  ];

  constructor() {
    // Intentional empty constructor
  }

  goToNextStep(marketplaceId: string) {
    this.nextStep.emit(`login:${marketplaceId}`);
  }
}
