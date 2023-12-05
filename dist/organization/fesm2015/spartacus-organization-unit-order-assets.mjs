/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const unitOrder = {
    unitLevelOrderHistory: {
        orderHistory: 'Unit-level order history',
        orderId: 'Order #',
        emptyPurchaseOrderId: 'None',
        date: 'Date',
        status: 'Status',
        buyer: 'Buyer',
        unit: 'Unit',
        total: 'Total',
        noOrders: 'We have no matching order records for your unit.',
        startShopping: 'Start Shopping',
        sortBy: 'Sort by',
        sortOrders: 'Sort orders',
        purchaseOrderNumber: 'PO #',
        startOn: 'Start On',
        frequency: 'Frequency',
        nextOrderDate: 'Next Order Date',
        notFound: 'No Orders Found',
        //--------------------
        applyFilter: 'Apply',
        filterBy: 'Filter by',
        filterByBuyer: 'Filter by Buyer',
        filterByBuyerLabel: 'Buyer name',
        filterByBuyerPlaceholder: 'Enter buyer name',
        filterByBuyerAriaLabel: 'Filter list by buyer',
        filterByUnit: 'Filter by Unit',
        filterByUnitLabel: 'Unit name',
        filterByUnitPlaceholder: 'Enter unit name',
        filterByUnitAriaLabel: 'Filter list by unit',
        search: 'Search',
        clearAll: 'Clear All',
        removeAppliedFilters: 'Remove filters',
        yourFilters: 'Your Filters:',
        and: ' and ',
    },
    unitLevelOrderHistorySorting: {
        date: 'Date',
        orderNumber: 'Order Number',
        buyer: 'Buyer (Ascending)',
        buyerDesc: 'Buyer (Descending)',
        orgUnit: 'Unit (Ascending)',
        orgUnitDesc: 'Unit (Descending)',
    },
    unitLevelOrderDetails: {
        buyer: 'Buyer',
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const en = {
    unitOrder,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const unitOrderTranslations = {
    en,
};
// expose all translation chunk mapping for Unit-Level Order feature
const unitOrderTranslationChunksConfig = {
    unitOrder: [
        'unitLevelOrderHistory',
        'unitLevelOrderHistorySorting',
        'unitLevelOrderDetails',
    ],
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { unitOrderTranslationChunksConfig, unitOrderTranslations };
//# sourceMappingURL=spartacus-organization-unit-order-assets.mjs.map
