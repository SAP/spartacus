import { TestBed } from '@angular/core/testing';
import { AnonymousConsentsConfig, ConsentTemplate } from '@spartacus/core';
import { ConsentManagementComponentService } from './consent-management-component.service';
const mockAnonymousConsentsConfig = {
  anonymousConsents: {
    requiredConsents: ['test.required.consent'],
  },
};
const mockOutput = ['test.required.consent'];
describe('ConsentManagementComponentService', () => {
  let service: ConsentManagementComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        ConsentManagementComponentService,
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    });
    service = TestBed.inject(ConsentManagementComponentService);
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
