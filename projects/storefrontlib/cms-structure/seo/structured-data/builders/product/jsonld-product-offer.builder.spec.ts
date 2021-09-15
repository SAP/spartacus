import { TestBed } from '@angular/core/testing';
import { Product } from '@spartacus/core';
import { JsonLdProductOfferBuilder } from './jsonld-product-offer.builder';

const simpleProductMock: Product = {
  code: '123',
  name: 'Product 123',
  summary: 'Product 123 summary',
  averageRating: 2.5,
  price: {
    value: 1.0,
    currencyIso: 'EUR',
  },
  stock: {
    stockLevelStatus: 'inStock',
  },
};

describe('JsonLdProductOfferBuilder', () => {
  let service: JsonLdProductOfferBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsonLdProductOfferBuilder],
    });

    service = TestBed.inject(JsonLdProductOfferBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build offer schema with price value', () => {
    service
      .build(simpleProductMock)
      .subscribe((schema) => {
        expect(schema.offers.price).toEqual(1.0);
      })
      .unsubscribe();
  });

  it('should build offer schema with currency', () => {
    service
      .build(simpleProductMock)
      .subscribe((schema) => {
        expect(schema.offers.priceCurrency).toEqual('EUR');
      })
      .unsubscribe();
  });

  it('should build offer schema with "InStock" availability ', () => {
    service
      .build(simpleProductMock)
      .subscribe((schema) => {
        expect(schema.offers.availability).toEqual('InStock');
      })
      .unsubscribe();
  });
});
