import { TestBed } from '@angular/core/testing';

import {
  LanguageService,
  UserConsentService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { CdcJsService } from '../../../../root/service';
import { of } from 'rxjs';
import { CdcUserConsentConnector } from './cdc-user-consent.connector';
import createSpy = jasmine.createSpy;
const mockUser = { uid: 'sampleuser@mail.com' };
const mockCdcSdkOutput = {
  errorCode: 0,
  errorMessage: '',
  time: new Date('3 march 2023'),
};
const mockCurrentConsents = [
  {
    id: 'terms.of.use',
    description: 'Accept the terms of use to proceed further',
    version: 1.0,
    currentConsent: {
      code: 'terms.of.use',
      consentGivenDate: undefined,
      consentWithdrawnDate: undefined,
    },
  },
  {
    id: 'others.survey',
    description: 'Accept to receive all survey emails',
    version: 1.0,
    currentConsent: {
      code: 'others.survey',
      consentGivenDate: undefined,
      consentWithdrawnDate: undefined,
    },
  },
];
class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy();
}
class MockLanguageService implements Partial<LanguageService> {
  getActive = createSpy();
}
class MockCdcJsService implements Partial<CdcJsService> {
  getUserConsentPreferences = createSpy();
  setUserConsentPreferences = createSpy();
}
class MockUserConsentService implements Partial<UserConsentService> {
  getConsents = createSpy();
}
describe('CdcSiteConsentService', () => {
  let service: CdcUserConsentConnector;
  let userProfileFacade: UserProfileFacade;
  let languageService: LanguageService;
  let cdcJsService: CdcJsService;
  let userConsentService: UserConsentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
        {
          provide: UserConsentService,
          useClass: MockUserConsentService,
        },
      ],
    });
    service = TestBed.inject(CdcUserConsentConnector);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    languageService = TestBed.inject(LanguageService);
    cdcJsService = TestBed.inject(CdcJsService);
    userConsentService = TestBed.inject(UserConsentService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getUserID()', () => {
    it('get logged in user id', () => {
      userProfileFacade.get = createSpy().and.returnValue(of(mockUser));
      let output = service.getUserID();
      expect(userProfileFacade.get).toHaveBeenCalled();
      expect(output).toEqual('sampleuser@mail.com');
    });
  });
  describe('getActiveLanguage()', () => {
    it('get active language', () => {
      languageService.getActive = createSpy().and.returnValue(of('en'));
      let output = service.getActiveLanguage();
      expect(languageService.getActive).toHaveBeenCalled();
      expect(output).toEqual('en');
    });
  });
  describe('updateCdcConsent()', () => {
    it('give consent via CDC SDK', () => {
      languageService.getActive = createSpy().and.returnValue(of('en'));
      userProfileFacade.get = createSpy().and.returnValue(of(mockUser));
      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of(mockCdcSdkOutput)
      );
      userConsentService.getConsents = createSpy().and.returnValue(
        of(mockCurrentConsents)
      );
      service
        .updateCdcConsent('current', true, 'others.survey')
        .subscribe((output) => {
          expect(cdcJsService.setUserConsentPreferences).toHaveBeenCalledWith(
            'sampleuser@mail.com',
            'en',
            {
              others: {
                survey: {
                  isConsentGranted: true,
                },
              },
            }
          );
          expect(output).toEqual({
            id: 'others.survey',
            description: 'Accept to receive all survey emails',
            version: 1.0,
            currentConsent: {
              code: 'others.survey',
              consentGivenDate: new Date('3 march 2023'),
              consentWithdrawnDate: undefined,
            },
          });
        });
    });
    it('withdraw consent via CDC SDK', () => {
      languageService.getActive = createSpy().and.returnValue(of('en'));
      userProfileFacade.get = createSpy().and.returnValue(of(mockUser));

      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of(mockCdcSdkOutput)
      );
      userConsentService.getConsents = createSpy().and.returnValue(
        of(mockCurrentConsents)
      );
      service
        .updateCdcConsent('current', false, 'others.survey')
        .subscribe((output) => {
          expect(cdcJsService.setUserConsentPreferences).toHaveBeenCalledWith(
            'sampleuser@mail.com',
            'en',
            {
              others: {
                survey: {
                  isConsentGranted: false,
                },
              },
            }
          );
          expect(output).toEqual({});
        });
    });
    it('do not call update for required consents in withdraw scneario', () => {
      service.updateCdcConsent('current', false, 'terms.of.use').subscribe();
      expect(cdcJsService.setUserConsentPreferences).not.toHaveBeenCalled();
    });
  });
});
