import { PaymentDetails } from '@spartacus/cart/base/root';
import { Converter, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccDpDetailsNormalizer implements Converter<Occ.PaymentDetails, PaymentDetails> {
    convert(source: Occ.PaymentDetails, target: PaymentDetails): PaymentDetails;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccDpDetailsNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccDpDetailsNormalizer>;
}
