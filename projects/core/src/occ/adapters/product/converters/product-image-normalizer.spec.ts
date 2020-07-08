import { inject, TestBed } from '@angular/core/testing';
import { ImageType } from '../../../../model/image.model';
import { Product } from '../../../../model/product.model';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import { ProductImageNormalizer } from './product-image-normalizer';

const baseUrl = 'http://hybris.com';
const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl,
      prefix: '',
    },
    media: {
      baseUrl: '',
    },
  },
};

describe('ProductImageNormalizer', () => {
  let service: ProductImageNormalizer;

  const product: Occ.Product = {
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
        url: '//test2',
      },
      {
        altText: 'Test alt text',
        format: 'zoom',
        imageType: ImageType.PRIMARY,
        url: 'https://hybris.com/test3.jpg',
      },
      {
        altText: 'Test alt text',
        format: 'product',
        galleryIndex: 0,
        imageType: ImageType.GALLERY,
        url: 'data:image/jpeg;base64,/test4',
      },
      {
        altText: 'Test alt text',
        format: 'thumbnail',
        galleryIndex: 0,
        imageType: ImageType.GALLERY,
        url: '/test5',
      },
    ],
  };

  const convertedProduct: Product = {
    code: 'testCode',
    description: 'test',
    images: {
      PRIMARY: {
        product: {
          altText: 'Test alt text',
          format: 'product',
          imageType: ImageType.PRIMARY,
          url: baseUrl + '/test1',
        },
        thumbnail: {
          altText: 'Test alt text',
          format: 'thumbnail',
          imageType: ImageType.PRIMARY,
          url: '//test2',
        },
        zoom: {
          altText: 'Test alt text',
          format: 'zoom',
          imageType: ImageType.PRIMARY,
          url: 'https://hybris.com/test3.jpg',
        },
      },
      GALLERY: [
        {
          product: {
            altText: 'Test alt text',
            format: 'product',
            galleryIndex: 0,
            imageType: ImageType.GALLERY,
            url: 'data:image/jpeg;base64,/test4',
          },
          thumbnail: {
            altText: 'Test alt text',
            format: 'thumbnail',
            galleryIndex: 0,
            imageType: ImageType.GALLERY,
            url: baseUrl + '/test5',
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
    service = TestBed.inject(ProductImageNormalizer);
  });

  it('should inject ProductImageConverterService', inject(
    [ProductImageNormalizer],
    (productImageConverterService: ProductImageNormalizer) => {
      expect(productImageConverterService).toBeTruthy();
    }
  ));

  it('should convert product image', () => {
    const result = service.convert(product);
    expect(result).toEqual(convertedProduct);
  });
});
