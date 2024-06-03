import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import {
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { OrgUnitService } from '../services';
import { OrgUnitGuard } from './org-unit.guard';
import createSpy = jasmine.createSpy;

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy('add');
}

class MockOrgUnitService implements Partial<OrgUnitService> {
  isUpdatingUnitAllowed(): boolean {
    return true;
  }
}

class SemanticPathServiceStub implements Partial<SemanticPathService> {
  get(a: string) {
    return `/${a}`;
  }
}

describe('OrgUnitGuard', () => {
  let guard: OrgUnitGuard;
  let globalMessageService: GlobalMessageService;
  let orgUnitService: OrgUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        OrgUnitGuard,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: SemanticPathService,
          useClass: SemanticPathServiceStub,
        },
        {
          provide: OrgUnitService,
          useClass: MockOrgUnitService,
        },
      ],
    });
    guard = TestBed.inject(OrgUnitGuard);
    globalMessageService = TestBed.inject(GlobalMessageService);
    orgUnitService = TestBed.inject(OrgUnitService);
  });

  describe('canActivate()', () => {
    it('should return true when updating unit is allowed', () => {
      let result: boolean | UrlTree;
      spyOn(orgUnitService, 'isUpdatingUnitAllowed').and.returnValue(true);
      result = guard.canActivate();
      expect(result).toEqual(true);
    });

    it('should return organization url for redirection when updating unit is not allowed', () => {
      let result: boolean | UrlTree;
      spyOn(orgUnitService, 'isUpdatingUnitAllowed').and.returnValue(false);
      result = guard.canActivate();
      expect(result.toString()).toBe('/organization');
      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'organization.notification.notExist' },
        GlobalMessageType.MSG_TYPE_WARNING
      );
    });
  });
});
