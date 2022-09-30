import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import {
  CustomerListingButton,
  CustomerListingTab,
  ListingItem,
} from './asm-customer-listing.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-listing',
  templateUrl: './asm-customer-listing.component.html',
})
export class AsmCustomerListingComponent {
  @Input()
  buttonConfig: CustomerListingButton;

  @Input()
  currentTab: number;

  @Input()
  emptyStateText: string;

  @Input()
  headerText: string;

  @Input()
  items: Array<ListingItem>;

  /** If this is defined, 'items' will be ignored. */
  @Input()
  tabs: Array<CustomerListingTab>;

  @Output()
  actOn: EventEmitter<ListingItem> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  @Output()
  clickTab: EventEmitter<CustomerListingTab> = new EventEmitter();

  searchTerm: string;
}
