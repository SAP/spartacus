import { TestBed } from '@angular/core/testing';

import { NormalizersService } from './normalizers.service';

describe('NormalizersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NormalizersService = TestBed.get(NormalizersService);
    expect(service).toBeTruthy();
  });
});
