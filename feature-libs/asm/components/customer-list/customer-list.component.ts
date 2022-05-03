import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AsmConfig,
  AsmService,
  UserGroup,
} from '@spartacus/asm/core';
import { CustomerListsPage, CustomerSearchPage } from '@spartacus/asm/root';
import { User } from '@spartacus/core';
import {
  BreakpointService,
  ICON_TYPE,
  ModalService,
} from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

class testUserGroup implements UserGroup {
  name: string;
  uid: string;

  constructor(uid: string, name: string) {
    this.uid = uid;
    this.name = name;
  }

  toString(): string {
    return this.name + 'xx';
  }
}

@Component({
  selector: 'cx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  // providers: [OccAsmAdapter],
})
export class CustomerListComponent implements OnInit, OnDestroy {
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

  dataSortDesc = true;

  // currently API doesn't support Date sort... Possible values: byUidAsc, byUidDesc, byNameAsc, byNameDesc
  sortType: string; // byNameAsc, byNameDesc

  dataSortIconType: ICON_TYPE = ICON_TYPE.CARET_UP;

  testGroups = [
    new testUserGroup('uid1', 'name1'),
    new testUserGroup('uid2', 'name2'),
  ];

  // private PAGE_SIZE = 5;

  constructor(
    protected modalService: ModalService,
    protected asmService: AsmService,
    protected config: AsmConfig,
    protected breakpointService: BreakpointService // protected occAsmAdapter: OccAsmAdapter
  ) {}

  ngOnInit(): void {
    // this.asmService.searchCustomerLists();

    // this.occAsmAdapter.customerLists().subscribe((result) => {
    //   if (result) {
    //     debugger;
    //   }
    // });


    this.customerListsPage$ = this.asmService.getCustomerLists2()
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
      ).pipe(

    // this.customerListsPage$ = this.asmService.getCustomerLists().pipe(
    // this.customerListsPage$ = of(this.getMockCustomerLists()).pipe(
      map(x => x),
      filter(() => true),
      // set the first value of this.customerListsPage$ to be selected
      tap((result) => {
        if (!this.selectedUserGroupId) {
          this.selectedUserGroupId = result.userGroups?.[0].uid;
          this.getCustomers();
        }
      })
    );
  }

  ngOnDestroy(): void {}

  getCustomers(): void {
    if (this.selectedUserGroupId) {
      // TODO call new search query
      this.customerSearchPage$ = this.asmService.searchCustomers2({customerListId: this.selectedUserGroupId, pageSize: 10});
    }
  }

  fetchCustomers(): void {
    // event: { sortCode: string; currentPage: number }
    // this.orderHistoryFacade.loadOrderList(
    //   this.PAGE_SIZE,
    //   event.currentPage,
    //   event.sortCode
    // );
  }

  getbadgeText(customerEntry: User): string {
    return (
      (customerEntry.firstName?.charAt(0) || '') +
      (customerEntry.lastName?.charAt(0) || '')
    );
  }
  getRandomColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
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
    // byNameAsc, byNameDesc
    this.dataSortDesc = !this.dataSortDesc;
    this.dataSortIconType = this.dataSortDesc
      ? ICON_TYPE.CARET_UP
      : ICON_TYPE.CARET_DOWN;
    // TODO call service to get sort
  }
  pageChange(page: number): void {
    const event: { sortCode: string; currentPage: number } = {
      sortCode: this.sortType,
      currentPage: page,
    };
    if (event) {
    }
    // TODO call service
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  getMockCustomerLists(): CustomerListsPage {
    return {
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
  }

  getMockCustomerSearchPage(): CustomerSearchPage {
    return {
      entries: [
        {
          name: 'Hak Gmail',
          uid: 'kimhakwoo@gmail.com',
          currency: {
            active: true,
            isocode: 'USD',
            name: 'US Dollar',
            symbol: '$',
          },
          customerId: 'c19ef008-7a5b-4d0b-92e9-22874fab6f4f',
          displayUid: 'kimhakwoo@gmail.com',
          firstName: 'Hak',
          language: {
            active: true,
            isocode: 'en',
            name: 'English',
            nativeName: 'English',
          },
          lastName: 'Gmail',
          title: 'Mr.',
          titleCode: 'mr',
        },
        {
          name: 'Hak Kim',
          uid: 'kimhakwo@hotmail.com',
          currency: {
            active: true,
            isocode: 'USD',
            name: 'US Dollar',
            symbol: '$',
          },
          customerId: '22b2bb2c-0471-4985-9d1f-675d2e083444',
          displayUid: 'kimhakwo@hotmail.com',
          firstName: 'Hak',
          language: {
            active: true,
            isocode: 'en',
            name: 'English',
            nativeName: 'English',
          },
          lastName: 'Kim',
          title: 'Mr.',
          titleCode: 'mr',
        },
      ],
      pagination: {
        currentPage: 0,
        pageSize: 5,
        sort: 'byNameAsc',
        totalPages: 5,
        totalResults: 27,
      },
    };
  }
}
