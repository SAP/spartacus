import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { OccCpqConfigurator } from '../cpq-configurator-occ.models';
import * as i0 from "@angular/core";
export declare class OccConfiguratorCpqUpdateCartEntrySerializer implements Converter<Configurator.UpdateConfigurationForCartEntryParameters, OccCpqConfigurator.UpdateConfigurationForCartEntryParameters> {
    convert(source: Configurator.UpdateConfigurationForCartEntryParameters, target?: OccCpqConfigurator.UpdateConfigurationForCartEntryParameters): OccCpqConfigurator.UpdateConfigurationForCartEntryParameters;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorCpqUpdateCartEntrySerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorCpqUpdateCartEntrySerializer>;
}
