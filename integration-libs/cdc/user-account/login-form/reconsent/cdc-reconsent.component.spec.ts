import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, of, Subscription, take } from 'rxjs';
import { CdcReconsentComponent } from './cdc-reconsent.component';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';
import { AnonymousConsentsService } from '@spartacus/core';
import createSpy = jasmine.createSpy;
import { CdcConsentManagementComponentService } from '@spartacus/cdc/root';
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
class MockCdcReconsentService implements Partial<CdcReconsentComponentService> {
  saveReconsent = createSpy();
  handleReconsentUpdateError = createSpy();
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  data$ = of(reconsentEvent);
}
class MockCdcConsentManagementComponentService
  implements Partial<CdcConsentManagementComponentService>
{
  getConsents = createSpy().and.returnValue(of([]));
  getCdcConsentIDs = createSpy().and.returnValue(of([]));
  isConsentMandatory = createSpy().and.returnValue(true);
}

class MockAnonymousConsentsService
  implements Partial<AnonymousConsentsService> {}
describe('CdcReconsentComponent', () => {
  let component: CdcReconsentComponent;
  let fixture: ComponentFixture<CdcReconsentComponent>;
  let cdcReconsentService: CdcReconsentComponentService;
  let anonymousConsentsService: AnonymousConsentsService;
  let cdcConsentManagementComponentService: CdcConsentManagementComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        { provide: Subscription, useValue: MockSubscription },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: CdcReconsentComponentService,
          useValue: MockCdcReconsentService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CdcConsentManagementComponentService,
          useClass: MockCdcConsentManagementComponentService,
        },
      ],
      declarations: [CdcReconsentComponent],
    });
    cdcReconsentService = TestBed.inject(CdcReconsentComponentService);
    cdcConsentManagementComponentService = TestBed.inject(
      CdcConsentManagementComponentService
    );
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
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
      component.templateList$ = of([{ id: 'terms.of.use' }]);
      component.requiredReconsents = ['terms.of.use'];
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
      component.templateList$ = of([{ id: 'terms.of.use' }]);
      component.requiredReconsents = ['terms.of.use'];
      component.selectedConsents = ['terms.of.use', 'consent.survey'];
      component.disableSubmitButton = false;
      component.onConsentChange({
        given: false,
        template: { id: 'consent.survey' },
      });
      expect(component.selectedConsents).toEqual(['terms.of.use']);
    });
    it('if all mandatory consents are provided', () => {
      component.templateList$ = of([
        { id: 'terms.of.use' },
        { id: 'terms.marketing' },
        { id: 'consent.survey' },
      ]);
      component.requiredReconsents = ['terms.of.use', 'terms.marketing'];
      component.selectedConsents = ['terms.of.use'];
      component.disableSubmitButton = true;
      component.onConsentChange({
        given: true,
        template: { id: 'terms.marketing' },
      });
      expect(component.disableSubmitButton).toEqual(false);
      expect(component.selectedConsents).toEqual([
        'terms.of.use',
        'terms.marketing',
      ]);
    });
    it('if not all mandatory consents are provided', () => {
      component.templateList$ = of([
        { id: 'terms.of.use' },
        { id: 'terms.marketing' },
        { id: 'consent.survey' },
      ]);
      component.requiredReconsents = ['terms.of.use', 'terms.marketing'];
      component.selectedConsents = ['terms.of.use'];
      component.disableSubmitButton = true;
      component.onConsentChange({
        given: true,
        template: { id: 'consent.survey' },
      });
      expect(component.disableSubmitButton).toEqual(true);
      expect(component.selectedConsents).toEqual([
        'terms.of.use',
        'consent.survey',
      ]);
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
      cdcConsentManagementComponentService.getCdcConsentIDs =
        createSpy().and.returnValue(['terms.of.use', 'privacy.use']);
      component.loadConsents(reconsentIds);
      component.templateList$.pipe(take(1)).subscribe((value) => {
        expect(value).toEqual(expectedOutput);
      });
    });
  });
  describe('dismissDialog', () => {
    it('should not proceed to login', () => {
      cdcReconsentService.handleReconsentUpdateError = createSpy().and.stub();
      component.dismissDialog('Error Reason', 'Error message during login');
      expect(
        cdcReconsentService.handleReconsentUpdateError
      ).toHaveBeenCalledWith('Error Reason', 'Error message during login');
    });
    describe('proceed to login', () => {
      it('should provide consent for a consent with new version', () => {
        cdcReconsentService.savePreferencesAndLogin = createSpy().and.stub();
        component.reconsentEvent = {
          preferences: {
            'terms.use': { isConsentGranted: true },
            'terms.marketing': {},
          },
        };
        component.templateList$ = of([{ id: 'terms.marketing' }]);
        component.selectedConsents = ['terms.marketing'];
        component.loaded$ = new BehaviorSubject<boolean>(false);
        component.dismissDialog('Proceed To Login');
        expect(
          cdcReconsentService.savePreferencesAndLogin
        ).toHaveBeenCalledWith(
          [
            { id: 'terms.use', isConsentGranted: true },
            { id: 'terms.marketing', isConsentGranted: true },
          ],
          component.reconsentEvent
        );
      });
      it('should provide consent for a newly added consent', () => {
        cdcReconsentService.savePreferencesAndLogin = createSpy().and.stub();
        component.reconsentEvent = {
          preferences: {
            'terms.use': { isConsentGranted: true },
            'consent.survey': { isConsentGranted: false },
          },
        };
        component.templateList$ = of([{ id: 'terms.marketing' }]);
        component.selectedConsents = ['terms.marketing'];
        component.loaded$ = new BehaviorSubject<boolean>(false);
        component.dismissDialog('Proceed To Login');
        expect(
          cdcReconsentService.savePreferencesAndLogin
        ).toHaveBeenCalledWith(
          [
            { id: 'terms.use', isConsentGranted: true },
            { id: 'consent.survey', isConsentGranted: false },
            { id: 'terms.marketing', isConsentGranted: true },
          ],
          component.reconsentEvent
        );
      });
      it('should not provide consent for a consent with new version, if not checked in reconsent popup', () => {
        cdcReconsentService.savePreferencesAndLogin = createSpy().and.stub();
        component.reconsentEvent = {
          preferences: {
            'terms.use': { isConsentGranted: true },
            'consent.survey': { isConsentGranted: true },
          },
        };
        component.templateList$ = of([{ id: 'consent.survey' }]);
        component.selectedConsents = [];
        component.loaded$ = new BehaviorSubject<boolean>(false);
        component.dismissDialog('Proceed To Login');
        expect(
          cdcReconsentService.savePreferencesAndLogin
        ).toHaveBeenCalledWith(
          [
            { id: 'terms.use', isConsentGranted: true },
            { id: 'consent.survey', isConsentGranted: false },
          ],
          component.reconsentEvent
        );
      });
      it('should provide consent for a consent if checked in popup', () => {
        cdcReconsentService.savePreferencesAndLogin = createSpy().and.stub();
        component.reconsentEvent.preference = {
          preferences: {
            'terms.use': { isConsentGranted: true },
            'consent.survey': { isConsentGranted: false },
          },
        };
        component.templateList$ = of([{ id: 'consent.survey' }]);
        component.selectedConsents = ['consent.survey'];
        component.loaded$ = new BehaviorSubject<boolean>(false);
        component.dismissDialog('Proceed To Login');
        expect(
          cdcReconsentService.savePreferencesAndLogin
        ).toHaveBeenCalledWith(
          [
            { id: 'consent.survey', isConsentGranted: true },
            //{ id: 'terms.use', isConsentGranted: true },
          ],
          component.reconsentEvent
        );
      });
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
