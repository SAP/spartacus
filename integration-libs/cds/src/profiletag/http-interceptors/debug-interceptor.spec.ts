import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { ProfileTagEventService } from '../services/profiletag-event.service';
import { DebugInterceptor } from './debug-interceptor';

describe('Debug interceptor', () => {
  let ProfileTagEventTrackerMock;
  const occEndPointsMock = {
    getBaseUrl: () => '/occ',
  };
  beforeEach(() => {
    ProfileTagEventTrackerMock = {
      profileTagDebug: false,
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ProfileTagEventService,
          useValue: ProfileTagEventTrackerMock,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DebugInterceptor,
          multi: true,
        },
        {
          provide: OccEndpointsService,
          useValue: occEndPointsMock,
        },
      ],
    });
  });

  it('Should modify the x-profile-tag-debug header if the value is false', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      let response;
      http
        .get('/occ/hasHeader', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe((res) => (response = res));
      mock
        .expectOne(
          (req) =>
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
      const injector = TestBed.inject(ProfileTagEventService);
      injector.profileTagDebug = true;
      let response;
      http
        .get('/occ/hasHeader', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe((res) => (response = res));
      mock
        .expectOne(
          (req) =>
            req.headers.has('testHeader') &&
            req.headers.has('X-Profile-Tag-Debug') &&
            req.headers.get('X-Profile-Tag-Debug') === 'true'
        )
        .flush('201 created');
      mock.verify();
      expect(response).toBeTruthy();
    }
  ));

  it('Should not add the x-profile-tag-debug header if url is not occ', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      const injector = TestBed.inject(ProfileTagEventService);
      injector.profileTagDebug = true;
      let response;
      http
        .get('/hasHeader', {
          headers: {
            testHeader: 'test',
          },
        })
        .subscribe((res) => (response = res));
      mock
        .expectOne(
          (req) =>
            req.headers.has('testHeader') &&
            !req.headers.has('X-Profile-Tag-Debug')
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
