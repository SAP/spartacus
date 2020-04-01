import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  OrgUnitUserGroupService,
  RoutesConfig,
  RoutingConfig,
  OrgUnitService,
  B2BUnitNode,
  LanguageService,
  OrgUnitUserGroup,
} from '@spartacus/core';

import { UserGroupCreateComponent } from './user-group-create.component';
import createSpy = jasmine.createSpy;
import { UserGroupFormModule } from '../user-group-form/user-group-form.module';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { RouterTestingModule } from '@angular/router/testing';

const uid = 'b1';

const mockUserGroup: OrgUnitUserGroup = {
  uid,
  name: 'group1',
  orgUnit: { name: 'orgName' },
};

const mockOrgUnits: B2BUnitNode[] = [
  {
    active: true,
    children: [],
    id: 'unitNode1',
    name: 'Org Unit 1',
    parent: 'parentUnit',
  },
];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  getList = createSpy('getList').and.returnValue(of(mockOrgUnits));
}

class MockUserGroupService implements Partial<OrgUnitUserGroupService> {
  create = createSpy('create');
}

const mockRouterState = {
  state: {
    params: {
      code: uid,
    },
  },
};

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState = createSpy('getRouterState').and.returnValue(
    of(mockRouterState)
  );
}

const mockRoutesConfig: RoutesConfig = defaultStorefrontRoutesConfig;
class MockRoutingConfig {
  getRouteConfig(routeName: string) {
    return mockRoutesConfig[routeName];
  }
}

class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

describe('UserGroupCreateComponent', () => {
  let component: UserGroupCreateComponent;
  let fixture: ComponentFixture<UserGroupCreateComponent>;
  let userGroupsService: MockUserGroupService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UserGroupFormModule, RouterTestingModule],
      declarations: [UserGroupCreateComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: OrgUnitUserGroupService, useClass: MockUserGroupService },
      ],
    }).compileComponents();

    userGroupsService = TestBed.get(
      OrgUnitUserGroupService as Type<OrgUnitUserGroupService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createUserGroup', () => {
    it('should create UserGroup', () => {
      component.createUserGroup(mockUserGroup);
      expect(userGroupsService.create).toHaveBeenCalledWith(mockUserGroup);
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userGroupDetails',
        params: { code: uid },
      });
    });
  });
});
