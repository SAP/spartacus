import { TestBed } from '@angular/core/testing';
import { B2BUnitNode, Occ, OccEndpointsService } from '@spartacus/core';
import { OccOrgUnitNodeListNormalizer } from './occ-org-unit-node-list-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitNodeListNormalizer', () => {
  let service: OccOrgUnitNodeListNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitNodeListNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccOrgUnitNodeListNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BUnitNodeList = {
    unitNodes: [{ id: 'unitNode1' }, { id: 'unitNode2' }],
  };

  describe('convert', () => {
    it('convert Occ.B2BUnitNodeList to B2BUnitNode[]', () => {
      let target: B2BUnitNode[];
      target = service.convert(source);

      expect(target.length).toEqual(source.unitNodes.length);
    });
  });
});
