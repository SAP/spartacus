import { TestBed } from '@angular/core/testing';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  Translatable,
  WindowRef,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CdcUserListService } from './cdc-user-list.service';
import createSpy = jasmine.createSpy;
const orgId: string = 'f5fe0023-a8c4-4379-a3e4-5fbda8895f2e';
class MockWinRef {
  get nativeWindow(): Window {
    return {} as Window;
  }
}
class MockCdcJsService implements Partial<CdcJsService> {
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
class MockTableService implements Partial<TableService> {}
class MockB2BUserService implements Partial<B2BUserService> {}
describe('CdcUserListService', () => {
  let service: CdcUserListService;
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
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(CdcUserListService);
    cdcJsService = TestBed.inject(CdcJsService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    TestBed.compileComponents();
    spyOn(globalMessageService, 'add').and.callThrough();
  });
  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('onCreateButtonClick()', () => {
    it('should open delegate admin login successfully', () => {
      cdcJsService.getOrganizationContext = createSpy().and.returnValue(
        of({ orgId: orgId })
      );
      cdcJsService.openDelegatedAdminLogin = createSpy();

      service.onCreateButtonClick();

      expect(cdcJsService.getOrganizationContext).toHaveBeenCalled();
      expect(cdcJsService.openDelegatedAdminLogin).toHaveBeenCalledWith(orgId);
    });
    it('should handle when empty incorrect organization id is passed', () => {
      cdcJsService.getOrganizationContext = createSpy().and.returnValue(
        of({ orgId: '' })
      );
      cdcJsService.openDelegatedAdminLogin = createSpy();

      service.onCreateButtonClick();

      expect(cdcJsService.getOrganizationContext).toHaveBeenCalled();
      expect(cdcJsService.openDelegatedAdminLogin).not.toHaveBeenCalled();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'generalErrors.pageFailure',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
  describe('getCreateButtonType()', () => {
    it('should show Manage Users Button in UI', () => {
      expect(service.getCreateButtonType()).toEqual('BUTTON');
    });
  });
  describe('getCreateButtonLabel()', () => {
    it('should return label for Manage Users Button in UI', () => {
      expect(service.getCreateButtonLabel()).toEqual({
        key: 'organization.manageUsers',
      });
    });
  });
});
