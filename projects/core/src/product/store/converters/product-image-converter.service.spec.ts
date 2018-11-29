import { TestBed, inject } from '@angular/core/testing';
import { ProductImageConverterService } from './product-image-converter.service';
import { OccConfig } from '../../../occ/config/occ-config';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('ProductImageConverterService', () => {
  let service: ProductImageConverterService;

  const product = {
    code: 'testCode',
    description: 'test',
    images: [
      {
        altText: 'Test alt text',
        format: 'product',
        imageType: 'PRIMARY',
        url: '/test1'
      },
      {
        altText: 'Test alt text',
        format: 'thumbnail',
        imageType: 'PRIMARY',
        url: '/test2'
      },
      {
        altText: 'Test alt text',
        format: 'product',
        galleryIndex: 0,
        imageType: 'GALLERY',
        url: '/test3'
      },
      {
        altText: 'Test alt text',
        format: 'thumbnail',
        galleryIndex: 0,
        imageType: 'GALLERY',
        url: '/test4'
      }
    ]
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
          url: '/test1'
        },
        thumbnail: {
          altText: 'Test alt text',
          format: 'thumbnail',
          imageType: 'PRIMARY',
          url: '/test2'
        }
      },
      GALLERY: [
        {
          product: {
            altText: 'Test alt text',
            format: 'product',
            galleryIndex: 0,
            imageType: 'GALLERY',
            url: '/test3'
          },
          thumbnail: {
            altText: 'Test alt text',
            format: 'thumbnail',
            galleryIndex: 0,
            imageType: 'GALLERY',
            url: '/test4'
          }
        }
      ]
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductImageConverterService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(ProductImageConverterService);
  });

  it('should inject ProductImageConverterService', inject(
    [ProductImageConverterService],
    (productImageConverterService: ProductImageConverterService) => {
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
