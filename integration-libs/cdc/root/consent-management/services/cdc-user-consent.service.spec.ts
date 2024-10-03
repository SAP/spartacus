import { TestBed } from '@angular/core/testing';
import { ConverterService, LanguageService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { CdcJsService } from '../../service';
import { CdcUserConsentService } from './cdc-user-consent.service';
import createSpy = jasmine.createSpy;

const mockUser = { uid: 'sampleuser@mail.com' };
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
class MockConverterService implements Partial<ConverterService> {
  convert = createSpy();
}
describe('CdcUserConsentService()', () => {
  let service: CdcUserConsentService;
  let userProfileFacade: UserProfileFacade;
  let languageService: LanguageService;
  let cdcJsService: CdcJsService;
  let converter: ConverterService;
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
      service.updateCdcConsent(true, ['others.survey']);
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
      service.updateCdcConsent(false, ['others.survey']);
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
});
