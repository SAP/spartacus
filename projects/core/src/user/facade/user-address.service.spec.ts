import { TestBed } from '@angular/core/testing';

import { UserAddressService } from './user-address.service';

describe('UserAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAddressService = TestBed.get(UserAddressService);
    expect(service).toBeTruthy();
  });
});
