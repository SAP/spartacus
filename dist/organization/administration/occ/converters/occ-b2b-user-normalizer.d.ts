import { B2BUser, Converter, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccB2BUserNormalizer implements Converter<Occ.B2BUser, B2BUser> {
    constructor();
    convert(source: Occ.B2BUser, target?: B2BUser): B2BUser;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccB2BUserNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccB2BUserNormalizer>;
}
