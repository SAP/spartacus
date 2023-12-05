import { OnDestroy, OnInit } from '@angular/core';
import { LaunchDialogService, ICON_TYPE, FocusConfig, KeyboardFocusService } from '@spartacus/storefront';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorRouter } from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorStorefrontUtilsService } from '../service';
import * as i0 from "@angular/core";
export declare class ConfiguratorConflictSolverDialogComponent implements OnInit, OnDestroy {
    protected configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected launchDialogService: LaunchDialogService;
    protected focusService: KeyboardFocusService;
    iconTypes: typeof ICON_TYPE;
    uiType: typeof Configurator.UiType;
    focusConfig: FocusConfig;
    protected subscription: Subscription;
    routerData$: Observable<ConfiguratorRouter.Data>;
    conflictGroup$: Observable<Configurator.Group>;
    constructor(configuratorStorefrontUtilsService: ConfiguratorStorefrontUtilsService, configuratorCommonsService: ConfiguratorCommonsService, launchDialogService: LaunchDialogService, focusService: KeyboardFocusService);
    init(conflictGroup: Observable<Configurator.Group>, routerData: Observable<ConfiguratorRouter.Data>): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Closes a modal with a certain reason.
     * Scrolls to the top of the configuration form.
     * Sets focus to the first attribute.
     *
     * @param {any} reason - Reason
     */
    dismissModal(reason?: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorConflictSolverDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorConflictSolverDialogComponent, "cx-configurator-conflict-solver-dialog", never, {}, {}, never, never, false, never>;
}
