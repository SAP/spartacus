import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewSidebarComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
    ghostStyle: boolean;
    showFilter: boolean;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService);
    /**
     * @deprecated since 6.1. Use configurationWithOv$ instead
     */
    config$: Observable<Configurator.Configuration>;
    configurationWithOv$: Observable<Configurator.ConfigurationWithOverview>;
    /**
     * Triggers display of the filter view in the overview sidebar
     */
    onFilter(): void;
    /**
     * Triggers display of the menu view in the overview sidebar
     */
    onMenu(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewSidebarComponent, "cx-configurator-overview-sidebar", never, {}, {}, never, never, false, never>;
}
