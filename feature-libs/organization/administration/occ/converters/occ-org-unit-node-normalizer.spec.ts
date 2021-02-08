import { TestBed } from '@angular/core/testing';
import { Occ, OccEndpointsService } from '@spartacus/core';
import { B2BUnitNode } from '@spartacus/organization/administration/core';
import { OccOrgUnitNodeNormalizer } from './occ-org-unit-node-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitNodeNormalizer', () => {
  let service: OccOrgUnitNodeNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitNodeNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccOrgUnitNodeNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BUnitNode = {
    id: 'unitNode1',
  };

  describe('convert', () => {
    it('convert Occ.B2BUnitNode to B2BUnitNode', () => {
      let target: B2BUnitNode;
      target = service.convert(source);

      expect(target.id).toEqual(source.id);
    });
  });
});
