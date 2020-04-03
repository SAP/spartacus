import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import {
  I18nTestingModule,
  RoutingService,
  RoutesConfig,
  RoutingConfig,
  UserGroupService,
  OrgUnitUserGroup,
} from '@spartacus/core';

import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { TableModule } from '../../../../shared/components/table/table.module';
import { UserGroupDetailsComponent } from './user-group-details.component';
import createSpy = jasmine.createSpy;

const uid = 'b1';

const mockUserGroup: OrgUnitUserGroup = {
  uid,
  name: 'group1',
  orgUnit: { name: 'orgName' },
};

const mockUserGroupUI: any = {
  code: uid,
  uid,
  name: 'group1',
  orgUnit: { name: 'orgName' },
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockUserGroupService implements Partial<UserGroupService> {
  loadOrgUnitUserGroup = createSpy('loadOrgUnitUserGroup');
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

describe('UserGroupDetailsComponent', () => {
  let component: UserGroupDetailsComponent;
  let fixture: ComponentFixture<UserGroupDetailsComponent>;
  let orgUnitUserGroupService: MockUserGroupService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, TableModule, I18nTestingModule],
      declarations: [UserGroupDetailsComponent, MockUrlPipe],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: UserGroupService,
          useClass: MockUserGroupService,
        },
      ],
    }).compileComponents();

    orgUnitUserGroupService = TestBed.get(
      UserGroupService as Type<UserGroupService>
    );
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load budget', () => {
      component.ngOnInit();
      let budget: any;
      component.userGroup$
        .subscribe(value => {
          budget = value;
        })
        .unsubscribe();
      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(orgUnitUserGroupService.loadOrgUnitUserGroup).toHaveBeenCalledWith(
        uid
      );
      expect(orgUnitUserGroupService.get).toHaveBeenCalledWith(uid);
      expect(budget).toEqual(mockUserGroupUI);
    });
  });
});
