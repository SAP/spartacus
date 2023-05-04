import { TestBed } from '@angular/core/testing';
import { ConsentTemplate } from '@spartacus/core';
import { CdcUserPreferenceSerializer } from './cdc-user-preference.serializer';

describe('CdcUserPreferenceSerializer', () => {
  let service: CdcUserPreferenceSerializer;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [],
    });
    service = TestBed.inject(CdcUserPreferenceSerializer);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('convert()', () => {
    it('convert consent template into cdc user preference', () => {
      let input: ConsentTemplate = {
        id: 'terms.of.use',
        name: '',
        description: 'Accept the terms of use to proceed further',
        version: 1,
        documentUrl: 'https://accounts.gigya.com/',
        required: true,
        currentConsent: {
          code: 'terms.of.use',
          consentGivenDate: new Date('3 march 2022'),
          consentWithdrawnDate: undefined,
        },
      };
      let target = {};
      let output = {
        terms: {
          of: {
            use: {
              isConsentGranted: true,
            },
          },
        },
      };
      target = service.convert(input, target);
      expect(target).toEqual(output);
    });
  });
});
