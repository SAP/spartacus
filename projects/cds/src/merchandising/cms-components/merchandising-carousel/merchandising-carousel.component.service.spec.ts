import { async, TestBed, TestBedStatic } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsConfig } from '../../../config';
import { ProfileTagEventService } from '../../../profiletag';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProducts,
} from '../../model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import {
  MerchandisingCarouselClicked,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewed,
} from './model';
import createSpy = jasmine.createSpy;

const mockStrategyProducts: StrategyProducts = {
  products: [
    {
      id: '1',
      metadata: {
        'product-1-metadata-field': 'product-1-metadata-value',
      },
    },
    {
      id: '2',
      metadata: {
        'product-2-metadata-field': 'product-2-metadata-value',
      },
    },
  ],
  metadata: {
    'custom-metadata-field-1': 'custom-metadata-data-value-1',
  },
};

const mockProducts = {
  1: {
    code: '1',
    name: 'product 1',
    price: {
      formattedValue: '100.00',
    },
    images: {
      PRIMARY: {
        product: {
          url: 'whatever.jpg',
        },
      },
    },
  },
  2: {
    code: '2',
    name: 'product 2',
    price: {
      formattedValue: '200.00',
    },
  },
};

const emptyComponentData: CmsMerchandisingCarouselComponent = {};

const mockComponentData: CmsMerchandisingCarouselComponent = {
  uid: '001',
  typeCode: 'MerchandisingCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  strategy: 'test-strategy-1',
  container: 'false',
  viewportPercentage: 30,
};

const mockCdsConfig: CdsConfig = {
  cds: {
    merchandising: {
      defaultCarouselViewportThreshold: 50,
    },
  },
};

const mockMerchandisingCarouselModel: MerchandisingCarouselModel = {
  title: mockComponentData.title,
  items$: [of(mockProducts['1']), of(mockProducts['2'])],
  metadata: {
    id: 'mock-carousel-id',
    name: mockComponentData.name,
    strategyid: 'mock-strategy-id',
    otherField: 'some-other-metadata-field',
  },
  backgroundColor: '#ffffff',
  textColor: '#000000',
};

class MockCdsMerchandisingProductService {
  loadProductsForStrategy(): Observable<StrategyProducts> {
    return of(mockStrategyProducts);
  }
}

class MockProductService {
  get(code): Observable<Product> {
    return of(mockProducts[code]);
  }
}

class MockProfileTagEventService {
  notifyProfileTagOfEventOccurence = createSpy(
    'ProfileTagEventService.notifyProfileTagOfEventOccurence'
  ).and.callFake((_) => {});
}

