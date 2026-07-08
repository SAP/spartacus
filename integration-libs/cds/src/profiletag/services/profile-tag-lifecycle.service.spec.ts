import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ActionsSubject, StoreModule } from '@ngrx/store';
import { AuthActions, ConsentService, FeatureToggles } from '@spartacus/core';
import { of, Subject } from 'rxjs';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import { LOGIN_EVENTS, LoginEventEnvelope } from '../tokens/login-events.token';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';

describe('ProfileTagLifecycleService', () => {
  let service: ProfileTagLifecycleService;
  let consentService: jasmine.SpyObj<ConsentService>;
  let featureToggles: FeatureToggles;
  let actionsSubject: ActionsSubject;
  let loginEventsSubject: Subject<LoginEventEnvelope>;

  beforeEach(() => {
    const consentServiceSpy = jasmine.createSpyObj('ConsentService', [
      'getConsent',
      'isConsentGiven',
    ]);
    loginEventsSubject = new Subject<LoginEventEnvelope>();

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: ConsentService, useValue: consentServiceSpy },
        {
          provide: FeatureToggles,
          useValue: { cdsLoginEventsToken: false } satisfies FeatureToggles,
        },
        {
          provide: CdsConfig,
          useValue: { cds: { consentTemplateId: 'templateId' } },
        },
        { provide: LOGIN_EVENTS, useValue: loginEventsSubject.asObservable() },
        ActionsSubject,
        ProfileTagLifecycleService,
      ],
    });
    service = TestBed.inject(ProfileTagLifecycleService);
    consentService = TestBed.inject(
      ConsentService
    ) as jasmine.SpyObj<ConsentService>;
    featureToggles = TestBed.inject(FeatureToggles);

    actionsSubject = TestBed.inject(ActionsSubject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should emit an event if the profile consent changes to true,', (done: DoneFn) => {
    const mockConsent = { code: 'TestCode' };
    consentService.getConsent.and.returnValue(of(mockConsent));
    consentService.isConsentGiven.and.returnValue(true);

    service.consentChanged().subscribe((event: ConsentChangedPushEvent) => {
      expect(event.data.granted).toBe(true);
      done();
    });
  });

  it('Should emit an event if the profile consent changes to false,', (done: DoneFn) => {
    const mockConsent = { code: 'TestCode' };
    consentService.getConsent.and.returnValue(of(mockConsent));
    consentService.isConsentGiven.and.returnValue(false);

    service.consentChanged().subscribe((event: ConsentChangedPushEvent) => {
      expect(event.data.granted).toBe(false);
      done();
    });
  });

  it('Should emit an event if the profile consent changes to false if consent is undefined,', (done: DoneFn) => {
    const mockConsent = undefined;
    consentService.getConsent.and.returnValue(of(mockConsent));
    consentService.isConsentGiven.and.returnValue(true);

    service.consentChanged().subscribe((event: ConsentChangedPushEvent) => {
      expect(event.data.granted).toBe(false);
      done();
    });
  });

  describe('loginSuccessful()', () => {
    describe('when cdsLoginEventsToken feature flag is disabled', () => {
      beforeEach(() => {
        featureToggles.cdsLoginEventsToken = false;
      });

      it('should return login successful event from ActionsSubject', fakeAsync(() => {
        const mockAction = { type: AuthActions.LOGIN };

        let result: boolean | undefined;
        service.loginSuccessful().subscribe((value: boolean) => {
          result = value;
        });

        actionsSubject.next(mockAction);
        tick();

        expect(result).toBe(true);

        flush();
      }));

      it('should not emit for non-LOGIN actions', fakeAsync(() => {
        const mockAction = { type: AuthActions.LOGOUT };

        let result: boolean | undefined;
        service.loginSuccessful().subscribe((value: boolean) => {
          result = value;
        });

        actionsSubject.next(mockAction);
        tick();

        expect(result).toBeUndefined();

        flush();
      }));
    });

    describe('when cdsLoginEventsToken feature flag is enabled', () => {
      beforeEach(() => {
        featureToggles.cdsLoginEventsToken = true;
      });

      it('should return login successful event from LOGIN_EVENTS token', fakeAsync(() => {
        let result: boolean | undefined;
        service.loginSuccessful().subscribe((value: boolean) => {
          result = value;
        });

        const mockLoginEvent: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: Date.now(),
        };

        loginEventsSubject.next(mockLoginEvent);
        tick();

        expect(result).toBe(true);

        flush();
      }));

      it('should deduplicate login events by timestamp', fakeAsync(() => {
        const results: boolean[] = [];
        service.loginSuccessful().subscribe((value: boolean) => {
          results.push(value);
        });

        const timestamp = Date.now();
        const mockLoginEvent1: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: timestamp,
        };
        const mockLoginEvent2: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: timestamp, // Same timestamp - should be filtered out
        };
        const mockLoginEvent3: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: timestamp + 1000, // Different timestamp - should pass through
        };

        loginEventsSubject.next(mockLoginEvent1);
        loginEventsSubject.next(mockLoginEvent2);
        loginEventsSubject.next(mockLoginEvent3);
        tick();

        expect(results).toEqual([true, true]); // Only 2 events should pass through

        flush();
      }));

      it('should allow events with different timestamps', fakeAsync(() => {
        const results: boolean[] = [];
        service.loginSuccessful().subscribe((value: boolean) => {
          results.push(value);
        });

        const mockLoginEvent1: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: 1000,
        };
        const mockLoginEvent2: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: 2000,
        };
        const mockLoginEvent3: LoginEventEnvelope = {
          action: { type: AuthActions.LOGIN },
          timestamp: 3000,
        };

        loginEventsSubject.next(mockLoginEvent1);
        loginEventsSubject.next(mockLoginEvent2);
        loginEventsSubject.next(mockLoginEvent3);
        tick();

        expect(results).toEqual([true, true, true]); // All events should pass through

        flush();
      }));
    });
  });
});
