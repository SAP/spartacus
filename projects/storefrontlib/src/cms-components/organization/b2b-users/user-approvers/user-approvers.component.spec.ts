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
import {
  B2BSearchConfig,
  B2BUser,
  B2BUserService,
  EntitiesModel,
  I18nTestingModule,
  RoutesConfig,
  RoutingConfig,
  RoutingService,
} from '@spartacus/core';
import { PaginationConfig } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/config/pagination.config';
import { BehaviorSubject, of } from 'rxjs';
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { UserApproversComponent } from './user-approvers.component';

import createSpy = jasmine.createSpy;

const code = 'unitCode';
const roleId = 'b2bapprovergroup';
const customerId = 'customerId1';

const params: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 2147483647,
};

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

const mockUserUIList = {
  values: [
    {
      name: 'b1',
      email: 'aaa@bbb',
      parentUnit: 'orgName',
      uid: 'orgUid',
      customerId,
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

class MockB2BUserService implements Partial<B2BUserService> {
  get = createSpy('get').and.returnValue(of({ email: 'test@bbb' }));

  loadB2BUserApprovers = createSpy('loadB2BUserApprovers');

  getB2BUserApprovers = createSpy('getB2BUserApprovers').and.returnValue(
    userList
  );
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        params: {
          code,
          roleId,
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

describe('UnitApproversComponent', () => {
  let component: UserApproversComponent;
  let fixture: ComponentFixture<UserApproversComponent>;
  let userService: MockB2BUserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        UserApproversComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockB2BUserService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    userService = TestBed.get(B2BUserService as Type<B2BUserService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApproversComponent);
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

  describe('ngOnInit', () => {
    it('should read user list', () => {
      component.ngOnInit();

      let usersList: any;
      component.data$.subscribe((value) => {
        usersList = value;
      });

      expect(userService.loadB2BUserApprovers).toHaveBeenCalledWith(
        code,
        params
      );
      expect(userService.getB2BUserApprovers).toHaveBeenCalledWith(
        code,
        params
      );
      expect(usersList).toEqual(mockUserUIList);
    });
  });
});
