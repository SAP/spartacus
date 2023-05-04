import { TestBed } from '@angular/core/testing';
import {
  ConsentTemplate,
  ConverterService,
  LanguageService,
  UserConsentService,
} from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { CdcJsService } from '../root/service';
import { CdcSiteConsentService } from './cdc-site-consent.service';
import createSpy = jasmine.createSpy;
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
class MockConverterService implements Partial<ConverterService> {
  convert = createSpy();
}
class MockUserConsentService implements Partial<UserConsentService> {
  getConsents = createSpy();
}
describe('CdcSiteConsentService', () => {
  let service: CdcSiteConsentService;
  let userProfileFacade: UserProfileFacade;
  let languageService: LanguageService;
  let cdcJsService: CdcJsService;
  let converter: ConverterService;
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
          provide: ConverterService,
          useClass: MockConverterService,
        },
        {
          provide: UserConsentService,
          useClass: MockUserConsentService,
        },
      ],
    });
    service = TestBed.inject(CdcSiteConsentService);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    languageService = TestBed.inject(LanguageService);
    cdcJsService = TestBed.inject(CdcJsService);
    converter = TestBed.inject(ConverterService);
    userConsentService = TestBed.inject(UserConsentService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getUserID()', () => {
    it('get logged in user id', () => {
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: 'sampleuser@mail.com' })
      );
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
  describe('maintainUserConsentPreferences()', () => {
    it('update the user preferences into consent template list', (done) => {
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: 'sampleuser@mail.com' })
      );
      cdcJsService.getUserConsentPreferences = createSpy().and.returnValue(
        of({
          UIDSignature: 'HHPLo/TC7KobjnGB7JflcWvAXfg=',
          preferences: {
            terms: {
              of: {
                use: {
                  isConsentGranted: true,
                  lastConsentModified: new Date('3 march 2022'),
                },
              },
            },
          },
          statusCode: 200,
          errorCode: 0,
        })
      );
      let allSiteConsents: ConsentTemplate[] = [];
      allSiteConsents.push({
        id: 'terms.of.use',
        description: 'Accept the terms of use to proceed further',
        version: 1.0,
        currentConsent: {
          code: 'terms.of.use',
          consentGivenDate: undefined,
          consentWithdrawnDate: undefined,
        },
      });
      allSiteConsents.push({
        id: 'others.survey',
        description: 'Accept to receive all survey emails',
        version: 1.0,
        currentConsent: {
          code: 'others.survey',
          consentGivenDate: undefined,
          consentWithdrawnDate: undefined,
        },
      });
      service
        .maintainUserConsentPreferences(allSiteConsents)
        .subscribe((output) => {
          expect(cdcJsService.getUserConsentPreferences).toHaveBeenCalledWith(
            'sampleuser@mail.com'
          );
          expect(output).toEqual([
            {
              id: 'terms.of.use',
              description: 'Accept the terms of use to proceed further',
              version: 1.0,
              currentConsent: {
                code: 'terms.of.use',
                consentGivenDate: new Date('3 march 2022'),
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
          ]);
          done();
        });
    });
  });
  describe('updateConsent()', () => {
    it('give consent via CDC SDK', () => {
      languageService.getActive = createSpy().and.returnValue(of('en'));
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: 'sampleuser@mail.com' })
      );
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of({
          errorCode: 0,
          errorMessage: '',
          time: new Date('3 march 2023'),
        })
      );
      userConsentService.getConsents = createSpy().and.returnValue(
        of([
          {
            id: 'terms.of.use',
            description: 'Accept the terms of use to proceed further',
            version: 1.0,
            currentConsent: {
              code: 'terms.of.use',
              consentGivenDate: '2022-08-23T12:24:41.948Z',
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
        ])
      );
      service
        .updateConsent('current', true, 'others.survey')
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
      userProfileFacade.get = createSpy().and.returnValue(
        of({ uid: 'sampleuser@mail.com' })
      );
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: false,
          },
        },
      });
      cdcJsService.setUserConsentPreferences = createSpy().and.returnValue(
        of({
          errorCode: 0,
          errorMessage: '',
          time: new Date('4 march 2023'),
        })
      );
      userConsentService.getConsents = createSpy().and.returnValue(
        of([
          {
            id: 'terms.of.use',
            description: 'Accept the terms of use to proceed further',
            version: 1.0,
            currentConsent: {
              code: 'terms.of.use',
              consentGivenDate: new Date('3 march 2022'),
              consentWithdrawnDate: undefined,
            },
          },
          {
            id: 'others.survey',
            description: 'Accept to receive all survey emails',
            version: 1.0,
            currentConsent: {
              code: 'others.survey',
              consentGivenDate: new Date('3 march 2023'),
              consentWithdrawnDate: undefined,
            },
          },
        ])
      );
      service
        .updateConsent('current', false, 'others.survey')
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
    it('do not call update for required consents', () => {
      service.updateConsent('current', false, 'terms.of.use').subscribe();
      expect(cdcJsService.setUserConsentPreferences).not.toHaveBeenCalled();
    });
  });
});
