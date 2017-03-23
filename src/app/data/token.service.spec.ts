import { TestBed, inject } from '@angular/core/testing';
import { TokenService } from './token.service';

describe('ClientStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService]
    });
  });

  it('should ...', inject([TokenService], (service: TokenService) => {
    expect(service).toBeTruthy();
  }));
});
