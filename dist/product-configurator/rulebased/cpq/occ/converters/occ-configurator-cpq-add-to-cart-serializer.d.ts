import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';
import * as i0 from "@angular/core";
export declare class OccConfiguratorCpqAddToCartSerializer implements Converter<Configurator.AddToCartParameters, OccCpqConfigurator.AddToCartParameters> {
    convert(source: Configurator.AddToCartParameters, target?: OccCpqConfigurator.AddToCartParameters): OccCpqConfigurator.AddToCartParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorCpqAddToCartSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorCpqAddToCartSerializer>;
}
