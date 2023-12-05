import { Store } from '@ngrx/store';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
import * as i0 from "@angular/core";
/**
 * Service for handling group statuses
 */
export declare class ConfiguratorGroupStatusService {
    protected store: Store<StateWithConfigurator>;
    protected configuratorUtilsService: ConfiguratorUtilsService;
    constructor(store: Store<StateWithConfigurator>, configuratorUtilsService: ConfiguratorUtilsService);
    /**
     * Verifies whether the group has been visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @returns {Observable<boolean>} Has group been visited?
     */
    isGroupVisited(owner: CommonConfigurator.Owner, groupId: string): Observable<boolean>;
    /**
     * Returns the first non-conflict group of the configuration which is not completed
     * and undefined if all are completed.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     *
     * @return {Configurator.Group} - First incomplete group or undefined
     */
    getFirstIncompleteGroup(configuration: Configurator.Configuration): Configurator.Group | undefined;
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(configuration: Configurator.Configuration, groupId: string): void;
    protected areGroupsVisited(owner: CommonConfigurator.Owner, groupIds: string[]): Observable<boolean>;
    protected getParentGroupStatusVisited(configuration: Configurator.Configuration, groupId: string, parentGroup: Configurator.Group, visitedGroupIds: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupStatusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorGroupStatusService>;
}
