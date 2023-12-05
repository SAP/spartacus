import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantPriceNormalizer implements Converter<OccConfigurator.Prices, Configurator.Configuration> {
    convert(source: OccConfigurator.Prices, target?: Configurator.Configuration): Configurator.Configuration;
    convertAttributeSupplements(source: OccConfigurator.Supplements, priceSupplements: Configurator.AttributeSupplement[]): void;
    convertValueSupplement(source: OccConfigurator.ValueSupplements, valueSupplements: Configurator.ValueSupplement[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantPriceNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantPriceNormalizer>;
}
