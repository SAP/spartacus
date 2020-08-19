import {
  Component,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

import {
  B2BUser,
  EntitiesModel,
  I18nTestingModule,
  RoutesConfig,
  RoutingService,
  RoutingConfig,
} from '@spartacus/core';
import { IconLoaderService, PaginationConfig } from '@spartacus/storefront';
import { MockIconLoaderService } from 'projects/storefrontlib/src/cms-components/misc/icon/icon.component.spec';
import { defaultStorefrontRoutesConfig } from 'projects/storefrontlib/src/cms-structure/routing/default-routing-config';
import { OrgUnitService } from '../../../../core/services/org-unit.service';
import { UnitApproverListComponent } from './unit-approver-list.component';

import createSpy = jasmine.createSpy;

const code = 'unitCode';
const roleId = 'b2bapprovergroup';
const customerId = 'customerId1';

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

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadUsers = createSpy('loadUsers');

  getUsers = createSpy('getUsers').and.returnValue(userList);
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

xdescribe('UnitApproversComponent', () => {
  let component: UnitApproverListComponent;
  let fixture: ComponentFixture<UnitApproverListComponent>;
  // let orgUnitService: MockOrgUnitService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        UnitApproverListComponent,
        MockUrlPipe,
        MockPaginationComponent,
      ],
      providers: [
        { provide: RoutingConfig, useClass: MockRoutingConfig },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        {
          provide: PaginationConfig,
          useValue: {
            pagination: {},
          },
        },
        { provide: IconLoaderService, useClass: MockIconLoaderService },
      ],
    }).compileComponents();

    // orgUnitService = TestBed.get(OrgUnitService as Type<OrgUnitService>);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitApproverListComponent);
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
});
