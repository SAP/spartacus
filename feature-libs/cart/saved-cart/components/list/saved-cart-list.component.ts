import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  Cart,
  RoutingService,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs/';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-saved-cart-list',
  templateUrl: './saved-cart-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SavedCartListComponent implements OnDestroy {
  private PAGE_SIZE = 5;
  // TODO: verify with Bill if we want to have a static sort
  // since there is no pagination nor sort object with
  protected sorts: SortModel[] = [
    {
      code: 'byDateModified',
    },
    {
      code: 'byDateSaved',
    },
    {
      code: 'byName',
    },
    {
      code: 'byCode',
    },
    {
      code: 'byTotal',
    },
  ];
  sortType: string;
  // TODO: mocked for testing purposes
  savedCarts$: any = {
    carts: [
      {
        appliedOrderPromotions: [],
        appliedProductPromotions: [],
        appliedVouchers: [],
        calculated: true,
        code: '00001046',
        deliveryItemsQuantity: 1,
        deliveryOrderGroups: [
          {
            entries: [
              {
                basePrice: {
                  currencyIso: 'USD',
                  formattedValue: '$117.00',
                  priceType: 'BUY',
                  value: 117.0,
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
                      url:
                        '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
                    },
                    {
                      code: 'brand_1518',
                      name: 'StarTech.com',
                      url: '/Brands/StarTech-com/c/brand_1518',
                    },
                  ],
                  code: '1128762',
                  configurable: false,
                  images: [
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'zoom',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wzMzA4MXxpbWFnZS9qcGVnfGltYWdlcy9oODAvaDRlLzg3OTY4NTY4NzcwODYuanBnfGVlMzQ2MGZlYWEzNWI0YTM5YzVmZWI4ZWNmMTczMjMzNjMyOGZhNTcwZDQyMTg4YmI1MjNjYmJjODliZTA4MTU',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'product',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wxMjkwMHxpbWFnZS9qcGVnfGltYWdlcy9oMWMvaGZmLzg3OTY4ODQxNDAwNjIuanBnfGFlMzU3ZGVlNjY4ZDM3ODczMjAzNzI4NWI5ZDE5MDVkNTdlNjFkZTA4NGVkMzQwNzUwZDNmNTljNWE0OGYzMGQ',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'thumbnail',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk3fGltYWdlL2pwZWd8aW1hZ2VzL2gxZS9oNzIvODc5NjkxMTQwMzAzOC5qcGd8YjIwYjdjNGRhOTk1NzQwYjUxYjk3ZTY5NmE1YmNmNmExOThkMmI0MmMzMTViNTUzOGE5N2JkMzU3OTQxOGQ2ZQ',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'cartIcon',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wxNjY3fGltYWdlL2pwZWd8aW1hZ2VzL2gzYS9oMWUvODc5NjkzODY2NjAxNC5qcGd8N2FiMWUxZWIwYzFhNmRjMTZkMjhmZmE1MzMxZDk2MzgzODE5NDg4MGY4ZTYwN2U2YTMwYzZjNmNjZDUwZDIyMA',
                    },
                  ],
                  manufacturer: 'StarTech.com',
                  name: 'Professional Network Installer Tool Kit',
                  purchasable: true,
                  stock: {
                    isValueRounded: false,
                    stockLevel: 215,
                    stockLevelStatus: 'inStock',
                  },
                  url:
                    '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/Professional-Network-Installer-Tool-Kit/p/1128762',
                },
                quantity: 1,
                returnableQuantity: 0,
                statusSummaryList: [],
                totalPrice: {
                  currencyIso: 'USD',
                  formattedValue: '$117.00',
                  priceType: 'BUY',
                  value: 117.0,
                },
                updateable: true,
              },
            ],
            totalPriceWithTax: {
              currencyIso: 'USD',
              formattedValue: '$117.00',
              priceType: 'BUY',
              value: 117.0,
            },
          },
        ],
        entries: [
          {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: '$117.00',
              priceType: 'BUY',
              value: 117.0,
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
                  url:
                    '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
                },
                {
                  code: 'brand_1518',
                  name: 'StarTech.com',
                  url: '/Brands/StarTech-com/c/brand_1518',
                },
              ],
              code: '1128762',
              configurable: false,
              images: [
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'zoom',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wzMzA4MXxpbWFnZS9qcGVnfGltYWdlcy9oODAvaDRlLzg3OTY4NTY4NzcwODYuanBnfGVlMzQ2MGZlYWEzNWI0YTM5YzVmZWI4ZWNmMTczMjMzNjMyOGZhNTcwZDQyMTg4YmI1MjNjYmJjODliZTA4MTU',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'product',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wxMjkwMHxpbWFnZS9qcGVnfGltYWdlcy9oMWMvaGZmLzg3OTY4ODQxNDAwNjIuanBnfGFlMzU3ZGVlNjY4ZDM3ODczMjAzNzI4NWI5ZDE5MDVkNTdlNjFkZTA4NGVkMzQwNzUwZDNmNTljNWE0OGYzMGQ',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'thumbnail',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk3fGltYWdlL2pwZWd8aW1hZ2VzL2gxZS9oNzIvODc5NjkxMTQwMzAzOC5qcGd8YjIwYjdjNGRhOTk1NzQwYjUxYjk3ZTY5NmE1YmNmNmExOThkMmI0MmMzMTViNTUzOGE5N2JkMzU3OTQxOGQ2ZQ',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'cartIcon',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wxNjY3fGltYWdlL2pwZWd8aW1hZ2VzL2gzYS9oMWUvODc5NjkzODY2NjAxNC5qcGd8N2FiMWUxZWIwYzFhNmRjMTZkMjhmZmE1MzMxZDk2MzgzODE5NDg4MGY4ZTYwN2U2YTMwYzZjNmNjZDUwZDIyMA',
                },
              ],
              manufacturer: 'StarTech.com',
              name: 'Professional Network Installer Tool Kit',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevel: 215,
                stockLevelStatus: 'inStock',
              },
              url:
                '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/Professional-Network-Installer-Tool-Kit/p/1128762',
            },
            quantity: 1,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: '$117.00',
              priceType: 'BUY',
              value: 117.0,
            },
            updateable: true,
          },
        ],
        guid: 'e12c2659-88eb-4c29-83c6-84ab3ba323de',
        net: true,
        orderDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        pickupItemsQuantity: 0,
        pickupOrderGroups: [],
        productDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        site: 'powertools-spa',
        store: 'powertools',
        subTotal: {
          currencyIso: 'USD',
          formattedValue: '$117.00',
          priceType: 'BUY',
          value: 117.0,
        },
        totalDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        totalItems: 1,
        totalPrice: {
          currencyIso: 'USD',
          formattedValue: '$117.00',
          priceType: 'BUY',
          value: 117.0,
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          formattedValue: '$117.00',
          priceType: 'BUY',
          value: 117.0,
        },
        totalTax: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        description: 'test',
        expirationTime: '2021-03-18T05:15:41+0000',
        name: 'Saved Cart 2021',
        potentialOrderPromotions: [],
        potentialProductPromotions: [],
        saveTime: '2021-02-16T05:15:41+0000',
        savedBy: {
          name: 'William Hunter',
          uid: 'william.hunter@rustic-hw.com',
        },
        totalUnitCount: 1,
      },
      {
        appliedOrderPromotions: [],
        appliedProductPromotions: [],
        appliedVouchers: [],
        calculated: false,
        code: '00001042',
        deliveryItemsQuantity: 3,
        deliveryOrderGroups: [
          {
            entries: [
              {
                basePrice: {
                  currencyIso: 'USD',
                  formattedValue: '$81.00',
                  priceType: 'BUY',
                  value: 81.0,
                },
                cancellableQuantity: 0,
                configurationInfos: [],
                entryNumber: 0,
                product: {
                  availableForPickup: false,
                  baseOptions: [],
                  categories: [
                    {
                      code: '1596',
                      name: 'Sanders',
                      url: '/Open-Catalogue/Tools/Sanders/c/1596',
                    },
                    {
                      code: 'brand_980',
                      name: 'Black & Decker',
                      url: '/Brands/Black-%26-Decker/c/brand_980',
                    },
                  ],
                  code: '3592865',
                  configurable: false,
                  images: [
                    {
                      altText: 'KA191EK',
                      format: 'zoom',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wzNDcyM3xpbWFnZS9qcGVnfGltYWdlcy9oMTQvaDAwLzg3OTY4NjMwMzc0NzAuanBnfDNmZGE5OTljZDE5YTZkZDkwZDg5MTg3NjQ1ODc4YTIyNzZmMjYwY2MzMjEwZmUyZTRlNDU4YjUzMTIyN2U5ODA',
                    },
                    {
                      altText: 'KA191EK',
                      format: 'product',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wxNjg1MHxpbWFnZS9qcGVnfGltYWdlcy9oMGQvaGM3Lzg3OTY4OTAzMDA0NDYuanBnfDdlN2FiNmM4ZTZmYTcyZTlhYmFhZWJkYmMzMmQxZTVkMTJmNGI5YmVmYzQzMDJiZGQ2ZmYyZjcyN2I5ZjVjODg',
                    },
                    {
                      altText: 'KA191EK',
                      format: 'thumbnail',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wzNTQ0fGltYWdlL2pwZWd8aW1hZ2VzL2g0MS9oMTQvODc5NjkxNzU2MzQyMi5qcGd8MzU1ZGIyM2EzNDYzNjM4N2U4ZWFlMzE1N2VhODk1YzAxYjY4NTAyMmM2YjkwMzI5MGFiOTQ0YWNjMzlkNWIyOA',
                    },
                    {
                      altText: 'KA191EK',
                      format: 'cartIcon',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wyMTU1fGltYWdlL2pwZWd8aW1hZ2VzL2hkNy9oMmQvODc5Njk0NDgyNjM5OC5qcGd8NjgwYzQzY2E5OWU5ODk3NTQxNmUzNWRiN2ExYmY4MzZmM2M3Y2Y3ZWNjNDlkOTNhM2MyYjJiYmRhMmY4NjhmNw',
                    },
                  ],
                  manufacturer: 'Black & Decker',
                  name: 'KA191EK',
                  purchasable: true,
                  stock: {
                    isValueRounded: false,
                    stockLevel: 115,
                    stockLevelStatus: 'inStock',
                  },
                  url: '/Open-Catalogue/Tools/Sanders/KA191EK/p/3592865',
                },
                quantity: 1,
                returnableQuantity: 0,
                statusSummaryList: [],
                totalPrice: {
                  currencyIso: 'USD',
                  formattedValue: '$81.00',
                  priceType: 'BUY',
                  value: 81.0,
                },
                updateable: true,
              },
              {
                basePrice: {
                  currencyIso: 'USD',
                  formattedValue: '$117.00',
                  priceType: 'BUY',
                  value: 117.0,
                },
                cancellableQuantity: 0,
                configurationInfos: [],
                entryNumber: 1,
                product: {
                  availableForPickup: false,
                  baseOptions: [],
                  categories: [
                    {
                      code: '1358',
                      name: 'Measuring & Layout Tools',
                      url:
                        '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
                    },
                    {
                      code: 'brand_1518',
                      name: 'StarTech.com',
                      url: '/Brands/StarTech-com/c/brand_1518',
                    },
                  ],
                  code: '1128762',
                  configurable: false,
                  images: [
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'zoom',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wzMzA4MXxpbWFnZS9qcGVnfGltYWdlcy9oODAvaDRlLzg3OTY4NTY4NzcwODYuanBnfGVlMzQ2MGZlYWEzNWI0YTM5YzVmZWI4ZWNmMTczMjMzNjMyOGZhNTcwZDQyMTg4YmI1MjNjYmJjODliZTA4MTU',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'product',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wxMjkwMHxpbWFnZS9qcGVnfGltYWdlcy9oMWMvaGZmLzg3OTY4ODQxNDAwNjIuanBnfGFlMzU3ZGVlNjY4ZDM3ODczMjAzNzI4NWI5ZDE5MDVkNTdlNjFkZTA4NGVkMzQwNzUwZDNmNTljNWE0OGYzMGQ',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'thumbnail',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk3fGltYWdlL2pwZWd8aW1hZ2VzL2gxZS9oNzIvODc5NjkxMTQwMzAzOC5qcGd8YjIwYjdjNGRhOTk1NzQwYjUxYjk3ZTY5NmE1YmNmNmExOThkMmI0MmMzMTViNTUzOGE5N2JkMzU3OTQxOGQ2ZQ',
                    },
                    {
                      altText: 'Professional Network Installer Tool Kit',
                      format: 'cartIcon',
                      imageType: 'PRIMARY',
                      url:
                        '/medias/?context=bWFzdGVyfGltYWdlc3wxNjY3fGltYWdlL2pwZWd8aW1hZ2VzL2gzYS9oMWUvODc5NjkzODY2NjAxNC5qcGd8N2FiMWUxZWIwYzFhNmRjMTZkMjhmZmE1MzMxZDk2MzgzODE5NDg4MGY4ZTYwN2U2YTMwYzZjNmNjZDUwZDIyMA',
                    },
                  ],
                  manufacturer: 'StarTech.com',
                  name: 'Professional Network Installer Tool Kit',
                  purchasable: true,
                  stock: {
                    isValueRounded: false,
                    stockLevel: 215,
                    stockLevelStatus: 'inStock',
                  },
                  url:
                    '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/Professional-Network-Installer-Tool-Kit/p/1128762',
                },
                quantity: 2,
                returnableQuantity: 0,
                statusSummaryList: [],
                totalPrice: {
                  currencyIso: 'USD',
                  formattedValue: '$234.00',
                  priceType: 'BUY',
                  value: 234.0,
                },
                updateable: true,
              },
            ],
            totalPriceWithTax: {
              currencyIso: 'USD',
              formattedValue: '$315.00',
              priceType: 'BUY',
              value: 315.0,
            },
          },
        ],
        entries: [
          {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: '$81.00',
              priceType: 'BUY',
              value: 81.0,
            },
            cancellableQuantity: 0,
            configurationInfos: [],
            entryNumber: 0,
            product: {
              availableForPickup: false,
              baseOptions: [],
              categories: [
                {
                  code: '1596',
                  name: 'Sanders',
                  url: '/Open-Catalogue/Tools/Sanders/c/1596',
                },
                {
                  code: 'brand_980',
                  name: 'Black & Decker',
                  url: '/Brands/Black-%26-Decker/c/brand_980',
                },
              ],
              code: '3592865',
              configurable: false,
              images: [
                {
                  altText: 'KA191EK',
                  format: 'zoom',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wzNDcyM3xpbWFnZS9qcGVnfGltYWdlcy9oMTQvaDAwLzg3OTY4NjMwMzc0NzAuanBnfDNmZGE5OTljZDE5YTZkZDkwZDg5MTg3NjQ1ODc4YTIyNzZmMjYwY2MzMjEwZmUyZTRlNDU4YjUzMTIyN2U5ODA',
                },
                {
                  altText: 'KA191EK',
                  format: 'product',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wxNjg1MHxpbWFnZS9qcGVnfGltYWdlcy9oMGQvaGM3Lzg3OTY4OTAzMDA0NDYuanBnfDdlN2FiNmM4ZTZmYTcyZTlhYmFhZWJkYmMzMmQxZTVkMTJmNGI5YmVmYzQzMDJiZGQ2ZmYyZjcyN2I5ZjVjODg',
                },
                {
                  altText: 'KA191EK',
                  format: 'thumbnail',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wzNTQ0fGltYWdlL2pwZWd8aW1hZ2VzL2g0MS9oMTQvODc5NjkxNzU2MzQyMi5qcGd8MzU1ZGIyM2EzNDYzNjM4N2U4ZWFlMzE1N2VhODk1YzAxYjY4NTAyMmM2YjkwMzI5MGFiOTQ0YWNjMzlkNWIyOA',
                },
                {
                  altText: 'KA191EK',
                  format: 'cartIcon',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wyMTU1fGltYWdlL2pwZWd8aW1hZ2VzL2hkNy9oMmQvODc5Njk0NDgyNjM5OC5qcGd8NjgwYzQzY2E5OWU5ODk3NTQxNmUzNWRiN2ExYmY4MzZmM2M3Y2Y3ZWNjNDlkOTNhM2MyYjJiYmRhMmY4NjhmNw',
                },
              ],
              manufacturer: 'Black & Decker',
              name: 'KA191EK',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevel: 115,
                stockLevelStatus: 'inStock',
              },
              url: '/Open-Catalogue/Tools/Sanders/KA191EK/p/3592865',
            },
            quantity: 1,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: '$81.00',
              priceType: 'BUY',
              value: 81.0,
            },
            updateable: true,
          },
          {
            basePrice: {
              currencyIso: 'USD',
              formattedValue: '$117.00',
              priceType: 'BUY',
              value: 117.0,
            },
            cancellableQuantity: 0,
            configurationInfos: [],
            entryNumber: 1,
            product: {
              availableForPickup: false,
              baseOptions: [],
              categories: [
                {
                  code: '1358',
                  name: 'Measuring & Layout Tools',
                  url:
                    '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
                },
                {
                  code: 'brand_1518',
                  name: 'StarTech.com',
                  url: '/Brands/StarTech-com/c/brand_1518',
                },
              ],
              code: '1128762',
              configurable: false,
              images: [
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'zoom',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wzMzA4MXxpbWFnZS9qcGVnfGltYWdlcy9oODAvaDRlLzg3OTY4NTY4NzcwODYuanBnfGVlMzQ2MGZlYWEzNWI0YTM5YzVmZWI4ZWNmMTczMjMzNjMyOGZhNTcwZDQyMTg4YmI1MjNjYmJjODliZTA4MTU',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'product',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wxMjkwMHxpbWFnZS9qcGVnfGltYWdlcy9oMWMvaGZmLzg3OTY4ODQxNDAwNjIuanBnfGFlMzU3ZGVlNjY4ZDM3ODczMjAzNzI4NWI5ZDE5MDVkNTdlNjFkZTA4NGVkMzQwNzUwZDNmNTljNWE0OGYzMGQ',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'thumbnail',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk3fGltYWdlL2pwZWd8aW1hZ2VzL2gxZS9oNzIvODc5NjkxMTQwMzAzOC5qcGd8YjIwYjdjNGRhOTk1NzQwYjUxYjk3ZTY5NmE1YmNmNmExOThkMmI0MmMzMTViNTUzOGE5N2JkMzU3OTQxOGQ2ZQ',
                },
                {
                  altText: 'Professional Network Installer Tool Kit',
                  format: 'cartIcon',
                  imageType: 'PRIMARY',
                  url:
                    '/medias/?context=bWFzdGVyfGltYWdlc3wxNjY3fGltYWdlL2pwZWd8aW1hZ2VzL2gzYS9oMWUvODc5NjkzODY2NjAxNC5qcGd8N2FiMWUxZWIwYzFhNmRjMTZkMjhmZmE1MzMxZDk2MzgzODE5NDg4MGY4ZTYwN2U2YTMwYzZjNmNjZDUwZDIyMA',
                },
              ],
              manufacturer: 'StarTech.com',
              name: 'Professional Network Installer Tool Kit',
              purchasable: true,
              stock: {
                isValueRounded: false,
                stockLevel: 215,
                stockLevelStatus: 'inStock',
              },
              url:
                '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/Professional-Network-Installer-Tool-Kit/p/1128762',
            },
            quantity: 2,
            returnableQuantity: 0,
            statusSummaryList: [],
            totalPrice: {
              currencyIso: 'USD',
              formattedValue: '$234.00',
              priceType: 'BUY',
              value: 234.0,
            },
            updateable: true,
          },
        ],
        guid: '87b25d2c-96bb-4ce1-9c41-3e4620ea164c',
        net: true,
        orderDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        pickupItemsQuantity: 0,
        pickupOrderGroups: [],
        productDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        site: 'powertools-spa',
        store: 'powertools',
        subTotal: {
          currencyIso: 'USD',
          formattedValue: '$315.00',
          priceType: 'BUY',
          value: 315.0,
        },
        totalDiscounts: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        totalItems: 2,
        totalPrice: {
          currencyIso: 'USD',
          formattedValue: '$315.00',
          priceType: 'BUY',
          value: 315.0,
        },
        totalPriceWithTax: {
          currencyIso: 'USD',
          formattedValue: '$315.00',
          priceType: 'BUY',
          value: 315.0,
        },
        totalTax: {
          currencyIso: 'USD',
          formattedValue: '$0.00',
          priceType: 'BUY',
          value: 0.0,
        },
        description: '-',
        expirationTime: '2021-03-11T16:16:30+0000',
        name: '00001042',
        potentialOrderPromotions: [],
        potentialProductPromotions: [],
        saveTime: '2021-02-09T16:16:30+0000',
        savedBy: {
          name: 'William Hunter',
          uid: 'william.hunter@rustic-hw.com',
        },
        totalUnitCount: 3,
      },
    ],
  };

  constructor(
    protected routing: RoutingService,
    protected translation: TranslationService
  ) {}

  getSortLabels(): Observable<{
    byDateModified: string;
    byDateSaved: string;
    byName: string;
    byCode: string;
    byTotal: string;
  }> {
    return combineLatest([
      this.translation.translate('sorting.dateModified'),
      this.translation.translate('sorting.dateSaved'),
      this.translation.translate('sorting.name'),
      this.translation.translate('sorting.id'),
      this.translation.translate('sorting.total'),
    ]).pipe(
      map(
        ([
          textByDateModified,
          textByDateSaved,
          textBySavedCartName,
          textByCartId,
          textByTotalPrice,
        ]) => {
          return {
            byDateModified: textByDateModified,
            byDateSaved: textByDateSaved,
            byName: textBySavedCartName,
            byCode: textByCartId,
            byTotal: textByTotalPrice,
          };
        }
      )
    );
  }

  changeSortCode(sortCode: string): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode,
      currentPage: 0,
    };
    this.sortType = sortCode;
    this.fetchSavedCarts(event);
  }

  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    this.fetchSavedCarts(event);
  }

  goToSavedCartDetails(cart: Cart): void {
    this.routing.go({
      cxRoute: 'savedCartsDetails',
      params: cart,
    });
  }

  private fetchSavedCarts(event?: {
    sortCode?: string;
    currentPage?: number;
  }): void {
    console.log('will now work on core', event);
    console.log('this.pagesize mock', this.PAGE_SIZE);
  }

  ngOnDestroy(): void {}
}
