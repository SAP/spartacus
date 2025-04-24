import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OrderEntry } from '@spartacus/cart/base/root';
import { Product, ProductService } from '@spartacus/core';
import {
  LaunchDialogService,
  ICON_TYPE,
  FocusConfig,
  CurrentProductService,
} from '@spartacus/storefront';
// import { SubscriptionProductService } from '@spartacus/subscription-billing/core';
import { OneTimeCharge, PerUnitUsageCharge, RecurringCharge, TierUsageChargeEntry, UsageChargeType, VolumeUsageCharge } from '../../model';

@Component({
  selector: 'cx-subscription-billing-cart-charges',
  standalone: false,
  templateUrl: './subscription-billing-cart-charges.component.html',
})
export class SubscriptionBillingCartChargesComponent {
  protected launchDialogService = inject(LaunchDialogService);
  // protected productService = inject(SubscriptionProductService);
  protected currentProductService = inject(CurrentProductService);
  protected productService = inject(ProductService);

  iconTypes = ICON_TYPE;

  focusConfig: FocusConfig = {
    trap: false,
    block: false,
    autofocus: 'button',
    focusOnEscape: true,
  };

  orderData = toSignal<OrderEntry>(this.launchDialogService.data$);
  productCode: Signal<string> = computed(() => {
    return this.orderData()?.product?.code || '';
  });

  productDetail: Signal<Product | null | undefined> = computed(() =>
    {return this.orderData()?.product;}
  );

  isCurrentProductSubscription: Signal<boolean> = computed(() => {
    const product = this.orderData()?.product;
    return product?.sapSubscriptionTerm && product.sapPricePlan ? true : false;
    if (product !== null && product !== undefined) {
    } else {
      return false;
    }
  });

  oneTimeCharges: Signal<OneTimeCharge[]> = computed(
    () => this.productDetail()?.sapPricePlan?.oneTimeCharges ?? []
  );
  recurringCharges: Signal<RecurringCharge[]> = computed(
    () => this.productDetail()?.sapPricePlan?.recurringCharges ?? []
  );
  blockUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.productDetail()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.BLOCK
      ) ?? []
    );
  });

  getIncludedQuantity(charge: PerUnitUsageCharge): string {
    if (charge.includedQty) {
      return (
        charge.includedQty +
        ' ' +
        (charge.includedQty > 1
          ? charge.usageUnit?.namePlural
          : charge.usageUnit?.name)
      );
    }
    return '';
  }

  percentageUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.productDetail()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.PERCENTAGE
      ) ?? []
    );
  });

  tierUsageCharges: Signal<PerUnitUsageCharge[]> = computed(() => {
    return (
      this.productDetail()?.sapPricePlan?.perUnitUsageCharges?.filter(
        (item) => item.usageChargeType === UsageChargeType.TIER
      ) ?? []
    );
  });

  volumeUsageCharges: Signal<VolumeUsageCharge[]> = computed(
    () => this.productDetail()?.sapPricePlan?.volumeUsageCharges ?? []
  );

  getLastTierValue(tierUsageChargeEntries: TierUsageChargeEntry[]): number {
    return (
      tierUsageChargeEntries[tierUsageChargeEntries.length - 1].tierEnd ?? 0
    );
  }

  onDialogClose(reason: string) {
    console.log('Dialog closed');
    this.launchDialogService.closeDialog(reason);
  }
}
