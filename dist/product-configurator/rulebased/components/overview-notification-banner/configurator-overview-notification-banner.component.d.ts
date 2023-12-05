import { CommonConfiguratorUtilsService, ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
export declare class ConfiguratorOverviewNotificationBannerComponent {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected commonConfigUtilsService: CommonConfiguratorUtilsService;
    routerData$: Observable<ConfiguratorRouter.Data>;
    configuration$: Observable<Configurator.Configuration>;
    configurationOverview$: Observable<Configurator.Overview | undefined>;
    numberOfIssues$: Observable<number>;
    numberOfConflicts$: Observable<number>;
    skipConflictsOnIssueNavigation$: Observable<boolean>;
    iconTypes: typeof ICON_TYPE;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configRouterExtractorService: ConfiguratorRouterExtractorService, commonConfigUtilsService: CommonConfiguratorUtilsService);
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorOverviewNotificationBannerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorOverviewNotificationBannerComponent, "cx-configurator-overview-notification-banner", never, {}, {}, never, never, false, never>;
}
