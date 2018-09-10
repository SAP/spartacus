import { TestBed, inject } from '@angular/core/testing';

import { FeaturelibService } from './featurelib.service';

describe('FeaturelibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeaturelibService]
    });
  });

  it('should be created', inject([FeaturelibService], (service: FeaturelibService) => {
    expect(service).toBeTruthy();
  }));
});
