import { TestBed } from '@angular/core/testing';
import { CartModificationList } from '@spartacus/cart/base/root';
import { ConverterService, Occ } from '@spartacus/core';
import { OccReorderOrderNormalizer } from './occ-reorder-order-normalizer';

class MockConverterService {
  convert() {}
}

const mockCartModificationsList: CartModificationList = {
  cartModifications: [],
};

describe('OccReorderOrderNormalizer', () => {
  let normalizer: OccReorderOrderNormalizer;
  let converter: ConverterService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        OccReorderOrderNormalizer,
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
      ],
    });
  });

  beforeEach(() => {
    normalizer = TestBed.inject(OccReorderOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    vi.spyOn(converter, 'convert');
  });

  it('should create', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert cart modification list', () => {
    const occCartModificationList: Occ.CartModificationList = {
      cartModifications: [],
    };
    const returnRequest = normalizer.convert(occCartModificationList);
    expect(returnRequest).toEqual(mockCartModificationsList);
  });
});
