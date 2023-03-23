/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/** Translation keys for the PickupInfoComponent */
export const pickupInfo = {
  inStorePickup: 'In Store Pickup',
  pickupBy: 'Pick up by',
  pickupFrom: 'Pick up from',
};

/** Translation keys for the PickupOptionDialogComponent */
export const pickupOptionDialog = {
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

/** Translation keys for the SetPreferredStoreComponent */
export const setPreferredStore = {
  makeThisMyStore: 'Make This My Store',
  myStore: 'My Store',
};

/** Translation keys for the StoreComponent */
export const store = {
  pickupFromHere: 'Pick Up from here',
  stockLevel_inStock: '{{ count }} in Stock',
  stockLevel_outOfStock: 'Out of Stock',
  viewHours: 'View Hours',
};

/** Translation keys for the StoreListComponent */
export const storeList = {
  noStoresMessage: 'No stores found in database...',
};

/** Translation keys for the StoreScheduleComponent */
export const storeSchedule = {
  closed: 'Closed',
  storeHours: 'Store hours',
};

/** Translation keys for the StoreSearchComponent */
export const storeSearch = {
  findAStore: 'Find a Store',
  findStores: 'Find Stores',
  hideOutOfStockOptions: 'Hide out of stock options',
  searchPlaceholder: 'Enter Zip Code, Town or Address',
  useMyLocation: 'Use my location',
};
/** Translation keys for the AddressBook PickupInStoreComponent */

export const addressBookPickupInStore = {
  heading: 'Pick-Up Store',
};

/** Translation keys for Preferred Store on Store Finder Page */

export const storeFinderPickupInStore = {
  heading: 'My Store',
};

/** Translation keys for Pickup In Store In Checkout */

export const checkoutPickupInStore = {
  heading: 'Items to be Picked Up',
  storeItemHeading: 'Pick Up Store Address',
};

export const cartItems = {
  item: 'Item',
};

export const deliveryPointOfServiceDetails = {
  itemsToBePickUp: 'Items To Be Pick-Up',
  pickUpInStoreAddress: 'Pick Up Store Address',
  itemsToBeShipped: 'Items To Be Shipped',
  shippingAddress: 'Shipping Address',
  deliveryMethod: 'Delivery Method',
  deliveryStatus_IN_TRANSIT: 'In Transit',
  deliveryStatus_READY_FOR_PICKUP: 'Ready for Pickup',
  deliveryStatus_READY_FOR_SHIPPING: 'Ready for Shipping',
  deliveryStatus_WAITING: 'Waiting',
  deliveryStatus_DELIVERING: 'Delivering',
  deliveryStatus_PICKPACK: 'Preparing for Shipment',
  deliveryStatus_PICKUP_COMPLETE: 'Pickup Complete',
  deliveryStatus_DELIVERY_COMPLETED: 'Delivery Complete',
  deliveryStatus_PAYMENT_NOT_CAPTURED: 'Payment Issue',
  deliveryStatus_IN_PROCESS: 'In Process',
  deliveryStatus_READY: 'In Process',
  deliveryStatus_DELIVERY_REJECTED: 'Delivery Rejected',
  deliveryStatus_SHIPPED: 'Shipped',
  deliveryStatus_TAX_NOT_COMMITTED: 'Tax Issue',
  deliveryStatus_CANCELLED: 'Cancelled',
  statusDisplay_cancelled: 'Cancelled',
  statusDisplay_cancelling: 'Cancel Pending',
  statusDisplay_completed: 'Completed',
  statusDisplay_created: 'Created',
  statusDisplay_error: 'Pending',
  statusDisplay_Error: 'Pending',
  statusDisplay_processing: 'Pending',
  statusDisplay_open: 'Open',
  statusDisplay_pending: {
    approval: 'Pending Approval',
    merchant: {
      approval: 'Pending Merchant Approval',
    },
  },
  statusDisplay_approved: 'Approved',
  statusDisplay_rejected: 'Rejected',
  statusDisplay_merchant: {
    approved: 'Merchant Approved',
    rejected: 'Merchant Rejected',
  },
  statusDisplay_assigned: {
    admin: 'Assigned To Administrator',
  },
};

/** All the translation chunks for pickup in store. */
export const pickupInStore = {
  pickupInfo,
  pickupOptionDialog,
  pickupOptions,
  setPreferredStore,
  store,
  storeList,
  storeSchedule,
  storeSearch,
  addressBookPickupInStore,
  storeFinderPickupInStore,
  checkoutPickupInStore,
  cartItems,
  deliveryPointOfServiceDetails,
};
