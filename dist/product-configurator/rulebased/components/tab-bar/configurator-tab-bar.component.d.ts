import { ElementRef } from '@angular/core';
import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorTabBarComponent {
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    ghostStyle: boolean;
    configTab: ElementRef<HTMLElement>;
    overviewTab: ElementRef<HTMLElement>;
    routerData$: Observable<ConfiguratorRouter.Data>;
    configuration$: Observable<Configurator.Configuration>;
    isOverviewPage$: Observable<boolean>;
    /**
     * Returns the tabindex for the configuration tab.
     * The configuration tab is excluded from the tab chain if currently the overview page is displayed.
     * @returns tabindex of the configuration tab
     */
    getTabIndexConfigTab(): number;
    /**
     * Returns the tabindex for the overview tab.
     * The overview tab is excluded from the tab chain if currently the configuration page is displayed.
     * @returns tabindex of the overview tab
     */
    getTabIndexOverviewTab(): number;
    /**
     * Switches the focus of the tabs on pressing left or right arrow key.
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} currentTab - Current tab
     */
    switchTabOnArrowPress(event: KeyboardEvent, currentTab: string): void;
    constructor(configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorCommonsService: ConfiguratorCommonsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorTabBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorTabBarComponent, "cx-configurator-tab-bar", never, {}, {}, never, never, false, never>;
}
