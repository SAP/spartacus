import { TestBed, inject } from '@angular/core/testing';

import { CxApiService } from './cx-api.service';

describe('CxApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CxApiService]
    });
  });

  it('should be created', inject([CxApiService], (service: CxApiService) => {
    expect(service).toBeTruthy();
  }));
});
