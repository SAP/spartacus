import { OnDestroy, OnInit } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE, HamburgerMenuService, BreakpointService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { ConfiguratorStorefrontUtilsService } from '../service/configurator-storefront-utils.service';
import * as i0 from "@angular/core";
export declare class ConfiguratorGroupTitleComponent implements OnInit, OnDestroy {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    protected breakpointService: BreakpointService;
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
    protected hamburgerMenuService: HamburgerMenuService;
    ghostStyle: boolean;
    protected subscription: Subscription;
    protected readonly PRE_HEADER = ".PreHeader";
    displayedGroup$: Observable<Configurator.Group>;
    iconTypes: typeof ICON_TYPE;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configExpertModeService: ConfiguratorExpertModeService, breakpointService: BreakpointService, configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService, hamburgerMenuService: HamburgerMenuService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getGroupTitle(group: Configurator.Group): string | undefined;
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isMobile(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorGroupTitleComponent, "cx-configurator-group-title", never, {}, {}, never, never, false, never>;
}
