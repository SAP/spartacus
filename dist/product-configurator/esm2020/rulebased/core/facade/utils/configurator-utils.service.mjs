/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
export class ConfiguratorUtilsService {
    /**
     * Determines the direct parent group for an attribute group
     * @param {Configurator.Group[]} groups - List of groups where we search for parent
     * @param {Configurator.Group} group - If already part of groups, no further search is needed, and we return the provided parent group
     * @param {Configurator.Group} parentGroup - Optional parent group.
     * @returns {Configurator.Group | undefined} - Parent group. Might be undefined
     */
    getParentGroup(groups, group, parentGroup) {
        if (groups.includes(group)) {
            return parentGroup;
        }
        return groups
            .map((currentGroup) => {
            return currentGroup.subGroups
                ? this.getParentGroup(currentGroup.subGroups, group, currentGroup)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
    }
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
    getGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        const groupFound = this.getGroupFromSubGroups(groups, groupId);
        return groupFound ? groupFound : groups[0];
    }
    /**
     * Finds group identified by its ID. If nothing is found, this
     * methods returns undefined
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group | undefined} - Group identified by its id, if available. Otherwise undefined
     */
    getOptionalGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        return currentGroup
            ? currentGroup
            : this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupByIdIfPresent(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        return this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupFromSubGroups(groups, groupId) {
        const groupFound = groups
            .map((group) => {
            return group.subGroups
                ? this.getGroupByIdIfPresent(group.subGroups, groupId)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
        return groupFound;
    }
    /**
     * Verifies whether the current group has a subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the current group has any subgroups, otherwise 'false'
     */
    hasSubGroups(group) {
        return group.subGroups ? group.subGroups.length > 0 : false;
    }
    /**
     * Verifies whether the configuration has been created.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {boolean} - 'True' if the configuration hass been created, otherwise 'false'
     */
    isConfigurationCreated(configuration) {
        const configId = configuration?.configId;
        return (configId !== undefined &&
            configId.length !== 0 &&
            configuration !== undefined &&
            (configuration.flatGroups.length > 0 ||
                configuration.overview !== undefined));
    }
    /**
     * Creates configuration extract.
     *
     * @param {Configurator.Attribute} changedAttribute - changed configuration
     * @param {Configurator.Configuration} configuration - configuration
     * @param {Configurator.UpdateType} updateType - updated type
     * @return {Configurator.Configuration} - Configuration
     */
    createConfigurationExtract(changedAttribute, configuration, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        const newConfiguration = {
            configId: configuration.configId,
            groups: [],
            flatGroups: [],
            interactionState: {
                isConflictResolutionMode: configuration.interactionState.isConflictResolutionMode,
            },
            owner: configuration.owner,
            productCode: configuration.productCode,
            updateType,
        };
        const groupPath = [];
        if (changedAttribute.groupId) {
            this.buildGroupPath(changedAttribute.groupId, configuration.groups, groupPath);
        }
        else {
            throw Error('GroupId must be available at attribute level during update');
        }
        const groupPathLength = groupPath.length;
        if (groupPathLength === 0) {
            throw new Error('At this point we expect that group is available in the configuration: ' +
                changedAttribute.groupId +
                ', ' +
                JSON.stringify(configuration.groups.map((cGroup) => cGroup.id)));
        }
        let currentGroupInExtract = this.buildGroupForExtract(groupPath[groupPathLength - 1]);
        let currentLeafGroupInExtract = currentGroupInExtract;
        newConfiguration.groups.push(currentGroupInExtract);
        for (let index = groupPath.length - 1; index > 0; index--) {
            currentLeafGroupInExtract = this.buildGroupForExtract(groupPath[index - 1]);
            currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
            currentGroupInExtract = currentLeafGroupInExtract;
        }
        currentLeafGroupInExtract.attributes = [changedAttribute];
        return newConfiguration;
    }
    /**
     * Builds group path.
     *
     * @param {string} groupId - Group ID
     * @param { Configurator.Group[]} groupList - List of groups
     * @param { Configurator.Group[]} groupPath - Path of groups
     * @return {boolean} - 'True' if the group has been found, otherwise 'false'
     */
    buildGroupPath(groupId, groupList, groupPath) {
        let haveFoundGroup = false;
        const group = groupList.find((currentGroup) => currentGroup.id === groupId);
        if (group) {
            groupPath.push(group);
            haveFoundGroup = true;
        }
        else {
            groupList
                .filter((currentGroup) => currentGroup.subGroups)
                .forEach((currentGroup) => {
                if (currentGroup.subGroups &&
                    this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
                    groupPath.push(currentGroup);
                    haveFoundGroup = true;
                }
            });
        }
        return haveFoundGroup;
    }
    /**
     * Retrieves the configuration from state, and throws an error in case the configuration is
     * not available
     * @param {StateUtils.ProcessesLoaderState<Configurator.Configuration>} configurationState - Process loader state containing product configuration
     * @returns {Configurator.Configuration} - The actual product configuration
     */
    getConfigurationFromState(configurationState) {
        const configuration = configurationState.value;
        if (configuration) {
            return configuration;
        }
        else {
            throw new Error('Configuration must be defined at this point');
        }
    }
    buildGroupForExtract(group) {
        const changedGroup = {
            groupType: group.groupType,
            id: group.id,
            subGroups: [],
        };
        return changedGroup;
    }
}
ConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXV0aWxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvcmUvZmFjYWRlL3V0aWxzL2NvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFOUQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sd0JBQXdCO0lBQ25DOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FDWixNQUE0QixFQUM1QixLQUF5QixFQUN6QixXQUFnQztRQUVoQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxPQUFPLE1BQU07YUFDVixHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTtZQUNwQixPQUFPLFlBQVksQ0FBQyxTQUFTO2dCQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLENBQUM7Z0JBQ2xFLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUM7YUFDbEMsR0FBRyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxDQUNWLE1BQTRCLEVBQzVCLE9BQWU7UUFFZixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLE9BQU8s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Q3RCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDO0lBRVMsb0JBQW9CLENBQzVCLEtBQXlCO1FBRXpCLE1BQU0sWUFBWSxHQUF1QjtZQUN2QyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDMUIsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ1osU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7cUhBN1BVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRFgsTUFBTTsyRkFDbkIsd0JBQXdCO2tCQURwQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0YXRlVXRpbHMgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vLi4vbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcblxuLyoqXG4gKiBVdGlsaXR5IHNlcnZpY2UgZm9yIHRoZSBmYWNhZGUgbGF5ZXIuIFN1cHBvc2VkIHRvIGJlIGFjY2Vzc2VkIGJ5IGZhY2FkZSBzZXJ2aWNlc1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclV0aWxzU2VydmljZSB7XG4gIC8qKlxuICAgKiBEZXRlcm1pbmVzIHRoZSBkaXJlY3QgcGFyZW50IGdyb3VwIGZvciBhbiBhdHRyaWJ1dGUgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXBbXX0gZ3JvdXBzIC0gTGlzdCBvZiBncm91cHMgd2hlcmUgd2Ugc2VhcmNoIGZvciBwYXJlbnRcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gSWYgYWxyZWFkeSBwYXJ0IG9mIGdyb3Vwcywgbm8gZnVydGhlciBzZWFyY2ggaXMgbmVlZGVkLCBhbmQgd2UgcmV0dXJuIHRoZSBwcm92aWRlZCBwYXJlbnQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IHBhcmVudEdyb3VwIC0gT3B0aW9uYWwgcGFyZW50IGdyb3VwLlxuICAgKiBAcmV0dXJucyB7Q29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkfSAtIFBhcmVudCBncm91cC4gTWlnaHQgYmUgdW5kZWZpbmVkXG4gICAqL1xuICBnZXRQYXJlbnRHcm91cChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXAsXG4gICAgcGFyZW50R3JvdXA/OiBDb25maWd1cmF0b3IuR3JvdXBcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZ3JvdXBzLmluY2x1ZGVzKGdyb3VwKSkge1xuICAgICAgcmV0dXJuIHBhcmVudEdyb3VwO1xuICAgIH1cblxuICAgIHJldHVybiBncm91cHNcbiAgICAgIC5tYXAoKGN1cnJlbnRHcm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gY3VycmVudEdyb3VwLnN1Ykdyb3Vwc1xuICAgICAgICAgID8gdGhpcy5nZXRQYXJlbnRHcm91cChjdXJyZW50R3JvdXAuc3ViR3JvdXBzLCBncm91cCwgY3VycmVudEdyb3VwKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoKGZvdW5kR3JvdXApID0+IGZvdW5kR3JvdXApXG4gICAgICAucG9wKCk7XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIGdyb3VwIGlkZW50aWZpZWQgYnkgaXRzIElELCBhbmQgZW5zdXJlcyB0aGF0IHdlIGFsd2F5cyBnZXQgYSB2YWxpZCBncm91cC5cbiAgICogSWYgbm90aGluZyBpcyBmb3VuZCBpbiB0aGUgY29uZmlndXJhdGlvbiBncm91cCBsaXN0LCB0aGlzIG1ldGhvZHMgcmV0dXJucyB0aGUgZmlyc3QgZ3JvdXAuXG4gICAqXG4gICAqIFRoZSBleGNlcHRpb25hbCBjYXNlIGNhbiBoYXBwZW4gaWYgZS5nLiBhbiBlZGl0IGluIGEgY29uZmxpY3Qgd2FzIGRvbmUgdGhhdFxuICAgKiByZXNvbHZlZCB0aGUgY29uZmxpY3QsIG9yIGlmIGEgZ3JvdXAgdmFuaXNoZWQgZHVlIHRvIG9iamVjdCBkZXBlbmRlbmNpZXMuXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwW119IGdyb3VwcyAtIExpc3Qgb2YgZ3JvdXBzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgaWRcbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5Hcm91cH0gLSBHcm91cCBpZGVudGlmaWVkIGJ5IGl0cyBpZCwgaWYgYXZhaWxhYmxlLiBPdGhlcndpc2UgZmlyc3QgZ3JvdXBcbiAgICovXG4gIGdldEdyb3VwQnlJZChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwSWQ6IHN0cmluZ1xuICApOiBDb25maWd1cmF0b3IuR3JvdXAge1xuICAgIGNvbnN0IGN1cnJlbnRHcm91cCA9IGdyb3Vwcy5maW5kKChncm91cCkgPT4gZ3JvdXAuaWQgPT09IGdyb3VwSWQpO1xuICAgIGlmIChjdXJyZW50R3JvdXApIHtcbiAgICAgIHJldHVybiBjdXJyZW50R3JvdXA7XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwRm91bmQgPSB0aGlzLmdldEdyb3VwRnJvbVN1Ykdyb3Vwcyhncm91cHMsIGdyb3VwSWQpO1xuICAgIHJldHVybiBncm91cEZvdW5kID8gZ3JvdXBGb3VuZCA6IGdyb3Vwc1swXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBncm91cCBpZGVudGlmaWVkIGJ5IGl0cyBJRC4gSWYgbm90aGluZyBpcyBmb3VuZCwgdGhpc1xuICAgKiBtZXRob2RzIHJldHVybnMgdW5kZWZpbmVkXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwW119IGdyb3VwcyAtIExpc3Qgb2YgZ3JvdXBzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgaWRcbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZH0gLSBHcm91cCBpZGVudGlmaWVkIGJ5IGl0cyBpZCwgaWYgYXZhaWxhYmxlLiBPdGhlcndpc2UgdW5kZWZpbmVkXG4gICAqL1xuICBnZXRPcHRpb25hbEdyb3VwQnlJZChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwSWQ6IHN0cmluZ1xuICApOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGN1cnJlbnRHcm91cCA9IGdyb3Vwcy5maW5kKChncm91cCkgPT4gZ3JvdXAuaWQgPT09IGdyb3VwSWQpO1xuICAgIHJldHVybiBjdXJyZW50R3JvdXBcbiAgICAgID8gY3VycmVudEdyb3VwXG4gICAgICA6IHRoaXMuZ2V0R3JvdXBGcm9tU3ViR3JvdXBzKGdyb3VwcywgZ3JvdXBJZCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0R3JvdXBCeUlkSWZQcmVzZW50KFxuICAgIGdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgY3VycmVudEdyb3VwID0gZ3JvdXBzLmZpbmQoKGdyb3VwKSA9PiBncm91cC5pZCA9PT0gZ3JvdXBJZCk7XG4gICAgaWYgKGN1cnJlbnRHcm91cCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRHcm91cDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZyb21TdWJHcm91cHMoZ3JvdXBzLCBncm91cElkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRHcm91cEZyb21TdWJHcm91cHMoXG4gICAgZ3JvdXBzOiBDb25maWd1cmF0b3IuR3JvdXBbXSxcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cEZvdW5kID0gZ3JvdXBzXG4gICAgICAubWFwKChncm91cCkgPT4ge1xuICAgICAgICByZXR1cm4gZ3JvdXAuc3ViR3JvdXBzXG4gICAgICAgICAgPyB0aGlzLmdldEdyb3VwQnlJZElmUHJlc2VudChncm91cC5zdWJHcm91cHMsIGdyb3VwSWQpXG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoZm91bmRHcm91cCkgPT4gZm91bmRHcm91cClcbiAgICAgIC5wb3AoKTtcbiAgICByZXR1cm4gZ3JvdXBGb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB3aGV0aGVyIHRoZSBjdXJyZW50IGdyb3VwIGhhcyBhIHN1Ymdyb3Vwcy5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gQ3VycmVudCBncm91cFxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY3VycmVudCBncm91cCBoYXMgYW55IHN1Ymdyb3Vwcywgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGhhc1N1Ykdyb3Vwcyhncm91cDogQ29uZmlndXJhdG9yLkdyb3VwKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGdyb3VwLnN1Ykdyb3VwcyA/IGdyb3VwLnN1Ykdyb3Vwcy5sZW5ndGggPiAwIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY29uZmlndXJhdGlvbiBoYXMgYmVlbiBjcmVhdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uIC0gQ29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY29uZmlndXJhdGlvbiBoYXNzIGJlZW4gY3JlYXRlZCwgb3RoZXJ3aXNlICdmYWxzZSdcbiAgICovXG4gIGlzQ29uZmlndXJhdGlvbkNyZWF0ZWQoY29uZmlndXJhdGlvbj86IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29uZmlnSWQgPSBjb25maWd1cmF0aW9uPy5jb25maWdJZDtcbiAgICByZXR1cm4gKFxuICAgICAgY29uZmlnSWQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgY29uZmlnSWQubGVuZ3RoICE9PSAwICYmXG4gICAgICBjb25maWd1cmF0aW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIChjb25maWd1cmF0aW9uLmZsYXRHcm91cHMubGVuZ3RoID4gMCB8fFxuICAgICAgICBjb25maWd1cmF0aW9uLm92ZXJ2aWV3ICE9PSB1bmRlZmluZWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGNvbmZpZ3VyYXRpb24gZXh0cmFjdC5cbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQXR0cmlidXRlfSBjaGFuZ2VkQXR0cmlidXRlIC0gY2hhbmdlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLlVwZGF0ZVR5cGV9IHVwZGF0ZVR5cGUgLSB1cGRhdGVkIHR5cGVcbiAgICogQHJldHVybiB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IC0gQ29uZmlndXJhdGlvblxuICAgKi9cbiAgY3JlYXRlQ29uZmlndXJhdGlvbkV4dHJhY3QoXG4gICAgY2hhbmdlZEF0dHJpYnV0ZTogQ29uZmlndXJhdG9yLkF0dHJpYnV0ZSxcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICB1cGRhdGVUeXBlPzogQ29uZmlndXJhdG9yLlVwZGF0ZVR5cGVcbiAgKTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24ge1xuICAgIGlmICghdXBkYXRlVHlwZSkge1xuICAgICAgdXBkYXRlVHlwZSA9IENvbmZpZ3VyYXRvci5VcGRhdGVUeXBlLkFUVFJJQlVURTtcbiAgICB9XG4gICAgY29uc3QgbmV3Q29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICBjb25maWdJZDogY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBmbGF0R3JvdXBzOiBbXSxcbiAgICAgIGludGVyYWN0aW9uU3RhdGU6IHtcbiAgICAgICAgaXNDb25mbGljdFJlc29sdXRpb25Nb2RlOlxuICAgICAgICAgIGNvbmZpZ3VyYXRpb24uaW50ZXJhY3Rpb25TdGF0ZS5pc0NvbmZsaWN0UmVzb2x1dGlvbk1vZGUsXG4gICAgICB9LFxuICAgICAgb3duZXI6IGNvbmZpZ3VyYXRpb24ub3duZXIsXG4gICAgICBwcm9kdWN0Q29kZTogY29uZmlndXJhdGlvbi5wcm9kdWN0Q29kZSxcbiAgICAgIHVwZGF0ZVR5cGUsXG4gICAgfTtcblxuICAgIGNvbnN0IGdyb3VwUGF0aDogQ29uZmlndXJhdG9yLkdyb3VwW10gPSBbXTtcblxuICAgIGlmIChjaGFuZ2VkQXR0cmlidXRlLmdyb3VwSWQpIHtcbiAgICAgIHRoaXMuYnVpbGRHcm91cFBhdGgoXG4gICAgICAgIGNoYW5nZWRBdHRyaWJ1dGUuZ3JvdXBJZCxcbiAgICAgICAgY29uZmlndXJhdGlvbi5ncm91cHMsXG4gICAgICAgIGdyb3VwUGF0aFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgRXJyb3IoJ0dyb3VwSWQgbXVzdCBiZSBhdmFpbGFibGUgYXQgYXR0cmlidXRlIGxldmVsIGR1cmluZyB1cGRhdGUnKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cFBhdGhMZW5ndGggPSBncm91cFBhdGgubGVuZ3RoO1xuXG4gICAgaWYgKGdyb3VwUGF0aExlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQXQgdGhpcyBwb2ludCB3ZSBleHBlY3QgdGhhdCBncm91cCBpcyBhdmFpbGFibGUgaW4gdGhlIGNvbmZpZ3VyYXRpb246ICcgK1xuICAgICAgICAgIGNoYW5nZWRBdHRyaWJ1dGUuZ3JvdXBJZCArXG4gICAgICAgICAgJywgJyArXG4gICAgICAgICAgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi5ncm91cHMubWFwKChjR3JvdXApID0+IGNHcm91cC5pZCkpXG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBjdXJyZW50R3JvdXBJbkV4dHJhY3Q6IENvbmZpZ3VyYXRvci5Hcm91cCA9IHRoaXMuYnVpbGRHcm91cEZvckV4dHJhY3QoXG4gICAgICBncm91cFBhdGhbZ3JvdXBQYXRoTGVuZ3RoIC0gMV1cbiAgICApO1xuXG4gICAgbGV0IGN1cnJlbnRMZWFmR3JvdXBJbkV4dHJhY3Q6IENvbmZpZ3VyYXRvci5Hcm91cCA9IGN1cnJlbnRHcm91cEluRXh0cmFjdDtcblxuICAgIG5ld0NvbmZpZ3VyYXRpb24uZ3JvdXBzLnB1c2goY3VycmVudEdyb3VwSW5FeHRyYWN0KTtcblxuICAgIGZvciAobGV0IGluZGV4ID0gZ3JvdXBQYXRoLmxlbmd0aCAtIDE7IGluZGV4ID4gMDsgaW5kZXgtLSkge1xuICAgICAgY3VycmVudExlYWZHcm91cEluRXh0cmFjdCA9IHRoaXMuYnVpbGRHcm91cEZvckV4dHJhY3QoXG4gICAgICAgIGdyb3VwUGF0aFtpbmRleCAtIDFdXG4gICAgICApO1xuICAgICAgY3VycmVudEdyb3VwSW5FeHRyYWN0LnN1Ykdyb3VwcyA9IFtjdXJyZW50TGVhZkdyb3VwSW5FeHRyYWN0XTtcbiAgICAgIGN1cnJlbnRHcm91cEluRXh0cmFjdCA9IGN1cnJlbnRMZWFmR3JvdXBJbkV4dHJhY3Q7XG4gICAgfVxuXG4gICAgY3VycmVudExlYWZHcm91cEluRXh0cmFjdC5hdHRyaWJ1dGVzID0gW2NoYW5nZWRBdHRyaWJ1dGVdO1xuICAgIHJldHVybiBuZXdDb25maWd1cmF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyBncm91cCBwYXRoLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIEdyb3VwIElEXG4gICAqIEBwYXJhbSB7IENvbmZpZ3VyYXRvci5Hcm91cFtdfSBncm91cExpc3QgLSBMaXN0IG9mIGdyb3Vwc1xuICAgKiBAcGFyYW0geyBDb25maWd1cmF0b3IuR3JvdXBbXX0gZ3JvdXBQYXRoIC0gUGF0aCBvZiBncm91cHNcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gLSAnVHJ1ZScgaWYgdGhlIGdyb3VwIGhhcyBiZWVuIGZvdW5kLCBvdGhlcndpc2UgJ2ZhbHNlJ1xuICAgKi9cbiAgYnVpbGRHcm91cFBhdGgoXG4gICAgZ3JvdXBJZDogc3RyaW5nLFxuICAgIGdyb3VwTGlzdDogQ29uZmlndXJhdG9yLkdyb3VwW10sXG4gICAgZ3JvdXBQYXRoOiBDb25maWd1cmF0b3IuR3JvdXBbXVxuICApOiBib29sZWFuIHtcbiAgICBsZXQgaGF2ZUZvdW5kR3JvdXAgPSBmYWxzZTtcbiAgICBjb25zdCBncm91cDogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkID0gZ3JvdXBMaXN0LmZpbmQoXG4gICAgICAoY3VycmVudEdyb3VwKSA9PiBjdXJyZW50R3JvdXAuaWQgPT09IGdyb3VwSWRcbiAgICApO1xuXG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBncm91cFBhdGgucHVzaChncm91cCk7XG4gICAgICBoYXZlRm91bmRHcm91cCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyb3VwTGlzdFxuICAgICAgICAuZmlsdGVyKChjdXJyZW50R3JvdXApID0+IGN1cnJlbnRHcm91cC5zdWJHcm91cHMpXG4gICAgICAgIC5mb3JFYWNoKChjdXJyZW50R3JvdXApID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBjdXJyZW50R3JvdXAuc3ViR3JvdXBzICYmXG4gICAgICAgICAgICB0aGlzLmJ1aWxkR3JvdXBQYXRoKGdyb3VwSWQsIGN1cnJlbnRHcm91cC5zdWJHcm91cHMsIGdyb3VwUGF0aClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGdyb3VwUGF0aC5wdXNoKGN1cnJlbnRHcm91cCk7XG4gICAgICAgICAgICBoYXZlRm91bmRHcm91cCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhdmVGb3VuZEdyb3VwO1xuICB9XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGNvbmZpZ3VyYXRpb24gZnJvbSBzdGF0ZSwgYW5kIHRocm93cyBhbiBlcnJvciBpbiBjYXNlIHRoZSBjb25maWd1cmF0aW9uIGlzXG4gICAqIG5vdCBhdmFpbGFibGVcbiAgICogQHBhcmFtIHtTdGF0ZVV0aWxzLlByb2Nlc3Nlc0xvYWRlclN0YXRlPENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uPn0gY29uZmlndXJhdGlvblN0YXRlIC0gUHJvY2VzcyBsb2FkZXIgc3RhdGUgY29udGFpbmluZyBwcm9kdWN0IGNvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9ufSAtIFRoZSBhY3R1YWwgcHJvZHVjdCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBnZXRDb25maWd1cmF0aW9uRnJvbVN0YXRlKFxuICAgIGNvbmZpZ3VyYXRpb25TdGF0ZTogU3RhdGVVdGlscy5Qcm9jZXNzZXNMb2FkZXJTdGF0ZTxDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj5cbiAgKTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uU3RhdGUudmFsdWU7XG4gICAgaWYgKGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbmZpZ3VyYXRpb24gbXVzdCBiZSBkZWZpbmVkIGF0IHRoaXMgcG9pbnQnKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYnVpbGRHcm91cEZvckV4dHJhY3QoXG4gICAgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cFxuICApOiBDb25maWd1cmF0b3IuR3JvdXAge1xuICAgIGNvbnN0IGNoYW5nZWRHcm91cDogQ29uZmlndXJhdG9yLkdyb3VwID0ge1xuICAgICAgZ3JvdXBUeXBlOiBncm91cC5ncm91cFR5cGUsXG4gICAgICBpZDogZ3JvdXAuaWQsXG4gICAgICBzdWJHcm91cHM6IFtdLFxuICAgIH07XG4gICAgcmV0dXJuIGNoYW5nZWRHcm91cDtcbiAgfVxufVxuIl19