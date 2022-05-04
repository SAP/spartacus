import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsmConfig, AsmService, UserGroup } from '@spartacus/asm/core';
import { CustomerListsPage, CustomerSearchPage } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import {
  BreakpointService,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private PAGE_SIZE = 20;
  private SORT_NAME_ASC = 'byNameAsc';
  private SORT_NAME_DESC = 'byNameDesc';

  iconTypes = ICON_TYPE;

  @ViewChild('dialog', { read: ElementRef })
  dialog: ElementRef;
  modalIsOpen = false;
  loaded$: Observable<boolean>;
  selectedUserGroupId: string | undefined;
  userGroups: Array<UserGroup> | undefined = [];

  customerEntries: Array<User> = [];

  customerSearchPage$: Observable<CustomerSearchPage>;

  customerListsPage$: Observable<CustomerListsPage>;

  selectedCustomer: User;

  dataSortDesc = false;

  currentPage = 0;

  sortName = this.SORT_NAME_ASC;

  dataSortIconType: ICON_TYPE = ICON_TYPE.CARET_UP;

  constructor(
    protected modalService: ModalService,
    protected asmService: AsmService,
    protected config: AsmConfig,
    protected breakpointService: BreakpointService
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
      this.customerSearchPage$ = this.asmService.searchCustomers({
        customerListId: this.selectedUserGroupId,
        pageSize: this.PAGE_SIZE,
        currentPage: this.currentPage,
        sort: this.sortName,
      });
    }
  }

  getbadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) || '') +
      (customerEntry.lastName?.charAt(0) || '')
    );
  }

  onClickCart(customerEntry: User): void {
    if (customerEntry) {
      this.selectedCustomer = customerEntry;
    }
    this.closeModal(customerEntry);
  }

  onClickName(customerEntry: User): void {
    if (customerEntry) {
      this.selectedCustomer = customerEntry;
    }
    this.closeModal(customerEntry);
  }

  onClickOrder(customerEntry: User): void {
    if (customerEntry) {
      this.selectedCustomer = customerEntry;
    }
    this.closeModal(customerEntry);
  }

  onClickDataSort(): void {
    this.dataSortDesc = !this.dataSortDesc;
    this.dataSortIconType = this.dataSortDesc
      ? ICON_TYPE.CARET_UP
      : ICON_TYPE.CARET_DOWN;
    this.sortName = this.dataSortDesc
      ? this.SORT_NAME_DESC
      : this.SORT_NAME_ASC;
    this.fetchCustomers();
  }

  pageChange(page: number): void {
    this.currentPage = page;
    this.fetchCustomers();
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }
}
