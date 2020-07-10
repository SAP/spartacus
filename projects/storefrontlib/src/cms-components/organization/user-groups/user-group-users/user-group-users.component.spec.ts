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
  UserGroupService,
  B2BUser,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from '../../../../shared/components/list-navigation/pagination/config/pagination.config';
import { UserGroupUsersComponent } from './user-group-users.component';
import { IconLoaderService } from '../../../misc';
import { MockIconLoaderService } from '../../../misc/icon/icon.component.spec';

const code = 'userGroupCode';

const params: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 2147483647,
};
const customerId = 'customerId1';

const mockUserList: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: '1',
      customerId,
      selected: true,
      name: 'User 1',
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      uid: '2',
      customerId: 'customerId2',
      selected: false,
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
      name: 'User 1',
      parentUnit: 'orgName',
      uid: 'orgUid',
      customerId,
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

describe('UserGroupUsersComponent', () => {
  let component: UserGroupUsersComponent;
  let fixture: ComponentFixture<UserGroupUsersComponent>;
  let service: MockUserGroupService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserGroupUsersComponent,
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
        { provide: IconLoaderService, useClass: MockIconLoaderService },
      ],
    }).compileComponents();

    service = TestBed.get(UserGroupService as Type<UserGroupService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupUsersComponent);
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
      component.data$.subscribe((value) => {
        usersList = value;
      });

      expect(service.loadAvailableOrgCustomers).toHaveBeenCalledWith(
        code,
        params
      );
      expect(service.getAvailableOrgCustomers).toHaveBeenCalledWith(
        code,
        params
      );
      expect(usersList).toEqual(mockUserUIList);
    });
  });
});
