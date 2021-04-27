import {
  ActiveCartService,
  Cart,
  I18nTestingModule,
  ImageType,
  OrderEntry,
  RoutingService,
  RouterState,
} from '@spartacus/core';
import { TestBed } from '@angular/core/testing';
import { ExportEntriesService } from './export-entries.service';
import {
  defaultImportExportConfig,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { OccConfigurator } from '../../../../product-configurator/rulebased/occ/variant/variant-configurator-occ.models';
import PriceType = OccConfigurator.PriceType;
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { Observable, of } from 'rxjs';
const entry: OrderEntry = {
  // TODO: Add unit tests for service
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
          url:
            'https://40.76.109.9:9002/medias/?context=bWFzdGVyfGltYWdlc3wzMTA0NXxpbWFnZS9qcGVnfGltYWdlcy9oYzAvaDM3Lzg3OTY4MjYxNDA3MDIuanBnfDgxZWFmMjU1YmNiNWY4ZjdjM2UyNDlhMjYyMzg5MGMyYTc1MTU4ODM2NmI5N2NlMDY0MjlhOTRiMGY2ZGMyMWI',
        },
        product: {
          altText: 'PC Service Set Professional',
          format: 'product',
          imageType: ImageType.PRIMARY,
          url:
            'https://40.76.109.9:9002/medias/?context=bWFzdGVyfGltYWdlc3wxNTUyNnxpbWFnZS9qcGVnfGltYWdlcy9oNTUvaDUxLzg3OTY4NTM0MDM2NzguanBnfDNjNjExMzliZThjYzhlNGQyYWYzZTBjOGI1YWNkZjYzMDliMmU0NTEwMzAwZDYxOGJiYzZmZjk2NWE2OGJkZmY',
        },
        thumbnail: {
          altText: 'PC Service Set Professional',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url:
            'https://40.76.109.9:9002/medias/?context=bWFzdGVyfGltYWdlc3wyODA3fGltYWdlL2pwZWd8aW1hZ2VzL2gyYS9oNzQvODc5Njg4MDY2NjY1NC5qcGd8MDJmNmIyYWMzMmQzN2I5N2UwMGRlMmM4YTA3OWJjNGYxODZiNWIyZGIyYjlkYjljMTNkMmQ1ZDk1MTJkYmU5Yw',
        },
        cartIcon: {
          altText: 'PC Service Set Professional',
          format: 'cartIcon',
          imageType: ImageType.PRIMARY,
          url:
            'https://40.76.109.9:9002/medias/?context=bWFzdGVyfGltYWdlc3wxNjk4fGltYWdlL2pwZWd8aW1hZ2VzL2hkYi9oOTEvODc5NjkwNzkyOTYzMC5qcGd8N2UxZWQwZGYxZjQzOTZmMTUxOGI3MTMxMjNhNDc1NmU5ZmYxYTRlOWFmNjI3NDNmYmM0Nzc1ZTQyOTBhODZhOA',
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
  { key: 'quantity ', output: '2' },
  { key: 'product.name', output: 'PC Service Set Professional' },
  { key: 'totalPrice.formattedValue', output: '$47.00' },
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
      it(`should resolve ${key}`, () => {
        expect(service['resolveValue'](key, entry)).toBe(output);
      });
    });
  });
});
