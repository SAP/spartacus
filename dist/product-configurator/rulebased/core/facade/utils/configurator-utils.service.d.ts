import { StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
export declare class ConfiguratorUtilsService {
    /**
     * Determines the direct parent group for an attribute group
     * @param {Configurator.Group[]} groups - List of groups where we search for parent
     * @param {Configurator.Group} group - If already part of groups, no further search is needed, and we return the provided parent group
     * @param {Configurator.Group} parentGroup - Optional parent group.
     * @returns {Configurator.Group | undefined} - Parent group. Might be undefined
     */
    getParentGroup(groups: Configurator.Group[], group: Configurator.Group, parentGroup?: Configurator.Group): Configurator.Group | undefined;
    /**
     * Finds group identified by its ID, and ensures that we always get a valid group.
     * If nothing is found in the configuration group list, this methods returns the first group.
     *
     * The exceptional case can happen if e.g. an edit in a conflict was done that
     * resolved the conflict, or if a group vanished due to object dependencies.
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise first group
     */
    getGroupById(groups: Configurator.Group[], groupId: string): Configurator.Group;
    /**
     * Finds group identified by its ID. If nothing is found, this
     * methods returns undefined
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group | undefined} - Group identified by its id, if available. Otherwise undefined
     */
    getOptionalGroupById(groups: Configurator.Group[], groupId: string): Configurator.Group | undefined;
    protected getGroupByIdIfPresent(groups: Configurator.Group[], groupId: string): Configurator.Group | undefined;
    protected getGroupFromSubGroups(groups: Configurator.Group[], groupId: string): Configurator.Group | undefined;
    /**
     * Verifies whether the current group has a subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the current group has any subgroups, otherwise 'false'
     */
    hasSubGroups(group: Configurator.Group): boolean;
    /**
     * Verifies whether the configuration has been created.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {boolean} - 'True' if the configuration hass been created, otherwise 'false'
     */
    isConfigurationCreated(configuration?: Configurator.Configuration): boolean;
    /**
     * Creates configuration extract.
     *
     * @param {Configurator.Attribute} changedAttribute - changed configuration
     * @param {Configurator.Configuration} configuration - configuration
     * @param {Configurator.UpdateType} updateType - updated type
     * @return {Configurator.Configuration} - Configuration
     */
    createConfigurationExtract(changedAttribute: Configurator.Attribute, configuration: Configurator.Configuration, updateType?: Configurator.UpdateType): Configurator.Configuration;
    /**
     * Builds group path.
     *
     * @param {string} groupId - Group ID
     * @param { Configurator.Group[]} groupList - List of groups
     * @param { Configurator.Group[]} groupPath - Path of groups
     * @return {boolean} - 'True' if the group has been found, otherwise 'false'
     */
    buildGroupPath(groupId: string, groupList: Configurator.Group[], groupPath: Configurator.Group[]): boolean;
    /**
     * Retrieves the configuration from state, and throws an error in case the configuration is
     * not available
     * @param {StateUtils.ProcessesLoaderState<Configurator.Configuration>} configurationState - Process loader state containing product configuration
     * @returns {Configurator.Configuration} - The actual product configuration
     */
    getConfigurationFromState(configurationState: StateUtils.ProcessesLoaderState<Configurator.Configuration>): Configurator.Configuration;
    protected buildGroupForExtract(group: Configurator.Group): Configurator.Group;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorUtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfiguratorUtilsService>;
}
