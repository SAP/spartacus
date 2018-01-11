import { TestBed, inject } from '@angular/core/testing';
import { ProductImageConverterService } from './product-image-converter.service';

describe('ProductImageConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductImageConverterService]
    });
  });

  it(
    'should ...',
    inject(
      [ProductImageConverterService],
      (service: ProductImageConverterService) => {
        expect(service).toBeTruthy();
      }
    )
  );
});
