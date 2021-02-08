import { TestBed } from '@angular/core/testing';
import { B2BApprovalProcess, Occ, OccEndpointsService } from '@spartacus/core';
import { OccOrgUnitApprovalProcessNormalizer } from './occ-org-unit-approval-processes-normalizer';

import createSpy = jasmine.createSpy;

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitApprovalProcessNormalizer', () => {
  let service: OccOrgUnitApprovalProcessNormalizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccOrgUnitApprovalProcessNormalizer,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.inject(OccOrgUnitApprovalProcessNormalizer);
  });

  afterEach(() => {});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const source: Occ.B2BApprovalProcessList = {
    approvalProcesses: [{ code: 'ap1' }, { code: 'ap2' }],
  };

  describe('convert', () => {
    it('convert Occ.B2BApprovalProcessList to B2BApprovalProcess[]', () => {
      let target: B2BApprovalProcess[];
      target = service.convert(source);

      expect(target.length).toEqual(source.approvalProcesses.length);
    });
  });
});
