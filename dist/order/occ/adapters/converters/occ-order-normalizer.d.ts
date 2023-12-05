import { Converter, ConverterService, Occ } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class OccOrderNormalizer implements Converter<Occ.Order, Order> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.Order, target?: Order): Order;
    private convertOrderEntry;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccOrderNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccOrderNormalizer>;
}
