/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorActions } from '../state/actions/index';
import { ConfiguratorSelectors } from '../state/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "./utils/configurator-utils.service";
/**
 * Service for handling group statuses
 */
export class ConfiguratorGroupStatusService {
    constructor(store, configuratorUtilsService) {
        this.store = store;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Verifies whether the group has been visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @returns {Observable<boolean>} Has group been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.store.select(ConfiguratorSelectors.isGroupVisited(owner.key, groupId));
    }
    /**
     * Returns the first non-conflict group of the configuration which is not completed
     * and undefined if all are completed.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     *
     * @return {Configurator.Group} - First incomplete group or undefined
     */
    getFirstIncompleteGroup(configuration) {
        return configuration.flatGroups
            ? configuration.flatGroups
                .filter((group) => group.groupType !== Configurator.GroupType.CONFLICT_GROUP)
                .find((group) => !group.complete)
            : undefined;
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(configuration, groupId) {
        const group = this.configuratorUtilsService.getGroupById(configuration.groups, groupId);
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        const visitedGroupIds = [];
        visitedGroupIds.push(group.id);
        if (parentGroup) {
            this.getParentGroupStatusVisited(configuration, group.id, parentGroup, visitedGroupIds);
        }
        this.store.dispatch(new ConfiguratorActions.SetGroupsVisited({
            entityKey: configuration.owner.key,
            visitedGroups: visitedGroupIds,
        }));
    }
    areGroupsVisited(owner, groupIds) {
        return this.store.select(ConfiguratorSelectors.areGroupsVisited(owner.key, groupIds));
    }
    getParentGroupStatusVisited(configuration, groupId, parentGroup, visitedGroupIds) {
        const subGroups = [];
        parentGroup.subGroups.forEach((subGroup) => {
            //The current group is not set to visited yet, therefore we have to exclude it in the check
            if (subGroup.id === groupId) {
                return;
            }
            subGroups.push(subGroup.id);
        });
        this.areGroupsVisited(configuration.owner, subGroups)
            .pipe(take(1))
            .subscribe((isVisited) => {
            if (isVisited) {
                visitedGroupIds.push(parentGroup.id);
                const grandParentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, parentGroup.id));
                if (grandParentGroup) {
                    this.getParentGroupStatusVisited(configuration, parentGroup.id, grandParentGroup, visitedGroupIds);
                }
            }
        });
    }
}
ConfiguratorGroupStatusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, deps: [{ token: i1.Store }, { token: i2.ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupStatusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ConfiguratorUtilsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLXN0YXR1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL2ZhY2FkZS9jb25maWd1cmF0b3ItZ3JvdXAtc3RhdHVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUdqRTs7R0FFRztBQUVILE1BQU0sT0FBTyw4QkFBOEI7SUFDekMsWUFDWSxLQUFtQyxFQUNuQyx3QkFBa0Q7UUFEbEQsVUFBSyxHQUFMLEtBQUssQ0FBOEI7UUFDbkMsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtJQUMzRCxDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsY0FBYyxDQUNaLEtBQStCLEVBQy9CLE9BQWU7UUFFZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUN0QixxQkFBcUIsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsdUJBQXVCLENBQ3JCLGFBQXlDO1FBRXpDLE9BQU8sYUFBYSxDQUFDLFVBQVU7WUFDN0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVO2lCQUNyQixNQUFNLENBQ0wsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxT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QVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBDb21tb25Db25maWd1cmF0b3IgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vbW9kZWwvY29uZmlndXJhdG9yLm1vZGVsJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckFjdGlvbnMgfSBmcm9tICcuLi9zdGF0ZS9hY3Rpb25zL2luZGV4JztcbmltcG9ydCB7IFN0YXRlV2l0aENvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3N0YXRlL2NvbmZpZ3VyYXRvci1zdGF0ZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JTZWxlY3RvcnMgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvaW5kZXgnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy9jb25maWd1cmF0b3ItdXRpbHMuc2VydmljZSc7XG5cbi8qKlxuICogU2VydmljZSBmb3IgaGFuZGxpbmcgZ3JvdXAgc3RhdHVzZXNcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JHcm91cFN0YXR1c1NlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENvbmZpZ3VyYXRvcj4sXG4gICAgcHJvdGVjdGVkIGNvbmZpZ3VyYXRvclV0aWxzU2VydmljZTogQ29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogVmVyaWZpZXMgd2hldGhlciB0aGUgZ3JvdXAgaGFzIGJlZW4gdmlzaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtDb21tb25Db25maWd1cmF0b3IuT3duZXJ9IG93bmVyIC0gQ29uZmlndXJhdGlvbiBvd25lclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZ3JvdXBJZCAtIEdyb3VwIElEXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPGJvb2xlYW4+fSBIYXMgZ3JvdXAgYmVlbiB2aXNpdGVkP1xuICAgKi9cbiAgaXNHcm91cFZpc2l0ZWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcixcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KFxuICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmlzR3JvdXBWaXNpdGVkKG93bmVyLmtleSwgZ3JvdXBJZClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpcnN0IG5vbi1jb25mbGljdCBncm91cCBvZiB0aGUgY29uZmlndXJhdGlvbiB3aGljaCBpcyBub3QgY29tcGxldGVkXG4gICAqIGFuZCB1bmRlZmluZWQgaWYgYWxsIGFyZSBjb21wbGV0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqXG4gICAqIEByZXR1cm4ge0NvbmZpZ3VyYXRvci5Hcm91cH0gLSBGaXJzdCBpbmNvbXBsZXRlIGdyb3VwIG9yIHVuZGVmaW5lZFxuICAgKi9cbiAgZ2V0Rmlyc3RJbmNvbXBsZXRlR3JvdXAoXG4gICAgY29uZmlndXJhdGlvbjogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gY29uZmlndXJhdGlvbi5mbGF0R3JvdXBzXG4gICAgICA/IGNvbmZpZ3VyYXRpb24uZmxhdEdyb3Vwc1xuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAoZ3JvdXApID0+IGdyb3VwLmdyb3VwVHlwZSAhPT0gQ29uZmlndXJhdG9yLkdyb3VwVHlwZS5DT05GTElDVF9HUk9VUFxuICAgICAgICAgIClcbiAgICAgICAgICAuZmluZCgoZ3JvdXApID0+ICFncm91cC5jb21wbGV0ZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB0aGUgZ3JvdXAgaGFzIGJlZW4gdmlzaXRlZCBvciBub3QuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb259IGNvbmZpZ3VyYXRpb24gLSBDb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBncm91cElkIC0gR3JvdXAgSURcbiAgICovXG4gIHNldEdyb3VwU3RhdHVzVmlzaXRlZChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICBncm91cElkOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRHcm91cEJ5SWQoXG4gICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgIGdyb3VwSWRcbiAgICApO1xuICAgIGNvbnN0IHBhcmVudEdyb3VwID0gdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0UGFyZW50R3JvdXAoXG4gICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgIHRoaXMuY29uZmlndXJhdG9yVXRpbHNTZXJ2aWNlLmdldEdyb3VwQnlJZChjb25maWd1cmF0aW9uLmdyb3VwcywgZ3JvdXBJZClcbiAgICApO1xuXG4gICAgY29uc3QgdmlzaXRlZEdyb3VwSWRzID0gW107XG4gICAgdmlzaXRlZEdyb3VwSWRzLnB1c2goZ3JvdXAuaWQpO1xuICAgIGlmIChwYXJlbnRHcm91cCkge1xuICAgICAgdGhpcy5nZXRQYXJlbnRHcm91cFN0YXR1c1Zpc2l0ZWQoXG4gICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgIGdyb3VwLmlkLFxuICAgICAgICBwYXJlbnRHcm91cCxcbiAgICAgICAgdmlzaXRlZEdyb3VwSWRzXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5TZXRHcm91cHNWaXNpdGVkKHtcbiAgICAgICAgZW50aXR5S2V5OiBjb25maWd1cmF0aW9uLm93bmVyLmtleSxcbiAgICAgICAgdmlzaXRlZEdyb3VwczogdmlzaXRlZEdyb3VwSWRzLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFyZUdyb3Vwc1Zpc2l0ZWQoXG4gICAgb3duZXI6IENvbW1vbkNvbmZpZ3VyYXRvci5Pd25lcixcbiAgICBncm91cElkczogc3RyaW5nW11cbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KFxuICAgICAgQ29uZmlndXJhdG9yU2VsZWN0b3JzLmFyZUdyb3Vwc1Zpc2l0ZWQob3duZXIua2V5LCBncm91cElkcylcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhcmVudEdyb3VwU3RhdHVzVmlzaXRlZChcbiAgICBjb25maWd1cmF0aW9uOiBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbixcbiAgICBncm91cElkOiBzdHJpbmcsXG4gICAgcGFyZW50R3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cCxcbiAgICB2aXNpdGVkR3JvdXBJZHM6IHN0cmluZ1tdXG4gICkge1xuICAgIGNvbnN0IHN1Ykdyb3Vwczogc3RyaW5nW10gPSBbXTtcbiAgICBwYXJlbnRHcm91cC5zdWJHcm91cHMuZm9yRWFjaCgoc3ViR3JvdXApID0+IHtcbiAgICAgIC8vVGhlIGN1cnJlbnQgZ3JvdXAgaXMgbm90IHNldCB0byB2aXNpdGVkIHlldCwgdGhlcmVmb3JlIHdlIGhhdmUgdG8gZXhjbHVkZSBpdCBpbiB0aGUgY2hlY2tcbiAgICAgIGlmIChzdWJHcm91cC5pZCA9PT0gZ3JvdXBJZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzdWJHcm91cHMucHVzaChzdWJHcm91cC5pZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFyZUdyb3Vwc1Zpc2l0ZWQoY29uZmlndXJhdGlvbi5vd25lciwgc3ViR3JvdXBzKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKGlzVmlzaXRlZCkgPT4ge1xuICAgICAgICBpZiAoaXNWaXNpdGVkKSB7XG4gICAgICAgICAgdmlzaXRlZEdyb3VwSWRzLnB1c2gocGFyZW50R3JvdXAuaWQpO1xuICAgICAgICAgIGNvbnN0IGdyYW5kUGFyZW50R3JvdXAgPSB0aGlzLmNvbmZpZ3VyYXRvclV0aWxzU2VydmljZS5nZXRQYXJlbnRHcm91cChcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uZ3JvdXBzLFxuICAgICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JVdGlsc1NlcnZpY2UuZ2V0R3JvdXBCeUlkKFxuICAgICAgICAgICAgICBjb25maWd1cmF0aW9uLmdyb3VwcyxcbiAgICAgICAgICAgICAgcGFyZW50R3JvdXAuaWRcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChncmFuZFBhcmVudEdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLmdldFBhcmVudEdyb3VwU3RhdHVzVmlzaXRlZChcbiAgICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgICAgcGFyZW50R3JvdXAuaWQsXG4gICAgICAgICAgICAgIGdyYW5kUGFyZW50R3JvdXAsXG4gICAgICAgICAgICAgIHZpc2l0ZWRHcm91cElkc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=