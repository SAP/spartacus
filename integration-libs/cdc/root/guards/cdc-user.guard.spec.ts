import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { CdcB2BUserService } from 'integration-libs/cdc/organization/administration/cdc-b2b-user.service';

import { CdcUserGuard } from './cdc-user.guard';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

class MockCdcB2BUserService implements Partial<CdcB2BUserService> {
  isUpdatingUserAllowed(): boolean {
    return false;
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('CdcUserGuard', () => {
  let guard: CdcUserGuard;
  let globalMessageService: GlobalMessageService;
  let cdcb2bUserService: CdcB2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        CdcUserGuard,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: CdcB2BUserService,
          useClass: MockCdcB2BUserService,
        },
      ],
    });
    guard = TestBed.inject(CdcUserGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcb2bUserService = TestBed.inject(CdcB2BUserService);
  });

  describe('canActivate()', () => {
    it('should return true when updating user is allowed', () => {
      let result: boolean | UrlTree;
      spyOn(cdcb2bUserService, 'isUpdatingUserAllowed').and.returnValue(true);
      result = guard.canActivate();
      expect(result).toEqual(true);
    });

    it('should return organization url for redirection when updating user is not allowed', () => {
      let result: boolean | UrlTree;
      spyOn(cdcb2bUserService, 'isUpdatingUserAllowed').and.returnValue(false);
      result = guard.canActivate();
      expect(result.toString()).toBe('/organization');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
