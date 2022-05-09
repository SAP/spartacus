import { Component, OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import {
  CustomerListsPage,
  CustomerSearchOptions,
  CustomerSearchPage,
} from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import { ICON_TYPE, ModalService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  private PAGE_SIZE = 5;
  private SORT_NAME_ASC = 'byNameAsc';
  private SORT_NAME_DESC = 'byNameDesc';

  iconTypes = ICON_TYPE;

  selectedUserGroupId: string | undefined;

  customerSearchPage$: Observable<CustomerSearchPage | null>;

  customerListsPage$: Observable<CustomerListsPage | undefined>;

  selectedCustomer: User;

  currentPage = 0;

  maxPage = 0;

  loaded = false;

  dataSortDesc = false;

  dataSortIconType: ICON_TYPE = ICON_TYPE.SORT_AMOUNT_DOWN;

  constructor(
    protected modalService: ModalService,
    protected asmService: AsmService
  ) {}

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
        map((x) => x),
        filter(() => true),
        // set the first value of this.customerListsPage$ to be selected
        tap((result) => {
          if (!this.selectedUserGroupId) {
            this.selectedUserGroupId = result?.userGroups?.[0].uid;
            this.fetchCustomers();
          }
        })
      );
  }

  fetchCustomers(): void {
    if (this.selectedUserGroupId) {
      const options: CustomerSearchOptions = {
        customerListId: this.selectedUserGroupId,
        pageSize: this.PAGE_SIZE,
        currentPage: this.currentPage,
        sort: this.dataSortDesc ? this.SORT_NAME_DESC : this.SORT_NAME_ASC,
      };

      this.customerSearchPage$ = of(options)
        .pipe(
          tap(() => (this.loaded = false)),
          switchMap((options) => this.asmService.searchCustomers(options))
        )
        .pipe(
          tap((result) => {
            this.loaded = true;
            if (result.entries.length < this.PAGE_SIZE) {
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
    this.fetchCustomers();
  }

  getbadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) || '') +
      (customerEntry.lastName?.charAt(0) || '')
    );
  }

  selectCustomer(customerEntry: User): void {
    if (customerEntry) {
      this.selectedCustomer = customerEntry;
    }
    this.closeModal(customerEntry);
  }

  sortByName(): void {
    this.dataSortDesc = !this.dataSortDesc;
    this.dataSortIconType = this.dataSortDesc
      ? ICON_TYPE.SORT_AMOUNT_UP
      : ICON_TYPE.SORT_AMOUNT_DOWN;
    this.fetchCustomers();
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
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
}
