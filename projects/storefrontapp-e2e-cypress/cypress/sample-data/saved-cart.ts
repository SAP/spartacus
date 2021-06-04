import { product, SampleProduct } from './checkout-flow';

export const MOCK_ACTIVE_CART_CODE = '00000001';

export const products: SampleProduct[] = [
  { name: 'FUN Flash Single Use Camera, 27+12 pic', code: '779841' },
  { name: 'NV10', code: '553637' },
  product,
];

export const savedActiveCartForm = [
  {
    name: 'test1',
    description:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  { name: 'test2accessibility', description: 'test' },
  // to return default name and description from backend
  { name: '', description: '' },
  {
    name: 'test3',
    description:
      'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
  },
  {
    name: 'test4 updated',
    description: 'updated body',
  },
];

export const savedCarts = {
  carts: [
    {
      appliedOrderPromotions: [
        {
          consumedEntries: [],
          description: 'Buy over $250.00 get 10% discount on cart',
          promotion: {
            code: 'order_threshold_percentage_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
      appliedProductPromotions: [],
      appliedVouchers: [],
      code: '00001385',
      deliveryItemsQuantity: 1,
      entries: [
        {
          basePrice: { formattedValue: '$264.69', value: 264.69 },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: true,
            averageRating: 4.541666666666667,
            baseOptions: [],
            categories: [
              { code: '576', name: 'Digital Compacts' },
              { code: 'brand_26', name: 'Samsung' },
            ],
            code: '553637',
            configurable: false,
            images: [
              {
                altText: 'NV10',
                format: 'zoom',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wyNjQ0MHxpbWFnZS9qcGVnfGltYWdlcy9oOTYvaDJlLzg3OTcyMDg2NDE1NjYuanBnfDJkNzBmNTc2MzEzMzM5MjNhZjlmMmEyMWU0NDU1MDIzZDQ1NTU4MjhmYzFjNjRiYTJhZTJhZmYyZWRkYWEzYWI',
              },
              {
                altText: 'NV10',
                format: 'product',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wxMjA0MHxpbWFnZS9qcGVnfGltYWdlcy9oYTkvaGY2Lzg3OTcyMzQ5MjE1MDIuanBnfGZlNWQwMjgzOGFkODI5NTM4MWU5N2I0ZDIxYjMxNzlkODdjYWMxYzYyOGFjMGMzNGU1NDJlNDAzY2ExZjcxOWI',
              },
              {
                altText: 'NV10',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wyNjEzfGltYWdlL2pwZWd8aW1hZ2VzL2g1ZC9oY2UvODc5NzI2MTI2Njk3NC5qcGd8YzJmOGEzMmZkMWM0Njk0Y2Q5Yjg1ODA1ZGRkZDMzYTczMDkxNzRmNmU2MWZkN2YxYjM5MTE3YmEwZDhjYjk2Ng',
              },
              {
                altText: 'NV10',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wxNjk2fGltYWdlL2pwZWd8aW1hZ2VzL2g2ZS9oNjUvODc5NzI4NzYxMjQ0Ni5qcGd8NTQxNTkwMWZmM2RmMmYzZDliYThlYjA2OGU4MGFiNTI2OGQxMDg0MmZmMjQ4OWU3YjZiZjIzNjNiOWMzZTNkZg',
              },
            ],
            manufacturer: 'Samsung',
            name: 'NV10',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 240,
              stockLevelStatus: 'inStock',
            },
            url:
              '/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/NV10/p/553637',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$264.69',
            value: 264.69,
          },
          updateable: true,
        },
      ],
      guid: '885ebc54-0c72-4bce-9d87-14e1648bc1d1',
      net: false,
      pickupItemsQuantity: 0,
      productDiscounts: { formattedValue: '$0.00' },
      subTotal: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalDiscounts: {
        currencyIso: 'USD',
        formattedValue: '$46.47',
        priceType: 'BUY',
        value: 46.47,
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      description:
        'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      name: 'test1',
      potentialOrderPromotions: [
        {
          consumedEntries: [],
          description:
            'Spend another $235.31 to increase the cart total to more than $500.00 to be eligible for a 5% discount.',
          promotion: {
            code: 'csa_discount_cart_above_500_05_percent_potential',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $735.31 to increase the cart total to more than $1,000.00 to be eligible for a 10% discount.',
          promotion: {
            code: 'csa_discount_cart_above_1000_10_discount',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $1,235.31 to increase the cart total to more than $1,500.00 to be eligible for a 15% discount.',
          promotion: {
            code: 'csa_discount_cart_above_1500_15_discount',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend $2,500.00 get EF 100mm f/2.8L Macro IS USM for $1,000.00 - Spend $2,235.31 more and add EF 100mm f/2.8L Macro IS USM to your order to qualify!',
          promotion: {
            code: 'order_threshold_perfect_partner_potential_001',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $135.31 to get an InfoLithium battery for $50',
          promotion: {
            code: 'order_threshold_fixed_price_products_potential_001',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
      potentialProductPromotions: [],
      saveTime: '2021-06-03T19:01:44+0000',
      totalUnitCount: 1,
    },
    {
      appliedOrderPromotions: [
        {
          consumedEntries: [],
          description: 'Buy over $250.00 get 10% discount on cart',
          promotion: {
            code: 'order_threshold_percentage_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
      appliedProductPromotions: [],
      appliedVouchers: [],
      code: '00001385',
      deliveryItemsQuantity: 1,
      entries: [
        {
          basePrice: { formattedValue: '$264.69', value: 264.69 },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: true,
            averageRating: 4.541666666666667,
            baseOptions: [],
            categories: [
              { code: '576', name: 'Digital Compacts' },
              { code: 'brand_26', name: 'Samsung' },
            ],
            code: '553637',
            configurable: false,
            images: [
              {
                altText: 'NV10',
                format: 'zoom',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wyNjQ0MHxpbWFnZS9qcGVnfGltYWdlcy9oOTYvaDJlLzg3OTcyMDg2NDE1NjYuanBnfDJkNzBmNTc2MzEzMzM5MjNhZjlmMmEyMWU0NDU1MDIzZDQ1NTU4MjhmYzFjNjRiYTJhZTJhZmYyZWRkYWEzYWI',
              },
              {
                altText: 'NV10',
                format: 'product',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wxMjA0MHxpbWFnZS9qcGVnfGltYWdlcy9oYTkvaGY2Lzg3OTcyMzQ5MjE1MDIuanBnfGZlNWQwMjgzOGFkODI5NTM4MWU5N2I0ZDIxYjMxNzlkODdjYWMxYzYyOGFjMGMzNGU1NDJlNDAzY2ExZjcxOWI',
              },
              {
                altText: 'NV10',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wyNjEzfGltYWdlL2pwZWd8aW1hZ2VzL2g1ZC9oY2UvODc5NzI2MTI2Njk3NC5qcGd8YzJmOGEzMmZkMWM0Njk0Y2Q5Yjg1ODA1ZGRkZDMzYTczMDkxNzRmNmU2MWZkN2YxYjM5MTE3YmEwZDhjYjk2Ng',
              },
              {
                altText: 'NV10',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url:
                  '/medias/?context=bWFzdGVyfGltYWdlc3wxNjk2fGltYWdlL2pwZWd8aW1hZ2VzL2g2ZS9oNjUvODc5NzI4NzYxMjQ0Ni5qcGd8NTQxNTkwMWZmM2RmMmYzZDliYThlYjA2OGU4MGFiNTI2OGQxMDg0MmZmMjQ4OWU3YjZiZjIzNjNiOWMzZTNkZg',
              },
            ],
            manufacturer: 'Samsung',
            name: 'NV10',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 240,
              stockLevelStatus: 'inStock',
            },
            url:
              '/Open-Catalogue/Cameras/Digital-Cameras/Digital-Compacts/NV10/p/553637',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$264.69',
            value: 264.69,
          },
          updateable: true,
        },
      ],
      guid: '885ebc54-0c72-4bce-9d87-14e1648bc1d1',
      net: false,
      pickupItemsQuantity: 0,
      productDiscounts: { formattedValue: '$0.00' },
      subTotal: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalDiscounts: {
        currencyIso: 'USD',
        formattedValue: '$46.47',
        priceType: 'BUY',
        value: 46.47,
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$218.22',
        priceType: 'BUY',
        value: 218.22,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      user: {
        name: 'Cypress User',
        uid: 'cypress_user_okqj8ysdz_87211563485@sapcx.com',
      },
      description:
        'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      name: 'test1',
      paymentType: { code: 'CARD', displayName: 'Card Payment' },
      potentialOrderPromotions: [
        {
          consumedEntries: [],
          description:
            'Spend another $235.31 to increase the cart total to more than $500.00 to be eligible for a 5% discount.',
          promotion: {
            code: 'csa_discount_cart_above_500_05_percent_potential',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $735.31 to increase the cart total to more than $1,000.00 to be eligible for a 10% discount.',
          promotion: {
            code: 'csa_discount_cart_above_1000_10_discount',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $1,235.31 to increase the cart total to more than $1,500.00 to be eligible for a 15% discount.',
          promotion: {
            code: 'csa_discount_cart_above_1500_15_discount',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend $2,500.00 get EF 100mm f/2.8L Macro IS USM for $1,000.00 - Spend $2,235.31 more and add EF 100mm f/2.8L Macro IS USM to your order to qualify!',
          promotion: {
            code: 'order_threshold_perfect_partner_potential_001',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description:
            'Spend another $135.31 to get an InfoLithium battery for $50',
          promotion: {
            code: 'order_threshold_fixed_price_products_potential_001',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
      potentialProductPromotions: [],
      saveTime: '2021-06-03T19:01:44+0000',
      totalUnitCount: 1,
    },
    {
      appliedOrderPromotions: [],
      appliedProductPromotions: [],
      appliedVouchers: [],
      code: 'selectivecartelectronics-spa2d44f4c5-7293-47b6-986a-a3e0eabc6e4c',
      deliveryItemsQuantity: 0,
      entries: [],
      guid: '1bdefa2a-b5a7-4c68-a20d-9ceb6427eb21',
      net: false,
      pickupItemsQuantity: 0,
      productDiscounts: { formattedValue: '$0.00' },
      subTotal: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      totalDiscounts: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      totalItems: 0,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      user: {
        name: 'Cypress User',
        uid: 'cypress_user_okqj8ysdz_87211563485@sapcx.com',
      },
      description: 'Selective cart for [Cypress User].',
      name: 'selectivecart',
      paymentType: { code: 'CARD', displayName: 'Card Payment' },
      potentialOrderPromotions: [],
      potentialProductPromotions: [],
      saveTime: '2021-06-03T19:01:40+0000',
      totalUnitCount: 0,
    },
  ],
};
