import { TestBed, inject } from '@angular/core/testing';
import { ProductReferenceConverterService } from './product-reference-converter.service';

describe('ProductReferenceConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductReferenceConverterService]
    });
  });

  it(
    'should ...',
    inject(
      [ProductReferenceConverterService],
      (service: ProductReferenceConverterService) => {
        expect(service).toBeTruthy();
      }
    )
  );
});
