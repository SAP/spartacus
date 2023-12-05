import { ConsentTemplate, Converter } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class CdcUserPreferenceSerializer implements Converter<ConsentTemplate, any> {
    constructor();
    convert(source: ConsentTemplate, target?: any): any;
    /**
     * converts a dot separated string to deeply nested object
     * @param path : dot separated string
     * @param value : true if consent is given, false if consent is withdrawn
     * @returns preference object compatible for cdc
     * example:
     * input path x.y.z.isConsentGranted
     * input value: true
     * output=  x:{y:{z:{isConsentGranted: true}}}
     */
    private convertToCdcPreference;
    static ɵfac: i0.ɵɵFactoryDeclaration<CdcUserPreferenceSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CdcUserPreferenceSerializer>;
}
