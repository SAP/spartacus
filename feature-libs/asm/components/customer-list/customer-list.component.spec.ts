import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AsmConfig, AsmService } from '@spartacus/asm/core';
import {
  CustomerListColumnActionType,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { I18nTestingModule, QueryState, User } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  FocusConfig,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CustomerListComponent } from './customer-list.component';

const MockAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
    customerList: {
      pageSize: 5,
      showAvatar: true,
      columns: [
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.customer',
          renderer: (customer) => {
            return customer.name ?? '';
          },
          actionType: CustomerListColumnActionType.START_SESSION,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.email',
          renderer: (customer) => {
            return customer.uid ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.phone',
          renderer: (customer) => {
            return customer?.defaultAddress?.phone ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.order',
          icon: {
            symbol: ICON_TYPE.ORDER,
            captionLocalizationKey: 'asm.customerList.tableHeader.order',
          },
          actionType: CustomerListColumnActionType.ORDER_HISTORY,
        },
      ],
    },
  },
};

const mockCustomer: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer@test.com',
  customerId: '123456',
};

const mockCustomer2: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer2@test.com',
  customerId: '123456',
};

const mockCustomer3: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'customer3@test.com',
  customerId: '123456',
};

const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockCustomer, mockCustomer2, mockCustomer3],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byNameAsc',
    totalPages: 1,
    totalResults: 3,
  },
  sorts: [
    {
      code: 'byNameAsc',
      selected: true,
    },
    {
      code: 'byNameDesc',
      selected: false,
    },
  ],
};

const mockCustomerListPage: CustomerListsPage = {
  userGroups: [
    {
      name: 'Current In-Store Customers',
      uid: 'instoreCustomers',
    },
    {
      name: 'Pick-Up In-Store Customers',
      uid: 'bopisCustomers',
    },
    {
      name: 'My Recent Customer Sessions',
      uid: 'myRecentCustomerSessions',
    },
  ],
};
@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}
class MockAsmService {
  getCustomerLists(): Observable<QueryState<CustomerListsPage>> {
    return of({
      loading: false,
      error: false,
      data: mockCustomerListPage,
    });
  }
  searchCustomers(
    options?: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    if (options) {
      return of(mockCustomerSearchPage);
    } else {
      return of(mockCustomerSearchPage);
    }
  }
  customerSearch(_searchTerm: string): void {}
  customerSearchReset(): void {}
  getCustomerSearchResults(): Observable<CustomerSearchPage> {
    return of(<CustomerSearchPage>{});
  }
  getCustomerSearchResultsLoading(): Observable<boolean> {
    return of(false);
  }
}

