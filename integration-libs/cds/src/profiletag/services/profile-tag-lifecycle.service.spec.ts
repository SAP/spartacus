import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthActions, ConsentService } from '@spartacus/core';
import { firstValueFrom, of, Subject } from 'rxjs';
import { CdsConfig } from '../../config/cds-config';
import { LOGIN_EVENTS, LoginEventEnvelope } from '../tokens/login-events.token';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';

describe('ProfileTagLifecycleService', () => {
  let service: ProfileTagLifecycleService;
  let consentService: {
    getConsent: ReturnType<typeof vi.fn>;
    isConsentGiven: ReturnType<typeof vi.fn>;
  };
  let loginEventsSubject: Subject<LoginEventEnvelope>;

  beforeEach(() => {
    const consentServiceSpy = {
      getConsent: vi.fn(),
      isConsentGiven: vi.fn(),
    };
    loginEventsSubject = new Subject<LoginEventEnvelope>();

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: ConsentService, useValue: consentServiceSpy },
        {
          provide: CdsConfig,
          useValue: { cds: { consentTemplateId: 'templateId' } },
        },
        { provide: LOGIN_EVENTS, useValue: loginEventsSubject.asObservable() },
        ProfileTagLifecycleService,
      ],
    });
    service = TestBed.inject(ProfileTagLifecycleService);
    consentService = TestBed.inject(
      ConsentService
    ) as unknown as typeof consentService;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should emit an event if the profile consent changes to true,', async () => {
    const mockConsent = { code: 'TestCode' };
    consentService.getConsent.mockReturnValue(of(mockConsent));
    consentService.isConsentGiven.mockReturnValue(true);

    const event = await firstValueFrom(service.consentChanged());
    expect(event.data.granted).toBe(true);
  });

  it('Should emit an event if the profile consent changes to false,', async () => {
    const mockConsent = { code: 'TestCode' };
    consentService.getConsent.mockReturnValue(of(mockConsent));
    consentService.isConsentGiven.mockReturnValue(false);

    const event = await firstValueFrom(service.consentChanged());
    expect(event.data.granted).toBe(false);
  });

  it('Should emit an event if the profile consent changes to false if consent is undefined,', async () => {
    const mockConsent = undefined;
    consentService.getConsent.mockReturnValue(of(mockConsent));
    consentService.isConsentGiven.mockReturnValue(true);

    const event = await firstValueFrom(service.consentChanged());
    expect(event.data.granted).toBe(false);
  });

  describe('loginSuccessful()', () => {
    it('should return login successful event from LOGIN_EVENTS token', () => {
      let result: boolean | undefined;
      service.loginSuccessful().subscribe((value: boolean) => {
        result = value;
      });

      const mockLoginEvent: LoginEventEnvelope = {
        action: { type: AuthActions.LOGIN },
        timestamp: Date.now(),
      };

      loginEventsSubject.next(mockLoginEvent);

      expect(result).toBe(true);
    });

    it('should deduplicate login events by timestamp', () => {
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

      expect(results).toEqual([true, true]); // Only 2 events should pass through
    });

    it('should allow events with different timestamps', () => {
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

      expect(results).toEqual([true, true, true]); // All events should pass through
    });
  });
});
