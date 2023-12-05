import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '../../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCompositionContext {
    componentKey: string;
    attribute: Configurator.Attribute;
    owner: CommonConfigurator.Owner;
    group: Configurator.Group;
    language: string;
    expMode: boolean;
    isNavigationToGroupEnabled?: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCompositionContext, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorAttributeCompositionContext>;
}
