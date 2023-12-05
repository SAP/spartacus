/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** Translation keys for the PickupInfoComponent */
const pickupInfo = {
    inStorePickup: 'In Store Pickup',
    pickupBy: 'Pick up by',
    pickupFrom: 'Pick up from',
};
/** Translation keys for the PickupOptionDialogComponent */
const pickupOptionDialog = {
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
const setPreferredStore = {
    makeThisMyStore: 'Make This My Store',
    myStore: 'My Store',
};
/** Translation keys for the StoreComponent */
const store = {
    pickupFromHere: 'Pick Up from here',
    stockLevel_inStock: '{{ count }} in Stock',
    stockLevel_outOfStock: 'Out of Stock',
    viewHours: 'View Hours',
};
/** Translation keys for the StoreListComponent */
const storeList = {
    noStoresMessage: 'No stores found in database...',
};
/** Translation keys for the StoreScheduleComponent */
const storeSchedule = {
    closed: 'Closed',
    storeHours: 'Store hours',
};
/** Translation keys for the StoreSearchComponent */
const storeSearch = {
    findAStore: 'Find a Store',
    findStores: 'Find Stores',
    hideOutOfStockOptions: 'Hide out of stock options',
    searchPlaceholder: 'Enter Zip Code, Town or Address',
    useMyLocation: 'Use my location',
};
/** Translation keys for the AddressBook PickupInStoreComponent */
const addressBookPickupInStore = {
    heading: 'Pick-Up Store',
};
/** Translation keys for Preferred Store on Store Finder Page */
const storeFinderPickupInStore = {
    heading: 'My Store',
};
/** Translation keys for Pickup In Store In Checkout */
const checkoutPickupInStore = {
    heading: 'Items to be Picked Up',
    storeItemHeading: 'Pick Up Store Address',
};
const cartItems = {
    item: 'Item',
};
const deliveryPointOfServiceDetails = {
    itemsToBePickUp: 'Items To Be Pick-Up',
    pickUpInStoreAddress: 'Pick Up Store Address',
    itemsToBeShipped: 'Items To Be Shipped',
    shippingAddress: 'Shipping Address',
    deliveryMethod: 'Delivery Method',
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
const pickupInStore = {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** English language translations for pickup in store strings. */
const en = {
    pickupInStore,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const pickupInStoreTranslations = {
    en,
};
// expose all translation chunk mapping for the pickupInStore feature
const pickupInStoreTranslationChunksConfig = {
    pickupInStore: Object.keys(en.pickupInStore),
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { pickupInStoreTranslationChunksConfig, pickupInStoreTranslations };
//# sourceMappingURL=spartacus-pickup-in-store-assets.mjs.map
