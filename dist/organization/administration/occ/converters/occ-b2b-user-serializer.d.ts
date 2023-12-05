import { B2BUser, Converter, Occ } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class OccB2bUserSerializer implements Converter<B2BUser, Occ.B2BUser> {
    constructor();
    convert(source: B2BUser, target?: Occ.B2BUser): Occ.B2BUser;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccB2bUserSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccB2bUserSerializer>;
}
