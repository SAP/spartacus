import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  Address,
  ADDRESS_LIST_NORMALIZER,
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  ConverterService,
  OccEndpointsService,
  SearchConfig,
} from '@spartacus/core';
import {
  B2BUNIT_APPROVAL_PROCESSES_NORMALIZER,
  B2BUNIT_NODE_LIST_NORMALIZER,
  B2BUNIT_NODE_NORMALIZER,
  B2BUNIT_NORMALIZER,
  B2BUNIT_SERIALIZER,
  B2B_USERS_NORMALIZER,
} from '@spartacus/organization/administration/core';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';
import createSpy = jasmine.createSpy;

const orgUnitId = 'testId';
const userId = 'userId';
const orgUnit = {
  id: orgUnitId,
  name: 'testOrgUnit',
};
const roleId = 'testRoleId';
const params: SearchConfig = { sort: 'code' };
const orgCustomerId = 'testCustomerId';
const address: Address = { id: 'testAddressId' };
const addressId: string = address.id;

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { orgUnitId } }) =>
      url === 'orgUnit' ? url + orgUnitId : url
  );
}

describe('OccOrgUnitAdapter', () => {
  let service: OccOrgUnitAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrgUnitAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccOrgUnitAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load orgUnit details', () => {
    it('should load orgUnit details for given orgUnit id', () => {
      service.load(userId, orgUnitId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnit' + orgUnitId
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });

  describe('load orgUnit list', () => {
    it('should load orgUnit list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnitsAvailable'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgUnit]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NODE_LIST_NORMALIZER
      );
    });
  });

  describe('create orgUnit', () => {
    it('should create orgUnit', () => {
      service.create(userId, orgUnit).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'orgUnits' &&
          req.body.id === orgUnit.id
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });

  describe('update orgUnit', () => {
    it('should update orgUnit', () => {
      service.update(userId, orgUnitId, orgUnit).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        orgUnit,
        B2BUNIT_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'PATCH' &&
          req.url === 'orgUnit' + orgUnitId &&
          req.body.id === orgUnit.id
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });

  describe('load tree', () => {
    it('should load tree', () => {
      service.loadTree(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnitsTree'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NODE_NORMALIZER
      );
    });
  });

  describe('load approval processes', () => {
    it('should load approval processes', () => {
      service.loadApprovalProcesses(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnitsApprovalProcesses'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_APPROVAL_PROCESSES_NORMALIZER
      );
    });
  });

  describe('load users', () => {
    it('should load users', () => {
      service.loadUsers(userId, orgUnitId, roleId, params).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnitUsers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2B_USERS_NORMALIZER
      );
    });
  });

  describe('Assign Role', () => {
    it('should assign role', () => {
      service.assignRole(userId, orgCustomerId, roleId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'orgUnitUserRoles'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
    });
  });

  describe('Unassign Role', () => {
    it('should unassign role', () => {
      service.unassignRole(userId, orgCustomerId, roleId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'orgUnitUserRole'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
    });
  });

  describe('Assign Approver', () => {
    it('should assign approver', () => {
      service
        .assignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'POST' && req.url === 'orgUnitApprovers'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
    });
  });

  describe('Unassign Approver', () => {
    it('should unassign approver', () => {
      service
        .unassignApprover(userId, orgUnitId, orgCustomerId, roleId)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'orgUnitApprover'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
    });
  });

  describe('load addresses', () => {
    it('should load addresses', () => {
      service.loadAddresses(userId, orgUnitId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orgUnitsAddresses'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ADDRESS_LIST_NORMALIZER
      );
    });
  });

  describe('create address', () => {
    it('should create address', () => {
      service.createAddress(userId, orgUnitId, address).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        address,
        ADDRESS_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'orgUnitsAddresses' &&
          req.body.id === address.id
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ADDRESS_NORMALIZER
      );
    });
  });

  describe('update address', () => {
    it('should update address', () => {
      service.updateAddress(userId, orgUnitId, addressId, address).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        address,
        ADDRESS_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'PATCH' && req.url === 'orgUnitsAddress'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ADDRESS_NORMALIZER
      );
    });
  });

  describe('delete address', () => {
    it('should delete address', () => {
      service.deleteAddress(userId, orgUnitId, addressId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'DELETE' && req.url === 'orgUnitsAddress'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ADDRESS_NORMALIZER
      );
    });
  });
});
