import { OnDestroy } from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { ConfiguratorRouter, ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, Subscription } from 'rxjs';
import { ConfiguratorGroupsService } from '../../core/facade/configurator-groups.service';
import { Configurator } from '../../core/model/configurator.model';
import * as i0 from "@angular/core";
type ConflictGroupAndRouterData = {
    conflictGroup?: Configurator.Group;
    routerData: ConfiguratorRouter.Data;
};
export declare class ConfiguratorConflictSolverDialogLauncherService implements OnDestroy {
    protected launchDialogService: LaunchDialogService;
    protected configRouterExtractorService: ConfiguratorRouterExtractorService;
    protected configuratorGroupsService: ConfiguratorGroupsService;
    protected subscription: Subscription;
    routerData$: Observable<ConfiguratorRouter.Data>;
    conflictGroupAndRouterData$: Observable<ConflictGroupAndRouterData>;
    constructor(launchDialogService: LaunchDialogService, configRouterExtractorService: ConfiguratorRouterExtractorService, configuratorGroupsService: ConfiguratorGroupsService);
    protected controlDialog(): void;
    protected subscribeToCloseDialog(): void;
    protected openModal(): void;
    protected closeModal(reason?: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorConflictSolverDialogLauncherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorConflictSolverDialogLauncherService>;
}
export {};
