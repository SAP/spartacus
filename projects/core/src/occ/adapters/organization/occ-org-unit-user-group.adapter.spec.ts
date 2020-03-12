import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  ORG_UNIT_USER_GROUP_NORMALIZER,
  ORG_UNIT_USER_GROUPS_NORMALIZER,
} from '@spartacus/core';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccOrgUnitUserGroupAdapter } from './occ-org-unit-user-group.adapter';

import createSpy = jasmine.createSpy;

const orgUnitUserGroupUid = 'testUid';
const userId = 'userId';
const orgUnitUserGroup = {
  uid: orgUnitUserGroupUid,
  name: 'testOrgUnitUserGroup',
};

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitUserGroupUid }) =>
      url === 'orgUnitUserGroup' ? url + orgUnitUserGroupUid : url
  );
}

describe('OccOrgUnitUserGroupAdapter', () => {
  let service: OccOrgUnitUserGroupAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrgUnitUserGroupAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(
      ConverterService as Type<ConverterService>
    );
    service = TestBed.inject(
      OccOrgUnitUserGroupAdapter as Type<OccOrgUnitUserGroupAdapter>
    );
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load orgUnitUserGroup details', () => {
    it('should load orgUnitUserGroup details for given orgUnitUserGroup uid', () => {
      service.load(userId, orgUnitUserGroupUid).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'GET' &&
          req.url === 'orgUnitUserGroup' + orgUnitUserGroupUid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnitUserGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORG_UNIT_USER_GROUP_NORMALIZER
      );
    });
  });

  describe('load orgUnitUserGroup list', () => {
    it('should load orgUnitUserGroup list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'orgUnitUserGroups'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgUnitUserGroup]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORG_UNIT_USER_GROUPS_NORMALIZER
      );
    });
  });

  describe('create orgUnitUserGroup', () => {
    it('should create orgUnitUserGroup', () => {
      service.create(userId, orgUnitUserGroup).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'POST' &&
          req.url === 'orgUnitUserGroups' &&
          req.body.uid === orgUnitUserGroup.uid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnitUserGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORG_UNIT_USER_GROUP_NORMALIZER
      );
    });
  });

  describe('update orgUnitUserGroup', () => {
    it('should update orgUnitUserGroup', () => {
      service.update(userId, orgUnitUserGroupUid, orgUnitUserGroup).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'PATCH' &&
          req.url === 'orgUnitUserGroup' + orgUnitUserGroupUid &&
          req.body.uid === orgUnitUserGroup.uid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnitUserGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORG_UNIT_USER_GROUP_NORMALIZER
      );
    });
  });

  describe('delete orgUnitUserGroup', () => {
    it('should delete orgUnitUserGroup', () => {
      service.delete(userId, orgUnitUserGroupUid).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'DELETE' &&
          req.url === 'orgUnitUserGroup' + orgUnitUserGroupUid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });
});
