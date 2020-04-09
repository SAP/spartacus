import { PaginationModule } from './../../../../shared/components/list-navigation/pagination/pagination.module';
import {
  Pipe,
  PipeTransform,
  Type,
  Input,
  Output,
  EventEmitter,
  Component,
} from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
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
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

@Component({
  template: '',
  selector: 'cx-pagination',
})
class MockPaginationComponent {
  @Input() pagination;
  @Output() viewPageEvent = new EventEmitter<string>();
}

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
      orgUnit: { name: 'orgName', uid: 'orgUid2' },
    },
  ],
  pagination: {},
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
      uid: 'orgUid',
    },
    {
      code: '2',
      threshold: '421 $',
      orderType: 'orderType',
      timePeriod: 'MONTH',
      parentUnit: 'orgName',
      uid: 'orgUid2',
    },
  ],
  pagination: {},
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
      imports: [
        RouterTestingModule,
        InteractiveTableModule,
        I18nTestingModule,
        PaginationModule,
      ],
      declarations: [
        MockPaginationComponent,
        PermissionListComponent,
        MockUrlPipe,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: PermissionService, useClass: MockPermissionService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    permissionsService = TestBed.get(
      PermissionService as Type<PermissionService>
    );
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
      pagination: {
        currentPage: 0,
        totalResults: 0,
        totalPages: 0,
        pageSize: 0,
      },
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
      component.data$
        .subscribe((value) => {
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
          params: {},
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
          params: {},
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
