import { TestBed } from '@angular/core/testing';

import { StorefinderService } from './storefinder.service';

describe('StorefinderService', () => {
  let service: StorefinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorefinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
