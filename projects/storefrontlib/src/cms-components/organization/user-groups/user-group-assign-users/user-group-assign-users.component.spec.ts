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
  UserGroupService,
  B2BUser,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { UserGroupAssignUsersComponent } from './user-group-assign-users.component';

const code = 'userGroupCode';
const email = '1';
const userRow = {
  row: {
    email,
  },
};

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockUserList: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: '1',
      selected: true,
      name: 'User 1',
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      uid: '2',
      selected: true,
      name: 'User 2',
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockUserUIList = {
  values: [
    {
      email: '1',
      selected: true,
      name: 'User 1',
      parentUnit: 'orgName',
      uid: 'orgUid',
    },
    {
      email: '2',
      selected: true,
      name: 'User 2',
      parentUnit: 'orgName2',
      uid: 'orgUid2',
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

const userList = new BehaviorSubject(mockUserList);

class MockUserGroupService implements Partial<UserGroupService> {
  loadAvailableOrgCustomers = createSpy('loadAvailableOrgCustomers');

  getAvailableOrgCustomers = createSpy(
    'getAvailableOrgCustomers'
  ).and.returnValue(userList);

  assignMember = createSpy('assign');
  unassignMember = createSpy('unassign');
  unassignAllMembers = createSpy('unassignAll');
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

describe('UserGroupAssignUsersComponent', () => {
  let component: UserGroupAssignUsersComponent;
  let fixture: ComponentFixture<UserGroupAssignUsersComponent>;
  let service: MockUserGroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserGroupAssignUsersComponent,
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
    fixture = TestBed.createComponent(UserGroupAssignUsersComponent);
    component = fixture.componentInstance;
    userList.next(mockUserList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No users found page if no users are found', () => {
    const emptyUserList: EntitiesModel<B2BUser> = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    userList.next(emptyUserList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read users list', () => {
      component.ngOnInit();

      let usersList: any;
      component.data$.subscribe(value => {
        usersList = value;
      });

      expect(service.loadAvailableOrgCustomers).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(service.getAvailableOrgCustomers).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(usersList).toEqual(mockUserUIList);
    });
  });

  describe('assign', () => {
    it('should assign user', () => {
      component.assign(userRow);
      expect(service.assignMember).toHaveBeenCalledWith(
        code,
        userRow.row.email
      );
    });
  });

  describe('unassign', () => {
    it('should unassign user', () => {
      component.unassign(userRow);
      expect(service.unassignMember).toHaveBeenCalledWith(
        code,
        userRow.row.email
      );
    });
  });

  describe('unassignAll', () => {
    it('should unassign all users', () => {
      component.unassignAll();
      expect(service.unassignAllMembers).toHaveBeenCalledWith(code);
    });
  });
});
