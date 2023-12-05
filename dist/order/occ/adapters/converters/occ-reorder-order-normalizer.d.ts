import { CartModificationList } from '@spartacus/cart/base/root';
import { Converter, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccReorderOrderNormalizer implements Converter<Occ.CartModificationList, CartModificationList> {
    convert(source: Occ.CartModificationList, target?: CartModificationList): CartModificationList;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccReorderOrderNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccReorderOrderNormalizer>;
}
