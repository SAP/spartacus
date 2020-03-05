import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  B2BSearchConfig,
  CxDatePipe,
  EntitiesModel,
  I18nTestingModule,
  Period,
  Permission,
  PermissionService,
  RoutesConfig,
  RoutingConfig,
  RoutingService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';

import { PermissionListComponent } from './permission-list.component';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import createSpy = jasmine.createSpy;

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockPermissionList: EntitiesModel<Permission> = {
  values: [
    {
      code: '1',
      threshold: 231,
      orderApprovalPermissionType: { name: 'orderType' },
      periodRange: Period.MONTH,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
    {
      code: '2',
      threshold: 421,
      orderApprovalPermissionType: { name: 'orderType' },
      periodRange: Period.MONTH,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
  ],
  pagination: { totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockPermissionUIList = {
  values: [
    {
      code: '1',
      threshold: '231 $',
      orderType: 'orderType',
      timePeriod: 'MONTH',
      parentUnit: 'orgName',
      orgUnitId: 'orgUid',
    },
    {
      code: '2',
      threshold: '421 $',
      orderType: 'orderType',
      timePeriod: 'MONTH',
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

describe('PermissionListComponent', () => {
  let component: PermissionListComponent;
  let fixture: ComponentFixture<PermissionListComponent>;
  let permissionsService: MockPermissionService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [PermissionListComponent, MockUrlPipe],
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
    fixture = TestBed.createComponent(PermissionListComponent);
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
      component.data$
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
