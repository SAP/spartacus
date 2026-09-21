import { TestBed } from '@angular/core/testing';
import { CdcUserConsentService, CdcJsService } from '@spartacus/cdc/root';
import { GlobalMessageService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { of, throwError } from 'rxjs';
import { CdcReconsentComponentService } from './cdc-reconsent-component.service';
const reconsentIdsWithStatus = [
  { id: 'consent.survey', isConsentGranted: true },
];
const userParams = {
  user: 'sample@user.com',
  password: 'password',
  regToken: '45rytthysc2w',
};
class mockedGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
  remove = vi.fn();
}
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = vi.fn();
}
class MockCdcUserConsentService implements Partial<CdcUserConsentService> {
  updateCdcUserPreferences = vi.fn();
}
class MockCdcJsService implements Partial<CdcJsService> {
  didLoad = vi.fn();
  loginUserWithoutScreenSet = vi.fn();
}
describe('CdcReconsentComponentService', () => {
  let service: CdcReconsentComponentService;
  let cdcUserConsentService: CdcUserConsentService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  let launchDialogService: LaunchDialogService;
  beforeEach(() => {
    TestBed.configureTestingModule({
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
  describe('savePreferencesAndLogin', () => {
    it('on successful save of re-consent and re-login', () => {
      cdcJsService.didLoad = vi.fn().mockReturnValue(of(true));
      cdcUserConsentService.updateCdcUserPreferences =
        vi.fn().mockReturnValue(of({ errorCode: 0, errorMessage: '' }));
      cdcJsService.loginUserWithoutScreenSet = vi.fn().mockReturnValue(
        of({ status: 'OK' })
      );
      vi.spyOn(service, 'handleReconsentUpdateError').mockImplementation(() => {});
      service.savePreferencesAndLogin(reconsentIdsWithStatus, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).toHaveBeenCalledWith(
        userParams.user,
        userParams.password
      );
      expect(cdcUserConsentService.updateCdcUserPreferences).toHaveBeenCalled();
      expect(service.handleReconsentUpdateError).not.toHaveBeenCalled();
    });
    it('on error during save of re-consent', () => {
      cdcJsService.didLoad = vi.fn().mockReturnValue(of(true));
      cdcUserConsentService.updateCdcUserPreferences =
        vi.fn().mockReturnValue(
          throwError({ errorCode: 404, errorMessage: 'error during process' })
        );
      cdcJsService.loginUserWithoutScreenSet = vi.fn().mockReturnValue(
        of({ status: 'OK' })
      );
      launchDialogService.closeDialog = vi.fn().mockImplementation(() => {});
      vi.spyOn(service, 'handleReconsentUpdateError').mockImplementation(() => {});
      service.savePreferencesAndLogin(reconsentIdsWithStatus, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcUserConsentService.updateCdcUserPreferences).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(service.handleReconsentUpdateError).toHaveBeenCalled();
    });
    it('should stop processing in case of cdc load failure', () => {
      cdcJsService.didLoad = vi.fn().mockReturnValue(of(false));
      cdcJsService.loginUserWithoutScreenSet = vi.fn().mockReturnValue(
        of({ status: 'ok' })
      );
      cdcUserConsentService.updateCdcUserPreferences =
        vi.fn().mockReturnValue(
          of({ errorCode: 404, errorMessage: 'error during process' })
        );
      globalMessageService.add = vi.fn().mockImplementation(() => {});
      service.savePreferencesAndLogin(reconsentIdsWithStatus, userParams);
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.loginUserWithoutScreenSet).not.toHaveBeenCalled();
      expect(
        cdcUserConsentService.updateCdcUserPreferences
      ).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalled();
    });
  });
  describe('handleReconsentUpdateError', () => {
    it('should close dialog and raise error', () => {
      launchDialogService.closeDialog = vi.fn().mockImplementation(() => {});
      globalMessageService.add = vi.fn().mockImplementation(() => {});
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
      vi.spyOn(service['subscription'], 'unsubscribe');
      service.ngOnDestroy();
      expect(service['subscription'].unsubscribe).toHaveBeenCalled();
    });
  });
});
