import { TestBed } from '@angular/core/testing';

import { UserConsentService } from './user-consent.service';

describe('UserConsentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserConsentService = TestBed.get(UserConsentService);
    expect(service).toBeTruthy();
  });
});
