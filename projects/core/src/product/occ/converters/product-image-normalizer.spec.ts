import { TestBed, inject } from '@angular/core/testing';

import { OccConfig } from '../../../occ/config/occ-config';
import { Product, ImageType } from '../../../occ/occ-models/occ.models';

import { ProductImageNormalizer } from './product-image-normalizer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('ProductImageConverterService', () => {
  let service: ProductImageNormalizer;

  const product: Product = {
    code: 'testCode',
    description: 'test',
    images: [
      {
        altText: 'Test alt text',
        format: 'product',
        imageType: ImageType.PRIMARY,
        url: '/test1',
      },
      {
        altText: 'Test alt text',
        format: 'thumbnail',
        imageType: ImageType.PRIMARY,
        url: '/test2',
      },
      {
        altText: 'Test alt text',
        format: 'product',
        galleryIndex: 0,
        imageType: ImageType.GALLERY,
        url: '/test3',
      },
      {
        altText: 'Test alt text',
        format: 'thumbnail',
        galleryIndex: 0,
        imageType: ImageType.GALLERY,
        url: '/test4',
      },
    ],
  };

  const convertedProduct = {
    code: 'testCode',
    description: 'test',
    images: {
      PRIMARY: {
        product: {
          altText: 'Test alt text',
          format: 'product',
          imageType: 'PRIMARY',
          url: '/test1',
        },
        thumbnail: {
          altText: 'Test alt text',
          format: 'thumbnail',
          imageType: 'PRIMARY',
          url: '/test2',
        },
      },
      GALLERY: [
        {
          product: {
            altText: 'Test alt text',
            format: 'product',
            galleryIndex: 0,
            imageType: 'GALLERY',
            url: '/test3',
          },
          thumbnail: {
            altText: 'Test alt text',
            format: 'thumbnail',
            galleryIndex: 0,
            imageType: 'GALLERY',
            url: '/test4',
          },
        },
      ],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductImageNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(ProductImageNormalizer);
  });

  it('should inject ProductImageConverterService', inject(
    [ProductImageNormalizer],
    (productImageConverterService: ProductImageNormalizer) => {
      expect(productImageConverterService).toBeTruthy();
    }
  ));

  it('should convert product image', () => {
    service.convertProduct(product);
    expect(product).toBeTruthy(convertedProduct);
  });

  it('should convert a list of products', () => {
    service.convertList([product]);
    expect(product).toBeTruthy(convertedProduct);
  });
});
