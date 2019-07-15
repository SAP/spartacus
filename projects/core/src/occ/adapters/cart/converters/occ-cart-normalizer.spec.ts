import { TestBed } from '@angular/core/testing';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccCartNormalizer } from './occ-cart-normalizer';

describe('OccCartNormalizer', () => {
  let service: OccCartNormalizer;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccCartNormalizer],
    });

    service = TestBed.get(OccCartNormalizer);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'convert').and.callFake(product => ({
      ...product,
      code: product.code + 'converted',
    }));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert cart entries', () => {
    const product = { code: 'test1' };
    const cart = {
      entries: [{ product }],
    };
    const result = service.convert(cart);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });

  it('should not contain duplicated pomotions', () => {
    const cart = {
      guid: '17',
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
    const result = service.convert(cart);
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
