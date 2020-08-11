import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { OccB2BUserNormalizer } from './occ-b2b-user-normalizer';
import { Occ, OccConfig, B2BUser } from '@spartacus/core';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },
};

describe('B2BUserNormalizer', () => {
  let service: OccB2BUserNormalizer;
  const orgCustomerId = 'orgCustomerId';
  const orgCustomer: Occ.B2BUser = {
    active: true,
    uid: orgCustomerId,
  };

  const convertedOrgCustomer: B2BUser = {
    active: true,
    uid: orgCustomerId,
    email: orgCustomerId,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccB2BUserNormalizer,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccB2BUserNormalizer as Type<OccB2BUserNormalizer>);
  });

  it('should inject OccB2BUserNormalizer', inject(
    [OccB2BUserNormalizer],
    (b2bUserNormalizer: OccB2BUserNormalizer) => {
      expect(b2bUserNormalizer).toBeTruthy();
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
});
