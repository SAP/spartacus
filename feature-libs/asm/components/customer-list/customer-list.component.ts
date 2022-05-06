import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class CustomerListComponent implements OnInit, OnDestroy {
  private PAGE_SIZE = 5;
  private SORT_NAME_ASC = 'byNameAsc';
  private SORT_NAME_DESC = 'byNameDesc';
  private DEFAULT_PAGE = 0;
  private DEFAULT_MAX_PAGE = 10;

  iconTypes = ICON_TYPE;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;

  selectedUserGroupId: string | undefined;

  customerSearchPage$: Observable<CustomerSearchPage | null>;

  customerListsPage$: Observable<CustomerListsPage>;

  selectedCustomer: User;

  currentPage = this.DEFAULT_PAGE;

  maxPage = this.DEFAULT_MAX_PAGE;

  loaded = false;

  dataSortDesc = false;

  sortName = this.SORT_NAME_ASC;

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
          if (queryState.data) {
            return queryState.data;
          } else {
            // TODO error ?????
            throw new Error();
          }
        })
      )
      .pipe(
        map((x) => x),
        filter(() => true),
        // set the first value of this.customerListsPage$ to be selected
        tap((result) => {
          if (!this.selectedUserGroupId) {
            this.selectedUserGroupId = result.userGroups?.[0].uid;
            this.fetchCustomers();
          }
        })
      );
  }

  ngOnDestroy(): void {}

  fetchCustomers(): void {
    if (this.selectedUserGroupId) {
      const options: CustomerSearchOptions = {
        customerListId: this.selectedUserGroupId,
        pageSize: this.PAGE_SIZE,
        currentPage: this.currentPage,
        sort: this.sortName,
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
            }
          })
        );
    }
  }

  onChangeCustomerGroup(): void {
    this.currentPage = this.DEFAULT_PAGE;
    this.maxPage = this.DEFAULT_MAX_PAGE;
    this.fetchCustomers();
  }

  getbadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) || '') +
      (customerEntry.lastName?.charAt(0) || '')
    );
  }

  onClickName(customerEntry: User): void {
    if (customerEntry) {
      this.selectedCustomer = customerEntry;
    }
    this.closeModal(customerEntry);
  }

  onClickDataSort(): void {
    this.dataSortDesc = !this.dataSortDesc;
    this.dataSortIconType = this.dataSortDesc
      ? ICON_TYPE.SORT_AMOUNT_UP
      : ICON_TYPE.SORT_AMOUNT_DOWN;
    this.sortName = this.dataSortDesc
      ? this.SORT_NAME_DESC
      : this.SORT_NAME_ASC;
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
