import { PromotionOrderEntryConsumed, PromotionResult } from '@spartacus/cart/base/root';
import { Converter, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OrderEntryPromotionsNormalizer implements Converter<{
    item?: Occ.OrderEntry;
    promotions?: PromotionResult[];
}, PromotionResult[]> {
    convert(source: {
        item?: Occ.OrderEntry;
        promotions?: PromotionResult[];
    }, target?: PromotionResult[]): PromotionResult[];
    /**
     * Get consumed promotions for the given order entry
     *
     * @param item
     * @param promotions
     * @returns consumed promotions for this entry
     */
    getProductPromotion(item?: Occ.OrderEntry, promotions?: PromotionResult[]): PromotionResult[];
    protected isConsumedByEntry(consumedEntry: PromotionOrderEntryConsumed, entry: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderEntryPromotionsNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OrderEntryPromotionsNormalizer>;
}
