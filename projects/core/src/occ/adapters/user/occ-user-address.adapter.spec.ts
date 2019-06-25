import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import { Address, AddressValidation } from '../../../model/address.model';
import { Occ } from '../../occ-models/occ.models';
import { OccUserAddressAdapter } from './occ-user-address.adapter';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  ADDRESS_VALIDATION_NORMALIZER,
  ConverterService,
} from '@spartacus/core';

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

  context: {
    parameters: {
      baseSite: { default: '' },
    },
  },
};

describe('OccUserAddressAdapter', () => {
  let service: OccUserAddressAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

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
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
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

    it('should use converter', () => {
      const address: Address = {
        companyName: 'ACME',
        defaultAddress: true,
      };

      service.verify(username, address).subscribe();
      httpMock
        .expectOne(endpoint + `/${username}` + addressVerificationEndpoint)
        .flush({});
      expect(converter.convert).toHaveBeenCalledWith(
        address,
        ADDRESS_SERIALIZER
      );
      expect(converter.pipeable).toHaveBeenCalledWith(
        ADDRESS_VALIDATION_NORMALIZER
      );
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

      service.loadAll(username).subscribe(result => {
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

    it('should use converter', () => {
      service.loadAll(username).subscribe();
      httpMock
        .expectOne(endpoint + `/${username}` + addressesEndpoint)
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(ADDRESS_NORMALIZER);
    });
  });
});
