import { TestBed } from '@angular/core/testing';

import { CdpLoginService } from './cdp-login.service';

describe('CdpLoginService', () => {
  let service: CdpLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdpLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
