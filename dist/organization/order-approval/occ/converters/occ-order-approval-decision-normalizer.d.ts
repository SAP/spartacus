import { Converter, Occ } from '@spartacus/core';
import { OrderApprovalDecision } from '../../core/model/order-approval.model';
import * as i0 from "@angular/core";
export declare class OccOrderApprovalDecisionNormalizer implements Converter<Occ.OrderApprovalDecision, OrderApprovalDecision> {
    constructor();
    convert(source: Occ.OrderApprovalDecision, target?: OrderApprovalDecision): OrderApprovalDecision;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderApprovalDecisionNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderApprovalDecisionNormalizer>;
}
