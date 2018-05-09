import { TestBed, inject } from '@angular/core/testing';
import { ProductReferenceConverterService } from './product-reference-converter.service';

describe('ProductReferenceConverterService', () => {
  let service: ProductReferenceConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductReferenceConverterService]
    });

    service = TestBed.get(ProductReferenceConverterService);
  });

  it(
    'should inject ProductReferenceConverterService',
    inject(
      [ProductReferenceConverterService],
      (productReferenceConverterService: ProductReferenceConverterService) => {
        expect(productReferenceConverterService).toBeTruthy();
      }
    )
  );

  it('should convert product reference', () => {
    // no idea what is the reference data
  });
});
