import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YotpoService } from './baseyotpo.service';

describe('YotpoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YotpoService = TestBed.get(YotpoService);
    expect(service).toBeTruthy();
  });
});
