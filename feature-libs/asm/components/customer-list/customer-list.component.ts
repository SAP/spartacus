import { Component, OnInit } from '@angular/core';
import { AsmConfig, AsmService } from '@spartacus/asm/core';
import {
  CustomerListColumnActionType,
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { SortModel, TranslationService, User } from '@spartacus/core';
import {
  BREAKPOINT,
  BreakpointService,
  FocusConfig,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';
import { combineLatest, defer, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CustomerListAction } from './customer-list.model';

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  private PAGE_SIZE = 5;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'customer-list-selector',
    focusOnEscape: true,
  };

  iconTypes = ICON_TYPE;

  BREAKPOINT = BREAKPOINT;

  selectedUserGroupId: string | undefined;

  customerSearchPage$: Observable<CustomerSearchPage | null>;

  customerListsPage$: Observable<CustomerListsPage | undefined>;

  selectedCustomer: User;

  currentPage = 0;

  maxPage = 0;

  loaded = false;

  sorts: SortModel[] | null;

  sortCode: string | undefined;

  breakpoint$: Observable<BREAKPOINT>;

  customerListConfig = this.asmConfig?.asm?.customerList;

  constructor(
    protected modalService: ModalService,
    protected asmService: AsmService,
    protected breakpointService: BreakpointService,
    protected asmConfig: AsmConfig,
    protected translation: TranslationService
  ) {
    this.breakpoint$ = this.getBreakpoint();
  }

  ngOnInit(): void {
    this.customerListsPage$ = this.asmService
      .getCustomerLists()
      .pipe(
        filter((queryState) => queryState.loading === false),
        map((queryState) => {
          return queryState.data;
        })
      )
      .pipe(
        map((customerListsPage) => customerListsPage),
        filter(() => true),
        // set the first value of this.customerListsPage$ to be selected
        tap((result) => {
          if (!this.selectedUserGroupId) {
            this.selectedUserGroupId = result?.userGroups?.[0].uid;
            this.sorts = null;
            this.fetchCustomers();
          }
        })
      );
  }

  fetchCustomers(): void {
    const pageSize =
      this.asmConfig.asm?.customerList?.pageSize ?? this.PAGE_SIZE;
    if (this.selectedUserGroupId) {
      const options: CustomerSearchOptions = {
        customerListId: this.selectedUserGroupId,
        pageSize: pageSize,
        currentPage: this.currentPage,
      };
      if (this.sortCode) {
        options.sort = this.sortCode;
      }

      this.customerSearchPage$ = defer(() => {
        this.loaded = false;
        return this.asmService.searchCustomers(options);
      }).pipe(
        tap((result) => {
          this.loaded = true;
          if (result.sorts) {
            this.sorts = result.sorts;
            this.sortCode = result.pagination?.sort;
          }
          if (result.entries.length < pageSize) {
            this.maxPage = result.pagination?.currentPage || 0;
          } else {
            this.maxPage = this.currentPage + 1;
          }
        })
      );
    }
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
        ?.name || ''
    );
  }

  getbadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) || '') +
      (customerEntry.lastName?.charAt(0) || '')
    );
  }

  startColumnAction(
    customerEntry: User,
    action: CustomerListColumnActionType
  ): void {
    this.selectedCustomer = customerEntry;
    let closeValue: CustomerListAction = {
      actionType: action,
      selectedUser: customerEntry,
    };
    this.closeModal(closeValue);
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
    this.modalService.closeActiveModal(reason);
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
      this.translation.translate('asm.customerList.tableSort.byNameAsc'),
      this.translation.translate('asm.customerList.tableSort.byNameDesc'),
      this.translation.translate('asm.customerList.tableSort.byDateAsc'),
      this.translation.translate('asm.customerList.tableSort.byDateDesc'),
      this.translation.translate('asm.customerList.tableSort.byOrderDateAsc'),
      this.translation.translate('asm.customerList.tableSort.byOrderDateDesc'),
    ]).pipe(
      map(
        ([
          textByNameAsc,
          textByNameDesc,
          textByOrderDateAsc,
          textByOrderDateDesc,
          textByDateAsc,
          textByDateDesc,
        ]) => {
          return {
            byNameAsc: textByNameAsc,
            byNameDesc: textByNameDesc,
            byOrderDateAsc: textByOrderDateAsc,
            byOrderDateDesc: textByOrderDateDesc,
            byDateAsc: textByDateAsc,
            byDateDesc: textByDateDesc,
          };
        }
      )
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
