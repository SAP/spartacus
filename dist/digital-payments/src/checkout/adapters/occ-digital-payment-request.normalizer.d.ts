import { Converter } from '@spartacus/core';
import { DpPaymentRequest } from '../models';
import { OccDpPaymentRequest } from './occ.models';
import * as i0 from "@angular/core";
export declare class OccDpRequestNormalizer implements Converter<OccDpPaymentRequest, DpPaymentRequest> {
    convert(source: OccDpPaymentRequest, target: DpPaymentRequest): DpPaymentRequest;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccDpRequestNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccDpRequestNormalizer>;
}
