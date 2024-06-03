import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  OccConfig,
  OccEndpointsService,
} from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_SERIALIZER } from '@spartacus/organization/user-registration/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { OccUserRegistrationAdapter } from './occ-user-registration.adapter';

export const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    baseSite: [''],
  },
};

export class MockOccEndpointsService implements Partial<OccEndpointsService> {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }
  getBaseUrl() {
    return '';
  }
  isConfigured() {
    return true;
  }
}

const userData: OrganizationUserRegistration = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Smith',
  email: 'email@domain.com',
  message: 'Please register my account',
};

describe('OccUserRegistrationAdapter', () => {
  let occUserRegistrationAdapter: OccUserRegistrationAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserRegistrationAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occUserRegistrationAdapter = TestBed.inject(OccUserRegistrationAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('register organization user', () => {
    it('should able to register a new organization user', () => {
      occUserRegistrationAdapter.registerUser(userData).subscribe();

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'POST';
      });
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'organizationUserRegistration'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(mockReq.request.body).toEqual(userData);
      mockReq.flush(userData);
    });

    it('should use converter', () => {
      occUserRegistrationAdapter.registerUser(userData).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'POST';
        })
        .flush(userData);
      expect(converter.convert).toHaveBeenCalledWith(
        userData,
        ORGANIZATION_USER_REGISTRATION_SERIALIZER
      );
    });
  });
});
