/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  AsmConfig,
  AsmCustomerListFacade,
  CustomerListColumnActionType,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import {
  SortModel,
  TranslationService,
  User,
  OccConfig,
  FeatureConfigService,
} from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  FocusConfig,
  ICON_TYPE,
  LAUNCH_CALLER,
  LaunchDialogService,
} from '@spartacus/storefront';
import { combineLatest, NEVER, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { CustomerListAction } from './customer-list.model';

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  protected DEFAULT_PAGE_SIZE = 5;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  BREAKPOINT = BREAKPOINT;

  selectedUserGroupId: string | undefined;

  customerSearchPage$: Observable<CustomerSearchPage | undefined>;

  customerListsPage$: Observable<CustomerListsPage | undefined>;

  selectedCustomer: User;

  currentPage = 0;

  maxPage = 0;

  loaded = false;

  sorts: SortModel[] | null;

  sortCode: string | undefined;

  breakpoint$: Observable<BREAKPOINT>;

  customerListConfig: Required<AsmConfig>['asm']['customerList'];

  customerSearchLoading$: Observable<boolean>;

  customerSearchError$: Observable<boolean>;

  pageSize: number;

  listsError = false;

  listsEmpty = false;

  enableAsmB2bCustomerList = false;

  customerListColumnActionType = CustomerListColumnActionType;

  searchBox: UntypedFormControl = new UntypedFormControl();

  protected teardown: Subscription = new Subscription();

  @ViewChild('addNewCustomerLink') addNewCustomerLink: ElementRef;

  constructor(
    launchDialogService: LaunchDialogService,
    breakpointService: BreakpointService,
    asmConfig: AsmConfig,
    translation: TranslationService,
    asmCustomerListFacade: AsmCustomerListFacade,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    featureConfig?: FeatureConfigService,
    // eslint-disable-next-line @typescript-eslint/unified-signatures
    occConfig?: OccConfig
  );

  /**
   * @deprecated since 7.0
   */
  constructor(
    launchDialogService: LaunchDialogService,
    breakpointService: BreakpointService,
    asmConfig: AsmConfig,
    translation: TranslationService,
    asmCustomerListFacade: AsmCustomerListFacade
  );

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected breakpointService: BreakpointService,
    protected asmConfig: AsmConfig,
    protected translation: TranslationService,
    protected asmCustomerListFacade: AsmCustomerListFacade,
    // TODO:(CXSPA-3090) for next major release remove feature level
    @Optional() protected featureConfig?: FeatureConfigService,
    @Optional() protected occConfig?: OccConfig
  ) {
    this.breakpoint$ = this.getBreakpoint();
  }

  ngOnInit(): void {
    this.pageSize =
      this.asmConfig.asm?.customerList?.pageSize ?? this.DEFAULT_PAGE_SIZE;
    this.customerListConfig = this.asmConfig?.asm?.customerList;

    this.customerListsPage$ =
      this.asmCustomerListFacade.getCustomerListsState().pipe(
        tap((state) => (this.listsError = !!state.error)),
        map((state) => {
          if (state?.data?.userGroups?.length === 0) {
            this.listsEmpty = true;
            return undefined;
          } else {
            return state.data;
          }
        }),
        distinctUntilChanged(),
        tap((result) => {
          // set the first value of this.customerListsPage$ to be selected
          if (!this.selectedUserGroupId) {
            this.selectedUserGroupId = result?.userGroups?.[0]?.uid;
            this.sorts = null;
            this.fetchCustomers();
          }
        })
      ) ?? NEVER;

    this.customerSearchLoading$ = this.asmCustomerListFacade
      .getCustomerListCustomersSearchResultsLoading()
      .pipe(tap((loading) => (this.loaded = !loading)));
    this.teardown.add(this.customerSearchLoading$.subscribe());
    this.teardown.add(() =>
      this.asmCustomerListFacade.customerListCustomersSearchReset()
    );

    this.customerSearchError$ =
      this.asmCustomerListFacade.getCustomerListCustomersSearchResultsError();

    this.customerSearchPage$ = this.asmCustomerListFacade
      .getCustomerListCustomersSearchResults()
      .pipe(
        tap((result) => {
          if (result?.sorts) {
            this.sorts = result.sorts;
            this.sortCode = result.pagination?.sort;
          }
          if (result?.entries.length < this.pageSize) {
            this.maxPage = result.pagination?.currentPage ?? 0;
          } else {
            this.maxPage = this.currentPage + 1;
          }
        })
      );
  }

  ngOnDestroy(): void {
    this.teardown.unsubscribe();
  }

  changePage(page: number): void {
    const options: CustomerSearchOptions = {
      customerListId: this.selectedUserGroupId,
      pageSize: this.pageSize,
      currentPage: page,
      sort: this.sortCode,
    };
    if (this.searchBox?.value) {
      options.query = this.searchBox.value;
    }

    this.asmCustomerListFacade.customerListCustomersSearch(options);
  }

  fetchCustomers(): void {
    // TODO: (CXSPA-2722 for remove ) Remove FeatureConfigService for 7.0
    this.enableAsmB2bCustomerList =
      (this.featureConfig?.isLevel('6.1') ?? false) &&
      this.selectedUserGroupId === 'b2bCustomerList';
    if (this.selectedUserGroupId) {
      const options: CustomerSearchOptions = {
        customerListId: this.selectedUserGroupId,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      };
      if (this.sortCode) {
        options.sort = this.sortCode;
      }
      if (this.searchBox?.value) {
        options.query = this.searchBox.value;
      }

      this.asmCustomerListFacade.customerListCustomersSearchReset();

      this.asmCustomerListFacade.customerListCustomersSearch(options);
    }
    this.customerListConfig?.columns?.forEach((item) => {
      if (
        item.headerLocalizationKey === 'asm.customerList.tableHeader.account' ||
        item.headerLocalizationKey === 'hideAccount'
      ) {
        item.headerLocalizationKey = this.enableAsmB2bCustomerList
          ? 'asm.customerList.tableHeader.account'
          : 'hideAccount';
      }
    });
  }

  onChangeCustomerGroup(): void {
    this.currentPage = 0;
    this.sorts = null;
    this.sortCode = '';
    this.fetchCustomers();
  }

  getGroupName(
    customerListsPage: CustomerListsPage,
    id: string | undefined
  ): string {
    return (
      customerListsPage?.userGroups?.find((userGroup) => userGroup.uid === id)
        ?.name ?? ''
    );
  }

  getBadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) ?? '') +
      (customerEntry.lastName?.charAt(0) ?? '')
    );
  }

  startColumnAction(
    customerEntry: User,
    action: CustomerListColumnActionType
  ): void {
    this.selectedCustomer = customerEntry;
    const closeValue: CustomerListAction = {
      actionType: action,
      selectedUser: customerEntry,
    };
    this.closeModal(closeValue);
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.fetchCustomers();
    }
  }

  isRequired(customerEntry: User, type: string): boolean {
    if (
      type === CustomerListColumnActionType.ACTIVE_CART &&
      !customerEntry.lastCartId
    ) {
      return true;
    }
    if (
      type === CustomerListColumnActionType.ORDER_HISTORY &&
      customerEntry.hasOrder !== true
    ) {
      return true;
    }
    return false;
  }

  changeSortCode(sortCode: string): void {
    this.sortCode = sortCode;
    this.fetchCustomers();
  }

  goToNextPage(): void {
    if (this.currentPage >= this.maxPage) {
      this.currentPage = this.maxPage;
    } else {
      if (this.loaded) {
        this.currentPage++;
        this.fetchCustomers();
      }
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage <= 0) {
      this.currentPage = 0;
    } else {
      if (this.loaded) {
        this.currentPage--;
        this.fetchCustomers();
      }
    }
  }

  closeModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
  }

  getSortLabels(): Observable<{
    byNameAsc: string;
    byNameDesc: string;
    byOrderDateAsc: string;
    byOrderDateDesc: string;
    byDateAsc: string;
    byDateDesc: string;
  }> {
    return combineLatest([
      this.translation.translate('asm.customerList.tableSort.byName'),
      this.translation.translate('asm.customerList.tableSort.byNameAsc'),
      this.translation.translate('asm.customerList.tableSort.byNameDesc'),
      this.translation.translate('asm.customerList.tableSort.byDateAsc'),
      this.translation.translate('asm.customerList.tableSort.byDateDesc'),
      this.translation.translate('asm.customerList.tableSort.byOrderDateAsc'),
      this.translation.translate('asm.customerList.tableSort.byOrderDateDesc'),
      this.translation.translate('asm.customerList.tableSort.byUnit'),
      this.translation.translate('asm.customerList.tableSort.byUnitDesc'),
    ]).pipe(
      map(
        ([
          textByName,
          textByNameAsc,
          textByNameDesc,
          textByDateAsc,
          textByDateDesc,
          textByOrderDateAsc,
          textByOrderDateDesc,
          textByUnit,
          textByUnitDesc,
        ]) => {
          return {
            byName: textByName,
            byNameAsc: textByNameAsc,
            byNameDesc: textByNameDesc,
            byOrderDateAsc: textByOrderDateAsc,
            byOrderDateDesc: textByOrderDateDesc,
            byDateAsc: textByDateAsc,
            byDateDesc: textByDateDesc,
            byUnit: textByUnit,
            byUnitDesc: textByUnitDesc,
          };
        }
      )
    );
  }

  createCustomer(): void {
    this.launchDialogService.closeDialog('Create customer click');

    this.launchDialogService?.openDialogAndSubscribe(
      LAUNCH_CALLER.ASM_CREATE_CUSTOMER_FORM,
      this.addNewCustomerLink
    );
  }

  private getBreakpoint(): Observable<BREAKPOINT> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (breakpoint === BREAKPOINT.lg || breakpoint === BREAKPOINT.xl) {
          breakpoint = BREAKPOINT.md;
        }
        return breakpoint;
      })
    );
  }
}
