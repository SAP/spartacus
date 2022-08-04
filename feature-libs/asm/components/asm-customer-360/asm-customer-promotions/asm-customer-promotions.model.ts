import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  ListingFragment,
  ListingItem,
  RawListingItem,
  Searchable,
  Tabulated,
} from '../asm-customer-ui-components/asm-customer-listing/asm-customer-listing.model';

export interface RawPromotionItem extends RawListingItem {
  code?: string;
  name?: string;
  couponApplied?: boolean;

  description?: string;
  firedMessage?: string;
  fired?: boolean;
  priority?: number;
}

export class CouponListingItem extends ListingItem {
  title?: string;
  description?: string;
  applied?: boolean;
  textButton?: boolean;

  get buttonText(): string {
    return this.applied ? 'REMOVE' : 'APPLY TO CART';
  }

  get appliedText(): string | undefined {
    return this.applied ? 'COUPON APPLIED' : undefined;
  }

  constructor(item: RawPromotionItem) {
    super();
    this.title = item.code;
    this.description = item.name;
    this.applied = item.couponApplied;
    this.textButton = item.couponApplied;
  }
}

export class PromotionListingItem extends ListingItem {
  title?: string;
  description?: string;
  applied?: boolean;

  get appliedText(): string | undefined {
    return this.applied ? 'PROMOTION APPLIED' : undefined;
  }

  constructor(item: RawPromotionItem) {
    super();
    this.title = item.name;
    this.description = item.firedMessage;
    this.applied = item.fired;
  }
}

export class CustomerCouponListingItem extends ListingItem {
  title?: string;
  description?: string;
  applied?: boolean;

  get buttonText(): string {
    return this.applied ? 'REMOVE' : 'SEND TO CUSTOMER';
  }

  constructor(item: RawPromotionItem) {
    super();
    this.title = item.code;
    this.description = item.name;
    this.applied = item.couponApplied;
  }
}

export class CouponFragment extends ListingFragment {
  type = 'coupons';
  text = 'COUPONS';
  emptyText = 'There are currently no CSA Coupons available.';
  items: Array<CouponListingItem>;

  buttonAction(item: CouponListingItem) {
    of(undefined)
      .pipe(
        tap(() => {
          item.applied = !item.applied;
          item.textButton = item.applied;
        })
      )
      .subscribe();
  }

  constructor(rawItems: Array<RawPromotionItem>) {
    super(rawItems, CouponListingItem);
  }
}

export class PromotionFragment extends ListingFragment {
  type = 'promotions';
  text = 'PROMOTIONS';
  emptyText = 'There are currently no CSA Promotions available.';
  items: Array<PromotionListingItem>;

  constructor(rawItems: Array<RawPromotionItem>) {
    super(rawItems, PromotionListingItem);
  }
}

export class CustomerCouponFragment
  extends ListingFragment
  implements Tabulated, Searchable
{
  type = 'customerCoupons';
  text = 'CUSTOMER COUPONS';
  items: Array<CustomerCouponListingItem>;
  searchable: Searchable;
  tabs: Tabulated['tabs'];
  currentTab = 0;
  searchTerm = '';

  buttonAction(item: CustomerCouponListingItem) {
    of(undefined)
      .pipe(
        tap(() => {
          item.applied = !item.applied;
          this.tabs = this.tabulate(this.items);
        })
      )
      .subscribe();
  }

  searchAction(term: string): void {
    if (term.length) {
      const filteredItems = this.items.filter((item) =>
        item.description?.toLowerCase().includes(term.toLowerCase())
      );
      this.tabs = this.tabulate(filteredItems);
    } else {
      this.tabs = this.tabulate(this.items);
    }
  }

  setCurrentTab(tab: number): void {
    this.currentTab = tab;
  }

  private tabulate(items: Array<CustomerCouponListingItem>): Tabulated['tabs'] {
    const tabs: Tabulated['tabs'] = [
      { ...this.tabs[0], items: [] },
      { ...this.tabs[1], items: [] },
    ];

    items.forEach((item) => {
      const index = Number(item.applied);
      tabs[index].items.push(item);
    });

    return tabs;
  }

  constructor(rawItems: Array<RawListingItem>) {
    super(rawItems, CustomerCouponListingItem);
    this.tabs = [
      {
        tabName: 'AVAILABLE',
        items: [],
        emptyText: 'There are currently no available customer coupons.',
      },
      {
        tabName: 'SENT',
        items: [],
        emptyText: 'There are currently no sent customer coupons.',
      },
    ];
    this.tabs = this.tabulate(this.items);
  }
}
