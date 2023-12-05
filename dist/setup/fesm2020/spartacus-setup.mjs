/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// While it is not strictly required to define checkout endpoints in a separate `UserAccountOccEndpoints`
// variable, type augmentation does require that this file imports `UserAccountOccEndpoints`.
// A good way to make sure the `UserAccountOccEndpoints` import is not removed by mistake is to use
// `UserAccountOccEndpoints` in the code.
const defaultB2bUserAccountOccEndpoints = {
    user: 'orgUsers/${userId}',
};
const defaultB2bUserProfileOccEndpoints = {
    userUpdateProfile: 'users/${userId}',
    userCloseAccount: 'users/${userId}',
};
const defaultB2bCartOccEndpoints = {
    addEntries: 'orgUsers/${userId}/carts/${cartId}/entries?quantity=${quantity}',
};
const defaultB2bOrderOccEndpoints = {
    placeOrder: 'orgUsers/${userId}/orders?fields=FULL',
    scheduleReplenishmentOrder: 'orgUsers/${userId}/replenishmentOrders?fields=FULL,costCenter(FULL),purchaseOrderNumber,paymentType',
    reorder: 'orgUsers/${userId}/cartFromOrder?orderCode=${orderCode}',
};
const defaultB2bOccConfig = {
    backend: {
        occ: {
            endpoints: {
                ...defaultB2bUserAccountOccEndpoints,
                ...defaultB2bUserProfileOccEndpoints,
                ...defaultB2bCartOccEndpoints,
                ...defaultB2bOrderOccEndpoints,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { defaultB2bOccConfig };
//# sourceMappingURL=spartacus-setup.mjs.map
