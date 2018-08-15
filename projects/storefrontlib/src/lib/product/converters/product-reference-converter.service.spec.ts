import { TestBed, inject } from '@angular/core/testing';
import { ProductReferenceConverterService } from './product-reference-converter.service';

describe('ProductReferenceConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductReferenceConverterService]
    });
  });

  it('should inject ProductReferenceConverterService', inject(
    [ProductReferenceConverterService],
    (productReferenceConverterService: ProductReferenceConverterService) => {
      expect(productReferenceConverterService).toBeTruthy();
    }
  ));

  it('should convert product reference', () => {
    // no idea what is the reference data
  });
});
