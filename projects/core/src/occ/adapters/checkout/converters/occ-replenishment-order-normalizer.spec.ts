import { async, TestBed } from '@angular/core/testing';
import { Product } from '../../../../model/product.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccReplenishmentOrderNormalizer } from './occ-replenishment-order-normalizer';

class MockConverterService {
  convert() {}
}

describe('OccReplenishmentOrderNormalizer', () => {
  let normalizer: OccReplenishmentOrderNormalizer;
  let converter: ConverterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OccReplenishmentOrderNormalizer,
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
      ],
    });
  }));

  beforeEach(() => {
    normalizer = TestBed.inject(OccReplenishmentOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert').and.callFake(
      (product) =>
        ({
          ...product,
          code: (product as Product).code + 'converted',
        } as any)
    );
  });

  it('should create', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert order entries', () => {
    const product = { code: 'test1' };
    const order = {
      entries: [{ product }],
    };
    const result = normalizer.convert(order);
    expect(result.entries[0].product.code).toBe('test1converted');
    expect(converter.convert).toHaveBeenCalledWith(product, PRODUCT_NORMALIZER);
  });
});
