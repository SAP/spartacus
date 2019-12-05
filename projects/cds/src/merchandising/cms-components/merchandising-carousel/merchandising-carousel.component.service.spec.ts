import { Type } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { CdsMerchandisingProductService } from '../../facade/cds-merchandising-product.service';
import {
  MerchandisingProduct,
  MerchandisingProducts,
} from '../../model/merchandising-products.model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';

const mockMerchandisingProductsMetadata: Map<string, string> = new Map();
mockMerchandisingProductsMetadata.set(
  'custom-metadata-field-1',
  'custom-metadata-data-value-1'
);
const mockMerchandisingProducts: MerchandisingProducts = {
  products: [
    {
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
    {
      code: '2',
      name: 'product 2',
      price: {
        formattedValue: '200.00',
      },
    },
  ],
  metadata: mockMerchandisingProductsMetadata,
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
  loadProductsForStrategy(): Observable<MerchandisingProducts> {
    return of(mockMerchandisingProducts);
  }
}

describe('MerchandisingCarouselComponentService', () => {
  let componentService: MerchandisingCarouselComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: CdsMerchandisingProductService,
          useClass: MockCdsMerchandisingProductService,
        },
      ],
    });

    componentService = TestBed.get(
      MerchandisingCarouselComponentService as Type<
        MerchandisingCarouselComponentService
      >
    );
  });

  it('should be created', async(() => {
    expect(componentService).toBeTruthy();
  }));

  it('should retrieve a merchandising carousel model', () => {
    const expectedMerchandisingCarouselModelMetadata: Map<
      string,
      string
    > = new Map(mockMerchandisingProductsMetadata);

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
      mockMerchandisingProducts.products.length.toString()
    );
    expectedMerchandisingCarouselModelMetadata.set('id', mockComponentData.uid);

    let actualCarouselMetadata: Map<string, string>;
    const actualCarouselProducts: MerchandisingProduct[] = [];
    componentService
      .getMerchandisingCarouselModel(mockComponentData)
      .subscribe(merchandisingCarouselModel => {
        actualCarouselMetadata = merchandisingCarouselModel.metadata;
        merchandisingCarouselModel.items$.forEach(observableProduct =>
          observableProduct.subscribe(product =>
            actualCarouselProducts.push(product)
          )
        );
      });
    expect(actualCarouselMetadata).toEqual(
      expectedMerchandisingCarouselModelMetadata
    );
    expect(actualCarouselProducts).toEqual(mockMerchandisingProducts.products);
  });
});
