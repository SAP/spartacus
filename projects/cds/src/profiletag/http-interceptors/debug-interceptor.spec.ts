import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { ProfileTagInjector } from '../services';
=======
import { OccEndpointsService } from '@spartacus/core';
import { ProfileTagInjector } from '../services/index';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import { DebugInterceptor } from './debug-interceptor';

describe('Debug interceptor', () => {
  const ProfileTagInjectorMock = {
    get profileTagDebug() {
      return false;
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
          useClass: DebugInterceptor,
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

  it('Should modify the x-profile-tag-debug header if the value is false', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
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
            req.headers.has('X-Profile-Tag-Debug') &&
            req.headers.get('X-Profile-Tag-Debug') === 'false'
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  it('Should modify the x-profile-tag-debug header if the value is true', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injector = TestBed.get(ProfileTagInjector);
      injector.profileTagDebug = true;
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
            req.headers.has('X-Profile-Tag-Debug') &&
            req.headers.get('X-Profile-Tag-Debug') === 'true'
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

<<<<<<< HEAD
=======
  it('Should not add the x-profile-tag-debug header if url is not occ', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injector = TestBed.get(ProfileTagInjector);
      injector.profileTagDebug = true;
      let response;
      http
        .get('/hasHeader', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe(res => (response = res));
      mock
        .expectOne(
          req =>
            req.headers.has('testHeader') &&
            !req.headers.has('X-Profile-Tag-Debug')
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    verifyNoOpenRequests(mock);
  }));
  function verifyNoOpenRequests(mock: HttpTestingController) {
    mock.verify();
  }
});
