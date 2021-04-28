import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import {
  ActiveCartService,
  Cart,
  I18nTestingModule,
  ImageType,
  OrderEntry,
  RoutingService,
  RouterState,
  PriceType,
} from '@spartacus/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import {
  defaultImportExportConfig,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';

const entry: OrderEntry = {
  basePrice: {
    currencyIso: 'USD',
    formattedValue: '$23.50',
    priceType: PriceType.BUY,
    value: 23.5,
  },
  cancellableQuantity: 0,
  entryNumber: 1,
  product: {
    availableForPickup: false,
    baseOptions: [],
    categories: [
      {
        code: '1358',
        name: 'Measuring & Layout Tools',
        url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/c/1358',
      },
      {
        code: 'brand_4434',
        name: 'Ednet',
        url: '/Brands/Ednet/c/brand_4434',
      },
    ],
    code: '3803058',
    images: {
      PRIMARY: {
        zoom: {
          altText: 'PC Service Set Professional',
          format: 'zoom',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        product: {
          altText: 'PC Service Set Professional',
          format: 'product',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        thumbnail: {
          altText: 'PC Service Set Professional',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
        cartIcon: {
          altText: 'PC Service Set Professional',
          format: 'cartIcon',
          imageType: ImageType.PRIMARY,
          url: 'imageUrl',
        },
      },
    },
    manufacturer: 'Ednet',
    name: 'PC Service Set Professional',
    purchasable: true,
    stock: {
      stockLevel: 365,
      stockLevelStatus: 'inStock',
    },
    url:
      '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/PC-Service-Set-Professional/p/3803058',
    slug: 'pc-service-set-professional',
    nameHtml: 'PC Service Set Professional',
  },
  quantity: 2,
  returnableQuantity: 0,
  totalPrice: {
    currencyIso: 'USD',
    formattedValue: '$47.00',
    priceType: PriceType.BUY,
    value: 47,
  },
  updateable: true,
};

const testData = [
  { key: 'product.code', output: '3803058' },
  { key: 'quantity', output: '2' },
  { key: 'product.name', output: 'PC Service Set Professional' },
  { key: 'totalPrice.formattedValue', output: '$47.00' },
  { key: 'updateable', output: 'true' },
  {
    key: 'product.images.PRIMARY.zoom.altText',
    output: 'PC Service Set Professional',
  },
  { key: 'returnableQuantity', output: '0' },
  { key: 'notExistingKey', output: '' },
];

class MockRoutingService implements Partial<RoutingService> {
  getRouterState(): Observable<RouterState> {
    return of();
  }
}

class MockActiveCartService implements Partial<ActiveCartService> {
  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }
}

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails(): Observable<Cart> {
    return of({});
  }
}

describe('ExportEntriesService', () => {
  let service: ExportEntriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ImportExportConfig, useValue: defaultImportExportConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: SavedCartDetailsService,
          useClass: MockSavedCartDetailsService,
        },
      ],
    });
    service = TestBed.inject(ExportEntriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolveValue', () => {
    testData.forEach(({ key, output }) => {
      it(`should resolve value for ${key}`, () => {
        expect(service['resolveValue'](key, entry)).toBe(output);
      });
    });
  });
});
