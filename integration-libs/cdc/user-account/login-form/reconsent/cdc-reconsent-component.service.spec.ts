import { TestBed } from '@angular/core/testing';
import { CdcUserConsentService, CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
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
  describe('saveConsentAndLogin', () => {
    it('on successful save of re-consent and re-login', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 0, errorMessage: '' })
      );
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'OK' })
      );
      spyOn(service, 'handleReconsentUpdateError').and.stub();
      service.saveConsentAndLogin(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).toHaveBeenCalledWith(
        userParams.user,
        userParams.password
      );
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalled();
      expect(service.handleReconsentUpdateError).not.toHaveBeenCalled();
    });
    it('on error during save of re-consent', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        throwError({ errorCode: 404, errorMessage: 'error during process' })
      );
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'OK' })
      );
      launchDialogService.closeDialog = createSpy().and.stub();
      spyOn(service, 'handleReconsentUpdateError').and.stub();
      service.saveConsentAndLogin(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcConsent).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(service.handleReconsentUpdateError).toHaveBeenCalled();
    });
    it('should stop processing in case of cdc load failure', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(false));
      cdcJsService.loginUserWithoutScreenSet = createSpy().and.returnValue(
        of({ status: 'ok' })
      );
      cdcUserConsentService.updateCdcConsent = createSpy().and.returnValue(
        of({ errorCode: 404, errorMessage: 'error during process' })
      );
      globalMessageService.add = createSpy().and.stub();
      service.saveConsentAndLogin(reconsentIds, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcConsent).not.toHaveBeenCalled();
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
