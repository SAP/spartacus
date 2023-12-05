import { Cart } from '@spartacus/cart/base/root';
import { Converter, ConverterService, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccCartNormalizer implements Converter<Occ.Cart, Cart> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.Cart, target?: Cart): Cart;
    /**
     * Remove all duplicate promotions
     */
    private removeDuplicatePromotions;
    private removeDuplicateItems;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccCartNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccCartNormalizer>;
}
