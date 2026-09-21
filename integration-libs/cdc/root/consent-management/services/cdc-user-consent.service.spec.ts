import { TestBed } from '@angular/core/testing';
import { ConverterService, LanguageService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { CdcJsService } from '../../service';
import { CdcUserConsentService } from './cdc-user-consent.service';

const mockUser = { uid: 'sampleuser@mail.com' };
const mockCdcSdkOutput = {
  errorCode: 0,
  errorMessage: '',
  time: new Date('3 march 2023'),
};
class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get = vi.fn();
}
class MockLanguageService implements Partial<LanguageService> {
  getActive = vi.fn();
}
class MockCdcJsService implements Partial<CdcJsService> {
  setUserConsentPreferences = vi.fn();
  getSiteConsentDetails = vi.fn();
}
class MockConverterService implements Partial<ConverterService> {
  convert = vi.fn();
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
      userProfileFacade.get = vi.fn().mockReturnValue(of(mockUser));
      let output = service.getUserID();
      expect(userProfileFacade.get).toHaveBeenCalled();
      expect(output).toEqual('sampleuser@mail.com');
    });
  });
  describe('getActiveLanguage()', () => {
    it('get active language', () => {
      languageService.getActive = vi.fn().mockReturnValue(of('en'));
      let output = service.getActiveLanguage();
      expect(languageService.getActive).toHaveBeenCalled();
      expect(output).toEqual('en');
    });
  });
  describe('updateCdcUserPreferences()', () => {
    it('give consent via CDC SDK', () => {
      languageService.getActive = vi.fn().mockReturnValue(of('en'));
      userProfileFacade.get = vi.fn().mockReturnValue(of(mockUser));
      converter.convert = vi.fn().mockReturnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = vi.fn().mockReturnValue(
        of(mockCdcSdkOutput)
      );
      service.updateCdcUserPreferences([
        { id: 'others.survey', isConsentGranted: true },
      ]);
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
      languageService.getActive = vi.fn().mockReturnValue(of('en'));
      userProfileFacade.get = vi.fn().mockReturnValue(of(mockUser));
      converter.convert = vi.fn().mockReturnValue({
        others: {
          survey: {
            isConsentGranted: false,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = vi.fn().mockReturnValue(
        of(mockCdcSdkOutput)
      );
      service.updateCdcUserPreferences([
        { id: 'others.survey', isConsentGranted: false },
      ]);
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
