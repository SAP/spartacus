import { TestBed } from '@angular/core/testing';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
import { Product } from '../../../../model/product.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccCartNormalizer } from './occ-cart-normalizer';

class MockConverterService {
  convert() {}
}

describe('OccCartNormalizer', () => {
  let occCartNormalizer: OccCartNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccCartNormalizer,
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });

    occCartNormalizer = TestBed.inject(OccCartNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callFake(function (arg: any) {
      if (arg.code) {
        return {
          ...arg,
          code: (arg as Product).code + 'converted',
        } as any;
      } else {
        return [
          {
            entryNumber: 0,
            product: arg.entries[0].product,
            promotions: [{ description: 'tested Promotion' }],
          },
        ] as any;
      }
    });
  });

  it('should be created', () => {
    expect(occCartNormalizer).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const product = { code: 'test1' };
    const cart = {
      entries: [{ entryNumber: 0, product }],
    };

    const result = occCartNormalizer.convert(cart);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(result.entries[0].promotions[0].description).toBe(
      'tested Promotion'
    );
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
    expect(converter.convert).toHaveBeenCalledWith(
      result,
      ORDER_ENTRY_PROMOTIONS_NORMALIZER
    );
  });

  it('should not contain duplicated pomotions', () => {
    const product = { code: 'test1' };
    const cart = {
      entries: [{ entryNumber: 0, product }],
      appliedOrderPromotions: [
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
        {
          consumedEntries: [],
          description: 'Buy over $200.00 get $20.00 discount on cart',
          promotion: {
            code: 'order_threshold_fixed_discount_main',
            promotionType: 'Rule Based Promotion',
          },
        },
      ],
    };
    const result = occCartNormalizer.convert(cart);
    expect(result.appliedOrderPromotions.length).toEqual(1);
    expect(result.appliedOrderPromotions).toEqual([
      {
        consumedEntries: [],
        description: 'Buy over $200.00 get $20.00 discount on cart',
        promotion: {
          code: 'order_threshold_fixed_discount_main',
          promotionType: 'Rule Based Promotion',
        },
      },
    ]);
  });
});
