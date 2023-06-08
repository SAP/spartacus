import { TestBed } from '@angular/core/testing';
import { AnonymousConsentsConfig, ConsentTemplate } from '@spartacus/core';
import { ConsentManagementService } from './consent-management.service';
const mockAnonymousConsentsConfig = {
  anonymousConsents: {
    requiredConsents: ['test.required.consent'],
  },
};
const mockOutput = ['test.required.consent'];
describe('ConsentManagementService', () => {
  let service: ConsentManagementService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        ConsentManagementService,
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    });
    service = TestBed.inject(ConsentManagementService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('getRequiredConsents()', () => {
    let dummy: ConsentTemplate[] = [];
    it('return all required consents', () => {
      let result = service.getRequiredConsents(dummy);
      expect(result).toEqual(mockOutput);
    });
  });
});
