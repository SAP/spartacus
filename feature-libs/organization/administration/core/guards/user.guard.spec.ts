import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { B2BUserService } from '../services';
import { UserGuard } from './user.guard';

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
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
      imports: [StoreModule.forRoot({})],
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
      vi.spyOn(b2bUserService, 'isUpdatingUserAllowed').mockReturnValue(true);
      result = guard.canActivate();
      expect(result).toEqual(true);
    });

    it('should return organization url for redirection when updating user is not allowed', () => {
      let result: boolean | UrlTree;
      vi.spyOn(b2bUserService, 'isUpdatingUserAllowed').mockReturnValue(false);
      result = guard.canActivate();
      expect(result.toString()).toBe('/organization');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
