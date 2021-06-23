import { waitForAsync, TestBed, TestBedStatic } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsConfig } from '../../../config/index';
import { ProfileTagEventService } from '../../../profiletag/index';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProducts,
} from '../../model/index';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import {
  MerchandisingCarouselClickedEvent,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewedEvent,
} from './model/index';
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

const mockCarouselId =
  mockComponentData.uid + '_' + mockComponentData.strategy + '_1_2';
const mockMerchandisingCarouselModel: MerchandisingCarouselModel = {
  id: mockCarouselId,
  title: mockComponentData.title,
  items$: [of(mockProducts['1']), of(mockProducts['2'])],
  productIds: ['1', '2'],
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

  it(
    'should be created',
    waitForAsync(() => {
      expect(componentService).toBeTruthy();
    })
  );

  describe('getMerchandisingCaourselViewportThreshold', () => {
    it('should fallback to a hardcoded carousel viewport threshold if one is not provided in the carousel CMS component config or the CDS config', () => {
      TestBed.resetTestingModule();
      configureTestingModule().overrideProvider(CdsConfig, {
        useValue: {},
      });
      componentService = TestBed.inject(MerchandisingCarouselComponentService);

      expect(
        componentService.getMerchandisingCaourselViewportThreshold(
          emptyComponentData
        )
      ).toBe(0.8);
    });

    it('should fallback to the carousel viewport threshold in the CDS config if one is not provided in the carousel CMS component config', () => {
      expect(
        componentService.getMerchandisingCaourselViewportThreshold(
          emptyComponentData
        )
      ).toBe(
        mockCdsConfig.cds.merchandising.defaultCarouselViewportThreshold / 100
      );
    });

    it('should get the carousel viewport threshold from the carousel CMS component config', () => {
      expect(
        componentService.getMerchandisingCaourselViewportThreshold(
          mockComponentData
        )
      ).toBe(mockComponentData.viewportPercentage / 100);
    });
  });

  describe('getMerchandisingCarouselModel', () => {
    it('should retrieve a merchandising carousel model', () => {
      const expectedMerchandisingCarouselModelMetadata: MerchandisingMetadata =
        {
          ...mockStrategyProducts.metadata,
          title: mockComponentData.title,
          name: mockComponentData.name,
          strategyid: mockComponentData.strategy,
          slots: mockStrategyProducts.products.length,
          id: mockComponentData.uid,
        };

      const expectedMerchandisingCarouselModelProducts: MerchandisingProduct[] =
        mockStrategyProducts.products.map((strategyProduct, index) => {
          const merchandisingProductMetadata: MerchandisingMetadata =
            strategyProduct.metadata;
          merchandisingProductMetadata.id = strategyProduct.id;
          merchandisingProductMetadata.slot = index + 1;

          return {
            ...mockProducts[strategyProduct.id],
            metadata: merchandisingProductMetadata,
          };
        });
      const expectedProductIds: string[] = ['1', '2'];

      let actualCarouselMetadata: MerchandisingMetadata;
      const actualCarouselProducts: MerchandisingProduct[] = [];
      let actualProductIds: string[];
      let actualModelId: string;

      componentService
        .getMerchandisingCarouselModel(mockComponentData)
        .subscribe((model) => {
          actualModelId = model.id;
          actualProductIds = model.productIds;
          actualCarouselMetadata = model.metadata;
          model.items$.forEach((observableProduct) =>
            observableProduct.subscribe((product) =>
              actualCarouselProducts.push(product)
            )
          );
        });

      expect(actualModelId).toEqual(mockCarouselId);
      expect(actualProductIds).toEqual(expectedProductIds);
      expect(actualCarouselMetadata).toEqual(
        expectedMerchandisingCarouselModelMetadata
      );
      expect(actualCarouselProducts).toEqual(
        expectedMerchandisingCarouselModelProducts
      );
    });
  });

  describe('sendCarouselViewEvent', () => {
    it('should send a carousel view event to profile tag', () => {
      const expectedCarouselViewEvent = new MerchandisingCarouselViewedEvent(
        {
          carouselId: mockMerchandisingCarouselModel.metadata.id,
          carouselName: mockMerchandisingCarouselModel.metadata.name,
          strategyId: mockMerchandisingCarouselModel.metadata.strategyid,
          metadata: mockMerchandisingCarouselModel.metadata,
        },
        [mockProducts[1].code, mockProducts[2].code]
      );
      let actualCarouselModel: MerchandisingCarouselModel;
      componentService
        .sendCarouselViewEvent('', of(mockMerchandisingCarouselModel))
        .subscribe((model) => {
          actualCarouselModel = model;
        });

      expect(actualCarouselModel).toEqual(mockMerchandisingCarouselModel);
      expect(
        profileTagEventService.notifyProfileTagOfEventOccurence
      ).toHaveBeenCalledWith(expectedCarouselViewEvent);
    });

    it('should not send duplicated carousel view event to profile tag', () => {
      let actualCarouselModel: MerchandisingCarouselModel = null;
      componentService
        .sendCarouselViewEvent(
          mockCarouselId,
          of(mockMerchandisingCarouselModel)
        )
        .subscribe((model) => {
          actualCarouselModel = model;
        });

      expect(actualCarouselModel).toBeNull();
      expect(
        profileTagEventService.notifyProfileTagOfEventOccurence
      ).toHaveBeenCalledTimes(0);
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

      const expectedCarouselClickedEvent =
        new MerchandisingCarouselClickedEvent(
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
