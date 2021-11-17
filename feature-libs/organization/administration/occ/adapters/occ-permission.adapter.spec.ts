import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  PERMISSIONS_NORMALIZER,
  PERMISSION_NORMALIZER,
  PERMISSION_SERIALIZER,
} from '@spartacus/organization/administration/core';
import { OccPermissionAdapter } from './occ-permission.adapter';

import createSpy = jasmine.createSpy;

const orderApprovalPermissionCode = 'testCode';
const userId = 'userId';
const permission = {
  code: orderApprovalPermissionCode,
  name: 'testPermission',
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { orderApprovalPermissionCode } }) =>
      url === 'permission' ? url + orderApprovalPermissionCode : url
  );
}

describe('OccPermissionAdapter', () => {
  let service: OccPermissionAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccPermissionAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccPermissionAdapter);
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

  describe('load permission details', () => {
    it('should load permission details for given permission code', () => {
      service.load(userId, orderApprovalPermissionCode).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url === 'permission' + orderApprovalPermissionCode
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(permission);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSION_NORMALIZER
      );
    });
  });

  describe('load permission list', () => {
    it('should load permission list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'permissions'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([permission]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSIONS_NORMALIZER
      );
    });
  });

  describe('create permission', () => {
    it('should create permission', () => {
      service.create(userId, permission).subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        permission,
        PERMISSION_SERIALIZER
      );
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'permissions' &&
          req.body.code === permission.code
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(permission);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSION_NORMALIZER
      );
    });
  });

  describe('update permission', () => {
    it('should update permission', () => {
      service
        .update(userId, orderApprovalPermissionCode, permission)
        .subscribe();
      expect(converterService.convert).toHaveBeenCalledWith(
        permission,
        PERMISSION_SERIALIZER
      );

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'PATCH' &&
          req.url === 'permission' + orderApprovalPermissionCode &&
          req.body.code === permission.code
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(permission);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        PERMISSION_NORMALIZER
      );
    });
  });
});
