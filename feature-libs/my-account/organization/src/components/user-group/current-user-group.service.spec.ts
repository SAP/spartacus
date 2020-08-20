import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUserGroupService } from './current-user-group.service';
import { UserGroupService } from '../../core/services/user-group.service';
import { UserGroup } from '../../core/model/user-group.model';
export class MockUserGroupService implements Partial<UserGroupService> {
  get() {
    return of(undefined);
  }
}

describe('CurrentUserGroupService', () => {
  let service: CurrentUserGroupService;
  let userGroupService: UserGroupService;
  let mockParams: Subject<object>;

  beforeEach(() => {
    mockParams = new Subject();

    TestBed.configureTestingModule({
      providers: [
        CurrentUserGroupService,
        { provide: ActivatedRoute, useValue: { params: mockParams } },
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
    });

    userGroupService = TestBed.inject(UserGroupService);
    service = TestBed.inject(CurrentUserGroupService);
  });

  afterEach(() => {
    mockParams.complete();
  });

  describe('code$', () => {
    it('should return undefined when route param `code` is undefined', async () => {
      const results = [];
      service.code$.pipe(take(2)).subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should expose route param `code` from activated route', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ code: 'code1' });
      mockParams.next({ code: 'code2' });
      expect(results).toEqual(['code1', 'code2']);
    });

    it('should not emit when param `code` did not change', () => {
      const results = [];
      service.code$.subscribe((value) => results.push(value));
      mockParams.next({ name: 'name1', code: 'code' });
      mockParams.next({ name: 'name2', code: 'code' });
      expect(results).toEqual(['code']);
    });
  });

  describe('model$', () => {
    it('should expose model for the current routing param `code`', () => {
      const mockCostCenter: UserGroup = { name: 'test name' };
      spyOn(userGroupService, 'get').and.returnValue(of(mockCostCenter));

      let result;
      service.userGroup$.subscribe((value) => (result = value));
      mockParams.next({ code: '123' });
      expect(userGroupService.get).toHaveBeenCalledWith('123');
      expect(result).toBe(mockCostCenter);
    });

    it('should emit null when no current param `code`', () => {
      spyOn(userGroupService, 'get');

      let result;
      service.userGroup$.subscribe((value) => (result = value));
      mockParams.next({});
      expect(userGroupService.get).not.toHaveBeenCalled();
      expect(result).toBe(null);
    });
  });
});
