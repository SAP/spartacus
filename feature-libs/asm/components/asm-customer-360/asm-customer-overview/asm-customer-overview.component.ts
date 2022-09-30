import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AsmConfig } from '@spartacus/asm/core';
import { Cart } from '@spartacus/cart/base/root';

import {
  ImageType,
  PriceType,
  Product,
  UrlCommand,
  User,
} from '@spartacus/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';

import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsmInterestEntry } from './asm-customer-overview.model';

@Component({
  selector: 'cx-asm-customer-overview',
  templateUrl: './asm-customer-overview.component.html',
})
export class AsmCustomerOverviewComponent implements OnInit, OnDestroy {
  @Input() customer: User;

  @Output()
  navigate: EventEmitter<UrlCommand> = new EventEmitter();

  activeCart$: Observable<Cart>;

  savedCart$: Observable<Cart>;

  interests$: Observable<AsmInterestEntry>;

  numberofColumns$: Observable<number>;

  numberofColumns: number;

  showMoreActiveCart = false;

  showMoreSaveCart = false;

  showMoreInterests = false;

  protected subscription = new Subscription();

  constructor(
    protected asmConfig: AsmConfig,
    protected breakpointService: BreakpointService
  ) {
    this.subscription.add(
      this.getNumberofColumns().subscribe((count) => {
        this.numberofColumns = count;
      })
    );
  }

  ngOnInit(): void {
    if (this.customer?.uid) {
      this.activeCart$ = of(this.getMockCartData());
      this.savedCart$ = of(this.getMockCartData());
      this.interests$ = of(this.getMockInterestData());
    }
  }

  onSelectProduct(selectedProduct: Product): void {
    this.navigate.emit({ cxRoute: 'product', params: selectedProduct });
  }

  onSelectCart(): void {
    // TODO emulate selected user and navigate to cart...
  }
  goToMyInterests(): void {
    this.navigate.emit({ cxRoute: 'myInterests' });
  }

