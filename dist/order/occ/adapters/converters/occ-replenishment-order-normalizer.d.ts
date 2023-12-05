import { Converter, ConverterService, Occ } from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class OccReplenishmentOrderNormalizer implements Converter<Occ.ReplenishmentOrder, ReplenishmentOrder> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.ReplenishmentOrder, target?: ReplenishmentOrder): ReplenishmentOrder;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccReplenishmentOrderNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccReplenishmentOrderNormalizer>;
}
