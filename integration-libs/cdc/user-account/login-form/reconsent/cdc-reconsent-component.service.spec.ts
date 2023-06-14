import { TestBed } from '@angular/core/testing';
import { CdcUserConsentService, CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';
import createSpy = jasmine.createSpy;
const reconsentIds = ['consent.survey'];
const userParams = {
  user: 'sample@user.com',
  password: 'password',
  regToken: '45rytthysc2w',
};
class mockedGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
  remove = createSpy();
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();
}
class MockCdcUserConsentService implements Partial<CdcUserConsentService> {
  updateCdcConsent = createSpy();
}
class MockCdcJsService implements Partial<CdcJsService> {
  didLoad = createSpy();
  loginUserWithoutScreenSet = createSpy();
}
describe('CdcReconsentComponentService', () => {
  let service: CdcReconsentComponentService;
  let cdcUserConsentService: CdcUserConsentService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CdcJsService,
        GlobalMessageService,
        LaunchDialogService,
        { provide: CdcUserConsentService, useClass: MockCdcUserConsentService },
        { provide: CdcJsService, useClass: MockCdcJsService },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: GlobalMessageService, useClass: mockedGlobalMessageService },
      ],
    });
    service = TestBed.inject(CdcReconsentComponentService);
    cdcJsService = TestBed.inject(CdcJsService);
    cdcUserConsentService = TestBed.inject(CdcUserConsentService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    TestBed.compileComponents();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('saveReconsent', () => {
    it('on successful save of re-consent', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0, errorMessage: '' })
      );
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'OK' })
      );
      spyOn(service, 'reLogin').and.stub();
      spyOn(service, 'handleReconsentUpdateError').and.stub();
      service.saveReconsent(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalled();
      expect(service.reLogin).toHaveBeenCalledWith(
        userParams.user,
        userParams.password
      );
      expect(service.handleReconsentUpdateError).not.toHaveBeenCalled();
    });
    it('on error during save of re-consent', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 404, errorMessage: 'error during process' })
      );
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'OK' })
      );
      launchDialogService.closeDialog = createSpy().and.stub();
      spyOn(service, 'reLogin').and.stub();
      spyOn(service, 'handleReconsentUpdateError').and.stub();
      service.saveReconsent(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalled();
      expect(service.reLogin).not.toHaveBeenCalled();
      expect(service.handleReconsentUpdateError).toHaveBeenCalled();
    });
    it('should stop processing in case of cdc load failure', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(false));
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 404, errorMessage: 'error during process' })
      );
      globalMessageService.add = createSpy().and.stub();
      service.saveReconsent(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalled();
    });
  });
  describe('reLogin', () => {
    it('on successful login', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'OK' })
      );
      launchDialogService.closeDialog = createSpy().and.stub();
      service.reLogin(userParams.user, userParams.password);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'Login completed successfully'
      );
    });
    it('on error during login', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'NOT OK' })
      );
      launchDialogService.closeDialog = createSpy().and.stub();
      service.reLogin(userParams.user, userParams.password);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'Error During Relogin'
      );
    });
    it('on error during cdc loading', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(false));
      globalMessageService.add = createSpy().and.stub();
      service.reLogin(userParams.user, userParams.password);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalled();
    });
  });
  describe('handleReconsentUpdateError', () => {
    it('should close dialog and raise error', () => {
      launchDialogService.closeDialog = createSpy().and.stub();
      globalMessageService.add = createSpy().and.stub();
      service.handleReconsentUpdateError(
        'Error During Reconsent Update',
        'error message'
      );
      expect(globalMessageService.add).toHaveBeenCalled();
      expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
        'Error During Reconsent Update'
      );
    });
  });
  describe('ngOnDestroy', () => {
    it('should unsubscribe from any subscriptions when destroyed', () => {
      spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });
});
