/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export const pickupInStoreDialog = {
  close: 'Close',
  modalHeader: 'Pickup in Store',
};

/** Translation keys for the PickupOptionsComponent */
const pickupOptions = {
  changeStore: 'Change Store',
  delivery: 'Ship It (Free Return)',
  pickup: 'Free Pickup In Store',
  selectStore: 'Select Store',
};

export const store = {
  pickupFromHere: 'Pick Up from here',
  stockLevel_inStock: '{{ count }} in Stock',
  stockLevel_outOfStock: 'Out of Stock',
  viewHours: 'View Hours',
};

export const storeList = {
  noStoresMessage: 'No stores found in database...',
};

export const storeSchedule = {
  closed: 'Closed',
  storeHours: 'Store hours',
};

export const storeSearch = {
  findAStore: 'Find a Store',
  findStores: 'Find Stores',
  hideOutOfStockOptions: 'Hide out of stock options',
  searchPlaceholder: 'Enter Zip Code, Town or Address',
  useMyLocation: 'Use my location',
  viewAllStores: 'View all stores',
};

/** All the translation chunks for pickup in store. */
export const pickupInStore = {
  pickupInStoreDialog,
  pickupOptions,
  store,
  storeList,
  storeSchedule,
  storeSearch,
};
