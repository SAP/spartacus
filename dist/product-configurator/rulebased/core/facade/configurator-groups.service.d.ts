import { Store } from '@ngrx/store';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { Configurator } from '../model/configurator.model';
import { StateWithConfigurator } from '../state/configurator-state';
import { ConfiguratorCommonsService } from './configurator-commons.service';
import { ConfiguratorGroupStatusService } from './configurator-group-status.service';
import { ConfiguratorUtilsService } from './utils/configurator-utils.service';
import * as i0 from "@angular/core";
/**
 * Service for handling configuration groups
 */
export declare class ConfiguratorGroupsService {
    protected store: Store<StateWithConfigurator>;
    protected configuratorCommonsService: ConfiguratorCommonsService;
    protected configuratorUtilsService: ConfiguratorUtilsService;
    protected configuratorGroupStatusService: ConfiguratorGroupStatusService;
    constructor(store: Store<StateWithConfigurator>, configuratorCommonsService: ConfiguratorCommonsService, configuratorUtilsService: ConfiguratorUtilsService, configuratorGroupStatusService: ConfiguratorGroupStatusService);
    /**
     * Returns the current group Id.
     * In case no group Id is being set before returns the first group of the configuration.
     * Return null when configuration contains no groups.
     *
     * @param {CommonConfigurator.Owner} owner configuration owner
     * @returns {Observable<string>} Group ID
     */
    getCurrentGroupId(owner: CommonConfigurator.Owner): Observable<string>;
    /**
     * Return the first conflict group of a configuration or undefined
     * if not present
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Configurator.Group} Conflict group
     */
    getFirstConflictGroup(configuration: Configurator.Configuration): Configurator.Group | undefined;
    /**
     * Navigates to the first non-conflict group of the configuration which is not completed.
     * This method assumes that the configuration has incomplete groups,
     * the caller has to verify this prior to calling this method. In case no incomplete group is
     * present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     */
    navigateToFirstIncompleteGroup(owner: CommonConfigurator.Owner): void;
    /**
     * Navigates to the first conflict group and sets the conflict header as parent group.
     * This method assumes that the configuration has conflicts,
     * the caller has to verify this prior to calling this method. In case no conflict group
     * is present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner Configuration Owner
     */
    navigateToConflictSolver(owner: CommonConfigurator.Owner): void;
    /**
     * Returns the parent group of the subgroup that is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @returns {Observable<Configurator.Group>} Group
     */
    getMenuParentGroup(owner: CommonConfigurator.Owner): Observable<Configurator.Group | undefined>;
    /**
     * Set the parent group, specified by the group ID, which is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
     */
    setMenuParentGroup(owner: CommonConfigurator.Owner, groupId?: string): void;
    /**
     * Returns the group that is currently visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group>} Current group
     */
    getCurrentGroup(owner: CommonConfigurator.Owner): Observable<Configurator.Group>;
    /**
     * Retrieves a conflict group for immediate conflict resolution.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group | undefined} - Conflict group
     */
    getConflictGroupForImmediateConflictResolution(owner: CommonConfigurator.Owner): Observable<Configurator.Group | undefined>;
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(owner: CommonConfigurator.Owner, groupId: string): void;
    /**
     * Navigates to the group, specified by its group ID.
     *
     * @param {Configurator.Configuration}configuration - Configuration
     * @param {string} groupId - Group ID
     * @param {boolean} setStatus - Group status will be set for previous group, default true
     * @param {boolean} conflictResolutionMode - Parameter with default (false). If set to true, we enter the conflict resolution mode, i.e.
     *  if a conflict is solved, the system will navigate to the next conflict present
     */
    navigateToGroup(configuration: Configurator.Configuration, groupId: string, setStatus?: boolean, conflictResolutionMode?: boolean): void;
    /**
     * Returns the group ID of the group that is coming after the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string> | undefined} ID of next group
     */
    getNextGroupId(owner: CommonConfigurator.Owner): Observable<string | undefined>;
    /**
     * Returns the group ID of the group that is preceding the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string | undefined >} ID of previous group
     */
    getPreviousGroupId(owner: CommonConfigurator.Owner): Observable<string | undefined>;
    /**
     * Verifies whether the group has been visited
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} Has been visited?
     */
    isGroupVisited(owner: CommonConfigurator.Owner, groupId: string): Observable<boolean>;
    /**
     * Returns a parent group for the given group.
     *
     * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
     * @param {Configurator.Group} group - Given group
     * @return {Configurator.Group} Parent group or undefined if group is a top-level group
     */
    getParentGroup(groups: Configurator.Group[], group: Configurator.Group): Configurator.Group | undefined;
    /**
     * Verifies whether the given group has sub groups.
     *
     * @param {Configurator.Group} group - Given group
     * @return {boolean} Sub groups available?
     */
    hasSubGroups(group: Configurator.Group): boolean;
    protected isConflictGroupInImmediateConflictResolutionMode(groupType: Configurator.GroupType | undefined, immediateConflictResolution?: boolean): boolean;
    /**
     * Retrieves a group ID of the neighboring group.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {number} neighboringIndex - Index of neighboring group
     * @return {Observable<string>} group ID of the neighboring group
     */
    protected getNeighboringGroupId(owner: CommonConfigurator.Owner, neighboringIndex: number): Observable<string | undefined>;
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType: Configurator.GroupType): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorGroupsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorGroupsService>;
}
