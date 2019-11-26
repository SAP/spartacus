import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======
import { OccEndpointsService } from '@spartacus/core';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import { ProfileTagInjector } from '../services/index';
import { ConsentReferenceInterceptor } from './consent-reference-interceptor';

describe('consent reference interceptor', () => {
  const ProfileTagInjectorMock = {
    get consentReference() {
      return null;
    },
  };
<<<<<<< HEAD
=======
  const occEndPointsMock = {
    getBaseEndpoint: () => '/occ',
  };
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProfileTagInjector,
          useValue: ProfileTagInjectorMock,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ConsentReferenceInterceptor,
          multi: true,
        },
<<<<<<< HEAD
=======
        {
          provide: OccEndpointsService,
          useValue: occEndPointsMock,
        },
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
      ],
    });
  });

  it('Should modify the x-consent-reference header if there is a consent-reference', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injectorMock = TestBed.get(ProfileTagInjector);
      injectorMock.consentReference = 'test-123-abc-!@#';
      let response;
      http
<<<<<<< HEAD
        .get('/hasHeader', {
=======
        .get('/occ/hasHeader', {
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            req.headers.has('X-Consent-Reference') &&
            req.headers.get('X-Consent-Reference') === 'test-123-abc-!@#'
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
<<<<<<< HEAD
        .get('/noHeader', {
=======
        .get('/occ/noHeader', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            !req.headers.has('X-Consent-Reference')
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  it('Should not add the x-consent-reference header if url is not occ', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injector = TestBed.get(ProfileTagInjector);
      injector.profileTagDebug = true;
      let response;
      http
        .get('/hasHeader', {
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            !req.headers.has('X-Consent-Reference')
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
