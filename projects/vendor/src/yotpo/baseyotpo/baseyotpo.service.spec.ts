import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseyotpoService } from './baseyotpo.service';

describe('BaseyotpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseyotpoService = TestBed.get(BaseyotpoService);
    expect(service).toBeTruthy();
  });
});