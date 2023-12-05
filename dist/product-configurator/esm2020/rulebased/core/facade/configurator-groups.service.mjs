/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "./configurator-commons.service";
import * as i3 from "./utils/configurator-utils.service";
import * as i4 from "./configurator-group-status.service";
/**
 * Service for handling configuration groups
 */
export class ConfiguratorGroupsService {
    constructor(store, configuratorCommonsService, configuratorUtilsService, configuratorGroupStatusService) {
        this.store = store;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorUtilsService = configuratorUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
    }
    /**
     * Returns the current group Id.
     * In case no group Id is being set before returns the first group of the configuration.
     * Return null when configuration contains no groups.
     *
     * @param {CommonConfigurator.Owner} owner configuration owner
     * @returns {Observable<string>} Group ID
     */
    getCurrentGroupId(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            if (configuration.interactionState.currentGroup) {
                return configuration.interactionState.currentGroup;
            }
            else {
                return configuration.groups[0]?.id;
            }
        }));
    }
    /**
     * Return the first conflict group of a configuration or undefined
     * if not present
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Configurator.Group} Conflict group
     */
    getFirstConflictGroup(configuration) {
        return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
    /**
     * Navigates to the first non-conflict group of the configuration which is not completed.
     * This method assumes that the configuration has incomplete groups,
     * the caller has to verify this prior to calling this method. In case no incomplete group is
     * present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     */
    navigateToFirstIncompleteGroup(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.configuratorGroupStatusService.getFirstIncompleteGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Navigates to the first conflict group and sets the conflict header as parent group.
     * This method assumes that the configuration has conflicts,
     * the caller has to verify this prior to calling this method. In case no conflict group
     * is present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner Configuration Owner
     */
    navigateToConflictSolver(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.getFirstConflictGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true, true);
            }
        });
    }
    /**
     * Returns the parent group of the subgroup that is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @returns {Observable<Configurator.Group>} Group
     */
    getMenuParentGroup(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            const menuParentGroup = configuration.interactionState.menuParentGroup;
            return menuParentGroup
                ? this.configuratorUtilsService.getOptionalGroupById(configuration.groups, menuParentGroup)
                : undefined;
        }));
    }
    /**
     * Set the parent group, specified by the group ID, which is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
     */
    setMenuParentGroup(owner, groupId) {
        this.store.dispatch(new ConfiguratorActions.SetMenuParentGroup({
            entityKey: owner.key,
            menuParentGroup: groupId,
        }));
    }
    /**
     * Returns the group that is currently visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group>} Current group
     */
    getCurrentGroup(owner) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService
                .getConfiguration(owner)
                .pipe(map((configuration) => this.configuratorUtilsService.getGroupById(configuration.groups, currentGroupId)));
        }));
    }
    /**
     * Retrieves a conflict group for immediate conflict resolution.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group | undefined} - Conflict group
     */
    getConflictGroupForImmediateConflictResolution(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(
        //needed because we need have the form to react first on showConflictSolverDialog
        delay(0), map((configuration) => {
            if (configuration.interactionState.showConflictSolverDialog) {
                return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
            }
            return undefined;
        }));
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(owner, groupId) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(map((configuration) => this.configuratorGroupStatusService.setGroupStatusVisited(configuration, groupId)), take(1))
            .subscribe();
    }
    /**
     * Navigates to the group, specified by its group ID.
     *
     * @param {Configurator.Configuration}configuration - Configuration
     * @param {string} groupId - Group ID
     * @param {boolean} setStatus - Group status will be set for previous group, default true
     * @param {boolean} conflictResolutionMode - Parameter with default (false). If set to true, we enter the conflict resolution mode, i.e.
     *  if a conflict is solved, the system will navigate to the next conflict present
     */
    navigateToGroup(configuration, groupId, setStatus = true, conflictResolutionMode = false) {
        if (setStatus) {
            //Set Group status for current group
            this.getCurrentGroup(configuration.owner)
                .pipe(take(1))
                .subscribe((currentGroup) => {
                this.configuratorGroupStatusService.setGroupStatusVisited(configuration, currentGroup.id);
            });
        }
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        this.store.dispatch(new ConfiguratorActions.ChangeGroup({
            configuration: configuration,
            groupId: groupId,
            parentGroupId: parentGroup ? parentGroup.id : undefined,
            conflictResolutionMode: conflictResolutionMode,
        }));
    }
    /**
     * Returns the group ID of the group that is coming after the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string> | undefined} ID of next group
     */
    getNextGroupId(owner) {
        return this.getNeighboringGroupId(owner, 1);
    }
    /**
     * Returns the group ID of the group that is preceding the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string | undefined >} ID of previous group
     */
    getPreviousGroupId(owner) {
        return this.getNeighboringGroupId(owner, -1);
    }
    /**
     * Verifies whether the group has been visited
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} Has been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
    }
    /**
     * Returns a parent group for the given group.
     *
     * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
     * @param {Configurator.Group} group - Given group
     * @return {Configurator.Group} Parent group or undefined if group is a top-level group
     */
    getParentGroup(groups, group) {
        return this.configuratorUtilsService.getParentGroup(groups, group);
    }
    /**
     * Verifies whether the given group has sub groups.
     *
     * @param {Configurator.Group} group - Given group
     * @return {boolean} Sub groups available?
     */
    hasSubGroups(group) {
        return this.configuratorUtilsService.hasSubGroups(group);
    }
    isConflictGroupInImmediateConflictResolutionMode(groupType, immediateConflictResolution = false) {
        if (groupType) {
            return (groupType === Configurator.GroupType.CONFLICT_GROUP &&
                immediateConflictResolution);
        }
        return false;
    }
    /**
     * Retrieves a group ID of the neighboring group.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {number} neighboringIndex - Index of neighboring group
     * @return {Observable<string>} group ID of the neighboring group
     */
    getNeighboringGroupId(owner, neighboringIndex) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
                let nextGroup;
                configuration.flatGroups.forEach((group, index) => {
                    if (group.id === currentGroupId &&
                        configuration.flatGroups &&
                        configuration.flatGroups[index + neighboringIndex] && //Check if neighboring group exists
                        !this.isConflictGroupInImmediateConflictResolutionMode(configuration.flatGroups[index + neighboringIndex]?.groupType, configuration.immediateConflictResolution)) {
                        nextGroup =
                            configuration.flatGroups[index + neighboringIndex].id;
                    }
                });
                return nextGroup;
            }), take(1));
        }));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return (groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
            groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
}
ConfiguratorGroupsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, deps: [{ token: i1.Store }, { token: i2.ConfiguratorCommonsService }, { token: i3.ConfiguratorUtilsService }, { token: i4.ConfiguratorGroupStatusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ConfiguratorCommonsService }, { type: i3.ConfiguratorUtilsService }, { type: i4.ConfiguratorGroupStatusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3Vwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItZ3JvdXBzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0FBTTdEOztHQUVHO0FBRUgsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxZQUNZLEtBQW1DLEVBQ25DLDBCQUFzRCxFQUN0RCx3QkFBa0QsRUFDbEQsOEJBQThEO1FBSDlELFVBQUssR0FBTCxLQUFLLENBQThCO1FBQ25DLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFDdEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxtQ0FBOEIsR0FBOUIsOEJBQThCLENBQWdDO0lBQ3ZFLENBQUM7SUFFSjs7Ozs7OztPQU9HO0lBQ0gsaUJBQWlCLENBQUMsS0FBK0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsMEJBQTBCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUNqRSxHQUFHLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNwQixJQUFJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7Z0JBQy9DLE9BQU8sYUFBYSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQzthQUNwRDtpQkFBTTtnQkFDTCxP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Q3pGLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUNwRCxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLFNBQVMsRUFDN0QsYUFBYSxDQUFDLDJCQUEyQixDQUMxQyxFQUNEO3dCQUNBLFNBQVM7NEJBQ1AsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUM7cUJBQ3pEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQixDQUFDLFNBQWlDO1FBQ25ELE9BQU8sQ0FDTCxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUI7WUFDMUQsU0FBUyxLQUFLLFlBQVksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUNwRCxDQUFDO0lBQ0osQ0FBQzs7c0hBeldVLHlCQUF5QjswSEFBekIseUJBQXlCLGNBRFosTUFBTTsyRkFDbkIseUJBQXlCO2tCQURyQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3N0YXRlL2NvbmZpZ3VyYXRvci1zdGF0ZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSB9IGZyb20gJy4vY29uZmlndXJhdG9yLWNvbW1vbnMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JHcm91cFN0YXR1c1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1ncm91cC1zdGF0dXMuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JVdGlsc1NlcnZpY2UgfSBmcm9tICcuL3V0aWxzL2NvbmZpZ3VyYXRvci11dGlscy5zZXJ2aWNlJztcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBoYW5kbGluZyBjb25maWd1cmF0aW9uIGdyb3Vwc1xuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckdyb3Vwc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENvbmZpZ3VyYXRvcj4sXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlOiBDb25maWd1cmF0b3JDb21tb25zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlOiBDb25maWd1cmF0b3JVdGlsc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZTogQ29uZmlndXJhdG9yR3JvdXBTdGF0dXNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCBncm91cCBJZC5cbiAgICogSW4gY2FzZSBubyBncm91cCBJZCBpcyBiZWluZyBzZXQgYmVmb3JlIHJldHVybnMgdGhlIGZpcnN0IGdyb3VwIG9mIHRoZSBjb25maWd1cmF0aW9uLlxuICAgKiBSZXR1cm4gbnVsbCB3aGVuIGNvbmZpZ3VyYXRpb24gY29udGFpbnMgbm8gZ3JvdXBzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgY29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxzdHJpbmc+fSBHcm91cCBJRFxuICAgKi9cbiAgZ2V0Q3VycmVudEdyb3VwSWQob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2UuZ2V0Q29uZmlndXJhdGlvbihvd25lcikucGlwZShcbiAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICBpZiAoY29uZmlndXJhdGlvbi5pbnRlcmFjdGlvblN0YXRlLmN1cnJlbnRHcm91cCkge1xuICAgICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uLmludGVyYWN0aW9uU3RhdGUuY3VycmVudEdyb3VwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uLmdyb3Vwc1swXT8uaWQ7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGZpcnN0IGNvbmZsaWN0IGdyb3VwIG9mIGEgY29uZmlndXJhdGlvbiBvciB1bmRlZmluZWRcbiAgICogaWYgbm90IHByZXNlbnRcbiAgICpcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbn0gY29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMge0NvbmZpZ3VyYXRvci5Hcm91cH0gQ29uZmxpY3QgZ3JvdXBcbiAgICovXG4gIGdldEZpcnN0Q29uZmxpY3RHcm91cChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvblxuICApOiBDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiBjb25maWd1cmF0aW9uLmZsYXRHcm91cHMuZmluZChcbiAgICAgIChncm91cCkgPT4gZ3JvdXAuZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOYXZpZ2F0ZXMgdG8gdGhlIGZpcnN0IG5vbi1jb25mbGljdCBncm91cCBvZiB0aGUgY29uZmlndXJhdGlvbiB3aGljaCBpcyBub3QgY29tcGxldGVkLlxuICAgKiBUaGlzIG1ldGhvZCBhc3N1bWVzIHRoYXQgdGhlIGNvbmZpZ3VyYXRpb24gaGFzIGluY29tcGxldGUgZ3JvdXBzLFxuICAgKiB0aGUgY2FsbGVyIGhhcyB0byB2ZXJpZnkgdGhpcyBwcmlvciB0byBjYWxsaW5nIHRoaXMgbWV0aG9kLiBJbiBjYXNlIG5vIGluY29tcGxldGUgZ3JvdXAgaXNcbiAgICogcHJlc2VudCwgbm90aGluZyB3aWxsIGhhcHBlblxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqL1xuICBuYXZpZ2F0ZVRvRmlyc3RJbmNvbXBsZXRlR3JvdXAob3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcik6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWd1cmF0aW9uKG93bmVyKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgZ3JvdXBJZCA9XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JHcm91cFN0YXR1c1NlcnZpY2UuZ2V0Rmlyc3RJbmNvbXBsZXRlR3JvdXAoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uXG4gICAgICAgICAgKT8uaWQ7XG4gICAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvR3JvdXAoY29uZmlndXJhdGlvbiwgZ3JvdXBJZCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgZmlyc3QgY29uZmxpY3QgZ3JvdXAgYW5kIHNldHMgdGhlIGNvbmZsaWN0IGhlYWRlciBhcyBwYXJlbnQgZ3JvdXAuXG4gICAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgdGhhdCB0aGUgY29uZmlndXJhdGlvbiBoYXMgY29uZmxpY3RzLFxuICAgKiB0aGUgY2FsbGVyIGhhcyB0byB2ZXJpZnkgdGhpcyBwcmlvciB0byBjYWxsaW5nIHRoaXMgbWV0aG9kLiBJbiBjYXNlIG5vIGNvbmZsaWN0IGdyb3VwXG4gICAqIGlzIHByZXNlbnQsIG5vdGhpbmcgd2lsbCBoYXBwZW5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIENvbmZpZ3VyYXRpb24gT3duZXJcbiAgICovXG4gIG5hdmlnYXRlVG9Db25mbGljdFNvbHZlcihvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyKTogdm9pZCB7XG4gICAgdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZVxuICAgICAgLmdldENvbmZpZ3VyYXRpb24ob3duZXIpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICBjb25zdCBncm91cElkID0gdGhpcy5nZXRGaXJzdENvbmZsaWN0R3JvdXAoY29uZmlndXJhdGlvbik/LmlkO1xuICAgICAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgICAgIHRoaXMubmF2aWdhdGVUb0dyb3VwKGNvbmZpZ3VyYXRpb24sIGdyb3VwSWQsIHRydWUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYXJlbnQgZ3JvdXAgb2YgdGhlIHN1Ymdyb3VwIHRoYXQgaXMgZGlzcGxheWVkIGluIHRoZSBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cD59IEdyb3VwXG4gICAqL1xuICBnZXRNZW51UGFyZW50R3JvdXAoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24ob3duZXIpLnBpcGUoXG4gICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgbWVudVBhcmVudEdyb3VwID0gY29uZmlndXJhdGlvbi5pbnRlcmFjdGlvblN0YXRlLm1lbnVQYXJlbnRHcm91cDtcbiAgICAgICAgcmV0dXJuIG1lbnVQYXJlbnRHcm91cFxuICAgICAgICAgID8gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0T3B0aW9uYWxHcm91cEJ5SWQoXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgICAgICAgICBtZW51UGFyZW50R3JvdXBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHBhcmVudCBncm91cCwgc3BlY2lmaWVkIGJ5IHRoZSBncm91cCBJRCwgd2hpY2ggaXMgZGlzcGxheWVkIGluIHRoZSBncm91cCBtZW51LlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSUQuIENhbiBiZSBvbW1pdHRlZCwgaW4gdGhpcyBjYXNlIHBhcmVudCBncm91cCB3aWxsIGJlIGNsZWFyZWQsIGluIGNhc2Ugd2UgYXJlIG9uIHJvb3QgbGV2ZWxcbiAgICovXG4gIHNldE1lbnVQYXJlbnRHcm91cChvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyLCBncm91cElkPzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIG5ldyBDb25maWd1cmF0b3JBY3Rpb25zLlNldE1lbnVQYXJlbnRHcm91cCh7XG4gICAgICAgIGVudGl0eUtleTogb3duZXIua2V5LFxuICAgICAgICBtZW51UGFyZW50R3JvdXA6IGdyb3VwSWQsXG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ3JvdXAgdGhhdCBpcyBjdXJyZW50bHkgdmlzaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cD59IEN1cnJlbnQgZ3JvdXBcbiAgICovXG4gIGdldEN1cnJlbnRHcm91cChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8Q29uZmlndXJhdG9yLkdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudEdyb3VwSWQob3duZXIpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGN1cnJlbnRHcm91cElkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlXG4gICAgICAgICAgLmdldENvbmZpZ3VyYXRpb24ob3duZXIpXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKGNvbmZpZ3VyYXRpb24pID0+XG4gICAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldEdyb3VwQnlJZChcbiAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgICAgICAgICAgICBjdXJyZW50R3JvdXBJZFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBjb25mbGljdCBncm91cCBmb3IgaW1tZWRpYXRlIGNvbmZsaWN0IHJlc29sdXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxDb25maWd1cmF0b3IuR3JvdXAgfCB1bmRlZmluZWR9IC0gQ29uZmxpY3QgZ3JvdXBcbiAgICovXG4gIGdldENvbmZsaWN0R3JvdXBGb3JJbW1lZGlhdGVDb25mbGljdFJlc29sdXRpb24oXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPENvbmZpZ3VyYXRvci5Hcm91cCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckNvbW1vbnNTZXJ2aWNlLmdldENvbmZpZ3VyYXRpb24ob3duZXIpLnBpcGUoXG4gICAgICAvL25lZWRlZCBiZWNhdXNlIHdlIG5lZWQgaGF2ZSB0aGUgZm9ybSB0byByZWFjdCBmaXJzdCBvbiBzaG93Q29uZmxpY3RTb2x2ZXJEaWFsb2dcbiAgICAgIGRlbGF5KDApLFxuICAgICAgbWFwKChjb25maWd1cmF0aW9uKSA9PiB7XG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uLmludGVyYWN0aW9uU3RhdGUuc2hvd0NvbmZsaWN0U29sdmVyRGlhbG9nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwcy5maW5kKFxuICAgICAgICAgICAgKGdyb3VwKSA9PiBncm91cC5ncm91cFR5cGUgPT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBncm91cCBoYXMgYmVlbiB2aXNpdGVkIG9yIG5vdC5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gT3duZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBHcm91cCBJRFxuICAgKi9cbiAgc2V0R3JvdXBTdGF0dXNWaXNpdGVkKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdG9yQ29tbW9uc1NlcnZpY2VcbiAgICAgIC5nZXRDb25maWd1cmF0aW9uKG93bmVyKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT5cbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZS5zZXRHcm91cFN0YXR1c1Zpc2l0ZWQoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgZ3JvdXBJZFxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgdGFrZSgxKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgZ3JvdXAsIHNwZWNpZmllZCBieSBpdHMgZ3JvdXAgSUQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259Y29uZmlndXJhdGlvbiAtIENvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwSWQgLSBHcm91cCBJRFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldFN0YXR1cyAtIEdyb3VwIHN0YXR1cyB3aWxsIGJlIHNldCBmb3IgcHJldmlvdXMgZ3JvdXAsIGRlZmF1bHQgdHJ1ZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmZsaWN0UmVzb2x1dGlvbk1vZGUgLSBQYXJhbWV0ZXIgd2l0aCBkZWZhdWx0IChmYWxzZSkuIElmIHNldCB0byB0cnVlLCB3ZSBlbnRlciB0aGUgY29uZmxpY3QgcmVzb2x1dGlvbiBtb2RlLCBpLmUuXG4gICAqICBpZiBhIGNvbmZsaWN0IGlzIHNvbHZlZCwgdGhlIHN5c3RlbSB3aWxsIG5hdmlnYXRlIHRvIHRoZSBuZXh0IGNvbmZsaWN0IHByZXNlbnRcbiAgICovXG4gIG5hdmlnYXRlVG9Hcm91cChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICBncm91cElkOiBzdHJpbmcsXG4gICAgc2V0U3RhdHVzID0gdHJ1ZSxcbiAgICBjb25mbGljdFJlc29sdXRpb25Nb2RlID0gZmFsc2VcbiAgKTogdm9pZCB7XG4gICAgaWYgKHNldFN0YXR1cykge1xuICAgICAgLy9TZXQgR3JvdXAgc3RhdHVzIGZvciBjdXJyZW50IGdyb3VwXG4gICAgICB0aGlzLmdldEN1cnJlbnRHcm91cChjb25maWd1cmF0aW9uLm93bmVyKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKChjdXJyZW50R3JvdXApID0+IHtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZS5zZXRHcm91cFN0YXR1c1Zpc2l0ZWQoXG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgY3VycmVudEdyb3VwLmlkXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50R3JvdXAgPSB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRQYXJlbnRHcm91cChcbiAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0R3JvdXBCeUlkKGNvbmZpZ3VyYXRpb24uZ3JvdXBzLCBncm91cElkKVxuICAgICk7XG5cbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuQ2hhbmdlR3JvdXAoe1xuICAgICAgICBjb25maWd1cmF0aW9uOiBjb25maWd1cmF0aW9uLFxuICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICBwYXJlbnRHcm91cElkOiBwYXJlbnRHcm91cCA/IHBhcmVudEdyb3VwLmlkIDogdW5kZWZpbmVkLFxuICAgICAgICBjb25mbGljdFJlc29sdXRpb25Nb2RlOiBjb25mbGljdFJlc29sdXRpb25Nb2RlLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdyb3VwIElEIG9mIHRoZSBncm91cCB0aGF0IGlzIGNvbWluZyBhZnRlciB0aGUgY3VycmVudCBvbmUgaW4gYSBzZXF1ZW50aWFsIG9yZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEByZXR1cm4ge09ic2VydmFibGU8c3RyaW5nPiB8IHVuZGVmaW5lZH0gSUQgb2YgbmV4dCBncm91cFxuICAgKi9cbiAgZ2V0TmV4dEdyb3VwSWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lclxuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldE5laWdoYm9yaW5nR3JvdXBJZChvd25lciwgMSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ3JvdXAgSUQgb2YgdGhlIGdyb3VwIHRoYXQgaXMgcHJlY2VkaW5nIHRoZSBjdXJyZW50IG9uZSBpbiBhIHNlcXVlbnRpYWwgb3JkZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxzdHJpbmcgfCB1bmRlZmluZWQgPn0gSUQgb2YgcHJldmlvdXMgZ3JvdXBcbiAgICovXG4gIGdldFByZXZpb3VzR3JvdXBJZChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyXG4gICk6IE9ic2VydmFibGU8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TmVpZ2hib3JpbmdHcm91cElkKG93bmVyLCAtMSk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ3JvdXAgaGFzIGJlZW4gdmlzaXRlZFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcn0gb3duZXIgLSBDb25maWd1cmF0aW9uIG93bmVyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSURcbiAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxib29sZWFuPn0gSGFzIGJlZW4gdmlzaXRlZD9cbiAgICovXG4gIGlzR3JvdXBWaXNpdGVkKFxuICAgIG93bmVyOiBDb21tb25Db25maWd1cmF0b3IuT3duZXIsXG4gICAgZ3JvdXBJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZ3VyYXRvckdyb3VwU3RhdHVzU2VydmljZS5pc0dyb3VwVmlzaXRlZChvd25lciwgZ3JvdXBJZCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHBhcmVudCBncm91cCBmb3IgdGhlIGdpdmVuIGdyb3VwLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbmZpZ3VyYXRvci5Hcm91cFtdfSBncm91cHMgLSBMaXN0IG9mIGdyb3VwcyB3aGVyZSB3ZSBzZWFyY2ggZm9yIHRoZSBwYXJlbnQgZ3JvdXBcbiAgICogQHBhcmFtIHtDb25maWd1cmF0b3IuR3JvdXB9IGdyb3VwIC0gR2l2ZW4gZ3JvdXBcbiAgICogQHJldHVybiB7Q29uZmlndXJhdG9yLkdyb3VwfSBQYXJlbnQgZ3JvdXAgb3IgdW5kZWZpbmVkIGlmIGdyb3VwIGlzIGEgdG9wLWxldmVsIGdyb3VwXG4gICAqL1xuICBnZXRQYXJlbnRHcm91cChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXBcbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0UGFyZW50R3JvdXAoZ3JvdXBzLCBncm91cCk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ2l2ZW4gZ3JvdXAgaGFzIHN1YiBncm91cHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwfSBncm91cCAtIEdpdmVuIGdyb3VwXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFN1YiBncm91cHMgYXZhaWxhYmxlP1xuICAgKi9cbiAgaGFzU3ViR3JvdXBzKGdyb3VwOiBDb25maWd1cmF0b3IuR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuaGFzU3ViR3JvdXBzKGdyb3VwKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0NvbmZsaWN0R3JvdXBJbkltbWVkaWF0ZUNvbmZsaWN0UmVzb2x1dGlvbk1vZGUoXG4gICAgZ3JvdXBUeXBlOiBDb25maWd1cmF0b3IuR3JvdXBUeXBlIHwgdW5kZWZpbmVkLFxuICAgIGltbWVkaWF0ZUNvbmZsaWN0UmVzb2x1dGlvbiA9IGZhbHNlXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmIChncm91cFR5cGUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGdyb3VwVHlwZSA9PT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUCAmJlxuICAgICAgICBpbW1lZGlhdGVDb25mbGljdFJlc29sdXRpb25cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBncm91cCBJRCBvZiB0aGUgbmVpZ2hib3JpbmcgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tbW9uQ29uZmlndXJhdG9yLk93bmVyfSBvd25lciAtIENvbmZpZ3VyYXRpb24gb3duZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5laWdoYm9yaW5nSW5kZXggLSBJbmRleCBvZiBuZWlnaGJvcmluZyBncm91cFxuICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPHN0cmluZz59IGdyb3VwIElEIG9mIHRoZSBuZWlnaGJvcmluZyBncm91cFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE5laWdoYm9yaW5nR3JvdXBJZChcbiAgICBvd25lcjogQ29tbW9uQ29uZmlndXJhdG9yLk93bmVyLFxuICAgIG5laWdoYm9yaW5nSW5kZXg6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmdldEN1cnJlbnRHcm91cElkKG93bmVyKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjdXJyZW50R3JvdXBJZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JDb21tb25zU2VydmljZS5nZXRDb25maWd1cmF0aW9uKG93bmVyKS5waXBlKFxuICAgICAgICAgIG1hcCgoY29uZmlndXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgbGV0IG5leHRHcm91cDtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwcy5mb3JFYWNoKChncm91cCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGdyb3VwLmlkID09PSBjdXJyZW50R3JvdXBJZCAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZmxhdEdyb3VwcyAmJlxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwc1tpbmRleCArIG5laWdoYm9yaW5nSW5kZXhdICYmIC8vQ2hlY2sgaWYgbmVpZ2hib3JpbmcgZ3JvdXAgZXhpc3RzXG4gICAgICAgICAgICAgICAgIXRoaXMuaXNDb25mbGljdEdyb3VwSW5JbW1lZGlhdGVDb25mbGljdFJlc29sdXRpb25Nb2RlKFxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbi5mbGF0R3JvdXBzW2luZGV4ICsgbmVpZ2hib3JpbmdJbmRleF0/Lmdyb3VwVHlwZSxcbiAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uaW1tZWRpYXRlQ29uZmxpY3RSZXNvbHV0aW9uXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBuZXh0R3JvdXAgPVxuICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbi5mbGF0R3JvdXBzW2luZGV4ICsgbmVpZ2hib3JpbmdJbmRleF0uaWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5leHRHcm91cDtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkdyb3VwVHlwZX0gZ3JvdXBUeXBlIC0gR3JvdXAgdHlwZVxuICAgKiBAcmV0dXJuIHtib29sZWFufSAtICdUcnVlJyBpZiB0aGUgY3VycmVudCBncm91cCBpcyBjb25mbGljdCBvbmUsIG90aGVyd2lzZSAnZmFsc2UnLlxuICAgKi9cbiAgaXNDb25mbGljdEdyb3VwVHlwZShncm91cFR5cGU6IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUCB8fFxuICAgICAgZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0dST1VQXG4gICAgKTtcbiAgfVxufVxuIl19