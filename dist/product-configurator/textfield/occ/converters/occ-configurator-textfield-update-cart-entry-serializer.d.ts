import { Converter } from '@spartacus/core';
import { ConfiguratorTextfield } from '../../core/model/configurator-textfield.model';
import { OccConfiguratorTextfield } from '../occ-configurator-textfield.models';
import * as i0 from "@angular/core";
export declare const CONFIGURATOR_TYPE_TEXTFIELD = "TEXTFIELD";
export declare class OccConfiguratorTextfieldUpdateCartEntrySerializer implements Converter<ConfiguratorTextfield.UpdateCartEntryParameters, OccConfiguratorTextfield.UpdateCartEntryParameters> {
    constructor();
    /**
     * Converts the attributes for the updateCartEntry request into OCC format. Most attributes are just copied,
     * except for the backend configurator type that needs to be set to 'TEXTFIELD'
     * @param source Attributes for updating a cart entries' configuration in generic format
     * @returns ttributes for updating a cart entries' configuration in OCC format
     */
    convert(source: ConfiguratorTextfield.UpdateCartEntryParameters): OccConfiguratorTextfield.UpdateCartEntryParameters;
    protected convertInfo(source: ConfiguratorTextfield.ConfigurationInfo, occConfigurationInfos: OccConfiguratorTextfield.ConfigurationInfo[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccConfiguratorTextfieldUpdateCartEntrySerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccConfiguratorTextfieldUpdateCartEntrySerializer>;
}
