import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  B2BUser,
  ConverterService,
  OccEndpointsService,
  SearchConfig,
} from '@spartacus/core';
import {
  B2B_USERS_NORMALIZER,
  B2B_USER_NORMALIZER,
  PERMISSIONS_NORMALIZER,
  USER_GROUPS_NORMALIZER,
  B2B_USER_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { OccB2BUserAdapter } from './occ-b2b-users.adapter';

import createSpy = jasmine.createSpy;

const userId = 'userId';
const orgCustomerId = 'orgCustomerId';
const orgCustomer: B2BUser = {
  active: true,
  uid: orgCustomerId,
  name: 'test',
};
const approverId = 'approverId';
const permissionId = 'permissionId';
const userGroupId = 'userGroupId';
const params: SearchConfig = { sort: 'code' };

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { userId } }) =>
      url === 'b2bUser' ? `${url}/${userId}` : url
  );
}

describe('OccB2BUserAdapter', () => {
  let service: OccB2BUserAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccB2BUserAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(
      ConverterService as Type<ConverterService>
    );
    service = TestBed.inject(OccB2BUserAdapter as Type<OccB2BUserAdapter>);
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

  describe('load B2B User details', () => {
    it('should load B2B User details for given userId uid and orgUnitCustomerId', () => {
      service.load(userId, orgCustomerId).subscribe();
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === `b2bUser/${userId}`;
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USER_NORMALIZER
      );
    });
  });

  describe('load B2B User list', () => {
    it('should load B2B User list', () => {
      service.loadList(userId, params).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'b2bUsers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USERS_NORMALIZER
      );
    });
  });

  describe('create B2BUser', () => {
    it('should create B2BUser', () => {
      service.create(userId, orgCustomer).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        orgCustomer,
        B2B_USER_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'b2bUsers' &&
          req.body.uid === orgCustomer.uid
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USER_NORMALIZER
      );
    });
  });

  describe('update B2BUser', () => {
    it('should update B2BUser', () => {
      service.update(userId, orgCustomerId, orgCustomer).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        orgCustomer,
        B2B_USER_SERIALIZER
      );
      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PATCH' &&
          req.url === `b2bUser/${userId}` &&
          req.body.uid === orgCustomer.uid
        );
      });
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USER_NORMALIZER
      );
    });
  });

  describe('loadApprovers', () => {
    it('should load approvers', () => {
      service.loadApprovers(userId, orgCustomerId, params).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'b2bUserApprovers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USERS_NORMALIZER
      );
    });
  });

  describe('assign approver', () => {
    it('should assign approver', () => {
      service.assignApprover(userId, orgCustomerId, approverId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'b2bUserApprover'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
    });
  });

  describe('unassign approver', () => {
    it('should unassign approver', () => {
      service.unassignApprover(userId, orgCustomerId, approverId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'b2bUserApprover'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
    });
  });

  describe('loadPermissions', () => {
    it('should load permissions', () => {
      service.loadPermissions(userId, orgCustomerId, params).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'b2bUserPermissions'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSIONS_NORMALIZER
      );
    });
  });

  describe('assign permission', () => {
    it('should assign permission', () => {
      service.assignPermission(userId, orgCustomerId, permissionId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'b2bUserPermission'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
    });
  });

  describe('unassign permission', () => {
    it('should unassign permission', () => {
      service
        .unassignPermission(userId, orgCustomerId, permissionId)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'b2bUserPermission'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
    });
  });

  describe('loadList', () => {
    it('should load user groups', () => {
      service.loadUserGroups(userId, orgCustomerId, params).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'b2bUserUserGroups'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgCustomer]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        USER_GROUPS_NORMALIZER
      );
    });
  });

  describe('assign UserGroup', () => {
    it('should assign UserGroup', () => {
      service.assignUserGroup(userId, orgCustomerId, userGroupId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'b2bUserUserGroup'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
    });
  });

  describe('unassign UserGroup', () => {
    it('should unassign UserGroup', () => {
      service.unassignUserGroup(userId, orgCustomerId, userGroupId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'b2bUserUserGroup'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgCustomer);
    });
  });
});