  showMoreBySectionIndex(index: number): void {
    if (index === 0) {
      this.showMoreActiveCart = !this.showMoreActiveCart;
    } else if (index === 1) {
      this.showMoreSaveCart = !this.showMoreSaveCart;
    } else {
      this.showMoreInterests = !this.showMoreInterests;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private getNumberofColumns(): Observable<number> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (breakpoint === BREAKPOINT.xl) {
          return 3;
        } else if (breakpoint === BREAKPOINT.lg) {
          return 2;
        } else {
          return 1;
        }
      })
    );
  }

  getMockInterestData(): AsmInterestEntry {
    const product: Product = {
      availableForPickup: true,
      baseOptions: [],
      categories: [
        {
          code: '827',
          name: 'Power Adapters & Inverters',
        },
        {
          code: 'brand_10',
          name: 'Canon',
        },
      ],
      code: '514518',
      configurable: false,
      images: {
        PRIMARY: {
          zoom: {
            altText: 'ACK-E2',
            format: 'zoom',
            imageType: ImageType.PRIMARY,
            url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTYzNHxpbWFnZS9qcGVnfGltYWdlcy9oMjQvaGNkLzg3OTcyMTk3ODI2ODYuanBnfDRjMDljZjZkMjlhYTM5ODE3Y2IwYTBmN2VlNjdiMGY1YjljYmVlYjA1YzI5MDNhNTRjODU5MTkyNDVhMzVjODg',
          },
          product: {
            altText: 'ACK-E2',
            format: 'product',
            imageType: ImageType.PRIMARY,
            url: '/medias/?context=bWFzdGVyfGltYWdlc3w4MDk0fGltYWdlL2pwZWd8aW1hZ2VzL2hhOC9oMjEvODc5NzI0NjA2MjYyMi5qcGd8MDFkMTI2YzBkMTk4N2I5ZjkwNjkzY2U3NGM5YjE4ZDg1ODhiNmMyMDIyYzViYzhiNTVmYjYzYzhhYzZkZDlkNw',
          },
          thumbnail: {
            altText: 'ACK-E2',
            format: 'thumbnail',
            imageType: ImageType.PRIMARY,
            url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjk5fGltYWdlL2pwZWd8aW1hZ2VzL2hhMi9oZDMvODc5NzI3MjQwODA5NC5qcGd8OWMyMDViNzE4YmIwODU1MDZiMjc5NWI1NzdlNWMyZThiZDUxY2ZkNTRiYTM5MjY2NmI4ZGY3NTJiZDFjMTRjMw',
          },
          cartIcon: {
            altText: 'ACK-E2',
            format: 'cartIcon',
            imageType: ImageType.PRIMARY,
            url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTI5fGltYWdlL2pwZWd8aW1hZ2VzL2g0Yi9oOTYvODc5NzI5ODc1MzU2Ni5qcGd8OWEwMjgwOTA4ZTg0MGI5NjgzYzU3MDUyY2MwMmIwMzY2NzJjMmJmM2M2M2JlNzJhYWQ0ZjI0ZTczNjQyZDkzNA',
          },
        },
      },
      manufacturer: 'Canon',
      name: 'ACK-E2',
      purchasable: true,
      stock: {
        isValueRounded: false,
        stockLevel: 0,
        stockLevelStatus: 'outOfStock',
      },
      url: '/Open-Catalogue/Components/Power-Supplies/Power-Adapters-%26-Inverters/ACK-E2/p/514518',
    };
    return {
      products: [
        product,
        product,
        product,
        product,
        product,
        product,
        product,
      ],
    };
  }

  getMockCartData(): Cart {
    const cart: Cart = {
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
      code: '00001021',
      deliveryItemsQuantity: 2,
      entries: [
        {
          basePrice: {
            formattedValue: '$315.52',
            value: 315.52,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 0,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [
              {
                code: '827',
                name: 'Power Adapters & Inverters',
              },
              {
                code: 'brand_10',
                name: 'Canon',
              },
            ],
            code: '514518',
            configurable: false,
            images: {
              PRIMARY: {
                zoom: {
                  altText: 'ACK-E2',
                  format: 'zoom',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTYzNHxpbWFnZS9qcGVnfGltYWdlcy9oMjQvaGNkLzg3OTcyMTk3ODI2ODYuanBnfDRjMDljZjZkMjlhYTM5ODE3Y2IwYTBmN2VlNjdiMGY1YjljYmVlYjA1YzI5MDNhNTRjODU5MTkyNDVhMzVjODg',
                },
                product: {
                  altText: 'ACK-E2',
                  format: 'product',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w4MDk0fGltYWdlL2pwZWd8aW1hZ2VzL2hhOC9oMjEvODc5NzI0NjA2MjYyMi5qcGd8MDFkMTI2YzBkMTk4N2I5ZjkwNjkzY2U3NGM5YjE4ZDg1ODhiNmMyMDIyYzViYzhiNTVmYjYzYzhhYzZkZDlkNw',
                },
                thumbnail: {
                  altText: 'ACK-E2',
                  format: 'thumbnail',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjk5fGltYWdlL2pwZWd8aW1hZ2VzL2hhMi9oZDMvODc5NzI3MjQwODA5NC5qcGd8OWMyMDViNzE4YmIwODU1MDZiMjc5NWI1NzdlNWMyZThiZDUxY2ZkNTRiYTM5MjY2NmI4ZGY3NTJiZDFjMTRjMw',
                },
                cartIcon: {
                  altText: 'ACK-E2',
                  format: 'cartIcon',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTI5fGltYWdlL2pwZWd8aW1hZ2VzL2g0Yi9oOTYvODc5NzI5ODc1MzU2Ni5qcGd8OWEwMjgwOTA4ZTg0MGI5NjgzYzU3MDUyY2MwMmIwMzY2NzJjMmJmM2M2M2JlNzJhYWQ0ZjI0ZTczNjQyZDkzNA',
                },
              },
            },
            manufacturer: 'Canon',
            name: 'ACK-E2 long name long name long name long name long name',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 316,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Components/Power-Supplies/Power-Adapters-%26-Inverters/ACK-E2/p/514518',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$315.52',
            value: 315.52,
          },
          updateable: true,
        },
        {
          basePrice: {
            formattedValue: '$204.75',
            value: 204.75,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 1,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [
              {
                code: '814',
                name: 'Rechargeable Batteries',
              },
              {
                code: 'brand_5',
                name: 'Sony',
              },
            ],
            code: '3965240',
            configurable: false,
            images: {
              PRIMARY: {
                zoom: {
                  altText: 'NP-FV 70',
                  format: 'zoom',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjg4MXxpbWFnZS9qcGVnfGltYWdlcy9oOTMvaDM1Lzg3OTcyMTYxNzgyMDYuanBnfGQ2OWI3NzI3MzNiODg0ZWZlMjc0NzQ0MzFjZjk4ZGU1ZDkzMmZjODU3MThkYTZiYTg2N2E0NTYyOTE2NGQyZjA',
                },
                product: {
                  altText: 'INP-FV 70',
                  format: 'product',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w5MTQxfGltYWdlL2pwZWd8aW1hZ2VzL2hhOC9oYzgvODc5NzI0MjQ1ODE0Mi5qcGd8ZDAyOTdjOTJlNjU3NmJiNDE4ZjFiN2EzYmFjNTUwMDk2OTE4M2VlNjMwNzBmZmUzZjliZGY0NDdiYWU5N2VlYw',
                },
                thumbnail: {
                  altText: 'INP-FV 70',
                  format: 'thumbnail',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjI2fGltYWdlL2pwZWd8aW1hZ2VzL2gwYi9oNGUvODc5NzI2ODgwMzYxNC5qcGd8ZjM4MzcyYmYyZjc0NDBmYWVhYTMzZjVmYjZjYzc3ZTlkMWE4MDk2NmY2YzA3YTVjNTkyYjE2MTM2M2EyYjM2Yw',
                },
                cartIcon: {
                  altText: 'INP-FV 70l',
                  format: 'cartIcon',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTY5fGltYWdlL2pwZWd8aW1hZ2VzL2hjMC9oMjQvODc5NzI5NTE0OTA4Ni5qcGd8ZWUxNjg5NTIxMzM5MjBkMTFhNjQ3ODMyODRiMjRjNGI1ODg0OWM1ZTRlZjMzZWE2ZDcyNDExZmZlN2U4MTlhMg',
                },
              },
            },
            manufacturer: 'Sony',
            name: 'NP-FV 70',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 300,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Components/Power-Supplies/Rechargeable-Batteries/NP-FV-70/p/3965240',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$204.75',
            value: 204.75,
          },
          updateable: true,
        },
        {
          basePrice: {
            formattedValue: '$204.75',
            value: 204.75,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 1,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [
              {
                code: '814',
                name: 'Rechargeable Batteries',
              },
              {
                code: 'brand_5',
                name: 'Sony',
              },
            ],
            code: '3965240',
            configurable: false,
            images: {
              PRIMARY: {
                zoom: {
                  altText: 'NP-FV 70',
                  format: 'zoom',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjg4MXxpbWFnZS9qcGVnfGltYWdlcy9oOTMvaDM1Lzg3OTcyMTYxNzgyMDYuanBnfGQ2OWI3NzI3MzNiODg0ZWZlMjc0NzQ0MzFjZjk4ZGU1ZDkzMmZjODU3MThkYTZiYTg2N2E0NTYyOTE2NGQyZjA',
                },
                product: {
                  altText: 'INP-FV 70',
                  format: 'product',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w5MTQxfGltYWdlL2pwZWd8aW1hZ2VzL2hhOC9oYzgvODc5NzI0MjQ1ODE0Mi5qcGd8ZDAyOTdjOTJlNjU3NmJiNDE4ZjFiN2EzYmFjNTUwMDk2OTE4M2VlNjMwNzBmZmUzZjliZGY0NDdiYWU5N2VlYw',
                },
                thumbnail: {
                  altText: 'INP-FV 70',
                  format: 'thumbnail',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjI2fGltYWdlL2pwZWd8aW1hZ2VzL2gwYi9oNGUvODc5NzI2ODgwMzYxNC5qcGd8ZjM4MzcyYmYyZjc0NDBmYWVhYTMzZjVmYjZjYzc3ZTlkMWE4MDk2NmY2YzA3YTVjNTkyYjE2MTM2M2EyYjM2Yw',
                },
                cartIcon: {
                  altText: 'INP-FV 70l',
                  format: 'cartIcon',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTY5fGltYWdlL2pwZWd8aW1hZ2VzL2hjMC9oMjQvODc5NzI5NTE0OTA4Ni5qcGd8ZWUxNjg5NTIxMzM5MjBkMTFhNjQ3ODMyODRiMjRjNGI1ODg0OWM1ZTRlZjMzZWE2ZDcyNDExZmZlN2U4MTlhMg',
                },
              },
            },
            manufacturer: 'Sony',
            name: 'NP-FV 70',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 300,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Components/Power-Supplies/Rechargeable-Batteries/NP-FV-70/p/3965240',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$204.75',
            value: 204.75,
          },
          updateable: true,
        },
        {
          basePrice: {
            formattedValue: '$204.75',
            value: 204.75,
          },
          cancellableQuantity: 0,
          configurationInfos: [],
          entryNumber: 1,
          product: {
            availableForPickup: true,
            baseOptions: [],
            categories: [
              {
                code: '814',
                name: 'Rechargeable Batteries',
              },
              {
                code: 'brand_5',
                name: 'Sony',
              },
            ],
            code: '3965240',
            configurable: false,
            images: {
              PRIMARY: {
                zoom: {
                  altText: 'NP-FV 70',
                  format: 'zoom',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjg4MXxpbWFnZS9qcGVnfGltYWdlcy9oOTMvaDM1Lzg3OTcyMTYxNzgyMDYuanBnfGQ2OWI3NzI3MzNiODg0ZWZlMjc0NzQ0MzFjZjk4ZGU1ZDkzMmZjODU3MThkYTZiYTg2N2E0NTYyOTE2NGQyZjA',
                },
                product: {
                  altText: 'INP-FV 70',
                  format: 'product',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3w5MTQxfGltYWdlL2pwZWd8aW1hZ2VzL2hhOC9oYzgvODc5NzI0MjQ1ODE0Mi5qcGd8ZDAyOTdjOTJlNjU3NmJiNDE4ZjFiN2EzYmFjNTUwMDk2OTE4M2VlNjMwNzBmZmUzZjliZGY0NDdiYWU5N2VlYw',
                },
                thumbnail: {
                  altText: 'INP-FV 70',
                  format: 'thumbnail',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjI2fGltYWdlL2pwZWd8aW1hZ2VzL2gwYi9oNGUvODc5NzI2ODgwMzYxNC5qcGd8ZjM4MzcyYmYyZjc0NDBmYWVhYTMzZjVmYjZjYzc3ZTlkMWE4MDk2NmY2YzA3YTVjNTkyYjE2MTM2M2EyYjM2Yw',
                },
                cartIcon: {
                  altText: 'INP-FV 70l',
                  format: 'cartIcon',
                  imageType: ImageType.PRIMARY,
                  url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTY5fGltYWdlL2pwZWd8aW1hZ2VzL2hjMC9oMjQvODc5NzI5NTE0OTA4Ni5qcGd8ZWUxNjg5NTIxMzM5MjBkMTFhNjQ3ODMyODRiMjRjNGI1ODg0OWM1ZTRlZjMzZWE2ZDcyNDExZmZlN2U4MTlhMg',
                },
              },
            },
            manufacturer: 'Sony',
            name: 'NP-FV 70',
            purchasable: true,
            stock: {
              isValueRounded: false,
              stockLevel: 300,
              stockLevelStatus: 'inStock',
            },
            url: '/Open-Catalogue/Components/Power-Supplies/Rechargeable-Batteries/NP-FV-70/p/3965240',
          },
          quantity: 1,
          returnableQuantity: 0,
          statusSummaryList: [],
          totalPrice: {
            currencyIso: 'USD',
            formattedValue: '$204.75',
            value: 204.75,
          },
          updateable: true,
        },
      ],
      guid: 'dea34e50-278f-4693-a308-14121cf2be37',
      net: false,
      pickupItemsQuantity: 0,
      productDiscounts: {
        formattedValue: '$0.00',
      },
      subTotal: {
        currencyIso: 'USD',
        formattedValue: '$500.27',
        priceType: PriceType.BUY,
        value: 500.27,
      },
      totalDiscounts: {
        currencyIso: 'USD',
        formattedValue: '$20.00',
        priceType: PriceType.BUY,
        value: 20.0,
      },
      totalItems: 2,
      totalPrice: {
        currencyIso: 'USD',
        formattedValue: '$500.27',
        priceType: PriceType.BUY,
        value: 500.27,
      },
      totalPriceWithTax: {
        currencyIso: 'USD',
        formattedValue: '$500.27',
        priceType: PriceType.BUY,
        value: 500.27,
      },
      totalTax: {
        currencyIso: 'USD',
        formattedValue: '$0.00',
        priceType: PriceType.BUY,
        value: 0.0,
      },
      user: {
        name: 'Hak Kim',
        uid: 'kimhakwo@hotmail.com',
      },
      paymentType: {
        code: 'CARD',
        displayName: 'Card Payment',
      },
      potentialOrderPromotions: [],
      potentialProductPromotions: [],
      totalUnitCount: 2,
    };
    return cart;
  }
}
