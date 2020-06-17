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
  RoutesConfig,
  RoutingConfig,
  Permission,
  UserGroupService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from '../../../../shared/components/list-navigation/pagination/config/pagination.config';
import { UserGroupPermissionsComponent } from './user-group-permissions.component';

const code = 'userGroupCode';

const params: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 2147483647,
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
      selected: false,
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
      parentUnit: 'orgName',
      uid: 'orgUid',
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
  loadAvailableOrderApprovalPermissions = createSpy(
    'loadAvailableOrderApprovalPermissions'
  );

  getAvailableOrderApprovalPermissions = createSpy(
    'getAvailableOrderApprovalPermissions'
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

describe('UserGroupPermissionsComponent', () => {
  let component: UserGroupPermissionsComponent;
  let fixture: ComponentFixture<UserGroupPermissionsComponent>;
  let service: MockUserGroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserGroupPermissionsComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
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
    fixture = TestBed.createComponent(UserGroupPermissionsComponent);
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
      component.data$.subscribe((value) => {
        permissionsList = value;
      });

      expect(
        service.loadAvailableOrderApprovalPermissions
      ).toHaveBeenCalledWith(code, params);
      expect(service.getAvailableOrderApprovalPermissions).toHaveBeenCalledWith(
        code,
        params
      );
      expect(permissionsList).toEqual(mockPermissionUIList);
    });
  });
});
