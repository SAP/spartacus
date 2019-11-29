import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageType } from '@spartacus/core';
import { MerchandisingProduct } from '../model/merchandising-products.model';
import { StrategyProduct } from '../model/strategy-result.model';
import { StrategyProductNormalizer } from './strategy-product-normalizer';

const STRATEGY_PRODUCT: StrategyProduct = {
  id: 'test-product-id',
  name: 'test-product',
  description: 'test-product',
  brand: 'test-brand',
  pageUrl: 'http://some-product-url',
  thumbNailImage: 'http://some-thumbnail-imgae-url',
  mainImage: 'http://some-main-imgae-url',
  price: 20.99,
  metadata: {
    'test-product-metadata-field': 'test-product-metadata-value',
  },
};

const NO_PRICE_MERCHANDISING_PRODUCT: MerchandisingProduct = {
  code: 'test-product-id',
  name: 'test-product',
  images: {
    PRIMARY: {
      product: {
        url: 'http://some-main-imgae-url',
        format: 'product',
        imageType: ImageType.PRIMARY,
      },
    },
  },
  metadata: new Map(Object.entries(STRATEGY_PRODUCT.metadata)),
};

const MERCHANDISING_PRODUCT: MerchandisingProduct = {
  price: {
    formattedValue: '20.99',
    value: 20.99,
  },
  ...NO_PRICE_MERCHANDISING_PRODUCT,
};

describe('StrategyProductNormalizer', () => {
  let productNormalizer: StrategyProductNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StrategyProductNormalizer],
    });

    productNormalizer = TestBed.get(StrategyProductNormalizer as Type<
      StrategyProductNormalizer
    >);
  });

  it('should be created', () => {
    expect(productNormalizer).toBeTruthy();
  });

  it('should convert a StrategyProduct', () => {
    expect(productNormalizer.convert(STRATEGY_PRODUCT)).toEqual(
      MERCHANDISING_PRODUCT
    );
  });

  it('should not convert price if it is not present', () => {
    const NO_PRICE_STRATEGY_PRODUCT: StrategyProduct = {
      ...STRATEGY_PRODUCT,
      price: null,
    };

    expect(productNormalizer.convert(NO_PRICE_STRATEGY_PRODUCT)).toEqual(
      NO_PRICE_MERCHANDISING_PRODUCT
    );
  });
});
