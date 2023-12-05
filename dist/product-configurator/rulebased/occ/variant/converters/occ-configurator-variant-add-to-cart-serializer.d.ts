import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantAddToCartSerializer implements Converter<Configurator.AddToCartParameters, OccConfigurator.AddToCartParameters> {
    constructor();
    convert(source: Configurator.AddToCartParameters, target?: OccConfigurator.AddToCartParameters): OccConfigurator.AddToCartParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantAddToCartSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantAddToCartSerializer>;
}
