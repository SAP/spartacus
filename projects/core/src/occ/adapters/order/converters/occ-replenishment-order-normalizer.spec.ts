import { TestBed, waitForAsync } from '@angular/core/testing';
import { ORDER_ENTRY_PROMOTIONS_NORMALIZER } from '../../../../cart/connectors/cart/converters';
import { Product } from '../../../../model/product.model';
import { PRODUCT_NORMALIZER } from '../../../../product/connectors/product/converters';
import { ConverterService } from '../../../../util/converter.service';
import { OccReplenishmentOrderNormalizer } from './occ-replenishment-order-normalizer';

class MockConverterService {
  convert() {}
}

const product = { code: 'test1' };
const order = {
  entries: [{ entryNumber: 0, product }],
};

describe('OccReplenishmentOrderNormalizer', () => {
  let normalizer: OccReplenishmentOrderNormalizer;
  let converter: ConverterService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          OccReplenishmentOrderNormalizer,
          {
            provide: ConverterService,
            useClass: MockConverterService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    normalizer = TestBed.inject(OccReplenishmentOrderNormalizer);
    converter = TestBed.inject(ConverterService);

    spyOn(converter, 'convert')
      .withArgs(product, PRODUCT_NORMALIZER)
      .and.returnValue({
        ...product,
        code: (product as Product).code + 'converted',
      } as any)
      .withArgs(order, ORDER_ENTRY_PROMOTIONS_NORMALIZER)
      .and.returnValue([
        { entryNumber: 0, promotions: [{ description: 'tested Promotion' }] },
      ]);
  });

  it('should create', () => {
    expect(normalizer).toBeTruthy();
  });

  it('should convert order entries', () => {
    const result = normalizer.convert(order);
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
});
