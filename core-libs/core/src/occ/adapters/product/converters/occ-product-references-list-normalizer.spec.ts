import { TestBed } from '@angular/core/testing';
import { ProductReference } from '../../../../model/product.model';
import { ConverterService } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import { OccProductReferencesListNormalizer } from './occ-product-references-list-normalizer';
import createSpy = jasmine.createSpy;

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: Occ.ProductReferenceList = {
  references: [
    {
      target: { images: [] },
    },
  ],
};

const mockTarget: ProductReference[] = [
  {
    target: { images: {} },
  },
];

describe('OccProductReferencesListNormalizer', () => {
  let normalizer: OccProductReferencesListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        OccProductReferencesListNormalizer,
      ],
    });

    normalizer = TestBed.inject(OccProductReferencesListNormalizer);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const converter = TestBed.inject(ConverterService);
    const result = normalizer.convert(mockSource, mockTarget);
    const expected = [{ target: { images: ['images'] } }] as any;

    expect(result).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });
});
