import { TestBed } from '@angular/core/testing';
import { ProductReferenceList } from '../../../occ/occ-models/';
import { ConverterService } from '../../../util/converter.service';
import { UIProductReference } from '../../model';
import { OccProductReferencesListNormalizer } from './occ-product-references-list-normalizer';
import createSpy = jasmine.createSpy;

class MockConverterService {
  convert = createSpy('ConverterService.convert').and.returnValue({
    images: ['images'],
  });
}

const mockSource: ProductReferenceList = {
  references: [
    {
      target: { images: [] },
    },
  ],
};

const mockTarget: UIProductReference[] = [
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

    normalizer = TestBed.get(OccProductReferencesListNormalizer);
  });

  it('should inject ProductImageConverterService', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should apply product image normalizer to products', () => {
    const converter = TestBed.get(ConverterService);
    const result = normalizer.convert(mockSource, mockTarget);
    const expected = [{ target: { images: ['images'] } }] as any;

    expect(result).toEqual(expected);
    expect(converter.convert).toHaveBeenCalled();
  });
});
