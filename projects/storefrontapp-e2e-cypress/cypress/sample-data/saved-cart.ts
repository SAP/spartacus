/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { cheapProduct, product } from './checkout-flow';

export const CURRENT_USER_ID = 'current';
export const MOCK_ACTIVE_CART_CODE = '00000001';

export const products = [
  product,
  cheapProduct,
  {
    name: 'FUN Flash Single Use Camera, 27+12 pic',
    code: '779841',
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
            formattedValue: '$3.45',
            value: 3.45,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: false,
            baseOptions: [],
            categories: [
              {
                code: '779841',
                name: 'FUN Flash Single Use Camera, 27+12 pic',
              },
            ],
            code: '779841',
            configurable: false,
            images: [
              {
                altText: 'FUN Flash Single Use Camera, 27+12 pic',
                format: 'zoom',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMTk1MHxpbWFnZS9qcGVnfGltYWdlcy9oYjEvaGQ0Lzg3OTcyMjIwMTA5MTAuanBnfGZlNzQ0MmJjNWNkZmE1ZDUyZmMzYjlhYTdiMzA3ZjhlMmJmYjhmY2VhNTExMjliM2MxMDk2ZWE1MzNmYTliNzI',
              },
              {
                altText: 'FUN Flash Single Use Camera, 27+12 pic',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDk5N3xpbWFnZS9qcGVnfGltYWdlcy9oNTMvaGZiLzg3OTcyNDgyOTA4NDYuanBnfGEwYjQ0YTA1M2Y4NGUzOWMxNTA4Y2ZkZjIyMDJkODdhMjU1YWE5MzEyMGY1YWM0Zjg2NTJhODEzZTBiYTU1OWU',
              },
              {
                altText: 'FUN Flash Single Use Camera, 27+12 pic',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyODI2fGltYWdlL2pwZWd8aW1hZ2VzL2gwNi9oMGIvODc5NzI3NDYzNjMxOC5qcGd8YTc1YWI3OTUxODA3ZjZmYjZiNmIwY2E1ZWIwMmQ2MGNjYjhiNjY0M2M1YjdmNjQ2YjMwNTkwYTViZjk3OWIwMQ',
              },
              {
                altText: 'FUN Flash Single Use Camera, 27+12 pic',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxODQ1fGltYWdlL2pwZWd8aW1hZ2VzL2hhNi9oMDkvODc5NzMwMDk4MTc5MC5qcGd8YjNiMDE5ODM3ZDYxYWM1MjlmOWQxZTNhODZmNjAxMTViMWM1YjZkNzMyOWI2YWZlMjc4NWM2ZjY1Nzc0ZDc3Mw',
              },
            ],
            manufacturer: 'Kodak',
            name: 'FUN Flash Single Use Camera, 27+12 pic',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 243,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Cameras/Film-cameras/FUN-Flash-Single-Use-Camera%2C-27%2B12-pic/p/779841',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$3.45',
            value: 3.45,
          },
          updateable: true,
        },
      ],
      guid: 'ca9b4d35-7d9e-4a52-b87c-bb44575c7ae2',
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$3.45',
        priceType: 'BUY',
        value: 3.45,
      },
      totalPriceWithTax: {
        formattedValue: '$3.45',
        priceType: 'BUY',
        value: 3.45,
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
    {
      entries: [
        {
          basePrice: {
            formattedValue: '$452,88',
            value: 452.88,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: false,
            baseOptions: [],
            categories: [
              {
                code: '584',
                name: 'Hand-held Camcorders',
                url: '/Open-Catalogue/Cameras/Hand-held-Camcorders/c/584',
              },
              {
                code: 'brand_5',
                name: 'Sony',
                url: '/Brands/Sony/c/brand_5',
              },
            ],
            code: '1934406',
            configurable: false,
            images: [
              {
                altText: 'HDR-CX105E  Red',
                format: 'zoom',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxODcxMnxpbWFnZS9qcGVnfGltYWdlcy9oMTUvaGE0Lzg3OTcyMDQyNTA2NTQuanBnfDAzOGIxMzUzNDVhZjQyYWQzODhhOGM5MzE2OWMzMDE1YzQyMjZlYzMyOGEzYzIxMWEzMTVlNGZiNDQ2MDA0NWU',
              },
              {
                altText: 'HDR-CX105E  Red',
                format: 'product',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3w5MTEyfGltYWdlL2pwZWd8aW1hZ2VzL2g3ZS9oYjUvODc5NzIzMDU5NjEyNi5qcGd8YmYyNTdkYjVjMmE4MTc1MjRmZWFiMmIwNTk5ODM2NWQxNWIwZDZjOGI3NTRiMzJiYmUwNDVlYTU5ZWE1Y2RkOA',
              },
              {
                altText: 'HDR-CX105E  Red',
                format: 'thumbnail',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzEyfGltYWdlL2pwZWd8aW1hZ2VzL2hlZi9oOGYvODc5NzI1Njg3NjA2Mi5qcGd8YjVhYWYzNzMwZjM0MTgwZDUzYTM0YTE1ZDg1YTc4Yjk1MjQ4ZGE0OGY0YmY5ZjhiM2VhY2JjYmY0YzEyNDE2Zg',
              },
              {
                altText: 'HDR-CX105E  Red',
                format: 'cartIcon',
                imageType: 'PRIMARY',
                url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTYxfGltYWdlL2pwZWd8aW1hZ2VzL2hlZS9oZGEvODc5NzI4MzIyMTUzNC5qcGd8NmJjZjE3ZWQ3ZWI3OWU5ODU0MjIwZjY5YmFhNTY5YjRhMjJjMjFlZDQ2MmQ0ZTFiNmU5YmZmZGY1YWI2Y2RkMA',
              },
            ],
            manufacturer: 'Sony',
            name: 'HDR-CX105E  Red',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 284,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Cameras/Hand-held-Camcorders/HDR-CX105E-Red/p/1934406',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$452,88',
            value: 452.88,
          },
          updateable: true,
        },
      ],
      guid: '2d486162-87f8-4ab8-bd07-b69d70f4e471',
      totalItems: 1,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$452,88',
        priceType: 'BUY',
        value: 452.88,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$452,88',
        priceType: 'BUY',
        value: 452.88,
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
  ],
};
