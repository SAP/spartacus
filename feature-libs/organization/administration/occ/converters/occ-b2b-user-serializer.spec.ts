import { inject, TestBed } from '@angular/core/testing';
import { B2BUser, Occ, OccConfig } from '@spartacus/core';
import { OccB2bUserSerializer } from './occ-b2b-user-serializer';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('B2BUserSerializer', () => {
  let service: OccB2bUserSerializer;
  const orgCustomerId = 'orgCustomerId';
  const orgCustomer: B2BUser = {
    active: true,
    uid: orgCustomerId,
    isAssignedToApprovers: true,
  };

  const convertedOrgCustomer: Occ.B2BUser = {
    active: true,
    uid: orgCustomerId,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccB2bUserSerializer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.inject(OccB2bUserSerializer);
  });

  it('should inject OccB2BUserSerializer', inject(
    [OccB2bUserSerializer],
    (b2bUserSerializer: OccB2bUserSerializer) => {
      expect(b2bUserSerializer).toBeTruthy();
    }
  ));

  it('should convert B2B User', () => {
    const result = service.convert(orgCustomer);
    expect(result).toEqual(convertedOrgCustomer);
  });

  it('should convert B2B User with applied target', () => {
    const result = service.convert(orgCustomer, {});
    expect(result).toEqual({});
  });

  it('should remove all roles for disabled B2B User', () => {
    const result = service.convert({
      active: false,
      uid: orgCustomerId,
    });
    expect(result).toEqual({
      active: false,
      uid: orgCustomerId,
      roles: [],
    });
  });
});
