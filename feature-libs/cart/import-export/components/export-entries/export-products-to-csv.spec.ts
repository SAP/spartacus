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
  GlobalMessageService,
} from '@spartacus/core';
import {
  defaultImportExportConfig,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { SavedCartDetailsService } from '@spartacus/cart/saved-cart/components';
import { ExportProductsToCsvService } from './export-products-to-csv.service';
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
    url: '/Open-Catalogue/Tools/Measuring-%26-Layout-Tools/PC-Service-Set-Professional/p/3803058',
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
  getEntries = createSpy('getEntries').and.returnValue(of([entry, entry]));
}

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails = createSpy('getCartDetails').and.returnValue(
    of({ entries: [entry, entry] })
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('ExportProductsToCsvService', () => {
  let service: ExportProductsToCsvService;
  let translationService: TranslationService;
  let savedCartDetailsService: SavedCartDetailsService;
  let activeCartService: ActiveCartService;

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
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(ExportProductsToCsvService);
    translationService = TestBed.inject(TranslationService);
    savedCartDetailsService = TestBed.inject(SavedCartDetailsService);
    activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getResolvedEntries', () => {
    it('should translate headings and export entries to specific format', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'savedCartsDetails',
        },
      } as RouterState);
      spyOn(translationService, 'translate').and.callThrough();

      let result: string[][] = [];
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

      expect(result.length).toEqual(3);
      expect(result).toEqual([[...headings], values, values]);
      expect(translationService.translate).toHaveBeenCalledTimes(4);
    });

    it('should resolve data from saved cart', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'savedCartsDetails',
        },
      } as RouterState);
      service.getResolvedEntries().subscribe();
      expect(savedCartDetailsService.getCartDetails).toHaveBeenCalledWith();
    });

    it('should resolve data from active cart', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'cart',
        },
      } as RouterState);
      service.getResolvedEntries().subscribe();
      expect(activeCartService.getEntries).toHaveBeenCalledWith();
    });

    it('should resolve data from other page', () => {
      routerStateSubject.next({
        state: {
          semanticRoute: 'otherPage',
        },
      } as RouterState);
      service.getResolvedEntries().subscribe();
      expect(activeCartService.getEntries).toHaveBeenCalledWith();
    });
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
      {
        key: 'product.stock',
        output: `{'stockLevel':365,'stockLevelStatus':'inStock'}`,
      },
      { key: 'notExistingKey', output: '' },
      { key: 'notExistingKey.notExistingKey', output: '' },
    ];

    testData.forEach(({ key, output }) => {
      it(`should resolve value for ${key}`, () => {
        expect(service['resolveValue'](key, entry)).toBe(output);
      });
    });
  });

  it(`should adjust maxEntries limit`, () => {
    service['importExportConfig'] = {
      cartImportExport: {
        ...defaultImportExportConfig.cartImportExport,
        export: {
          ...defaultImportExportConfig.cartImportExport?.export,
          maxEntries: 1,
        },
      },
    };

    let result: string[][] = [];
    service
      .getResolvedEntries()
      .subscribe((data) => (result = data))
      .unsubscribe();
    expect(result.length).toEqual(2);
  });
});
