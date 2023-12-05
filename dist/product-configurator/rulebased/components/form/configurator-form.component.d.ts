import { OnDestroy, OnInit } from '@angular/core';
import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { LaunchDialogService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';
import { FeatureConfigService, GlobalMessageService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ConfiguratorFormComponent implements OnInit, OnDestroy {
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configExpertModeService: ConfiguratorExpertModeService;
    protected launchDialogService: LaunchDialogService;
    protected featureConfigservice?: FeatureConfigService | undefined;
    protected globalMessageService?: GlobalMessageService | undefined;
    protected subscription: Subscription;
    routerData$: Observable<ConfiguratorRouter.Data>;
    configuration$: Observable<Configurator.Configuration>;
    currentGroup$: Observable<Configurator.Group>;
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configExpertModeService: ConfiguratorExpertModeService, launchDialogService: LaunchDialogService, featureConfigService: FeatureConfigService, globalMessageService: GlobalMessageService);
    /**
     * @deprecated since 6.1
     */
    constructor(configuratorCommonsService: ConfiguratorCommonsService, configuratorGroupsService: ConfiguratorGroupsService, configRouterExtractorService: ConfiguratorRouterExtractorService, configExpertModeService: ConfiguratorExpertModeService, launchDialogService: LaunchDialogService);
    ngOnDestroy(): void;
    protected listenForConflictResolution(): void;
    protected displayConflictResolvedMessage(): void;
    ngOnInit(): void;
    /**
     * Verifies whether the navigation to a conflict group is enabled.
     * @param configuration Current configuration
     * @returns {boolean} Returns 'true' if the navigation to a conflict group is enabled, otherwise 'false'.
     */
    isNavigationToGroupEnabled(configuration: Configurator.Configuration): boolean;
    /**
     * Checks if conflict solver dialog is active
     * @param configuration
     * @returns Conflict solver dialog active?
     */
    isDialogActive(configuration: Configurator.Configuration): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorFormComponent, [null, null, null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorFormComponent, "cx-configurator-form", never, {}, {}, never, never, false, never>;
}
