import { Injectable } from '@angular/core';
import {
  Cart,
  OrderEntry,
  EntryGroup,
  ORDER_ENTRY_PROMOTIONS_NORMALIZER,
} from '@spartacus/cart/base/root';
import {
  Converter,
  ConverterService,
  Occ,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class OccCartNormalizer implements Converter<Occ.Cart, Cart> {
  constructor(private converter: ConverterService) {}

  convert(source: Occ.Cart, target?: Cart): Cart {
    const mapEntry = (entry: Occ.OrderEntry): OrderEntry => ({
      ...entry,
      product: this.converter.convert(entry.product, PRODUCT_NORMALIZER),
      promotions: this.converter.convert(
        { item: entry, promotions: target?.appliedProductPromotions },
        ORDER_ENTRY_PROMOTIONS_NORMALIZER
      ),
    });

    if (target === undefined) {
      target = { ...(source as any) } as Cart;
    }

    this.removeDuplicatePromotions(source, target);

    if (source.entries) {
      target.entries = source.entries.map(mapEntry);
    }

    if (source.entryGroups) {
      const mapEntryGroups = (groups: Occ.EntryGroup[]): EntryGroup[] =>
        groups.map(
          (group) =>
            ({
              ...group,
              entries: group.entries?.map(mapEntry),
              ...(group.entryGroups?.length && {
                entryGroups: mapEntryGroups(group.entryGroups),
              }),
            } as EntryGroup)
        );
      target.entryGroups = mapEntryGroups(source.entryGroups);
    }

    return target;
  }

  /**
   * Remove all duplicate promotions
   */
  private removeDuplicatePromotions(source: any, target: Cart): void {
    if (source && source.potentialOrderPromotions) {
      target.potentialOrderPromotions = this.removeDuplicateItems(
        source.potentialOrderPromotions
      );
    }

    if (source && source.potentialProductPromotions) {
      target.potentialProductPromotions = this.removeDuplicateItems(
        source.potentialProductPromotions
      );
    }

    if (source && source.appliedOrderPromotions) {
      target.appliedOrderPromotions = this.removeDuplicateItems(
        source.appliedOrderPromotions
      );
    }

    if (source && source.appliedProductPromotions) {
      target.appliedProductPromotions = this.removeDuplicateItems(
        source.appliedProductPromotions
      );
    }
  }

  private removeDuplicateItems(itemList: any[]): any[] {
    return itemList.filter((p, i, a) => {
      const b = a.map((el) => JSON.stringify(el));
      return i === b.indexOf(JSON.stringify(p));
    });
  }
}
