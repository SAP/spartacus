import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  PermissionService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  Permission,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { TableModule } from '../../../../shared/components/table/table.module';

import { PermissionsListComponent } from './permissions-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockPermissionList: EntitiesModel<Permission> = {
  values: [
    {
      code: '1',
      name: 'b1',
      permission: 2230,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2010-01-01T00:00:00+0000',
      endDate: '2034-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
    {
      code: '2',
      name: 'b2',
      permission: 2240,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      startDate: '2020-01-01T00:00:00+0000',
      endDate: '2024-07-12T00:59:59+0000',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
  ],
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockPermissionUIList = {
  permissionsList: [
    {
      code: '1',
      name: 'b1',
      amount: '2230 $',
      startEndDate: '2010-01-01 - 2034-07-12',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
    {
      code: '2',
      name: 'b2',
      amount: '2240 $',
      startEndDate: '2020-01-01 - 2024-07-12',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
  ],
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

const permissionList = new BehaviorSubject(mockPermissionList);

class MockPermissionService implements Partial<PermissionService> {
  loadPermissions = createSpy('loadPermissions');

  getList = createSpy('getList').and.returnValue(permissionList);
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
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

describe('PermissionsListComponent', () => {
  let component: PermissionsListComponent;
  let fixture: ComponentFixture<PermissionsListComponent>;
  let permissionsService: MockPermissionService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ListNavigationModule,
        TableModule,
        I18nTestingModule,
      ],
      declarations: [PermissionsListComponent, MockUrlPipe],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
      ],
    }).compileComponents();

    permissionsService = TestBed.get(PermissionService as Type<
      PermissionService
    >);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsListComponent);
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

    expect(
      fixture.debugElement.query(By.css('.cx-no-permissions'))
    ).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read permission list', () => {
      component.ngOnInit();
      let permissionsList: any;
      component.permissionsList$
        .subscribe(value => {
          permissionsList = value;
        })
        .unsubscribe();
      expect(permissionsService.loadPermissions).toHaveBeenCalledWith(
        defaultParams
      );
      expect(permissionsService.getList).toHaveBeenCalledWith(defaultParams);
      expect(permissionsList).toEqual(mockPermissionUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component['params$'] = of(defaultParams);
      component.changeSortCode('byCode');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'permissions',
        },
        {
          sort: 'byCode',
        }
      );
    });
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component['params$'] = of(defaultParams);
      component.pageChange(2);
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'permissions',
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
