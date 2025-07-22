/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const one_time_and_recurring_charges = {
  oneTimeCharges: [
    {
      billingTime: {
        name: 'Pay on Checkout',
        namePastTense: 'Paid on Checkout',
      },
      price: {
        currencyIso: 'USD',
        formattedValue: '10 USD',
        maxQuantity: 0,
        minQuantity: 0,
        priceType: 'BUY',
        value: 10,
      },
    },
    {
      billingTime: {
        name: 'Pay on Activation',
        namePastTense: 'Paid on Activation',
      },
      price: {
        currencyIso: 'USD',
        formattedValue: '5 USD',
        maxQuantity: 0,
        minQuantity: 0,
        priceType: 'BUY',
        value: 10,
      },
    },
  ],
  recurringCharges: [
    {
      price: {
        currencyIso: 'USD',
        formattedValue: '100 USD',
        maxQuantity: 0,
        minQuantity: 0,
        priceType: 'BUY',
        value: 100,
      },
    },
  ],
};
const term = {
  billingPlan: {
    billingTime: {
      name: 'Monthly Payment',
      namePastTense: 'Paid Monthly',
    },
  },
  minimumTerm: {
    frequency: {
      name: 'Months',
    },
    value: 3,
  },
  renewalTerm: {
    frequency: {
      name: 'Months',
    },
    value: 3,
  },
};

export const mock_pdp_vol = {
  sapPricePlan: {
    ...one_time_and_recurring_charges,
    volumeUsageCharges: [
      {
        overageUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
          },
        ],
        tierUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            tierEnd: 100,
            tierStart: 1,
          },
        ],
        usageUnit: {
          name: 'SMS',
          namePlural: 'SMS',
        },
      },
      {
        overageUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: '75 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 75,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 5,
            },
          },
        ],
        tierUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: '10 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 10,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: '5 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 5,
            },
            tierEnd: 10,
            tierStart: 1,
          },
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: '30 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 30,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: '5 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 5,
            },
            tierEnd: 20,
            tierStart: 11,
          },
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: '50 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 50,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: 'USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 5,
            },
            tierEnd: 50,
            tierStart: 21,
          },
        ],
        usageUnit: {
          name: 'GB',
          namePlural: 'GB',
        },
      },
    ],
  },
  sapSubscriptionTerm: term,
};

export const mock_pdp_percentage = {
  sapPricePlan: {
    ...one_time_and_recurring_charges,
    perUnitUsageCharges: [
      {
        perUnitUsageChargeEntries: [
          {
            price: {
              currencyIso: 'USD',
              formattedValue: '10',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 10,
            },
          },
        ],
        ratio: '2%',
        usageChargeType: 'percentage_usage_charge',
        usageUnit: {
          name: 'GB',
          namePlural: 'GB',
        },
      },
    ],
  },
  sapSubscriptionTerm: term,
};

export const mock_pdp_tier = {
  sapPricePlan: {
    ...one_time_and_recurring_charges,
    perUnitUsageCharges: [
      {
        minBlocks: 10,
        overageUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: '10 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 10,
            },
          },
        ],
        tierUsageChargeEntries: [
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: '20 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 20,
            },
            tierEnd: 100,
            tierStart: 1,
          },
          {
            fixedPrice: {
              currencyIso: 'USD',
              formattedValue: 'string',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 0,
            },
            price: {
              currencyIso: 'USD',
              formattedValue: '15 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 15,
            },
            tierEnd: 200,
            tierStart: 101,
          },
        ],
        usageChargeType: 'each_respective_tier',
        usageUnit: {
          name: 'GB',
          namePlural: 'GB',
        },
      },
    ],
  },
  sapSubscriptionTerm: term,
};

export const mock_pdp_block = {
  sapPricePlan: {
    ...one_time_and_recurring_charges,
    perUnitUsageCharges: [
      {
        blockSize: 30,
        includedQty: 50,
        usageChargeType: 'block_usage_charge',
        perUnitUsageChargeEntries: [
          {
            price: {
              currencyIso: 'USD',
              formattedValue: '20 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 20,
            },
          },
        ],
        usageUnit: {
          name: 'minutes in India',
          namePlural: 'minutes in India',
        },
      },
      {
        blockSize: 30,
        includedQty: 30,
        usageChargeType: 'block_usage_charge',
        perUnitUsageChargeEntries: [
          {
            price: {
              currencyIso: 'USD',
              formattedValue: '50 USD',
              maxQuantity: 0,
              minQuantity: 0,
              priceType: 'BUY',
              value: 50,
            },
          },
        ],
        usageUnit: {
          name: 'roaming minutes',
          namePlural: 'roaming minutes',
        },
      },
    ],
  },
  sapSubscriptionTerm: term,
};
