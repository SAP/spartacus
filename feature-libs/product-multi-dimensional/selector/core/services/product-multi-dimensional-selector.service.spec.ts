import { TestBed } from '@angular/core/testing';
import { ProductMultiDimensionalSelectorService } from './product-multi-dimensional-selector.service';
import { ProductMultiDimensionalSelectorImagesService } from './product-multi-dimensional-selector-images.service';
import { Product, VariantMatrixElement } from '@spartacus/core';
import { VariantCategoryGroup } from '../model';

describe('ProductMultiDimensionalSelectorService', () => {
  let service: ProductMultiDimensionalSelectorService;
  let imagesService: jasmine.SpyObj<ProductMultiDimensionalSelectorImagesService>;

  beforeEach(() => {
    const imagesServiceSpy = jasmine.createSpyObj(
      'ProductMultiDimensionalSelectorImagesService',
      ['getVariantOptionImage']
    );

    TestBed.configureTestingModule({
      providers: [
        ProductMultiDimensionalSelectorService,
        {
          provide: ProductMultiDimensionalSelectorImagesService,
          useValue: imagesServiceSpy,
        },
      ],
    });

    service = TestBed.inject(ProductMultiDimensionalSelectorService);
    imagesService = TestBed.inject(
      ProductMultiDimensionalSelectorImagesService
    ) as jasmine.SpyObj<ProductMultiDimensionalSelectorImagesService>;
  });

  describe('getVariants', () => {
    it('should return an empty array if product has no variantMatrix', () => {
      const product: Product = {};

      const result = service.getVariants(product);

      expect(result).toEqual([]);
    });

    it('should return variant categories based on the product variantMatrix and selected options', () => {
      const product: Product = {
        variantMatrix: [
          {
            parentVariantCategory: { name: 'Color' },
            variantValueCategory: { name: 'Blue' },
            variantOption: { code: 'Blue', variantOptionQualifiers: [] },
            elements: [
              {
                parentVariantCategory: { name: 'Size' },
                variantValueCategory: { name: 'Large' },
                variantOption: { code: 'Large', variantOptionQualifiers: [] },
                elements: [],
              },
            ],
          },
        ],
        categories: [{ code: 'B2C_Blue' }],
        code: 'Blue',
      };
      imagesService.getVariantOptionImage.and.returnValue(undefined);

      const result = service.getVariants(product);

      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Color');
      expect(result[0].variantOptions.length).toBe(1);
      expect(result[0].variantOptions[0].value).toBe('Blue');
    });
  });

  describe('checkIfEveryOptionHasImages', () => {
    it('should return variant categories with updated image information', () => {
      const variantCategories: VariantCategoryGroup[] = [
        {
          name: 'Color',
          variantOptions: [{ value: 'Blue', code: 'blue' }],
          hasImages: true,
        },
      ];

      const result = service['checkIfEveryOptionHasImages'](variantCategories);

      expect(result[0].hasImages).toBe(false);
    });
  });

  describe('createVariantOptionCategory', () => {
    it('should create a variant option category from a variant matrix element', () => {
      const element: VariantMatrixElement = {
        variantValueCategory: { name: 'Blue' },
        variantOption: { code: 'Blue_code', variantOptionQualifiers: [] },
        elements: [],
      };
      imagesService.getVariantOptionImage.and.returnValue(undefined);

      const result = service['createVariantOptionCategory'](element);

      expect(result.value).toBe('Blue');
      expect(result.code).toBe('Blue_code');
      expect(result.image).toEqual(undefined);
    });

    it('should handle elements without values', () => {
      const element: VariantMatrixElement = {
        variantValueCategory: undefined,
        variantOption: { code: undefined, variantOptionQualifiers: undefined },
        elements: [],
      };
      imagesService.getVariantOptionImage.and.returnValue(undefined);

      const result = service['createVariantOptionCategory'](element);

      expect(result.value).toBe('');
      expect(result.code).toBe('');
      expect(result.image).toEqual(undefined);
    });
  });

  describe('createVariantCategoryGroup', () => {
    it('should create a variant category group from variant matrix elements', () => {
      const elements: VariantMatrixElement[] = [
        {
          parentVariantCategory: { name: 'Color', hasImage: true },
          variantValueCategory: { name: 'Blue' },
          variantOption: { code: 'Blue_code', variantOptionQualifiers: [] },
          elements: [],
        },
      ];

      const result = service['createVariantCategoryGroup'](elements);

      expect(result.name).toBe('Color');
      expect(result.variantOptions).toEqual([]);
      expect(result.hasImages).toBe(true);
    });

    it('should handle empty elements array', () => {
      const elements: VariantMatrixElement[] = [];

      const result = service['createVariantCategoryGroup'](elements);

      expect(result.name).toBe('');
      expect(result.variantOptions).toEqual([]);
      expect(result.hasImages).toBe(false);
    });
  });
});
