import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class OccConfiguratorVariantUpdateCartEntrySerializer implements Converter<Configurator.UpdateConfigurationForCartEntryParameters, OccConfigurator.UpdateConfigurationForCartEntryParameters> {
    convert(source: Configurator.UpdateConfigurationForCartEntryParameters, target?: OccConfigurator.UpdateConfigurationForCartEntryParameters): OccConfigurator.UpdateConfigurationForCartEntryParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorVariantUpdateCartEntrySerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorVariantUpdateCartEntrySerializer>;
}
