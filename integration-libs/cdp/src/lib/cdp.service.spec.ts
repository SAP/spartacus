import { TestBed } from '@angular/core/testing';

import { CdpService } from './cdp.service';

describe('CdpService', () => {
  let service: CdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
