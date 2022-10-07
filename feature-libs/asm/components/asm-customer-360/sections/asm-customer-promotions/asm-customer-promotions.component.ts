import { Component } from '@angular/core';
import {
  CustomerListingButton,
  CustomerListingTab,
  ListingItem,
} from '../../asm-customer-ui-components/asm-customer-listing/asm-customer-listing.model';

@Component({
  selector: 'cx-asm-customer-promotions',
  templateUrl: './asm-customer-promotions.component.html',
})
export class AsmCustomerPromotionsComponent {
  couponItems = [
    {
      code: 'This is a 20% off coupon',
      name: 'This is a 20% off coupon and you are gonna be so happy with these savings',
      couponApplied: false,
    },
    {
      code: 'This is a 1% off coupon',
      name: "This is a 1% off coupon and you won't really notice I'm here",
      couponApplied: true,
    },
  ];

  transformedCouponItems: Array<ListingItem>;

  couponButtonConfig: CustomerListingButton = {
    applyText: 'Apply To Cart',
    appliedText: 'Coupon Applied',
    removeText: 'Remove',
    isApplied: (item) => item.applied,
  };

  promotionItems = [
    {
      name: 'This is a 20% off coupon',
      firedMessage:
        'This is a 20% off coupon and you are gonna be so happy with these savings',
      fired: true,
    },
    {
      name: 'This is a 1% off coupon',
      firedMessage:
        "This is a 1% off coupon and you won't really notice I'm here",
      fired: false,
    },
  ];

  transformedPromotionItems: Array<ListingItem>;

  customerCouponItems = [
    {
      code: 'This is a 20% off coupon',
      name: 'This is a 20% off coupon and you are gonna be so happy with these savings',
      couponApplied: true,
    },
    {
      code: 'This is a 1% off coupon',
      name: "This is a 1% off coupon and you won't really notice I'm here",
      couponApplied: false,
    },
    {
      code: 'This is a 500% off coupon',
      name: 'This is a 500% off coupon and you are gonna be so happy with these earnings',
      couponApplied: false,
    },
    {
      code: 'This is a 0% off coupon',
      name: "This is a 0% off coupon and you literally won't notice I'm here",
      couponApplied: true,
    },
    {
      code: 'This is a 100% off coupon',
      name: "It's free, what else do you want?",
      couponApplied: false,
    },
    {
      code: 'This is a 66.666666% off coupon',
      name: "This is the devil's discount. By accepting this, you accept Satan as your lord and savior :)",
      couponApplied: true,
    },
  ];

  customerCouponTabs: Array<CustomerListingTab>;

  currentCustomerCouponTabIndex = 0;

  constructor() {
    this.transformedCouponItems = this.couponItems.map((item) => ({
      title: item.code,
      description: item.name,
      applied: item.couponApplied,
    }));

    this.transformedPromotionItems = this.promotionItems.map((item) => ({
      title: item.name,
      description: item.firedMessage,
      applied: item.fired,
    }));

    this.setCustomerCouponTabs();
  }

  applyCoupon(coupon: ListingItem): void {
    coupon.applied = !coupon.applied;
  }

  applyCustomerCoupon(coupon: ListingItem): void {
    coupon.applied = !coupon.applied;

    if (coupon.applied) {
      this.customerCouponTabs[0].items =
        this.customerCouponTabs[0].items.filter((item) => item !== coupon);
      this.customerCouponTabs[1].items =
        this.customerCouponTabs[1].items.concat(coupon);
    } else {
      this.customerCouponTabs[1].items =
        this.customerCouponTabs[1].items.filter((item) => item !== coupon);
      this.customerCouponTabs[0].items =
        this.customerCouponTabs[0].items.concat(coupon);
    }
  }

  onCustomerCouponTabClick(customerCouponTab: CustomerListingTab): void {
    this.currentCustomerCouponTabIndex = this.customerCouponTabs.findIndex(
      (tab) => tab === customerCouponTab
    );
  }

  setCustomerCouponTabs(): void {
    this.customerCouponTabs = [
      {
        tabName: 'AVAILABLE',
        items: [],
        emptyText: 'There are currently no available customer coupons.',
        buttonConfig: {
          applyText: 'Send to customer',
        },
      },
      {
        tabName: 'SENT',
        items: [],
        emptyText: 'There are currently no sent customer coupons.',
        buttonConfig: {
          applyText: 'Remove',
        },
      },
    ];

    this.customerCouponItems.forEach((item) => {
      const listingItem = {
        title: item.code,
        description: item.name,
        applied: item.couponApplied,
      };

      if (item.couponApplied) {
        this.customerCouponTabs[1].items.push(listingItem);
      } else {
        this.customerCouponTabs[0].items.push(listingItem);
      }
    });
  }
}
