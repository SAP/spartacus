import { TestBed, inject } from '@angular/core/testing';
import { ProductModelService } from './product-model.service';

describe('ProductModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductModelService]
    });
  });

  it('should ...', inject([ProductModelService], (service: ProductModelService) => {
    expect(service).toBeTruthy();
  }));
});
