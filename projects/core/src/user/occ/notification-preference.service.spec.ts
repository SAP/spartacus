import { TestBed } from '@angular/core/testing';
import { NotificationPreferenceService } from './notification-preference.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccConfig } from '../../occ/config/occ-config';
import { HttpErrorResponse } from '@angular/common/http';
const userId = 'testUser';
const userEndPoint = '/users';
const notificationPreferenceEndPoint = '/notificationpreferences';
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
const notificationpreferences: any = {
  preferences: [
    {
      channel: 'EMAIL',
      enabled: true,
      value: '1@qq.com',
    },
    {
      channel: 'SITE_MESSAGE',
      enabled: true,
    },
  ],
};
const preference: any = { preferences: [{ channel: 'EMAIL', enabled: false }] };

fdescribe('NotificationPreferenceService', () => {
  let service: NotificationPreferenceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        NotificationPreferenceService,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(NotificationPreferenceService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be able to get notification preferences', () => {
    service.getNotificationPreference(userId).subscribe(result => {
      console.log('###1: ' + result);
      expect(result).toEqual(notificationpreferences);
    });
    const mockRequest = httpMock.expectOne(req => {
      return (
        req.method === 'GET' &&
        req.url === userEndPoint + `/${userId}` + notificationPreferenceEndPoint
      );
    });
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(notificationpreferences);
  });
  it('should be able to update notification preference', () => {
    service
      .updateNotificationPreference(userId, preference)
      .subscribe(result => {
        expect(result).toEqual('');
      });
    const mockRequest = httpMock.expectOne(req => {
      return (
        req.method === 'PATCH' &&
        req.url === userEndPoint + `/${userId}` + notificationPreferenceEndPoint
      );
    });
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    expect(mockRequest.request.body).toEqual(JSON.stringify(preference));
    mockRequest.flush('');
  });
  it('should catch error', () => {
    service
      .updateNotificationPreference(userId, 'invalid notification preference')
      .subscribe(
        _result => {},
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.statusText).toEqual('Error');
        }
      );

    const mockRequest = httpMock.expectOne(req => {
      return (
        req.method === 'PATCH' &&
        req.url === userEndPoint + `/${userId}` + notificationPreferenceEndPoint
      );
    });
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual('json');
    mockRequest.flush(
      { error: 'Invalid notification preference' },
      { status: 400, statusText: 'Error' }
    );
  });
});
