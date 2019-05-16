import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../occ/config/occ-config';
import { Address, AddressValidation } from '../../model/address.model';
import { Occ } from '../../occ/occ-models/occ.models';
import { OccUserAddressAdapter } from './occ-user-address.adapter';

const username = 'mockUsername';

const endpoint = '/users';
const addressVerificationEndpoint = '/addresses/verification';
const addressesEndpoint = '/addresses';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  site: {
    baseSite: '',
  },
};

describe('OccUserAddressAdapter', () => {
  let service: OccUserAddressAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserAddressAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccUserAddressAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load address verification results', () => {
    it('should load address verification results for given user id and address', () => {
      const address: Address = {
        companyName: 'ACME',
        defaultAddress: true,
      };
      const suggestedAddresses: AddressValidation = {
        suggestedAddresses: [address],
      };

      service.verify(username, address).subscribe(result => {
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
        companyName: 'mockCompany1',
      };
      const mockAddress2: Address = {
        companyName: 'mockCompany2',
      };
      const mockUserAddresses: Occ.AddressList = {
        addresses: [mockAddress1, mockAddress2],
      };

      service.load(username).subscribe(result => {
        expect(result).toEqual(mockUserAddresses.addresses);
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
});
