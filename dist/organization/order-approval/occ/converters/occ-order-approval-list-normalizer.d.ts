import { Converter, ConverterService, EntitiesModel, Occ } from '@spartacus/core';
import { OrderApproval } from '../../core/model/order-approval.model';
import * as i0 from "@angular/core";
export declare class OccOrderApprovalListNormalizer implements Converter<Occ.OrderApprovalsList, EntitiesModel<OrderApproval>> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.OrderApprovalsList, target?: EntitiesModel<OrderApproval>): EntitiesModel<OrderApproval>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderApprovalListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderApprovalListNormalizer>;
}
