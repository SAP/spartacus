import { ElementRef } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewFilterButtonComponent {
    protected launchDialogService: LaunchDialogService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    constructor(launchDialogService: LaunchDialogService, configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService);
    filterButton: ElementRef;
    ghostStyle: boolean;
    /**
     * @deprecated since 6.1. Use configurationWithOv$ instead
     */
    config$: Observable<Configurator.Configuration>;
    configurationWithOv$: Observable<Configurator.ConfigurationWithOverview>;
    /**
     * get the number of filters currently applied to the overview page
     *
     * @param {Configurator.Overview} overview - current configuration overview data
     * @returns {number} - number of applied filters
     */
    getNumFilters(overview: Configurator.Overview): number;
    /**
     * opens the filter modal
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    openFilterModal(config: Configurator.ConfigurationWithOverview): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewFilterButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewFilterButtonComponent, "cx-configurator-overview-filter-button", never, {}, {}, never, never, false, never>;
}
