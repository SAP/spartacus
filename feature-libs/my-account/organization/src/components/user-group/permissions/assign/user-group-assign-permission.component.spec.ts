import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Permission } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentUserGroupService } from '../../services/current-user-group.service';
import { UserGroupAssignPermissionsComponent } from './user-group-assign-permission.component';
import { UserGroupAssignPermissionService } from './user-group-assign-permission.service';

const userGroupCode = 'userGroupCode';

class MockCurrentUserGroupService implements Partial<CurrentUserGroupService> {
  key$ = of(userGroupCode);
}

const mockPermissionList: Table<Permission> = {
  data: [
    {
      code: 'permission-1',
      selected: false,
    },
    {
      code: 'permission-2',
      selected: false,
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  structure: { type: '' },
};

class MockUserGroupPermissionListService {
  getTable(_code) {
    return of(mockPermissionList);
  }
  toggleAssign() {}
}

describe('UserGroupAssignPermissionsComponent', () => {
  let component: UserGroupAssignPermissionsComponent;
  let fixture: ComponentFixture<UserGroupAssignPermissionsComponent>;
  let service: UserGroupAssignPermissionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
        PaginationTestingModule,
      ],
      declarations: [UserGroupAssignPermissionsComponent],
      providers: [
        {
          provide: UserGroupAssignPermissionService,
          useClass: MockUserGroupPermissionListService,
        },
        {
          provide: CurrentUserGroupService,
          useClass: MockCurrentUserGroupService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(UserGroupAssignPermissionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAssignPermissionsComponent);
    component = fixture.componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', () => {
    let result;
    component.dataTable$.subscribe((data) => (result = data));
    expect(result).toEqual(mockPermissionList);
  });

  it('should get users from service by code', () => {
    spyOn(service, 'getTable');
    fixture.detectChanges();
    expect(service.getTable).toHaveBeenCalled();
  });

  describe('with table data', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeFalsy();
    });

    it('should assign a user', () => {
      spyOn(service, 'toggleAssign');
      component.toggleAssign('userGroupCode', 'permission-1', true);
      expect(service.toggleAssign).toHaveBeenCalledWith(
        'userGroupCode',
        'permission-1',
        true
      );
    });

    it('should unassign a permission', () => {
      spyOn(service, 'toggleAssign');
      component.toggleAssign('userGroupCode', 'permission-1', false);
      expect(service.toggleAssign).toHaveBeenCalledWith(
        'userGroupCode',
        'permission-1',
        false
      );
    });
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(null));
      fixture.detectChanges();
    });
    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });
  describe('code$', () => {
    it('should emit the current cost center code', () => {
      let result;
      component.code$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(userGroupCode);
    });
  });
});
