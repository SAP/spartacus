import { b2bProduct } from './b2b-checkout';

export const CURRENT_USER_ID = 'current';
export const MOCK_ACTIVE_CART_CODE = '00000001';

export const products = [
  b2bProduct,
  {
    name: 'Measuring beakers',
    code: '2217258',
  },
  {
    name: '6 Inch Nylon Cable Ties 100-Pack',
    code: '1128763',
  },
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
      entries: [
        {
          basePrice: {
            formattedValue: '$4.50',
            value: 4.5,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: false,
            baseOptions: [],
            categories: [
              {
                code: '1358',
                name: 'Measuring & Layout Tools',
              },
              {
                code: 'brand_912',
                name: 'Hama',
              },
            ],
            code: '2217258',
            configurable: false,
            images: [
              {
                altText: 'Measuring beakers',
                format: 'zoom',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wzNjg4N3xpbWFnZS9qcGVnfGltYWdlcy9oMzMvaDQ3Lzg3OTY4Njc2OTA1MjYuanBnfGQ1MGM5YzMxMzIwOTNhOGZiMDdhMzRiMzc3ZGVlNmE4ZTY3YWRiZTkyODA1N2Q3ZDVhYjM4MTNiZTU0YzhjNTc',
              },
              {
                altText: 'Measuring beakers',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMzk0M3xpbWFnZS9qcGVnfGltYWdlcy9oY2QvaDE2Lzg3OTY4OTQ5NTM1MDIuanBnfGE5ZTYyNjY4YjZhYjcxNzNkNWQ0OTNkN2Y1NjM5MjljNjdlMzlkNDc3ODQ1NjhjZjI2NGY4ZDFiZTBmYWY5MTU',
              },
              {
                altText: 'Measuring beakers',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzc4fGltYWdlL2pwZWd8aW1hZ2VzL2gzMS9oZDkvODc5NjkyMjIxNjQ3OC5qcGd8OTg5OGE5OTFjNDE0M2FhMDU1ZjJiZjgxY2NkNzlmYTExYmI5YTRmZTI3MTZmMzlmNjBjZTVjNmQ2NTFiMzAyMQ',
              },
              {
                altText: 'Measuring beakers',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDc2fGltYWdlL2pwZWd8aW1hZ2VzL2g3NC9oOTYvODc5Njk0OTQ3OTQ1NC5qcGd8MDkxODQ4MWQ1Y2UzZjljYzU5NDdmN2RlNjNmY2I0MTc3MzFkMDRkNjk4YmJjNWI4NzNlODZlMDg3NDdmOTQ1MQ',
              },
            ],
            manufacturer: 'Hama',
            name: 'Measuring beakers',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 168,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/Measuring-beakers/p/2217258',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$4.50',
            value: 4.5,
          },
          updateable: true,
        },
      ],
      guid: '2d486162-87f8-4ab8-bd07-b69d70f4e471',
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$4.50',
        priceType: 'BUY',
        value: 4.5,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$4.50',
        priceType: 'BUY',
        value: 4.5,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0.0,
      },
      description: savedActiveCartForm[0].description,
      name: savedActiveCartForm[0].name,
      saveTime: '2021-03-22T21:42:23+0000',
      totalUnitCount: 1,
    },
    {
      entries: [
        {
          basePrice: {
            formattedValue: '$16.00',
            value: 16,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: false,
            baseOptions: [],
            categories: [
              {
                code: '1358',
                name: 'Measuring & Layout Tools',
              },
              {
                code: 'brand_1518',
                name: 'StarTech.com',
              },
            ],
            code: '1128763',
            configurable: false,
            images: [
              {
                altText: '6 Inch Nylon Cable Ties 100-Pack',
                format: 'zoom',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNzc3OHxpbWFnZS9qcGVnfGltYWdlcy9oOTEvaGJhLzg3OTY4NjI3NzUzMjYuanBnfGE3NTA4NjIyN2FhNmYyMjI3Nzk4YTU5NjE0ZWVjOWUwOGM2MzdhMDljMjA5MjM1N2Q0ZDc5MDg4OTVlYzU3ODI',
              },
              {
                altText: '6 Inch Nylon Cable Ties 100-Pack',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDk3MnxpbWFnZS9qcGVnfGltYWdlcy9oMDMvaGZmLzg3OTY4OTAwMzgzMDIuanBnfGIwMWMzMTg5ODU4ZDMwZjU2MjA4ODMyMjlkMzA4NTBjZDZiMjMxM2RmOTU2MzJlYWZjMjVhYTgwOGRiMjBiMzc',
              },
              {
                altText: '6 Inch Nylon Cable Ties 100-Pack',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTYzfGltYWdlL2pwZWd8aW1hZ2VzL2hmZi9oYzUvODc5NjkxNzMwMTI3OC5qcGd8ODMzMGVkOWU2MTg5ZTg0NGI2ZjRjYTEzYzFiODJhMGYyNzg2ODA4MzA3M2U2ZTE2NWZhMWFmNTk1Mjg5ODBmYQ',
              },
              {
                altText: '6 Inch Nylon Cable Ties 100-Pack',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjQwfGltYWdlL2pwZWd8aW1hZ2VzL2gyYS9oYTMvODc5Njk0NDU2NDI1NC5qcGd8ODI3NjA2NjhiOTNiNDYxOTMxMzdiNjIxMmFmNjFiZGUxMWVkMmQ5ZDA3ZGU4YmU2Mzg0MzcxNDRjMDJmNzdjMQ',
              },
            ],
            manufacturer: 'StarTech.com',
            name: '6 Inch Nylon Cable Ties 100-Pack',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 122,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/6-Inch-Nylon-Cable-Ties-100-Pack/p/1128763',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$16.00',
            value: 16,
          },
          updateable: true,
        },
      ],
      guid: 'ca9b4d35-7d9e-4a52-b87c-bb44575c7ae2',
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$16.00',
        priceType: 'BUY',
        value: 16,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$16.00',
        priceType: 'BUY',
        value: 16,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: 'BUY',
        value: 0,
      },
      description: '-',
      name: '00002708',
      saveTime: '2021-03-23T00:50:08+0000',
      totalUnitCount: 1,
    },
  ],
};
