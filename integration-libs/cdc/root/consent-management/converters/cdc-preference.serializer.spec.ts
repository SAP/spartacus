import { TestBed } from '@angular/core/testing';
import { CdcPreferenceSerializer } from './cdc-preference.serializer';
import { CdcConsent } from '../model';
const mockInput: CdcConsent[] = [
  { id: 'terms.of.use', isConsentGranted: true },
  { id: 'terms.marketing', isConsentGranted: false },
  { id: 'others.analytics', isConsentGranted: true },
];

const mockOutput = {
  terms: {
    of: {
      use: {
        isConsentGranted: true,
      },
    },
    marketing: {
      isConsentGranted: false,
    },
  },
  others: {
    analytics: {
      isConsentGranted: true,
    },
  },
};
describe('CdcPreferenceSerializer', () => {
  let service: CdcPreferenceSerializer;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [],
    });
    service = TestBed.inject(CdcPreferenceSerializer);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('convert()', () => {
    it('convert consent array into cdc user preference', () => {
      let target = {};
      target = service.convert(mockInput, target);
      expect(target).toEqual(mockOutput);
    });
  });
});
