import { TestBed } from '@angular/core/testing';
import { ConverterService, LanguageService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { CdcUserConsentService } from './cdc-user-consent.service';
import { CdcConsentsLocalStorageService } from './cdc-consents-local-storage.service';
import createSpy = jasmine.createSpy;
import { CdcJsService } from '@spartacus/cdc/root';
import {
  CdcLocalStorageTemplate,
  CdcSiteConsentTemplate,
} from '../../../core/models/cdc-site-consents.model';
const mockUser = { uid: 'sampleuser@mail.com' };
const mockCdcSiteConsents: CdcSiteConsentTemplate = {
  siteConsentDetails: {
    'terms.of.use': { isMandatory: true },
    'privacy.statement': { isMandatory: true },
    'consent.survey': { isMandatory: false },
  },
};
const mockStoredConsents: CdcLocalStorageTemplate[] = [
  { id: 'terms.of.use', required: true },
  { id: 'privacy.statement', required: true },
  { id: 'consent.survey', required: false },
];
const mockCdcSdkOutput = {
  errorCode: 0,
  errorMessage: '',
  time: new Date('3 march 2023'),
};
class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = createSpy();
}
class MockLanguageService implements Partial<LanguageService> {
  getActive = createSpy();
}
class MockCdcJsService implements Partial<CdcJsService> {
  setUserConsentPreferences = createSpy();
  getSiteConsentDetails = createSpy();
}
class MockCdcConsentsLocalStorageService
  implements Partial<CdcConsentsLocalStorageService>
{
  checkIfConsentExists = createSpy();
  syncCdcConsentsState = createSpy();
}
class MockConverterService implements Partial<ConverterService> {
  convert = createSpy();
}
describe('CdcUserConsentService()', () => {
  let service: CdcUserConsentService;
  let userProfileFacade: UserProfileFacade;
  let languageService: LanguageService;
  let cdcJsService: CdcJsService;
  let converter: ConverterService;
  let storage: CdcConsentsLocalStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
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
          provide: CdcConsentsLocalStorageService,
          useClass: MockCdcConsentsLocalStorageService,
        },
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
      ],
    });
    service = TestBed.inject(CdcUserConsentService);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    languageService = TestBed.inject(LanguageService);
    cdcJsService = TestBed.inject(CdcJsService);
    converter = TestBed.inject(ConverterService);
    storage = TestBed.inject(CdcConsentsLocalStorageService);
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
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of(mockCdcSdkOutput)
      );
      service.updateCdcConsent(true, 'others.survey');
      expect(cdcJsService.setUserConsentPreferences).toHaveBeenCalledWith(
        'sampleuser@mail.com',
        'en',
        {
          others: {
            survey: {
              isConsentGranted: true,
            },
          },
        },
        undefined
      );
    });
    it('withdraw consent via CDC SDK', () => {
      languageService.getActive = createSpy().and.returnValue(of('en'));
      userProfileFacade.get = createSpy().and.returnValue(of(mockUser));
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: false,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of(mockCdcSdkOutput)
      );
      service.updateCdcConsent(false, 'others.survey');
      expect(cdcJsService.setUserConsentPreferences).toHaveBeenCalledWith(
        'sampleuser@mail.com',
        'en',
        {
          others: {
            survey: {
              isConsentGranted: false,
            },
          },
        },
        undefined
      );
    });
  });
  describe('persistCdcSiteConsents()', () => {
    it('should persist cdc site consents into local storage', () => {
      cdcJsService.getSiteConsentDetails = createSpy().and.returnValue(
        of(mockCdcSiteConsents)
      );
      storage.syncCdcConsentsState = createSpy().and.returnValue({});
      service.persistCdcSiteConsents();
      expect(cdcJsService.getSiteConsentDetails).toHaveBeenCalled();
      expect(storage.syncCdcConsentsState).toHaveBeenCalledWith(
        mockStoredConsents
      );
    });
  });
});
