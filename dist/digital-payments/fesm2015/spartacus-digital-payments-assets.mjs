/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const dpPaymentForm = {
    dpPaymentForm: {
        redirect: 'You will soon be redirected to third party page for card registration',
        callback: 'Please Wait... Fetching payment details...',
        cancelledOrFailed: 'Card registration failed or cancelled',
        error: {
            redirect: 'Unable to initiate operation. Please try again',
            paymentFetch: 'Unable to fetch payment details. Please try again.',
            unknown: 'Unknown error occurred while fetching payment. Please contact support',
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const en = {
    dpPaymentForm,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const dpTranslations = {
    en,
};
const dpTranslationChunksConfig = {
    dpPaymentForm: ['dpPaymentForm'],
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { dpTranslationChunksConfig, dpTranslations };
//# sourceMappingURL=spartacus-digital-payments-assets.mjs.map
