import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { B2BUnit, Occ, OccEndpointsService } from '@spartacus/core';
import { OccOrgUnitNormalizer } from './occ-org-unit-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitNormalizer', () => {
  let service: OccOrgUnitNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.get(OccOrgUnitNormalizer as Type<OccOrgUnitNormalizer>);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BUnit = {
    uid: 'unit1',
  };

  describe('convert', () => {
    it('convert Occ.B2BUnit to B2BUnit', () => {
      let target: B2BUnit;
      target = service.convert(source);

      expect(target.uid).toEqual(source.uid);
    });
  });
});
