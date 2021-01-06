import { TestBed } from '@angular/core/testing';

import { TmsService } from './tms.service';

describe('TmsService', () => {
  let service: TmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
