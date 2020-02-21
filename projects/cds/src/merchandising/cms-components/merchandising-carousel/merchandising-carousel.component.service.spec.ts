import { async, TestBed } from '@angular/core/testing';
import { Product, ProductService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import { MerchandisingProduct } from '../../model/merchandising-products.model';
import { StrategyProducts } from '../../model/strategy-products.model';
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

const mockComponentData: CmsMerchandisingCarouselComponent = {
  uid: '001',
  typeCode: 'MerchandisingCarouselComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  strategy: 'test-strategy-1',
  container: 'false',
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        {
          provide: CdsMerchandisingProductService,
          useClass: MockCdsMerchandisingProductService,
        },
      ],
    });

    componentService = TestBed.inject(MerchandisingCarouselComponentService);
  });

  it('should be created', async(() => {
    expect(componentService).toBeTruthy();
  }));

  it('should retrieve a merchandising carousel model', () => {
    const expectedMerchandisingCarouselModelMetadata: Map<
      string,
      string
    > = new Map(Object.entries(mockStrategyProducts.metadata));

    expectedMerchandisingCarouselModelMetadata.set(
      'title',
      mockComponentData.title
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'name',
      mockComponentData.name
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'strategyid',
      mockComponentData.strategy
    );
    expectedMerchandisingCarouselModelMetadata.set(
      'slots',
      mockStrategyProducts.products.length.toString()
    );
    expectedMerchandisingCarouselModelMetadata.set('id', mockComponentData.uid);

    const expectedMerchandisingCarouselModelProducts: MerchandisingProduct[] = mockStrategyProducts.products.map(
      (strategyProduct, index) => {
        const merchandisingProductMetadata = new Map<string, string>(
          Object.entries(strategyProduct.metadata)
        );
        merchandisingProductMetadata.set('id', strategyProduct.id);
        merchandisingProductMetadata.set('slot', (index + 1).toString());

        return {
          ...mockProducts[strategyProduct.id],
          metadata: merchandisingProductMetadata,
        };
      }
    );

    let actualCarouselMetadata: Map<string, string>;
    const actualCarouselProducts: MerchandisingProduct[] = [];
    componentService
      .getMerchandisingCarouselModel(mockComponentData)
      .subscribe(merchandisingProducts => {
        actualCarouselMetadata = merchandisingProducts.metadata;
        merchandisingProducts.items$.forEach(observableProduct =>
          observableProduct.subscribe(product =>
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
