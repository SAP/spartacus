import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, ImageType } from '@spartacus/core';
import { MerchandisingProducts } from '../model/merchandising.products';
import { StrategyResult } from '../model/strategy.result';
import { MerchandisingProductsNormalizer } from './merchandising-products-normalizer';
import createSpy = jasmine.createSpy;

const STRATEGY_RESULT_METADATA: Map<string, string> = new Map<string, string>();
STRATEGY_RESULT_METADATA.set('test-metadata-field', 'test-metadata-value');
const PRODUCT_METADATA: Map<string, string> = new Map<string, string>();
PRODUCT_METADATA.set(
  'test-product-metadata-field',
  'test-product-metadata-field'
);
const STRATEGY_RESULT: StrategyResult = {
  resultCount: 1,
  products: [
    {
      id: 'test-product-id',
      name: 'test-product',
      description: 'test-product',
      brand: 'test-brand',
      pageUrl: 'http://some-product-url',
      thumbNailImage: 'http://some-thumbnail-imgae-url',
      mainImage: 'http://some-main-imgae-url',
      price: 20.99,
      metadata: PRODUCT_METADATA,
    },
  ],
  paged: {
    from: 1,
    size: 5,
  },
  metadata: STRATEGY_RESULT_METADATA,
};

const MERCHANDISING_PRODUCTS: MerchandisingProducts = {
  metadata: STRATEGY_RESULT_METADATA,
  products: [
    {
      code: 'test-product-id',
      name: 'test-product',
      price: {
        formattedValue: '20.99',
        value: 20.99,
      },
      images: {
        PRIMARY: {
          product: {
            url: 'http://some-main-imgae-url',
            format: 'product',
            imageType: ImageType.PRIMARY,
          },
        },
      },
    },
  ],
};

class MockConverterService {
  convert = createSpy().and.returnValue(MERCHANDISING_PRODUCTS.products[0]);
}

describe('MerchandisingProductsNormalizer', () => {
  let productsNormalizer: MerchandisingProductsNormalizer;
  let converterService: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        MerchandisingProductsNormalizer,
      ],
    });

    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    productsNormalizer = TestBed.get(MerchandisingProductsNormalizer as Type<
      MerchandisingProductsNormalizer
    >);
  });

  it('should be created', () => {
    expect(productsNormalizer).toBeTruthy();
  });

  it('should convert a StrategyResult with no metadata to a MerchandisingProducts with no metadata', () => {
    const NO_METADATA_STRATEGY_RESULT = {
      ...STRATEGY_RESULT,
      metadata: null,
    };

    const NO_METADATA_MERCHANDISING_PRODUCTS = {
      ...MERCHANDISING_PRODUCTS,
    };
    // metadata should not just be null/undefined on the converted MerchandisingProducts, it should not exist at all
    delete NO_METADATA_MERCHANDISING_PRODUCTS.metadata;

    expect(productsNormalizer.convert(NO_METADATA_STRATEGY_RESULT)).toEqual(
      NO_METADATA_MERCHANDISING_PRODUCTS
    );
  });

  it('should convert a StrategyResult with no porducts to a MerchandisingProducts with no products', () => {
    const NO_PRODUCTS_STRATEGY_RESULT = {
      ...STRATEGY_RESULT,
      products: null,
    };

    const NO_PRODUCTS_MERCHANDISING_PRODUCTS = {
      ...MERCHANDISING_PRODUCTS,
    };
    // products should not just be null/undefined on the converted MerchandisingProducts, it should not exist at all
    delete NO_PRODUCTS_MERCHANDISING_PRODUCTS.products;

    expect(productsNormalizer.convert(NO_PRODUCTS_STRATEGY_RESULT)).toEqual(
      NO_PRODUCTS_MERCHANDISING_PRODUCTS
    );
    expect(converterService.convert).not.toHaveBeenCalled();
  });

  it('should convert a StrategyResult with an empty products array to a MerchandisingProducts with an empty products array', () => {
    const EMPTY_PRODUCTS_STRATEGY_RESULT = {
      ...STRATEGY_RESULT,
      products: [],
    };

    const EMPTY_PRODUCTS_MERCHANDISING_PRODUCTS = {
      ...MERCHANDISING_PRODUCTS,
      products: [],
    };

    expect(productsNormalizer.convert(EMPTY_PRODUCTS_STRATEGY_RESULT)).toEqual(
      EMPTY_PRODUCTS_MERCHANDISING_PRODUCTS
    );
    expect(converterService.convert).not.toHaveBeenCalled();
  });

  it('should convert a StrategyResult to a MerchandisingProducts', () => {
    expect(productsNormalizer.convert(STRATEGY_RESULT)).toEqual(
      MERCHANDISING_PRODUCTS
    );
    expect(converterService.convert).toHaveBeenCalledTimes(1);
  });
});
