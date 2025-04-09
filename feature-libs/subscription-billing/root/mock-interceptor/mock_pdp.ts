export const mock_pdp = {
  // availableForPickup: false,
  // baseOptions: [],
  // bundleTemplates: [],
  // categories: [],
  // code: 'Mobile_2020_Plan_cpq',
  // configurable: false,
  // description: 'Mobile 2020 Plan',
  // multidimensional: false,
  // name: 'Mobile 2020 Plan',
  // numberOfReviews: 0,
  // price: {
  //   currencyIso: 'USD',
  // },
  // priceRange: {},
  // productTypes: 'SUBSCRIPTION',
  // purchasable: true,
  sapPricePlan: {
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
          name: 'Pay on Checkout',
          namePastTense: 'Paid on Checkout',
        },
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
    perUnitUsageCharges: [
      {
        blockSize: 30,
        includedQty: 5,
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
          name: 'minutes in Europe',
          namePlural: 'minutes in Europe',
        },
      },
      {
        blockSize: 30,
        includedQty: 5,
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
        usageChargeType: 'each_applicable_tier',
        usageUnit: {
          name: 'GB',
          namePlural: 'GB',
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
  sapSubscriptionTerm: {
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
  },
  // sapUnit: {
  //   availabilityCode: 'EA',
  //   code: 'EA',
  //   name: 'each',
  //   sapCode: 'EA',
  // },
  // stock: {
  //   isValueRounded: false,
  //   stockLevelStatus: 'inStock',
  // },
  // summary: '',
  // url: '/c/Mobile-2020-Plan/p/Mobile_2020_Plan_cpq',
};
