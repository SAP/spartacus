import { async, TestBed, TestBedStatic } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { CdsConfig } from 'projects/cds/src/config';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingMetadata,
  MerchandisingProduct,
  StrategyProducts,
} from '../../model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';

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
        image: {
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

describe('MerchandisingCarouselComponentService', () => {
  let componentService: MerchandisingCarouselComponentService;

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
          provide: CdsConfig,
          useValue: mockCdsConfig,
        },
      ],
    });
  }

  beforeEach(() => {
    configureTestingModule();

    componentService = TestBed.inject(MerchandisingCarouselComponentService);
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
