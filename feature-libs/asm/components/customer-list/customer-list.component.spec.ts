import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AsmConfig,
  AsmCustomerListFacade,
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
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { CustomerListComponent } from './customer-list.component';
import { CustomerListAction } from './customer-list.model';
import createSpy = jasmine.createSpy;

class MockAsmConfig implements AsmConfig {
  asm = {
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
          renderer: (customer: User) => {
            return customer.name ?? '';
          },
          actionType: CustomerListColumnActionType.START_SESSION,
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.email',
          renderer: (customer: User) => {
            return customer.uid ?? '';
          },
        },
        {
          headerLocalizationKey: 'asm.customerList.tableHeader.phone',
          renderer: (customer: User) => {
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
  };
}

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

/** Single page with all results */
const mockCustomerSearchPage: CustomerSearchPage = {
  entries: [mockCustomer, mockCustomer2, mockCustomer3],
  pagination: {
    currentPage: 0,
    pageSize: 5,
    sort: 'byNameAsc',
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

const mockReturnData: CustomerListAction = {
  selectedUser: mockCustomer,
  actionType: CustomerListColumnActionType.ORDER_HISTORY,
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog = createSpy();
  openDialogAndSubscribe() {
    return EMPTY;
  }
  data$ = of(mockReturnData);
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

class MockBreakpointService {
  get breakpoint$(): Observable<BREAKPOINT> {
    return of(BREAKPOINT.md);
  }
}

class MockAsmCustomerListFacade implements Partial<AsmCustomerListFacade> {
  getCustomerListsState(): Observable<QueryState<CustomerListsPage>> {
    return of({ error: false, loading: false, data: mockCustomerListPage });
  }

  customerListCustomersSearchReset(): void {}

  customerListCustomersSearch(): void {}

  getCustomerListCustomersSearchResults(): Observable<CustomerSearchPage> {
    return of(mockCustomerSearchPage);
  }

  getCustomerListCustomersSearchResultsLoading(): Observable<boolean> {
    return of(false);
  }

  getCustomerListCustomersSearchResultsError(): Observable<boolean> {
    return of(false);
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
  let launchDialogService: LaunchDialogService;
  let breakpointService: BreakpointService;
  let config: AsmConfig;
  let asmCustomerListFacade: AsmCustomerListFacade;

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
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          {
            provide: BreakpointService,
            useClass: MockBreakpointService,
          },
          { provide: AsmConfig, useClass: MockAsmConfig },
          {
            provide: AsmCustomerListFacade,
            useClass: MockAsmCustomerListFacade,
          },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      }).compileComponents();
      launchDialogService = TestBed.inject(LaunchDialogService);
      config = TestBed.inject(AsmConfig);
      breakpointService = TestBed.inject(BreakpointService);
      asmCustomerListFacade = TestBed.inject(AsmCustomerListFacade);

      spyOn(
        asmCustomerListFacade,
        'getCustomerListCustomersSearchResultsLoading'
      ).and.returnValue(of(true));
      spyOnProperty(breakpointService, 'breakpoint$').and.returnValue(
        new BehaviorSubject(BREAKPOINT.md)
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should select the first user group from the list', () => {
    fixture.detectChanges();

    expect(component.selectedUserGroupId).toBe(
      mockCustomerListPage?.userGroups?.[0].uid
    );
  });

  it('should use internal default when config is not defined', () => {
    spyOn(
      asmCustomerListFacade,
      'customerListCustomersSearch'
    ).and.callThrough();
    if (config?.asm?.customerList) {
      config.asm.customerList.pageSize = undefined;
    }

    fixture.detectChanges();

    expect(component.pageSize).toBe(5);
  });

  it('should use config for page size', () => {
    spyOn(
      asmCustomerListFacade,
      'customerListCustomersSearch'
    ).and.callThrough();
    const expectedSize = 7;
    if (config?.asm?.customerList) {
      config.asm.customerList.pageSize = expectedSize;
    }
    const expectedOptions: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: expectedSize,
      currentPage: 0,
    };

    fixture.detectChanges();

    expect(component.pageSize).toBe(expectedSize);
    expect(
      asmCustomerListFacade.customerListCustomersSearch
    ).toHaveBeenCalledWith(expectedOptions);
  });

  it('should change sort type', () => {
    fixture.detectChanges();
    spyOn(
      asmCustomerListFacade,
      'customerListCustomersSearch'
    ).and.callThrough();

    component.changeSortCode('byNameAsc');

    expect(component.sortCode).toBe('byNameAsc');
    expect(
      asmCustomerListFacade.customerListCustomersSearch
    ).toHaveBeenCalledWith({
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 5,
      currentPage: 0,
      sort: 'byNameAsc',
    });
  });

  it('should exclude sort code on request when empty', () => {
    spyOn(
      asmCustomerListFacade,
      'customerListCustomersSearch'
    ).and.callThrough();
    component.sortCode = '';
    const expectedOptions: CustomerSearchOptions = {
      customerListId: mockCustomerListPage?.userGroups?.[0].uid,
      pageSize: 5,
      currentPage: 0,
    };

    fixture.detectChanges();

    expect(
      asmCustomerListFacade.customerListCustomersSearch
    ).toHaveBeenCalledWith(expectedOptions);
  });

  it('should close modal when select a customer', () => {
    component.startColumnAction(
      mockCustomer,
      CustomerListColumnActionType.START_SESSION
    );
    expect(launchDialogService.closeDialog).toHaveBeenCalledWith({
      selectedUser: mockCustomer,
      actionType: 'START_SESSION',
    });
    // expect(mockModalService.closeActiveModal).toHaveBeenCalledWith({
    //   selectedUser: mockCustomer,
    //   actionType: 'START_SESSION',
    // });
  });

  describe('pagination', () => {
    let resultsPageController: Subject<CustomerSearchPage>;
    /** Page 1 of series, first page */
    let mockCustomerSearchPage1: CustomerSearchPage;
    /** Page 2 of series, last page */
    let mockCustomerSearchPage2: CustomerSearchPage;

    beforeEach(() => {
      resultsPageController = new Subject();
      spyOn(
        asmCustomerListFacade,
        'getCustomerListCustomersSearchResults'
      ).and.returnValue(resultsPageController.asObservable());
      spyOn(
        asmCustomerListFacade,
        'customerListCustomersSearch'
      ).and.callThrough();

      fixture.detectChanges();

      mockCustomerSearchPage1 = {
        ...mockCustomerSearchPage,
        entries: [
          mockCustomer,
          mockCustomer2,
          mockCustomer3,
          mockCustomer3,
          mockCustomer3,
        ],
        pagination: {
          currentPage: 0,
          pageSize: 5,
          sort: 'byNameAsc',
        },
      };
      mockCustomerSearchPage2 = {
        ...mockCustomerSearchPage,
        pagination: {
          currentPage: 1,
          pageSize: 5,
          sort: 'byNameAsc',
        },
      };
    });

    it('should accept empty data', () => {
      resultsPageController.next(undefined);

      expect(component.currentPage).toBe(0);
      expect(component.maxPage).toBe(1);
    });

    it('should increase max page size when item count equals page size', () => {
      resultsPageController.next(mockCustomerSearchPage1);

      expect(component.currentPage).toBe(0);
      expect(component.maxPage).toBe(1);
    });

    it('should not increase max page size when item count is less than page size', () => {
      resultsPageController.next(mockCustomerSearchPage);

      expect(component.currentPage).toBe(0);
      expect(component.maxPage).toBe(0);
    });

    it('should go to next page', () => {
      const expectedOptions: CustomerSearchOptions = {
        customerListId: mockCustomerListPage?.userGroups?.[0].uid,
        pageSize: config.asm?.customerList?.pageSize,
        currentPage: 1,
        sort: 'byNameAsc',
      };
      component.loaded = true;
      resultsPageController.next(mockCustomerSearchPage1);

      component.goToNextPage();

      resultsPageController.next(mockCustomerSearchPage2);
      expect(component.currentPage).toBe(1);
      expect(component.maxPage).toBe(1);
      expect(
        asmCustomerListFacade.customerListCustomersSearch
      ).toHaveBeenCalledWith(expectedOptions);
    });

    it('should not go past the last page', () => {
      resultsPageController.next(mockCustomerSearchPage2);
      (
        asmCustomerListFacade.customerListCustomersSearch as jasmine.Spy
      ).calls.reset();
      Object.assign(component, { currentPage: 1, maxPage: 1, loaded: true });

      component.goToNextPage();

      expect(component.currentPage).toBe(1);
      expect(component.maxPage).toBe(1);
      expect(
        asmCustomerListFacade.customerListCustomersSearch
      ).not.toHaveBeenCalled();
    });

    it('should go to previous page', () => {
      const expectedOptions: CustomerSearchOptions = {
        customerListId: mockCustomerListPage?.userGroups?.[0].uid,
        pageSize: config.asm?.customerList?.pageSize,
        currentPage: 0,
        sort: 'byNameAsc',
      };
      resultsPageController.next(mockCustomerSearchPage2);
      Object.assign(component, { currentPage: 1, maxPage: 1, loaded: true });

      component.goToPreviousPage();

      expect(component.currentPage).toBe(0);
      expect(
        asmCustomerListFacade.customerListCustomersSearch
      ).toHaveBeenCalledWith(expectedOptions);
    });

    it('should should ignore previous page when on the first page', () => {
      resultsPageController.next(mockCustomerSearchPage);
      (
        asmCustomerListFacade.customerListCustomersSearch as jasmine.Spy
      ).calls.reset();
      Object.assign(component, { loaded: true });

      component.goToPreviousPage();

      expect(component.currentPage).toBe(0);
      expect(
        asmCustomerListFacade.customerListCustomersSearch
      ).not.toHaveBeenCalled();
    });
  });

  it('should get correct badge Text', () => {
    const badgeText = component.getBadgeText(mockCustomer);
    expect(badgeText).toBe('FL');

    const badgeText2 = component.getBadgeText({
      displayUid: 'Display Uid',
      firstName: '',
      lastName: 'Last',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText2).toBe('L');

    const badgeText3 = component.getBadgeText({
      displayUid: 'Display Uid',
      firstName: 'First',
      lastName: '',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText3).toBe('F');

    const badgeText4 = component.getBadgeText({
      displayUid: 'Display Uid',
      lastName: 'L',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText4).toBe('L');

    const badgeText5 = component.getBadgeText({
      displayUid: 'Display Uid',
      firstName: 'First',
      name: 'First Last',
      uid: 'customer@test.com',
      customerId: '123456',
    });
    expect(badgeText5).toBe('F');
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

    const userGroupName3 = component.getGroupName({}, 'instoreCustomers');
    expect(userGroupName3).toBe('');
  });

  it('should add mobile class', () => {
    (breakpointService.breakpoint$ as BehaviorSubject<BREAKPOINT>).next(
      BREAKPOINT.xs
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cx-header-actions.mobile')).length
    ).toEqual(1);
  });

  it('should add mobile class', () => {
    (breakpointService.breakpoint$ as BehaviorSubject<BREAKPOINT>).next(
      BREAKPOINT.lg
    );

    fixture.detectChanges();

    expect(
      fixture.debugElement.queryAll(By.css('.cx-header-actions.mobile')).length
    ).toEqual(0);
  });

  it('should notify users when lists result is empty', () => {
    const emptyListsState: QueryState<CustomerListsPage> = {
      error: false,
      loading: false,
      data: { userGroups: [] },
    };
    spyOn(asmCustomerListFacade, 'getCustomerListsState').and.returnValue(
      of(emptyListsState)
    );

    fixture.detectChanges();

    expect(component.listsEmpty).toBe(true);
  });

  it('should notify users when customer lists request fails ', () => {
    const errorListsState: QueryState<CustomerListsPage> = {
      error: new Error('Request failed'),
      loading: false,
      data: undefined,
    };
    spyOn(asmCustomerListFacade, 'getCustomerListsState').and.returnValue(
      of(errorListsState)
    );

    fixture.detectChanges();

    expect(component.listsError).toBe(true);
  });

  it('should notify users when customer page fails', () => {
    spyOn(
      asmCustomerListFacade,
      'getCustomerListCustomersSearchResultsError'
    ).and.returnValue(of(true));
    spyOn(
      asmCustomerListFacade,
      'getCustomerListCustomersSearchResults'
    ).and.returnValue(of(undefined));
    let actual: boolean | undefined;

    fixture.detectChanges();
    component.customerSearchError$.subscribe((isError) => (actual = isError));

    expect(actual).toBe(true);
  });

  it('should be able to open dialog', () => {
    spyOn(launchDialogService, 'openDialogAndSubscribe');
    component.createCustomer();
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalledWith(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      component.addNewCustomerLink
    );
  });
});
