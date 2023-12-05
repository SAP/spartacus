import { Injector, OnInit, ViewContainerRef } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { ConfiguratorAttributeCompositionConfig } from './configurator-attribute-composition.config';
import { ConfiguratorAttributeCompositionContext } from './configurator-attribute-composition.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorAttributeCompositionDirective implements OnInit {
    protected vcr: ViewContainerRef;
    protected configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig;
    context: ConfiguratorAttributeCompositionContext;
    protected logger: LoggerService;
    constructor(vcr: ViewContainerRef, configuratorAttributeCompositionConfig: ConfiguratorAttributeCompositionConfig);
    ngOnInit(): void;
    protected renderComponent(component: any, componentKey: string): void;
    protected getComponentInjector(): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorAttributeCompositionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ConfiguratorAttributeCompositionDirective, "[cxConfiguratorAttributeComponent]", never, { "context": "cxConfiguratorAttributeComponent"; }, {}, never, never, false, never>;
}
