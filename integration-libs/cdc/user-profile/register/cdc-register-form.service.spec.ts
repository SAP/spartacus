import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { AnonymousConsentsService } from '@spartacus/core';
import { of } from 'rxjs';
import { CdcConsentManagementService } from '../../root/consent-management/services/cdc-consent-management.service';
import { CdcRegisterFormService } from './cdc-register-form.service';
import createSpy = jasmine.createSpy;
class MockCdcConsentManagementService
  implements Partial<CdcConsentManagementService>
{
  getCdcRequiredConsents = createSpy();
}
class MockAnonymousConsentsService
  implements Partial<AnonymousConsentsService>
{
  getTemplates = createSpy();
}
class MockUntypedFormBuilder implements Partial<UntypedFormBuilder> {
  array = createSpy();
  group = createSpy();
}
describe('CdcRegisterFormService', () => {
  let service: CdcRegisterFormService;
  let cdcConsentManagementService: CdcConsentManagementService;
  let fb: UntypedFormBuilder;
  let anonymousConsentsService: AnonymousConsentsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: CdcConsentManagementService,
          useClass: MockCdcConsentManagementService,
        },
        {
          provide: UntypedFormBuilder,
          useClass: MockUntypedFormBuilder,
        },
      ],
    });
    service = TestBed.inject(CdcRegisterFormService);
    cdcConsentManagementService = TestBed.inject(CdcConsentManagementService);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    fb = TestBed.inject(UntypedFormBuilder);
    TestBed.compileComponents();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('generateConsentsFormControl', () => {
    cdcConsentManagementService.getCdcRequiredConsents =
      createSpy().and.returnValue(['consent1.terms1']);
    fb.array = createSpy().and.returnValue([]);
    service.generateConsentsFormControl();
    expect(
      cdcConsentManagementService.getCdcRequiredConsents
    ).toHaveBeenCalled();
    expect(fb.array).toHaveBeenCalled();
  });
  it('loadExtraRegistrationConsents', () => {
    cdcConsentManagementService.getCdcRequiredConsents =
      createSpy().and.returnValue(['consent2.terms2', 'consent3.terms3']);
    anonymousConsentsService.getTemplates = createSpy().and.returnValue(
      of([
        {
          id: 'consent1.terms1',
          description: 'sample consent 1',
        },
        {
          id: 'consent2.terms2',
          description: 'sample consent 2',
        },
        {
          id: 'consent3.terms3',
          description: 'sample consent 3',
        },
      ])
    );
    service.loadExtraRegistrationConsents().subscribe((value) => {
      expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
      expect(
        cdcConsentManagementService.getCdcRequiredConsents
      ).toHaveBeenCalled();
      expect(value).toEqual([
        {
          template: {
            id: 'consent2.terms2',
            description: 'sample consent 2',
          },
          required: true,
        },
        {
          template: {
            id: 'consent3.terms3',
            description: 'sample consent 3',
          },
          required: true,
        },
      ]);
    });
  });
});
