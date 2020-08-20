import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BAddress, Occ, OccEndpointsService } from '@spartacus/core';
import { OccOrgUnitAddressNormalizer } from './occ-org-unit-address-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}
describe('OccOrgUnitAddressNormalizer', () => {
  let service: OccOrgUnitAddressNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitAddressNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.get(
      OccOrgUnitAddressNormalizer as Type<OccOrgUnitAddressNormalizer>
    );
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BAddress = { id: 'adrId1' };

  describe('convert', () => {
    it('convert Occ.B2BAddressList to EntitiesModel<B2BAddress>', () => {
      let target: B2BAddress;
      target = service.convert(source);

      expect(target.id).toEqual(source.id);
    });
  });
});
