import { TestBed } from '@angular/core/testing';
import { OccUserService } from './user.service';
import {
  OccConfig,
  User,
  Address,
  AddressValidation,
  AddressList,
  PaymentDetails,
  PaymentDetailsList
} from '@spartacus/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

const username: any = 'mockUsername';
const password: any = '1234';

const user: User = {
  customerId: username,
  displayUid: password
};
const endpoint = '/users';
const addressVerificationEndpoint = '/addresses/verification';
const addressesEndpoint = '/addresses';
const paymentDetailsEndpoint = '/paymentdetails';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: ''
  }
};

describe('OccUserService', () => {
  let service: OccUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccUserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load user details', () => {
    it('should load user details for given username abd access token', () => {
      service.loadUser(username).subscribe(result => {
        expect(result).toEqual(user);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + `/${username}`;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(user);
    });
  });

  describe('load address verification results', () => {
    it('should load address verification results for given user id and address', () => {
      const address: Address = {
        companyName: 'ACME',
        defaultAddress: true
      };
      const suggestedAddresses: AddressValidation = {
        suggestedAddresses: [address]
      };

      service.verifyAddress(username, address).subscribe(result => {
        expect(result).toEqual(suggestedAddresses);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url === endpoint + `/${username}` + addressVerificationEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(suggestedAddresses);
    });
  });

  describe('load user addresses', () => {
    it('should load user addresses for a given user id', () => {
      const mockAddress1: Address = {
        companyName: 'mockCompany1'
      };
      const mockAddress2: Address = {
        companyName: 'mockCompany2'
      };
      const mockUserAddresses: AddressList = {
        addresses: [mockAddress1, mockAddress2]
      };

      service.loadUserAddresses(username).subscribe(result => {
        expect(result).toEqual(mockUserAddresses);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${username}` + addressesEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserAddresses);
    });
  });

  describe('load user payment methods', () => {
    it('should load user payment methods for a given user id', () => {
      const mockPayment1: PaymentDetails = {
        accountHolderName: 'mockAccountHolderName1'
      };
      const mockPayment2: PaymentDetails = {
        accountHolderName: 'mockAccountHolderName2'
      };
      const mockUserPaymentMethods: PaymentDetailsList = {
        payments: [mockPayment1, mockPayment2]
      };

      service.loadUserPaymentMethods(username).subscribe(result => {
        expect(result).toEqual(mockUserPaymentMethods);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/${username}` + paymentDetailsEndpoint
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockUserPaymentMethods);
    });
  });
});
