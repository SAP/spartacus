import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  B2BSearchConfig,
  B2BUser,
  B2BUserService,
  EntitiesModel,
  I18nTestingModule,
  OrgUnitService,
  RoutesConfig,
  RoutingConfig,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import {defaultStorefrontRoutesConfig} from "projects/storefrontlib/src/cms-structure/routing/default-routing-config";
import {UnitUserAssignRolesComponent} from "./unit-user-assign-roles.component";
import {InteractiveTableModule, PaginationConfig} from "@spartacus/storefront";

const code = 'unitCode';
const roleId = 'b2bcustomergroup';
const customerId = 'customerId1';

const expectedCustomerId = 'testCustomerId';
const inputEventAssign: any = {
  key: 'b2badmingroup',
  row: {
    customerId: 'testCustomerId',
    email: 'test@test.com',
    roles: ['b2bcustomergroup', 'b2bmanagergroup'],
  },
};
const inputEventUnassign: any = {
  key: 'b2bcustomergroup',
  row: {
    customerId: 'testCustomerId',
    email: 'test@test.com',
    roles: ['b2bcustomergroup', 'b2bmanagergroup'],
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
      name: 'b1',
      uid: 'aaa@bbb',
      customerId,
      selected: true,
      orgUnit: { uid: 'orgUid', name: 'orgName' },
      roles: [],
    },
    {
      name: 'b2',
      uid: 'aaa2@bbb',
      customerId: 'customerId2',
      selected: false,
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
      roles: [],
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockUserUIList = {
  sorts: [{ code: 'byName', selected: true }],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  values: [
    {
      selected: true,
      email: 'aaa@bbb',
      name: 'b1',
      parentUnit: 'orgName',
      uid: 'orgUid',
      customerId,
      roles: [],
      b2badmingroup: false,
      b2bapprovergroup: false,
      b2bcustomergroup: false,
      b2bmanagergroup: false,
    },
    {
      selected: false,
      email: 'aaa2@bbb',
      name: 'b2',
      uid: 'orgUid2',
      parentUnit: 'orgName2',
      customerId: 'customerId2',
      roles: [],
      b2badmingroup: false,
      b2bapprovergroup: false,
      b2bcustomergroup: false,
      b2bmanagergroup: false,
    },
  ],
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

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadUsers = createSpy('loadUsers');

  getUsers = createSpy('getUsers').and.returnValue(userList);

  assignRole = createSpy('assignRole');

  unassignRole = createSpy('unassignRole');
}

class MockB2BUserService implements Partial<B2BUserService> {
  update = createSpy('update');
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        params: {
          code,
          roleId,
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

describe('UnitAssignRolesComponent', () => {
  let component: UnitUserAssignRolesComponent;
  let fixture: ComponentFixture<UnitUserAssignRolesComponent>;
  let orgUnitService: MockOrgUnitService;
  let b2bUsersService: MockB2BUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UnitUserAssignRolesComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: B2BUserService, useClass: MockB2BUserService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
    b2bUsersService = TestBed.get(B2BUserService as Type<B2BUserService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUserAssignRolesComponent);
    component = fixture.componentInstance;
    userList.next(mockUserList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No users found page if no users are found', () => {
    const emptyBudgetList: EntitiesModel<B2BUser> = {
      values: [],
      pagination: { totalResults: 0, sort: 'byName' },
      sorts: [{ code: 'byName', selected: true }],
    };

    userList.next(emptyBudgetList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read user list', () => {
      component.ngOnInit();

      let usersList: any;
      component.data$.subscribe((value) => {
        usersList = value;
      });

      expect(orgUnitService.loadUsers).toHaveBeenCalledWith(
        code,
        roleId,
        defaultParams
      );
      expect(orgUnitService.getUsers).toHaveBeenCalledWith(
        code,
        roleId,
        defaultParams
      );
      expect(usersList).toEqual(mockUserUIList);
    });
  });

  describe('assign', () => {
    it('should assign user', () => {
      const expectedB2BUser = {
        roles: ['b2bcustomergroup', 'b2bmanagergroup', 'b2badmingroup'],
      };

      component.assign(inputEventAssign);
      expect(b2bUsersService.update).toHaveBeenCalledWith(
        expectedCustomerId,
        expectedB2BUser
      );
    });
  });

  describe('unassign', () => {
    it('should unassign user', () => {
      const expectedB2BUser = {
        roles: ['b2bmanagergroup'],
      };

      component.unassign(inputEventUnassign);
      expect(b2bUsersService.update).toHaveBeenCalledWith(
        expectedCustomerId,
        expectedB2BUser
      );
    });
  });
});
