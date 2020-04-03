import {
  Pipe,
  PipeTransform,
  Type,
  Input,
  Output,
  EventEmitter,
  Component,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  Permission,
  UserGroupService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { UserGroupAssignPermissionsComponent } from './user-group-assign-permissions.component';

const code = 'userGroupCode';
const permissionCode = '1';
const permissionRow = {
  row: {
    code: permissionCode,
  },
};

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockPermissionList: EntitiesModel<Permission> = {
  values: [
    {
      code: '1',
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      code: '2',
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockPermissionUIList = {
  values: [
    {
      code: '1',
      selected: true,
      parentUnit: 'orgName',
      uid: 'orgUid',
      threshold: ' $',
      orderType: undefined,
      timePeriod: undefined,
    },
    {
      code: '2',
      selected: true,
      parentUnit: 'orgName2',
      uid: 'orgUid2',
      threshold: ' $',
      orderType: undefined,
      timePeriod: undefined,
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};
@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const permissionList = new BehaviorSubject(mockPermissionList);

class MockUserGroupService implements Partial<UserGroupService> {
  loadUserGroupAvailableOrderApprovalPermissions = createSpy(
    'loadUserGroupAvailableOrderApprovalPermissions'
  );

  getUserGroupAvailableOrderApprovalPermissions = createSpy(
    'getUserGroupAvailableOrderApprovalPermissions'
  ).and.returnValue(permissionList);

  assignPermission = createSpy('assign');

  unassignPermission = createSpy('unassign');
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        params: {
          code,
        },
        queryParams: {
          sort: 'byName',
          currentPage: '0',
          pageSize: '5',
        },
      },
    });
  }
}
const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class MockCxDatePipe {
  transform(value: string) {
    return value.split('T')[0];
  }
}

describe('UserGroupAssignPermissionsComponent', () => {
  let component: UserGroupAssignPermissionsComponent;
  let fixture: ComponentFixture<UserGroupAssignPermissionsComponent>;
  let service: MockUserGroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserGroupAssignPermissionsComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: UserGroupService,
          useClass: MockUserGroupService,
        },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    service = TestBed.get(UserGroupService as Type<UserGroupService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupAssignPermissionsComponent);
    component = fixture.componentInstance;
    permissionList.next(mockPermissionList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No permissions found page if no permissions are found', () => {
    const emptyPermissionList: EntitiesModel<Permission> = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    permissionList.next(emptyPermissionList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read permission list', () => {
      component.ngOnInit();

      let permissionsList: any;
      component.data$.subscribe(value => {
        permissionsList = value;
      });

      expect(
        service.loadUserGroupAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(code, defaultParams);
      expect(
        service.getUserGroupAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(code, defaultParams);
      expect(permissionsList).toEqual(mockPermissionUIList);
    });
  });

  describe('assign', () => {
    it('should assign permission', () => {
      component.assign(permissionRow);
      expect(service.assignPermission).toHaveBeenCalledWith(
        code,
        permissionRow.row.code
      );
    });
  });

  describe('unassign', () => {
    it('should unassign permission', () => {
      component.unassign(permissionRow);
      expect(service.unassignPermission).toHaveBeenCalledWith(
        code,
        permissionRow.row.code
      );
    });
  });
});
