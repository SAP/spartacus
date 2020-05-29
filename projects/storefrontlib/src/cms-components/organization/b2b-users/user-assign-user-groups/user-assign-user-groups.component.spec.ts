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
  UserGroup,
  B2BUserService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { UserAssignUserGroupsComponent } from './user-assign-user-groups.component';

const code = 'userCode';
const userGroupCode = '1';
const userGroupRow = {
  row: {
    code: userGroupCode,
  },
};

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 5,
};

const mockUserGroupList: EntitiesModel<UserGroup> = {
  values: [
    {
      code: '1',
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { uid: 'orgUid', name: 'orgName' },
    },
    {
      code: '2',
      selected: true,
      currency: {
        isocode: 'USD',
        symbol: '$',
      },
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockUserGroupUIList = {
  values: [
    {
      code: '1',
      selected: true,
      parentUnit: 'orgName',
      uid: 'orgUid',
      threshold: ' $',
      orderType: undefined,
      timePeriod: undefined,
    },
    {
      code: '2',
      selected: true,
      parentUnit: 'orgName2',
      uid: 'orgUid2',
      threshold: ' $',
      orderType: undefined,
      timePeriod: undefined,
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

const userGroupList = new BehaviorSubject(mockUserGroupList);

class MockB2BUserService implements Partial<B2BUserService> {
  get = createSpy('get').and.returnValue(of({ email: 'test@bbb' }));
  loadB2BUserUserGroups = createSpy('loadB2BUserUserGroups');

  getB2BUserUserGroups = createSpy('getB2BUserUserGroups').and.returnValue(
    userGroupList
  );

  assignUserGroup = createSpy('assign');

  unassignUserGroup = createSpy('unassign');
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

describe('UserAssignUserGroupsComponent', () => {
  let component: UserAssignUserGroupsComponent;
  let fixture: ComponentFixture<UserAssignUserGroupsComponent>;
  let service: MockB2BUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserAssignUserGroupsComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    service = TestBed.get(B2BUserService as Type<B2BUserService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAssignUserGroupsComponent);
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
      pagination: { totalResults: 0, sort: 'byName' },
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
      component.data$.subscribe((value) => {
        userGroupsList = value;
      });

      expect(service.loadB2BUserUserGroups).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(service.getB2BUserUserGroups).toHaveBeenCalledWith(
        code,
        defaultParams
      );
      expect(userGroupsList).toEqual(mockUserGroupUIList);
    });
  });

  describe('assign', () => {
    it('should assign userGroup', () => {
      component.assign(userGroupRow);
      expect(service.assignUserGroup).toHaveBeenCalledWith(
        code,
        userGroupRow.row.code
      );
    });
  });

  describe('unassign', () => {
    it('should unassign userGroup', () => {
      component.unassign(userGroupRow);
      expect(service.unassignUserGroup).toHaveBeenCalledWith(
        code,
        userGroupRow.row.code
      );
    });
  });
});
