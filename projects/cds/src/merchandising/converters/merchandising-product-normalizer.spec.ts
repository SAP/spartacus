import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ImageType, Product } from '@spartacus/core';
import { MerchandisingProduct } from '../model/strategy-result.model';
import { MerchandisingProductNormalizer } from './merchandising-product-normalizer';

const MERCHANDISING_PRODUCT_METADATA: Map<string, string> = new Map<
  string,
  string
>();
MERCHANDISING_PRODUCT_METADATA.set(
  'test-product-metadata-field',
  'test-product-metadata-field'
);
const MERCHANDISING_PRODUCT: MerchandisingProduct = {
  id: 'test-product-id',
  name: 'test-product',
  description: 'test-product',
  brand: 'test-brand',
  pageUrl: 'http://some-product-url',
  thumbNailImage: 'http://some-thumbnail-imgae-url',
  mainImage: 'http://some-main-imgae-url',
  price: 20.99,
  metadata: MERCHANDISING_PRODUCT_METADATA,
};

const NO_PRICE_PRODUCT: Product = {
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
};

const PRODUCT: Product = {
  price: {
    formattedValue: '20.99',
    value: 20.99,
  },
  ...NO_PRICE_PRODUCT,
};

describe('MerchandisingProductNormalizer', () => {
  let productNormalizer: MerchandisingProductNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchandisingProductNormalizer],
    });

    productNormalizer = TestBed.get(MerchandisingProductNormalizer as Type<
      MerchandisingProductNormalizer
    >);
  });

  it('should be created', () => {
    expect(productNormalizer).toBeTruthy();
  });

  it('should convert a MerchandisingProduct', () => {
    expect(productNormalizer.convert(MERCHANDISING_PRODUCT)).toEqual(PRODUCT);
  });

  it('should not convert price if it is not present', () => {
    const NO_PRICE_MERCHANDISING_PRODUCT: MerchandisingProduct = {
      ...MERCHANDISING_PRODUCT,
      price: null,
    };

    expect(productNormalizer.convert(NO_PRICE_MERCHANDISING_PRODUCT)).toEqual(
      NO_PRICE_PRODUCT
    );
  });
});
