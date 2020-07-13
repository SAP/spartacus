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
  EntitiesModel,
  B2BSearchConfig,
  CxDatePipe,
  RoutesConfig,
  RoutingConfig,
  B2BUser,
  B2BUserService,
} from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';

import createSpy = jasmine.createSpy;
import { defaultStorefrontRoutesConfig } from '../../../../cms-structure/routing/default-routing-config';
import { InteractiveTableModule } from '../../../../shared/components/interactive-table/interactive-table.module';
import { PaginationConfig } from '../../../../shared/components/list-navigation/pagination/config/pagination.config';
import { B2BUserListComponent } from './user-list.component';

const defaultParams: B2BSearchConfig = {
  sort: 'byName',
  currentPage: 0,
  pageSize: 2,
};

const mockUserList: EntitiesModel<B2BUser> = {
  values: [
    {
      name: 'Akiro Nakamura',
      uid: 'akiro@naka.com',
      active: true,
      approvers: [],
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
      displayUid: 'akiro@naka.com',
      firstName: 'Akiro',
      lastName: 'Nakamura',
      orgUnit: {
        active: true,
        name: 'Rustic',
        uid: 'Rustic',
      },
      roles: ['b2bmanagergroup'],
      selected: false,
      title: 'Mr.',
      titleCode: 'mr',
      email: 'akiro@naka.com',
    },
    {
      name: 'Alejandro Navarro',
      uid: 'alejandro.navarro@rustic-hw.com',
      active: true,
      approvers: [],
      currency: {
        active: true,
        isocode: 'USD',
        name: 'US Dollar',
        symbol: '$',
      },
      customerId: '0db38452-5b78-45af-ba26-6cfa20090d8d',
      displayUid: 'alejandro.navarro@rustic-hw.com',
      firstName: 'Alejandro',
      lastName: 'Navarro',
      orgUnit: {
        active: true,
        name: 'Services East',
        uid: 'Services East',
      },
      roles: ['b2bcustomergroup'],
      selected: false,
      title: 'Mr.',
      titleCode: 'mr',
      email: 'alejandro.navarro@rustic-hw.com',
    },
  ],
  pagination: { pageSize: 2, totalPages: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

const mockUserUIList = {
  values: [
    {
      code: 'akiro@naka.com',
      name: 'Akiro Nakamura',
      roles: ['b2bmanagergroup'],
      parentUnit: 'Rustic',
      uid: 'Rustic',
      customerId: '08ecc0b1-16ef-4a74-a1dd-4a244300c974',
    },
    {
      code: 'alejandro.navarro@rustic-hw.com',
      name: 'Alejandro Navarro',
      roles: ['b2bcustomergroup'],
      parentUnit: 'Services East',
      uid: 'Services East',
      customerId: '0db38452-5b78-45af-ba26-6cfa20090d8d',
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

const userList$ = new BehaviorSubject(mockUserList);

class MockUserService implements Partial<B2BUserService> {
  loadB2BUsers = createSpy('loadB2BUsers');

  getList = createSpy('getList').and.returnValue(userList$);
}

class MockRoutingService {
  go = createSpy('go').and.stub();
  getRouterState() {
    return of({
      state: {
        queryParams: {
          sort: 'byName',
          currentPage: '0',
          pageSize: '2',
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

fdescribe('UserListComponent', () => {
  let component: B2BUserListComponent;
  let fixture: ComponentFixture<B2BUserListComponent>;
  let userService: MockUserService;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, InteractiveTableModule, I18nTestingModule],
      declarations: [
        B2BUserListComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: CxDatePipe, useClass: MockCxDatePipe },
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: B2BUserService, useClass: MockUserService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
      ],
    }).compileComponents();

    userService = TestBed.get(B2BUserService as Type<B2BUserService>);
    routingService = TestBed.get(RoutingService as Type<RoutingService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(B2BUserListComponent);
    component = fixture.componentInstance;
    userList$.next(mockUserList);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display No budgets found page if no budgets are found', () => {
    const emptyUserList: EntitiesModel<B2BUser> = {
      values: [],
      pagination: {
        currentPage: 0,
        totalResults: 0,
      },
      sorts: [{ code: 'byName', selected: true }],
    };

    userList$.next(emptyUserList);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.cx-no-items'))).not.toBeNull();
  });

  describe('ngOnInit', () => {
    it('should read the users list', () => {
      component.ngOnInit();
      let userList: any;
      component.data$
        .subscribe((value) => {
          userList = value;
        })
        .unsubscribe();
      expect(userService.loadB2BUsers).toHaveBeenCalledWith(defaultParams);
      expect(userService.getList).toHaveBeenCalledWith(defaultParams);
      expect(userList).toEqual(mockUserUIList);
    });
  });

  describe('changeSortCode', () => {
    it('should set correctly sort code', () => {
      component.changeSortCode('byUnit');
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'users',
          params: {},
        },
        {
          sort: 'byUnit',
          pageSize: 2,
        }
      );
    });
  });

  describe('pageChange', () => {
    it('should set correctly page', () => {
      component.pageChange(2);
      expect(routingService.go).toHaveBeenCalledWith(
        {
          cxRoute: 'users',
          params: {},
        },
        {
          currentPage: 2,
          pageSize: 2,
        }
      );
    });
  });
});
