import { TestBed } from '@angular/core/testing';
import { CdcConsentManagementService } from './cdc-consent-management.service';

describe('CdcConsentManagementService', () => {
  let service: CdcConsentManagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [],
    });
    service = TestBed.inject(CdcConsentManagementService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getRequiredConsents()', () => {
    it('return all required consents', () => {
      let input = [
        {
          id: 'terms.of.use',
          required: true,
          currentConsent: {
            code: 'terms.of.use',
            consentGivenDate: new Date('3 march 2022'),
            consentWithdrawnDate: undefined,
          },
        },
        {
          id: 'others.survey',
          required: false,
          currentConsent: {
            code: 'others.survey',
            consentGivenDate: new Date('3 march 2022'),
            consentWithdrawnDate: undefined,
          },
        },
      ];
      let output = ['terms.of.use'];
      let result = service.getRequiredConsents(input);
      expect(result).toEqual(output);
    });
  });
});
