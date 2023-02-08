import { TestBed } from '@angular/core/testing';

import { CdpLoginComponentService } from './cdp-login-component.service';

describe('CdpLoginService', () => {
  let service: CdpLoginComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdpLoginComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
