import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import {
  ActiveCartService,
  I18nTestingModule,
  ImageType,
  OrderEntry,
  RoutingService,
  RouterState,
  PriceType,
  TranslationService,
} from '@spartacus/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import {
  defaultImportExportConfig,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';

import createSpy = jasmine.createSpy;

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

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'savedCartsDetails',
  },
} as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy('getRouterState').and.returnValue(
    routerStateSubject.asObservable()
  );
}

class MockActiveCartService implements Partial<ActiveCartService> {
  getEntries = createSpy('getEntries').and.returnValue(of([entry]));
}

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails = createSpy('getCartDetails').and.returnValue(
    of({ entries: [entry] })
  );
}

describe('ExportEntriesService', () => {
  let service: ExportEntriesService;
  let translationService: TranslationService;
  // let savedCartDetailsService: SavedCartDetailsService;
  // let activeCartService: ActiveCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        { provide: ImportExportConfig, useValue: defaultImportExportConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: SavedCartDetailsService,
          useClass: MockSavedCartDetailsService,
        },
      ],
    });
    service = TestBed.inject(ExportEntriesService);
    translationService = TestBed.inject(TranslationService);
    // savedCartDetailsService = TestBed.inject(SavedCartDetailsService);
    // activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should translate headings and export entries to specific format', () => {
    spyOn(translationService, 'translate').and.callThrough();

    let result;
    service.getResolvedEntries().subscribe((data) => (result = data));

    const headings = [
      'exportEntries.columnNames.code',
      'exportEntries.columnNames.quantity',
      'exportEntries.columnNames.name',
      'exportEntries.columnNames.price',
    ];

    const values = [
      entry.product?.code,
      entry.quantity?.toString(),
      entry.product?.name,
      entry.totalPrice?.formattedValue,
    ];

    expect(result).toEqual([[...headings], values]);
    expect(translationService.translate).toHaveBeenCalledTimes(4);
  });

  describe('resolveValue', () => {
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

    testData.forEach(({ key, output }) => {
      it(`should resolve value for ${key}`, () => {
        expect(service['resolveValue'](key, entry)).toBe(output);
      });
    });
  });
});
