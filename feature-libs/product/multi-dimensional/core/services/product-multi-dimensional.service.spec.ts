import { TestBed } from '@angular/core/testing';
import { ProductMultiDimensionalService } from './product-multi-dimensional.service';
import {
  Product,
  VariantMatrixElement,
  VariantOption,
  VariantOptionQualifier,
} from 'projects/core/src/model';

interface Leaf {
  variantMatrixElement: VariantMatrixElement;
  variantOptionQualifiers: VariantOptionQualifier[];
}

describe('VariantsMultiDimensionalService', () => {
  let service: ProductMultiDimensionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMultiDimensionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVariants', () => {
    it('should return empty array if product or variantMatrix is not defined', () => {
      const product: Product = { baseOptions: [] } as Product;
      const variants = service.getVariants(product);
      expect(variants).toEqual([]);
    });

    it('should return grouped variants by category', () => {
      const product: Product = {
        baseOptions: [
          {
            options: [
              {
                code: 'option1',
                variantOptionQualifiers: [{ qualifier: 'color', value: 'red' }],
              },
            ],
            selected: {
              variantOptionQualifiers: [{ qualifier: 'color', value: 'red' }],
            },
          },
        ],
        variantMatrix: [
          {
            elements: [],
            variantOption: {
              code: 'option1',
              variantOptionQualifiers: [{ qualifier: 'color', value: 'red' }],
            },
          },
        ],
      } as Product;

      const variants = service.getVariants(product);
      expect(variants.length).toBe(1);
      expect(variants[0].name).toBe('color');
      expect(variants[0].categoryVariants.length).toBe(1);
    });
  });

  describe('groupVariantsByCategory', () => {
    it('should group variants by category', () => {
      const options = [
        {
          qualifier: 'color',
          qualifiers: [
            { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
          ],
        },
      ];
      const leafElements: Leaf[] = [
        {
          variantMatrixElement: {
            variantOption: { code: 'option1' },
          } as VariantMatrixElement,
          variantOptionQualifiers: [
            { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
          ],
        },
      ];
      const selectedVariants = [
        { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
      ];

      const groupedVariants = service.groupVariantsByCategory(
        options,
        leafElements,
        selectedVariants
      );
      expect(groupedVariants.length).toBe(1);
      expect(groupedVariants[0].name).toBe('color');
      expect(groupedVariants[0].categoryVariants.length).toBe(1);
    });
  });

  describe('findLeafElements', () => {
    it('should find leaf elements in variant matrix', () => {
      const variantMatrix: VariantMatrixElement[] = [
        {
          elements: [],
          variantOption: { code: 'option1' } as VariantOption,
        },
        {
          elements: [
            {
              elements: [],
              variantOption: { code: 'option2' } as VariantOption,
            },
          ],
        },
      ];
      const variantOptions: VariantOption[] = [
        {
          code: 'option1',
          variantOptionQualifiers: [
            { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
          ],
        },
        {
          code: 'option2',
          variantOptionQualifiers: [
            { qualifier: 'size', value: 'large' } as VariantOptionQualifier,
          ],
        },
      ];

      const leafElements = service.findLeafElements(
        variantMatrix,
        variantOptions
      );
      expect(leafElements.length).toBe(2);
      expect(leafElements[0].variantOptionQualifiers[0].value).toBe('red');
      expect(leafElements[1].variantOptionQualifiers[0].value).toBe('large');
    });
  });

  describe('findAllOptions', () => {
    it('should find all options matching selected variants', () => {
      const variantOptions: VariantOption[] = [
        {
          code: 'option1',
          variantOptionQualifiers: [
            { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
          ],
        },
        {
          code: 'option2',
          variantOptionQualifiers: [
            { qualifier: 'size', value: 'large' } as VariantOptionQualifier,
          ],
        },
      ];
      const selectedVariants: VariantOptionQualifier[] = [
        { qualifier: 'color', value: 'red' } as VariantOptionQualifier,
      ];

      const options = service.findAllOptions(variantOptions, selectedVariants);
      expect(options.length).toBe(1);
      expect(options[0].qualifier).toBe('color');
      expect(options[0].qualifiers.length).toBe(1);
      expect(options[0].qualifiers[0].value).toBe('red');
    });
  });
});
