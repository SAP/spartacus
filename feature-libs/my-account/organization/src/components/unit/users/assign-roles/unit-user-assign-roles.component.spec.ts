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
import { BehaviorSubject } from 'rxjs';

import { PaginationConfig } from '@spartacus/storefront';
import {
  B2BUser,
  EntitiesModel,
  I18nTestingModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { B2BUserService } from '../../../../core/services/b2b-user.service';
import { OrgUnitService } from '../../../../core/services/org-unit.service';
import { UnitUserAssignRolesComponent } from './unit-user-assign-roles.component';

import createSpy = jasmine.createSpy;

const roleId = 'b2bcustomergroup';
const customerId = 'customerId1';

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

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

xdescribe('UnitAssignRolesComponent', () => {
  let component: UnitUserAssignRolesComponent;
  let fixture: ComponentFixture<UnitUserAssignRolesComponent>;
  // let orgUnitService: MockOrgUnitService;
  let b2bUsersService: MockB2BUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        UnitUserAssignRolesComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
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

    // orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
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

  xdescribe('assign', () => {
    it('should assign user', () => {
      const expectedRoles = [
        'b2bcustomergroup',
        'b2bmanagergroup',
        'b2badmingroup',
      ];

      component.toggleAssign(customerId, expectedRoles, roleId, true);
      expect(b2bUsersService.update).toHaveBeenCalledWith(
        customerId,
        expectedRoles,
        roleId,
        true
      );
    });
  });

  xdescribe('unassign', () => {
    it('should unassign user', () => {
      const expectedRoles = ['b2bmanagergroup'];

      component.toggleAssign(customerId, expectedRoles, roleId, false);
      expect(b2bUsersService.update).toHaveBeenCalledWith(
        customerId,
        expectedRoles,
        roleId,
        false
      );
    });
  });
});
