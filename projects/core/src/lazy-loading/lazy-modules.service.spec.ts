import { TestBed } from '@angular/core/testing';

import { LazyModulesService } from './lazy-modules.service';

describe('LazyModulesService', () => {
  let service: LazyModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyModulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
