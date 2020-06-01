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
  B2BUserService,
  UserGroup,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { UserUserGroupsComponent } from './user-user-groups.component';

const code = 'userCode';

const params: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 2147483647,
};

const mockUserGroupList: EntitiesModel<UserGroup> = {
  values: [
    {
      uid: '1',
      name: 'b1',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
      selected: true,
    },
    {
      uid: '2',
      name: 'b2',
      orgUnit: { name: 'orgName', uid: 'orgUid' },
      selected: false,
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

class MockUserService implements Partial<B2BUserService> {
  loadB2BUserUserGroups = createSpy('loadB2BUserUserGroups');
  getB2BUserUserGroups = createSpy('getB2BUserUserGroups').and.returnValue(
    userGroupList
  );
  get = createSpy('get').and.returnValue(of({}));
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

describe('UserUserGroupsComponent', () => {
  let component: UserUserGroupsComponent;
  let fixture: ComponentFixture<UserUserGroupsComponent>;
  let service: MockUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserUserGroupsComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        {
          provide: B2BUserService,
          useClass: MockUserService,
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
    fixture = TestBed.createComponent(UserUserGroupsComponent);
    component = fixture.componentInstance;
    userGroupList.next(mockUserGroupList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No userGroup found page if no userGroup are found', () => {
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

      let userGroupList: any;
      component.data$.subscribe((value) => {
        userGroupList = value;
      });

      expect(service.loadB2BUserUserGroups).toHaveBeenCalledWith(code, params);
      expect(service.getB2BUserUserGroups).toHaveBeenCalledWith(code, params);
      expect(userGroupList).toEqual(mockUserGroupUIList);
    });
  });
});
