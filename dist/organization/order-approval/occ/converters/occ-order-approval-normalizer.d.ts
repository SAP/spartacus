import { Converter, ConverterService, Occ } from '@spartacus/core';
import { OrderApproval } from '../../core/model/order-approval.model';
import * as i0 from "@angular/core";
export declare class OccOrderApprovalNormalizer implements Converter<Occ.OrderApproval, OrderApproval> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.OrderApproval, target?: OrderApproval): OrderApproval;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderApprovalNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderApprovalNormalizer>;
}
