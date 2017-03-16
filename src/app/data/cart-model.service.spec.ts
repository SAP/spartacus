import { TestBed, inject } from '@angular/core/testing';
import { CartModelService } from './cart-model.service';

describe('CartModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartModelService]
    });
  });

  it('should ...', inject([CartModelService], (service: CartModelService) => {
    expect(service).toBeTruthy();
  }));
});
