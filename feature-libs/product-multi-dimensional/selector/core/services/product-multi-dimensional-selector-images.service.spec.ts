import { TestBed } from '@angular/core/testing';
import { Config, VariantOptionQualifier } from '@spartacus/core';
import { ProductMultiDimensionalSelectorImagesService } from './product-multi-dimensional-selector-images.service';
import { ProductMultiDimensionalConfig } from '../../root/config/product-multi-dimensional-config';

enum VariantQualifier {
  STYLE_SWATCH = 'styleSwatch',
}

describe('ProductMultiDimensionalSelectorImagesService', () => {
  let service: ProductMultiDimensionalSelectorImagesService;
  let config: Config;

  beforeEach(() => {
    const mockConfig = {
      backend: {
        media: {
          baseUrl: 'http://media.base.url/',
        },
        occ: {
          baseUrl: 'http://occ.base.url/',
        },
      },
      multiDimensional: {
        imageFormat: VariantQualifier.STYLE_SWATCH,
      } as ProductMultiDimensionalConfig,
    };

    TestBed.configureTestingModule({
      providers: [
        ProductMultiDimensionalSelectorImagesService,
        { provide: Config, useValue: mockConfig },
      ],
    });

    service = TestBed.inject(ProductMultiDimensionalSelectorImagesService);
    config = TestBed.inject(Config);
  });

  describe('getVariantOptionImages', () => {
    it('should return image that match the specified format', () => {
      config.multiDimensional = { imageFormat: VariantQualifier.STYLE_SWATCH };
      const styleSwatchImage = {
        format: VariantQualifier.STYLE_SWATCH,
        url: '/image1.jpg',
      };
      const variantOptionQualifiers: VariantOptionQualifier[] = [
        {
          image: styleSwatchImage,
        },
        {
          image: { format: 'large', url: '/image2.jpg' },
        },
      ];
      const variantOptionValue = 'Sample Variant';

      const result = service.getVariantOptionImage(
        variantOptionQualifiers,
        variantOptionValue
      );

      expect(result).toEqual({
        altText: variantOptionValue,
        url: 'http://media.base.url//image1.jpg',
      });
    });

    it('should use altText from image if available', () => {
      config.multiDimensional = { imageFormat: VariantQualifier.STYLE_SWATCH };
      const image = {
        format: VariantQualifier.STYLE_SWATCH,
        url: '/image1.jpg',
        altText: 'Alt Text',
      };
      const variantOptionQualifiers: VariantOptionQualifier[] = [
        {
          image,
        },
      ];
      const variantOptionValue = 'Sample Variant';

      const result = service.getVariantOptionImage(
        variantOptionQualifiers,
        variantOptionValue
      );

      expect(result.altText).toBe(image.altText);
    });

    it('should handle missing config gracefully', () => {
      config.multiDimensional = undefined;
      const variantOptionQualifiers: VariantOptionQualifier[] = [
        {
          image: { format: VariantQualifier.STYLE_SWATCH, url: '/image1.jpg' },
        },
      ];
      const variantOptionValue = 'Sample Variant';

      const result = service.getVariantOptionImage(
        variantOptionQualifiers,
        variantOptionValue
      );

      expect(result).toBe(undefined);
    });

    it('should handle missing image properties gracefully', () => {
      config.multiDimensional = { imageFormat: VariantQualifier.STYLE_SWATCH };
      const variantOptionQualifiers: VariantOptionQualifier[] = [
        {
          image: undefined,
        },
      ];
      const variantOptionValue = 'Sample Variant';

      const result = service.getVariantOptionImage(
        variantOptionQualifiers,
        variantOptionValue
      );

      expect(result).toBe(undefined);
    });
  });

  describe('getBaseUrl', () => {
    it('should return media baseUrl if available', () => {
      const result = service['getBaseUrl']();
      expect(result).toBe('http://media.base.url/');
    });

    it('should return occ baseUrl if media baseUrl is not available', () => {
      config.backend = { ...config.backend, media: { baseUrl: undefined } };

      const result = service['getBaseUrl']();
      expect(result).toBe('http://occ.base.url/');
    });

    it('should return empty string if no baseUrl is available', () => {
      config.backend = {
        media: { baseUrl: undefined },
        occ: { baseUrl: undefined },
      };

      const result = service['getBaseUrl']();
      expect(result).toBe('');
    });
  });
});
