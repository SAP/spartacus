/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { configureApparelProduct, LOCATORS } from '../../pickup-in-store-utils';
import { verifyTabbingOrder } from '../tabbing-order';
import { TabbingOrderTypes, TabElement } from '../tabbing-order.model';

const containerSelector = LOCATORS.PICKUP_IN_STORE_MODAL;

export function productPagePickupModalTabbingOrder(config: TabElement[]) {
  configureApparelProduct();
  cy.get('a[data-store-location-link=select').click();

  cy.intercept({
    method: 'GET',
    url: /products\/[0-9a-zA-Z|-]*\/stock\?/,
  }).as('apiGetStores');

  verifyTabbingOrder(containerSelector, config);
  cy.get(LOCATORS.USE_MY_LOCATION).click();

  cy.wait('@apiGetStores').then((interception) => {
    const stores = interception.response.body['stores'].slice(0, 20);
    const storeControls = stores.flatMap((store) => {
      const pickUpInStoreButton = !store.stockInfo.stockLevel
        ? []
        : [{ value: 'Pick Up from here', type: TabbingOrderTypes.BUTTON }];
      const result = [
        { value: 'View Hours', type: TabbingOrderTypes.BUTTON },
        { value: 'Make This My Store', type: TabbingOrderTypes.BUTTON },
        ...pickUpInStoreButton,
      ];
      return result;
    });
    const newConfig = [...config, ...storeControls];
    verifyTabbingOrder(containerSelector, newConfig);
  });
}
