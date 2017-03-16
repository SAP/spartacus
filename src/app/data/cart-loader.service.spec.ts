import { TestBed, inject } from '@angular/core/testing';
import { CartLoaderService } from './cart-loader.service';

describe('CartLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartLoaderService]
    });
  });

  it('should ...', inject([CartLoaderService], (service: CartLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
