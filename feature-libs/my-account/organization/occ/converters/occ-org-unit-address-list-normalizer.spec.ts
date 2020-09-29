import { TestBed } from '@angular/core/testing';
import {
  Address,
  EntitiesModel,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { OccOrgUnitAddressListNormalizer } from './occ-org-unit-address-list-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitAddressListNormalizer', () => {
  let service: OccOrgUnitAddressListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitAddressListNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccOrgUnitAddressListNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BAddressList = {
    addresses: [{ id: 'adrId1' }, { id: 'adrId2' }],
  };

  describe('convert', () => {
    it('convert Occ.B2BAddressList to EntitiesModel<B2BAddress>', () => {
      let target: EntitiesModel<Address>;
      target = service.convert(source);

      expect(target.values.length).toEqual(source.addresses.length);
    });
  });
});
