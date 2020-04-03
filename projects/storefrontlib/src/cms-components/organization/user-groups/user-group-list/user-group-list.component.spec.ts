import {
  Pipe,
  PipeTransform,
  Type,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import {
  I18nTestingModule,
  RoutingService,
  UserGroupService,
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  UserGroup,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { UserGroupListComponent } from './user-group-list.component';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockUserGroupList: EntitiesModel<UserGroup> = {
  values: [
    {
      uid: '1',
      name: 'b1',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
    {
      uid: '2',
      name: 'b2',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockUserGroupUIList = {
  values: [
    {
      code: '1',
      name: 'b1',
      parentUnit: 'orgName',
      uid: 'orgUid',
    },
    {
      code: '2',
      name: 'b2',
      parentUnit: 'orgName',
      uid: 'orgUid',
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byName' },
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

const userGroupList = new BehaviorSubject(mockUserGroupList);

class MockUserGroupService implements Partial<UserGroupService> {
  loadUserGroups = createSpy('loadUserGroups');
  getList = createSpy('getList').and.returnValue(userGroupList);
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

describe('UserGroupListComponent', () => {
  let component: UserGroupListComponent;
  let fixture: ComponentFixture<UserGroupListComponent>;
  let userGroupsService: MockUserGroupService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserGroupListComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: UserGroupService, useClass: MockUserGroupService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    userGroupsService = TestBed.get(UserGroupService as Type<UserGroupService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupListComponent);
    component = fixture.componentInstance;
    userGroupList.next(mockUserGroupList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No userGroups found page if no userGroups are found', () => {
    const emptyUserGroupList: EntitiesModel<UserGroup> = {
      values: [],
      pagination: {
        currentPage: 0,
        totalResults: 0,
      },
      sorts: [{ code: 'byName', selected: true }],
    };

    userGroupList.next(emptyUserGroupList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read userGroup list', () => {
      component.ngOnInit();
      let userGroupsList: any;
      component.data$
        .subscribe(value => {
          userGroupsList = value;
        })
        .unsubscribe();
      expect(userGroupsService.loadUserGroups).toHaveBeenCalledWith(
        defaultParams
      );
      expect(userGroupsService.getList).toHaveBeenCalledWith(defaultParams);
      expect(userGroupsList).toEqual(mockUserGroupUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component.changeSortCode('byCode');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'userGroups',
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
          cxRoute: 'userGroups',
          params: {},
        },
        {
          currentPage: 2,
        }
      );
    });
  });
});
