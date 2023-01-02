import { TestBed } from '@angular/core/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { manageUsersService } from './manage-users.service';
import createSpy = jasmine.createSpy;
const orgId: string = 'f5fe0023-a8c4-4379-a3e4-5fbda8895f2e';
class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}
class MockCdcJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.returnValue(of(true));
  openDelegatedAdminLogin = createSpy();
  getOrganizationContext = createSpy();
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  get(): Observable<GlobalMessageEntities> {
    return of({});
  }
  add(_: string | Translatable, __: GlobalMessageType, ___?: number): void {}
  remove(_: GlobalMessageType, __?: number): void {}
}

describe('manageUsersService', () => {
  let service: manageUsersService;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
        {
          provide: CdcJsService,
          useClass: MockCdcJsService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: WindowRef,
          useClass: MockWinRef,
        },
      ],
    });
    service = TestBed.inject(manageUsersService);
    cdcJsService = TestBed.inject(CdcJsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    TestBed.compileComponents();
    spyOn(globalMessageService, 'add').and.callThrough();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('openDelegateAdminLogin()', () => {
    it('should open delegate admin login successfully', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcJsService.getOrganizationContext = createSpy().and.returnValue(
        of({ orgId: orgId })
      );
      cdcJsService.openDelegatedAdminLogin = createSpy();

      service.openDelegateAdminLogin();

      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.getOrganizationContext).toHaveBeenCalled();
      expect(cdcJsService.openDelegatedAdminLogin).toHaveBeenCalledWith(orgId);
    });
    it('should handle when empty incorrect organization id is passed', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(true));
      cdcJsService.getOrganizationContext = createSpy().and.returnValue(
        of({ orgId: '' })
      );
      cdcJsService.openDelegatedAdminLogin = createSpy();

      service.openDelegateAdminLogin();

      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.getOrganizationContext).toHaveBeenCalled();
      expect(cdcJsService.openDelegatedAdminLogin).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'generalErrors.pageFailure',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
    it('should handle a failed CDC SDK Load Request', () => {
      cdcJsService.didLoad = createSpy().and.returnValue(of(false));
      cdcJsService.getOrganizationContext = createSpy().and.returnValue(
        of({ orgId: orgId })
      );
      cdcJsService.openDelegatedAdminLogin = createSpy();

      service.openDelegateAdminLogin();

      expect(cdcJsService.didLoad).toHaveBeenCalled();
      expect(cdcJsService.getOrganizationContext).not.toHaveBeenCalled();
      expect(cdcJsService.openDelegatedAdminLogin).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'errorHandlers.scriptFailedToLoad',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