class MockModalService {
  closeActiveModal(reason?: any): void {
    if (reason) {
    }
  }
}

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(BREAKPOINT.md);
  }
}
@Directive({
  selector: '[cxFocus]',
})
export class MockKeyboadFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let mockModalService: MockModalService;
  let asmService: AsmService;
  let breakpointService: BreakpointService;
  let config: AsmConfig;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [
          CustomerListComponent,
          MockCxIconComponent,
          MockKeyboadFocusDirective,
        ],
        providers: [
          { provide: AsmService, useClass: MockAsmService },
          {
            provide: ModalService,
            useClass: MockModalService,
          },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
          { provide: AsmConfig, useValue: MockAsmConfig },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      }).compileComponents();
      asmService = TestBed.inject(AsmService);
      mockModalService = TestBed.inject(ModalService);
      config = TestBed.inject(AsmConfig);

      spyOn(mockModalService, 'closeActiveModal').and.callThrough();
      spyOn(asmService, 'getCustomerSearchResultsLoading').and.returnValue(
        of(true)
      );
      breakpointService = TestBed.inject(BreakpointService);
    })
  );

  beforeEach(() => {
    spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
      new BehaviorSubject(BREAKPOINT.md)
    );

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select the first user group from the list', () => {
    expect(component.selectedUserGroupId).toBe(
      mockCustomerListPage?.userGroups?.[0].uid
    );
  });

  it('should get customer list with different requests', () => {
    spyOn(asmService, 'searchCustomers').and.callThrough();

    if (config.asm?.customerList?.pageSize) {
      config.asm.customerList.pageSize = undefined;
    }
    component.changeSortCode('byNameAsc');

    console.log(component.selectedUserGroupId);
    fixture.detectChanges();
    expect(component.sortCode).toBe('byNameAsc');
    expect(asmService.searchCustomers).toHaveBeenCalledWith({
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 5,
      currentPage: 0,
      sort: 'byNameAsc',
    });

    if (config.asm?.customerList) {
      config.asm.customerList.pageSize = 7;
    }
    component.sortCode = 'byNameDesc';

    component.fetchCustomers();
    const options: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 7,
      currentPage: 0,
      sort: 'byNameDesc',
    };
    fixture.detectChanges();
    expect(asmService.searchCustomers).toHaveBeenCalledWith(options);

    component.sortCode = 'byNameAsc';

    component.fetchCustomers();
    const options2: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 7,
      currentPage: 0,
      sort: 'byNameAsc',
    };
    fixture.detectChanges();
    expect(asmService.searchCustomers).toHaveBeenCalledWith(options2);

    component.sortCode = '';
    component.fetchCustomers();
    const options3: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 7,
      currentPage: 0,
    };
    fixture.detectChanges();
    expect(asmService.searchCustomers).toHaveBeenCalledWith(options3);
  });

  it('should close modal when select a customer', () => {
    component.startColumnAction(
      mockCustomer,
      CustomerListColumnActionType.START_SESSION
    );
    expect(mockModalService.closeActiveModal).toHaveBeenCalledWith({
      selectedUser: mockCustomer,
      actionType: 'START_SESSION',
    });
  });

  it('should go to next page', () => {
    spyOn(asmService, 'searchCustomers').and.callThrough();

    component.currentPage = 2;
    component.maxPage = 3;
    component.goToNextPage();
    expect(component.currentPage).toBe(3);
    component.goToNextPage();
    expect(component.currentPage).toBe(3);

    fixture.detectChanges();

    const options: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: config.asm?.customerList?.pageSize,
      currentPage: 3,
      sort: 'byNameAsc',
    };
    expect(asmService.searchCustomers).toHaveBeenCalledWith(options);
  });

  it('should go to previous page', () => {
    spyOn(asmService, 'searchCustomers').and.callThrough();
    component.currentPage = 1;
    component.maxPage = 10;
    component.goToPreviousPage();
    expect(component.currentPage).toBe(0);
    component.goToPreviousPage();
    expect(component.currentPage).toBe(0);

    fixture.detectChanges();

    const options: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: config.asm?.customerList?.pageSize,
      currentPage: 0,
      sort: 'byNameAsc',
    };
    expect(asmService.searchCustomers).toHaveBeenCalledWith(options);
  });

  it('should get correct badge Text', () => {
    const badgeText = component.getbadgeText(mockCustomer);
    expect(badgeText).toBe('FL');

    const badgeText2 = component.getbadgeText({
      displayUid: 'Display Uid',
      firstName: '',
      lastName: 'Last',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText2).toBe('L');

    const badgeText3 = component.getbadgeText({
      displayUid: 'Display Uid',
      firstName: 'First',
      lastName: '',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText3).toBe('F');
  });

  it('should set current page to zero when group changed', () => {
    component.currentPage = 5;
    component.onChangeCustomerGroup();
    expect(component.currentPage).toBe(0);
  });

  it('should get user group name', () => {
    const userGroupName = component.getGroupName(
      mockCustomerListPage,
      'instoreCustomers'
    );
    expect(userGroupName).toBe('Current In-Store Customers');

    const customerListPage: CustomerListsPage = {
      userGroups: [],
    };
    const userGroupName2 = component.getGroupName(
      customerListPage,
      'instoreCustomers'
    );
    expect(userGroupName2).toBe('');
  });

  it('should add mobile class', () => {
    (breakpointService.breakpoint$ as BehaviorSubject<BREAKPOINT>).next(
      BREAKPOINT.xs
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.header-actions.mobile')).length
    ).toEqual(1);
  });

  it('should add mobile class', () => {
    (breakpointService.breakpoint$ as BehaviorSubject<BREAKPOINT>).next(
      BREAKPOINT.lg
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.header-actions.mobile')).length
    ).toEqual(0);
  });
});
