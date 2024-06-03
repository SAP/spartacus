import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '../services';
import { UserGuard } from './user.guard';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

class MockB2BUserService implements Partial<B2BUserService> {
  isUpdatingUserAllowed(): boolean {
    return true;
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('UserGuard', () => {
  let guard: UserGuard;
  let globalMessageService: GlobalMessageService;
  let b2bUserService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        UserGuard,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
      ],
    });
    guard = TestBed.inject(UserGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    b2bUserService = TestBed.inject(B2BUserService);
  });

  describe('canActivate()', () => {
    it('should return true when updating user is allowed', () => {
      let result: boolean | UrlTree;
      spyOn(b2bUserService, 'isUpdatingUserAllowed').and.returnValue(true);
      result = guard.canActivate();
      expect(result).toEqual(true);
    });

    it('should return organization url for redirection when updating user is not allowed', () => {
      let result: boolean | UrlTree;
      spyOn(b2bUserService, 'isUpdatingUserAllowed').and.returnValue(false);
      result = guard.canActivate();
      expect(result.toString()).toBe('/organization');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
