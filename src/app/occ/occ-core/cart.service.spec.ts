import { TestBed, inject } from '@angular/core/testing';
import { OccCartService } from './cart.service';

describe('CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OccCartService]
    });
  });

  it('should ...', inject([OccCartService], (service: OccCartService) => {
    expect(service).toBeTruthy();
  }));
});
