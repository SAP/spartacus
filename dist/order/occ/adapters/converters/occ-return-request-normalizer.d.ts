import { Converter, ConverterService, Occ } from '@spartacus/core';
import { ReturnRequest } from '@spartacus/order/root';
import * as i0 from "@angular/core";
export declare class OccReturnRequestNormalizer implements Converter<Occ.ReturnRequest, ReturnRequest> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.ReturnRequest, target?: ReturnRequest): ReturnRequest;
    private convertOrderEntry;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccReturnRequestNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccReturnRequestNormalizer>;
}
