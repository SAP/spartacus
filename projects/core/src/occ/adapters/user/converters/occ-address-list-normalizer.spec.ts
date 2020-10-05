import { TestBed } from '@angular/core/testing';
import {
  Address,
  EntitiesModel,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { OccAddressListNormalizer } from './occ-address-list-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccAddressListNormalizer', () => {
  let service: OccAddressListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccAddressListNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccAddressListNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.AddressList = {
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