describe('MerchandisingCarouselComponentService', () => {
  let componentService: MerchandisingCarouselComponentService;
  let profileTagEventService: ProfileTagEventService;

  function configureTestingModule(): TestBedStatic {
    return TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: CdsMerchandisingProductService,
          useClass: MockCdsMerchandisingProductService,
        },
        {
          provide: ProfileTagEventService,
          useClass: MockProfileTagEventService,
        },
        {
          provide: CdsConfig,
          useValue: mockCdsConfig,
        },
      ],
    });
  }

  beforeEach(() => {
    configureTestingModule();

    componentService = TestBed.inject(MerchandisingCarouselComponentService);
    profileTagEventService = TestBed.inject(ProfileTagEventService);
  });

  it('should be created', async(() => {
    expect(componentService).toBeTruthy();
  }));

  describe('getMerchandisingCaourselViewportThreshold', () => {
    it('should fallback to a hardcoded carousel viewport threshold if one is not provided in the carousel CMS component config or the CDS config', () => {
      TestBed.resetTestingModule();
      configureTestingModule().overrideProvider(CdsConfig, {
        useValue: {},
      });
      componentService = TestBed.inject(MerchandisingCarouselComponentService);

      let actualViewportThreshold;

      componentService
        .getMerchandisingCaourselViewportThreshold(emptyComponentData)
        .subscribe(
          (viewportThreshold) => (actualViewportThreshold = viewportThreshold)
        );

      expect(actualViewportThreshold).toBe(0.8);
    });

    it('should fallback to the carousel viewport threshold in the CDS config if one is not provided in the carousel CMS component config', () => {
      let actualViewportThreshold;

      componentService
        .getMerchandisingCaourselViewportThreshold(emptyComponentData)
        .subscribe(
          (viewportThreshold) => (actualViewportThreshold = viewportThreshold)
        );

      expect(actualViewportThreshold).toBe(
        mockCdsConfig.cds.merchandising.defaultCarouselViewportThreshold / 100
      );
    });

    it('should get the carousel viewport threshold from the carousel CMS component config', () => {
      let actualViewportThreshold;

      componentService
        .getMerchandisingCaourselViewportThreshold(mockComponentData)
        .subscribe(
          (viewportThreshold) => (actualViewportThreshold = viewportThreshold)
        );

      expect(actualViewportThreshold).toBe(
        mockComponentData.viewportPercentage / 100
      );
    });
  });

  describe('getMerchandisingCarouselModel', () => {
    it('should retrieve a merchandising carousel model', () => {
      const expectedMerchandisingCarouselModelMetadata: MerchandisingMetadata = {
        ...mockStrategyProducts.metadata,
        title: mockComponentData.title,
        name: mockComponentData.name,
        strategyid: mockComponentData.strategy,
        slots: mockStrategyProducts.products.length,
        id: mockComponentData.uid,
      };

      const expectedMerchandisingCarouselModelProducts: MerchandisingProduct[] = mockStrategyProducts.products.map(
        (strategyProduct, index) => {
          const merchandisingProductMetadata: MerchandisingMetadata =
            strategyProduct.metadata;
          merchandisingProductMetadata.id = strategyProduct.id;
          merchandisingProductMetadata.slot = index + 1;

          return {
            ...mockProducts[strategyProduct.id],
            metadata: merchandisingProductMetadata,
          };
        }
      );

      let actualCarouselMetadata: MerchandisingMetadata;
      const actualCarouselProducts: MerchandisingProduct[] = [];
      componentService
        .getMerchandisingCarouselModel(mockComponentData)
        .subscribe((merchandisingProducts) => {
          actualCarouselMetadata = merchandisingProducts.metadata;
          merchandisingProducts.items$.forEach((observableProduct) =>
            observableProduct.subscribe((product) =>
              actualCarouselProducts.push(product)
            )
          );
        });

      expect(actualCarouselMetadata).toEqual(
        expectedMerchandisingCarouselModelMetadata
      );
      expect(actualCarouselProducts).toEqual(
        expectedMerchandisingCarouselModelProducts
      );
    });
  });

  describe('sendCarouselViewEvent', () => {
    it('should send a caorusel view event to profile tag', () => {
      const expectedCarouselViewEvent = new MerchandisingCarouselViewed(
        {
          carouselId: mockMerchandisingCarouselModel.metadata.id,
          carouselName: mockMerchandisingCarouselModel.metadata.name,
          strategyId: mockMerchandisingCarouselModel.metadata.strategyid,
          metadata: mockMerchandisingCarouselModel.metadata,
        },
        [mockProducts[1].code, mockProducts[2].code]
      );

      componentService.sendCarouselViewEvent(mockMerchandisingCarouselModel);

      expect(
        profileTagEventService.notifyProfileTagOfEventOccurence
      ).toHaveBeenCalledWith(expectedCarouselViewEvent);
    });
  });

  describe('sendCarouselItemClickedEvent', () => {
    it('should send a carousel click event to profile tag', () => {
      const clickedProduct: MerchandisingProduct = {
        ...mockProducts['1'],
        metadata: {
          slot: 1,
          otherField: 'some-other-metadata-field',
        },
      };

      const expectedCarouselClickedEvent = new MerchandisingCarouselClicked(
        {
          carouselId: mockMerchandisingCarouselModel.metadata.id,
          carouselName: mockMerchandisingCarouselModel.metadata.name,
          strategyId: mockMerchandisingCarouselModel.metadata.strategyid,
          metadata: {
            ...mockMerchandisingCarouselModel.metadata,
            ...clickedProduct.metadata,
          },
        },
        clickedProduct.metadata.slot,
        clickedProduct.code,
        clickedProduct.images.PRIMARY['product'].url
      );

      componentService.sendCarouselItemClickedEvent(
        mockMerchandisingCarouselModel,
        clickedProduct
      );

      expect(
        profileTagEventService.notifyProfileTagOfEventOccurence
      ).toHaveBeenCalledWith(expectedCarouselClickedEvent);
    });
  });
});
