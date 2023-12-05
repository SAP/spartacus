import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantPriceSummaryNormalizer implements Converter<OccConfigurator.Prices, Configurator.PriceSummary> {
    convert(source: OccConfigurator.Prices, target?: Configurator.PriceSummary): Configurator.PriceSummary;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantPriceSummaryNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantPriceSummaryNormalizer>;
}
