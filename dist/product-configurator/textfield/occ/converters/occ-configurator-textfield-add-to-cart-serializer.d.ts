import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';
import * as i0 from "@angular/core";
export declare const CONFIGURATOR_TYPE_TEXTFIELD = "TEXTFIELD";
export declare class OccConfiguratorTextfieldAddToCartSerializer implements Converter<ConfiguratorTextfield.AddToCartParameters, OccConfiguratorTextfield.AddToCartParameters> {
    constructor();
    /**
     * Converts addToCart parameters into the OCC format
     * @param source Add to cart parameters in generic format
     * @param target Add to cart parameters in OCC format. Optional, can be used in case converters should be chained
     * @returns Add to cart parameters in OCC format
     */
    convert(source: ConfiguratorTextfield.AddToCartParameters, target?: OccConfiguratorTextfield.AddToCartParameters): OccConfiguratorTextfield.AddToCartParameters;
    protected convertInfo(source: ConfiguratorTextfield.ConfigurationInfo, occConfigurationInfos: OccConfiguratorTextfield.ConfigurationInfo[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorTextfieldAddToCartSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorTextfieldAddToCartSerializer>;
}
