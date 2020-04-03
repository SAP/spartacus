import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  RoutesConfig,
  RoutingConfig,
  OrgUnitService,
  B2BUnitNode,
  LanguageService,
  OrgUnitUserGroup,
  UserGroupService,
} from '@spartacus/core';

import { UserGroupEditComponent } from './user-group-edit.component';
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

class MockUserGroupService implements Partial<UserGroupService> {
  loadUserGroup = createSpy('loadUserGroup');
  get = createSpy('get').and.returnValue(of(mockUserGroup));
  update = createSpy('update');
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

describe('UserGroupEditComponent', () => {
  let component: UserGroupEditComponent;
  let fixture: ComponentFixture<UserGroupEditComponent>;
  let userGroupsService: MockUserGroupService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, UserGroupFormModule, RouterTestingModule],
      declarations: [UserGroupEditComponent],
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageServiceStub,
        },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UserGroupService, useClass: MockUserGroupService },
      ],
    }).compileComponents();

    userGroupsService = TestBed.get(UserGroupService as Type<UserGroupService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load userGroup', () => {
      component.ngOnInit();
      let userGroup: any;
      component.userGroup$
        .subscribe(value => {
          userGroup = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(userGroupsService.loadUserGroup).toHaveBeenCalledWith(uid);
      expect(userGroupsService.get).toHaveBeenCalledWith(uid);
      expect(userGroup).toEqual(mockUserGroup);
    });
  });

  describe('update', () => {
    it('should update userGroup', () => {
      component.ngOnInit();
      const updateUserGroup = {
        uid,
        name: 'newName',
      };

      component.updateUserGroup(updateUserGroup);
      expect(userGroupsService.update).toHaveBeenCalledWith(
        uid,
        updateUserGroup
      );
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'userGroupDetails',
        params: { code: uid },
      });
    });
  });
});
