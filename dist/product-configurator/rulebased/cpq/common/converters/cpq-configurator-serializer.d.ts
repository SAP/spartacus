import { Converter } from '@spartacus/core';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Cpq } from '../cpq.models';
import * as i0 from "@angular/core";
export declare class CpqConfiguratorSerializer implements Converter<Configurator.Configuration, Cpq.UpdateAttribute> {
    convert(source: Configurator.Configuration): Cpq.UpdateAttribute;
    protected convertQuantity(attribute: Configurator.Attribute, configId: string): Cpq.UpdateAttribute;
    protected convertAttribute(attribute: Configurator.Attribute, configurationId: string): Cpq.UpdateAttribute;
    protected processValueCode(valueCode?: string): string | undefined;
    protected processSelectedSingleValue(singleValue?: string): string;
    protected prepareValueIds(attribute: Configurator.Attribute): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CpqConfiguratorSerializer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CpqConfiguratorSerializer>;
}
