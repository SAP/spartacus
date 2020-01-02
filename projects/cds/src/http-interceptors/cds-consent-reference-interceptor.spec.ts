import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { CdsConfig } from '../config';
import { ProfileTagEventService } from './../profiletag/services/profiletag-event.service';
import { CdsConsentReferenceInterceptor } from './cds-consent-reference-interceptor';

describe('CDS consent reference interceptor', () => {
  let interceptor: CdsConsentReferenceInterceptor;
  const ProfileTagEventTrackerMock = {
    get latestConsentReference() {
      return null;
    },
  };
  const mockCdsConfig: CdsConfig = {
    cds: {
      baseUrl: 'https://api.stage.context.cloud.sap',
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProfileTagEventService,
          useValue: ProfileTagEventTrackerMock,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CdsConsentReferenceInterceptor,
          multi: true,
        },
        {
          provide: CdsConfig,
          useValue: mockCdsConfig,
        },
      ],
    });
    interceptor = TestBed.get(CdsConsentReferenceInterceptor as Type<
      CdsConsentReferenceInterceptor
    >);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('Should modify the consent-reference header if there is a consent-reference', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injectorMock = TestBed.get(ProfileTagEventService as Type<
        ProfileTagEventService
      >);
      injectorMock.latestConsentReference = 'test-123-abc-!@#';
      let response;
      http
        .get(
          'https://api.stage.context.cloud.sap/strategy/somtenant/strategies/1234/products?site=electronics-spa&language=en&pageSize=10',
          {
            headers: {
              testHeader: 'test',
            },
          }
        )
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            req.headers.has('consent-reference') &&
            req.headers.get('consent-reference') === 'test-123-abc-!@#'
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  it('Should not modify the headers if there is not a consent-reference', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      let response;
      http
        .get(
          'https://api.stage.context.cloud.sap/strategy/somtenant/strategies/1234/products?site=electronics-spa&language=en&pageSize=10',
          {
            headers: {
              testHeader: 'test',
            },
          }
        )
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            !req.headers.has('consent-reference')
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  it('Should not add the consent-reference header if url is not a CDS Cloud URL', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injector = TestBed.get(ProfileTagEventService as Type<
        ProfileTagEventService
      >);
      injector.profileTagDebug = true;
      let response;
      http
        .get('/some-url-somewhere-else', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            !req.headers.has('consent-reference')
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    verifyNoOpenRequests(mock);
  }));
  function verifyNoOpenRequests(mock: HttpTestingController) {
    mock.verify();
  }
});
