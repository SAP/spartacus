import { TestBed } from '@angular/core/testing';

import { FeatureModulesService } from './feature-modules.service';

describe('FeatureModulesService', () => {
  let service: FeatureModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
