import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';
import { OccUserNotificationPreferenceAdapter } from './occ-user-notification-preference.adapter';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from './unit-test.helper';
import {
  NOTIFICATION_PREFERENCE_NORMALIZER,
  NOTIFICATION_PREFERENCE_SERIALIZER,
} from '../../../user/connectors/notification-preference/converters';
import { ConverterService } from '../../../util/converter.service';
import {
  NotificationPreference,
  NotificationPreferenceList,
} from '../../../model/notification-preference.model';

const userId = 'testUser';
const mockNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: false,
    visible: true,
  },
];
const updatedNotificationPreference: NotificationPreference[] = [
  {
    channel: 'EMAIL',
    value: 'test@sap.com',
    enabled: true,
    visible: true,
  },
];
const mockNotificationPreferenceList: NotificationPreferenceList = {
  preferences: mockNotificationPreference,
};

describe('OccUserNotificationPreferenceAdapter', () => {
  let occNotificationPreferenceAdapter: OccUserNotificationPreferenceAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserNotificationPreferenceAdapter,
        { provide: OccConfig, useValue: mockOccModuleConfig },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    occNotificationPreferenceAdapter = TestBed.inject(
      OccUserNotificationPreferenceAdapter
    );
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    occEnpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(converter, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load notification preferences', () => {
    it('should load notification preferences for a given user id', () => {
      occNotificationPreferenceAdapter.loadAll(userId).subscribe((result) => {
        expect(result).toEqual(mockNotificationPreference);
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'notificationPreference',
        {
          urlParams: { userId: userId },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(mockNotificationPreferenceList);
    });

    it('should use converter', () => {
      occNotificationPreferenceAdapter.loadAll(userId).subscribe();
      httpMock
        .expectOne((req) => {
          return req.method === 'GET';
        })
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        NOTIFICATION_PREFERENCE_NORMALIZER
      );
    });
  });

  describe('update notification preferences', () => {
    it('should update notification preferences for given user', () => {
      occNotificationPreferenceAdapter
        .update(userId, mockNotificationPreference)
        .subscribe((result) => {
          expect(result).toEqual(updatedNotificationPreference);
        });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'PATCH';
      });

      expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
        'notificationPreference',
        {
          urlParams: { userId: userId },
        }
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(updatedNotificationPreference);
    });
  });

  it('should use converter', () => {
    occNotificationPreferenceAdapter
      .update(userId, mockNotificationPreference)
      .subscribe();
    httpMock
      .expectOne((req) => {
        return req.method === 'PATCH';
      })
      .flush({});
    expect(converter.convert).toHaveBeenCalledWith(
      mockNotificationPreference,
      NOTIFICATION_PREFERENCE_SERIALIZER
    );
  });
});
