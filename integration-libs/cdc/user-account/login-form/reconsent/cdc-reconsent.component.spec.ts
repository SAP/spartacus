import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { CdcJsService } from '../../../root/service';
import { of, Subscription } from 'rxjs';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { CdcReconsentService } from './cdc-reconsent.service';
import createSpy = jasmine.createSpy;
import { AnonymousConsentsService } from '@spartacus/core';
import { take } from 'rxjs/operators';
const reconsentEvent = {
  user: 'sample@user.com',
  password: 'password',
  regToken: 'fg56sdfg',
  errorMessage: 'Account registration pending',
  consentIds: ['consent.survey'],
};
class MockSubscription {
  unsubscribe() {}
  add() {}
}
class MockCdcReconsentService implements Partial<CdcReconsentService> {
  saveReconsent = createSpy();
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();
  data$ = of(reconsentEvent);
}
class MockCdcJsService implements Partial<CdcJsService> {
  handleLoginError = createSpy();
}
class MockAnonymousConsentsService
  implements Partial<AnonymousConsentsService> {}
describe('CdcReconsentComponent', () => {
  let component: CdcReconsentComponent;
  let fixture: ComponentFixture<CdcReconsentComponent>;
  let cdcReconsentService: CdcReconsentService;
  let cdcJsService: CdcJsService;
  let launchDialogService: LaunchDialogService;
  let anonymousConsentsService: AnonymousConsentsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Subscription, useValue: MockSubscription },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        { provide: CdcJsService, useClass: MockCdcJsService },
        { provide: CdcReconsentService, useValue: MockCdcReconsentService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
      declarations: [CdcReconsentComponent],
    });
    cdcReconsentService = TestBed.inject(CdcReconsentService);
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    cdcJsService = TestBed.inject(CdcJsService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture = TestBed.createComponent(CdcReconsentComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should initialize the component', () => {
      spyOn(component, 'loadConsents').and.stub();
      component.reconsentEvent = {};
      component.ngOnInit();
      expect(component.reconsentEvent.user).toEqual(reconsentEvent.user);
      expect(component.reconsentEvent.password).toEqual(
        reconsentEvent.password
      );
      expect(component.reconsentEvent.regToken).toEqual(
        reconsentEvent.regToken
      );
      expect(component.reconsentEvent.errorMessage).toEqual(
        reconsentEvent.errorMessage
      );
      expect(component.loadConsents).toHaveBeenCalledWith(
        reconsentEvent.consentIds
      );
    });
  });
  describe('onConsentChange', () => {
    it('if consent is given', () => {
      component.totalConsents = 2;
      component.selectedConsents = ['terms.of.use'];
      component.disableSubmitButton = true;
      component.onConsentChange({
        given: true,
        template: { id: 'consent.survey' },
      });
      expect(component.disableSubmitButton).toEqual(false);
      expect(component.selectedConsents).toEqual([
        'terms.of.use',
        'consent.survey',
      ]);
    });
    it('if consent is withdrawn', () => {
      component.totalConsents = 2;
      component.selectedConsents = ['terms.of.use', 'consent.survey'];
      component.disableSubmitButton = false;
      component.onConsentChange({
        given: false,
        template: { id: 'consent.survey' },
      });
      expect(component.disableSubmitButton).toEqual(true);
      expect(component.selectedConsents).toEqual(['terms.of.use']);
    });
  });
  describe('loadConsents', () => {
    const anonymousConsents = [
      { id: 'terms.of.use' },
      { id: 'consent.survey' },
      { id: 'privacy.use' },
    ];
    const reconsentIds = ['consent.survey', 'privacy.use'];
    const expectedOutput = [{ id: 'consent.survey' }, { id: 'privacy.use' }];
    it('should load all anonymous consents', () => {
      anonymousConsentsService.getTemplates = createSpy().and.returnValue(
        of(anonymousConsents)
      );
      component.loadConsents(reconsentIds);
      component.templateList$.pipe(take(1)).subscribe((value) => {
        expect(component.totalConsents).toEqual(2);
        expect(value).toEqual(expectedOutput);
      });
    });
  });
  describe('dismissDialog', () => {
    it('should proceed to login', () => {
      cdcReconsentService.saveReconsent = createSpy().and.stub();
      component.dismissDialog('Proceed To Login');
      expect(cdcReconsentService.saveReconsent).toHaveBeenCalled();
    });
    it('should not proceed to login', () => {
      launchDialogService.closeDialog = createSpy().and.stub();
      cdcJsService.handleLoginError = createSpy().and.stub();
      component.dismissDialog('Error', 'Error message during login');
      expect(launchDialogService.closeDialog).toHaveBeenCalled();
      expect(cdcJsService.handleLoginError).toHaveBeenCalled();
    });
  });
  describe('ngOnDestroy', () => {
    it('should unsubscribe from any subscriptions when destroyed', () => {
      spyOn(component['subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(component['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });
});
