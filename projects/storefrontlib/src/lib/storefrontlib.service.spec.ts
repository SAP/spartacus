import { TestBed, inject } from '@angular/core/testing';

import { StorefrontlibService } from './storefrontlib.service';

describe('StorefrontlibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorefrontlibService]
    });
  });

  it('should be created', inject([StorefrontlibService], (service: StorefrontlibService) => {
    expect(service).toBeTruthy();
  }));
});
