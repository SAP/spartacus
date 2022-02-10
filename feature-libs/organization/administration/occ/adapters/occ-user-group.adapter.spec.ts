import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  B2B_USERS_NORMALIZER,
  PERMISSIONS_NORMALIZER,
  USER_GROUPS_NORMALIZER,
  USER_GROUP_NORMALIZER,
  USER_GROUP_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { OccUserGroupAdapter } from './occ-user-group.adapter';

import createSpy = jasmine.createSpy;

const userGroupId = 'testUid';
const permissionUid = 'permissionUid';
const memberUid = 'memberUid';
const userId = 'userId';
const userGroup = {
  uid: userGroupId,
  name: 'testUserGroup',
};
const permission = {
  uid: permissionUid,
};
const member = {
  uid: memberUid,
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { userGroupId } }) =>
      url === 'userGroup' ? url + userGroupId : url
  );
}

describe('OccUserGroupAdapter', () => {
  let service: OccUserGroupAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserGroupAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(
      ConverterService as Type<ConverterService>
    );
    service = TestBed.inject(OccUserGroupAdapter as Type<OccUserGroupAdapter>);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load userGroup details', () => {
    it('should load userGroup details for given userGroup uid', () => {
      service.load(userId, userGroupId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'userGroup' + userGroupId
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(userGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        USER_GROUP_NORMALIZER
      );
    });
  });

  describe('load userGroup list', () => {
    it('should load userGroup list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'userGroups'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([userGroup]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        USER_GROUPS_NORMALIZER
      );
    });
  });

  describe('create userGroup', () => {
    it('should create userGroup', () => {
      service.create(userId, userGroup).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        userGroup,
        USER_GROUP_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'userGroups' &&
          req.body.uid === userGroup.uid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(userGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        USER_GROUP_NORMALIZER
      );
    });
  });

  describe('update userGroup', () => {
    it('should update userGroup', () => {
      service.update(userId, userGroupId, userGroup).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        userGroup,
        USER_GROUP_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'PATCH' &&
          req.url === 'userGroup' + userGroupId &&
          req.body.uid === userGroup.uid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(userGroup);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        USER_GROUP_NORMALIZER
      );
    });
  });

  describe('delete userGroup', () => {
    it('should delete userGroup', () => {
      service.delete(userId, userGroupId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'DELETE' && req.url === 'userGroup' + userGroupId
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('load members list for userGroup', () => {
    it('should load members list for userGroup', () => {
      service.loadAvailableOrgCustomers(userId, userGroupId, {}).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' && req.url === 'userGroupAvailableOrgCustomers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([member]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USERS_NORMALIZER
      );
    });
  });

  describe('assignMember to userGroup', () => {
    it('should assign member to userGroup', () => {
      service.assignMember(userId, userGroupId, memberUid).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'userGroupMembers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('unassignMember from userGroup', () => {
    it('should unassign member from userGroup', () => {
      service.unassignMember(userId, userGroupId, memberUid).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'userGroupMember'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('unassignAllMembers from userGroup', () => {
    it('should unassign all members from userGroup', () => {
      service.unassignAllMembers(userId, userGroupId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'userGroupMembers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('load permissions list for userGroup', () => {
    it('should load permissions list for userGroup', () => {
      service
        .loadAvailableOrderApprovalPermissions(userId, userGroupId, {})
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url === 'userGroupAvailableOrderApprovalPermissions'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([permission]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSIONS_NORMALIZER
      );
    });
  });

  describe('assignOrderApprovalPermission to userGroup', () => {
    it('should assign permission to userGroup', () => {
      service
        .assignOrderApprovalPermission(userId, userGroupId, permissionUid)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'userGroupOrderApprovalPermissions'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });

  describe('unassignOrderApprovalPermission from userGroup', () => {
    it('should unassign permission from userGroup', () => {
      service
        .unassignOrderApprovalPermission(userId, userGroupId, permissionUid)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'DELETE' &&
          req.url === 'userGroupOrderApprovalPermission'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({});
    });
  });
});
