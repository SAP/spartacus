import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';

import { CdcUserGuard } from './cdc-user.guard';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('CdcUserGuard', () => {
  let guard: CdcUserGuard;
  let globalMessageService: GlobalMessageService;

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
      ],
    });
    guard = TestBed.inject(CdcUserGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe('canActivate()', () => {
    it('should return organization url for redirection when updating user is not allowed', () => {
      let result: boolean | UrlTree;
      result = guard.canActivate();
      expect(result.toString()).toBe('/organization');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
