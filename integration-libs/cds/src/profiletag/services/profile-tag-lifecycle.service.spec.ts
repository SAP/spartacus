import { TestBed } from '@angular/core/testing';
import { ActionsSubject, StoreModule } from '@ngrx/store';
import { ConsentService } from '@spartacus/core';
import { of } from 'rxjs';
import { CdsConfig } from '../../config/cds-config';
import { ConsentChangedPushEvent } from '../model/profile-tag.model';
import { ProfileTagLifecycleService } from './profile-tag-lifecycle.service';
import { fakeAsync, tick, flush } from '@angular/core/testing';

describe('ProfileTagLifecycleService', () => {
  let service: ProfileTagLifecycleService;
  let consentService: jasmine.SpyObj<ConsentService>;
  let actionsSubject: ActionsSubject;

  beforeEach(() => {
    const consentServiceSpy = jasmine.createSpyObj('ConsentService', [
      'getConsent',
      'isConsentGiven',
    ]);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        { provide: ConsentService, useValue: consentServiceSpy },
        {
          provide: CdsConfig,
          useValue: { cds: { consentTemplateId: 'templateId' } },
        },
        ActionsSubject,
        ProfileTagLifecycleService,
      ],
    });
    service = TestBed.inject(ProfileTagLifecycleService);
    consentService = TestBed.inject(
      ConsentService
    ) as jasmine.SpyObj<ConsentService>;

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

  it('should return login successful event', fakeAsync(() => {
    const mockAction = { type: 'LOGIN' };
    actionsSubject.next(mockAction);
    tick();

    service.loginSuccessful().subscribe((result: boolean) => {
      expect(result).toBe(true);
    });

    flush();
  }));
});
