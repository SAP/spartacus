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
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
      appliedProductPromotions: [],
      appliedVouchers: [],
      code: '00008692',
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
      guid: 'dad74499-d58f-4ced-be39-137bbcbedd65',
      net: false,
      pickupItemsQuantity: 0,
      productDiscounts: { formattedValue: '$0.00' },
      subTotal: {
        currencyIso: 'USD',
        formattedValue: '$244.69',
        priceType: 'BUY',
        value: 244.69,
      },
      totalDiscounts: {
        currencyIso: 'USD',
        formattedValue: '$20.00',
        priceType: 'BUY',
        value: 20,
      },
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$244.69',
        priceType: 'BUY',
        value: 244.69,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$244.69',
        priceType: 'BUY',
        value: 244.69,
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
      potentialOrderPromotions: [],
      potentialProductPromotions: [],
      saveTime: '2021-06-07T15:40:27+0000',
      totalUnitCount: 1,
    },
  ],
};
