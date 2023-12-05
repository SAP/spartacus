/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Configurator } from '../../model/configurator.model';
import * as i0 from "@angular/core";
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
export class ConfiguratorBasicEffectService {
    /**
     * Finds first attribute group with attributes for a configuration (ignores conflict groups per default).
     * If optional parameter 'includeConflicts' is set to true it finds first group with attributes including conflict groups.
     * Throws error if such a group does not exist, as this is an illegal state
     * @param configuration
     * @param includeConflicts (optional) if true it includes also conflict groups in the search
     * @returns Group id
     *
     */
    getFirstGroupWithAttributes(configuration, includeConflicts = false) {
        const id = this.getFirstGroupWithAttributesForList(configuration.groups, includeConflicts);
        if (id) {
            return id;
        }
        else {
            throw new Error('Configuration does not have any attributes');
        }
    }
    /**
     * Finds first group with attributes in a list of groups. Dependent on 'includeConflicts' parameters it includes conflict groups in the search or it ignores them.
     * @param groups
     * @param includeConflicts set to true in order to include conflict groups in the seach
     * @returns Group id
     */
    getFirstGroupWithAttributesForList(groups, includeConflicts) {
        let groupWithAttributes;
        if (includeConflicts &&
            groups.length > 0 &&
            groups[0].groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            //check if conflicts exist and try to return first conflict group with attributes
            groupWithAttributes = groups[0].subGroups
                .filter((currentGroup) => currentGroup.attributes && currentGroup.attributes.length > 0)
                .shift();
        }
        if (groupWithAttributes === undefined) {
            groupWithAttributes = groups
                .filter((currentGroup) => currentGroup.attributes &&
                currentGroup.attributes.length > 0 &&
                currentGroup.groupType !== Configurator.GroupType.CONFLICT_GROUP)
                .shift();
        }
        let id;
        if (groupWithAttributes) {
            id = groupWithAttributes.id;
        }
        else {
            id = groups
                .filter((currentGroup) => currentGroup.subGroups && currentGroup.subGroups.length > 0)
                .flatMap((currentGroup) => this.getFirstGroupWithAttributesForList(currentGroup.subGroups, includeConflicts))
                .filter((groupId) => groupId) //Filter undefined strings
                .shift();
        }
        return id;
    }
}
ConfiguratorBasicEffectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWJhc2ljLWVmZmVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL3N0YXRlL2VmZmVjdHMvY29uZmlndXJhdG9yLWJhc2ljLWVmZmVjdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFOUQ7OztHQUdHO0FBRUgsTUFBTSxPQUFPLDhCQUE4QjtJQUN6Qzs7Ozs7Ozs7T0FRRztJQUNILDJCQUEyQixDQUN6QixhQUF5QyxFQUN6QyxnQkFBZ0IsR0FBRyxLQUFLO1FBRXhCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxrQ0FBa0MsQ0FDaEQsYUFBYSxDQUFDLE1BQU0sRUFDcEIsZ0JBQWdCLENBQ2pCLENBQUM7UUFDRixJQUFJLEVBQUUsRUFBRTtZQUNOLE9BQU8sRUFBRSxDQUFDO1NBQ1g7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGtDQUFrQyxDQUMxQyxNQUE0QixFQUM1QixnQkFBeUI7UUFFekIsSUFBSSxtQkFBbUQsQ0FBQztRQUN4RCxJQUNFLGdCQUFnQjtZQUNoQixNQUFNLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDakIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUNwRTtZQUNBLGlGQUFpRjtZQUNqRixtQkFBbUIsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztpQkFDdEMsTUFBTSxDQUNMLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDZixZQUFZLENBQUMsVUFBVSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDaEU7aUJBQ0EsS0FBSyxFQUFFLENBQUM7U0FDWjtRQUNELElBQUksbUJBQW1CLEtBQUssU0FBUyxFQUFFO1lBQ3JDLG1CQUFtQixHQUFHLE1BQU07aUJBQ3pCLE1BQU0sQ0FDTCxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ2YsWUFBWSxDQUFDLFVBQVU7Z0JBQ3ZCLFlBQVksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2xDLFlBQVksQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQ25FO2lCQUNBLEtBQUssRUFBRSxDQUFDO1NBQ1o7UUFDRCxJQUFJLEVBQXNCLENBQUM7UUFDM0IsSUFBSSxtQkFBbUIsRUFBRTtZQUN2QixFQUFFLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxFQUFFLEdBQUcsTUFBTTtpQkFDUixNQUFNLENBQ0wsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUNmLFlBQVksQ0FBQyxTQUFTLElBQUksWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUM5RDtpQkFDQSxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUN4QixJQUFJLENBQUMsa0NBQWtDLENBQ3JDLFlBQVksQ0FBQyxTQUFTLEVBQ3RCLGdCQUFnQixDQUNqQixDQUNGO2lCQUNBLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsMEJBQTBCO2lCQUN2RCxLQUFLLEVBQUUsQ0FBQztTQUNaO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDOzsySEE5RVUsOEJBQThCOytIQUE5Qiw4QkFBOEIsY0FEakIsTUFBTTsyRkFDbkIsOEJBQThCO2tCQUQxQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbi8qKlxuICogU2VydmljZSB0aGF0IHByb3ZpZGVzIGhlbHBlciBtZXRob2RzIGZvciB0aGUgYmFzaWMgY29uZmlndXJhdG9yIGVmZmVjdHMsXG4gKiBpbiBvcmRlciB0byBlbmhhbmNlIHRoZW0gd2l0aG91dCB0aGUgbmVlZCB0byBpbnRyb2R1Y2UgbmV3IGVmZmVjdHNcbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JCYXNpY0VmZmVjdFNlcnZpY2Uge1xuICAvKipcbiAgICogRmluZHMgZmlyc3QgYXR0cmlidXRlIGdyb3VwIHdpdGggYXR0cmlidXRlcyBmb3IgYSBjb25maWd1cmF0aW9uIChpZ25vcmVzIGNvbmZsaWN0IGdyb3VwcyBwZXIgZGVmYXVsdCkuXG4gICAqIElmIG9wdGlvbmFsIHBhcmFtZXRlciAnaW5jbHVkZUNvbmZsaWN0cycgaXMgc2V0IHRvIHRydWUgaXQgZmluZHMgZmlyc3QgZ3JvdXAgd2l0aCBhdHRyaWJ1dGVzIGluY2x1ZGluZyBjb25mbGljdCBncm91cHMuXG4gICAqIFRocm93cyBlcnJvciBpZiBzdWNoIGEgZ3JvdXAgZG9lcyBub3QgZXhpc3QsIGFzIHRoaXMgaXMgYW4gaWxsZWdhbCBzdGF0ZVxuICAgKiBAcGFyYW0gY29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0gaW5jbHVkZUNvbmZsaWN0cyAob3B0aW9uYWwpIGlmIHRydWUgaXQgaW5jbHVkZXMgYWxzbyBjb25mbGljdCBncm91cHMgaW4gdGhlIHNlYXJjaFxuICAgKiBAcmV0dXJucyBHcm91cCBpZFxuICAgKlxuICAgKi9cbiAgZ2V0Rmlyc3RHcm91cFdpdGhBdHRyaWJ1dGVzKFxuICAgIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uLFxuICAgIGluY2x1ZGVDb25mbGljdHMgPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZXRGaXJzdEdyb3VwV2l0aEF0dHJpYnV0ZXNGb3JMaXN0KFxuICAgICAgY29uZmlndXJhdGlvbi5ncm91cHMsXG4gICAgICBpbmNsdWRlQ29uZmxpY3RzXG4gICAgKTtcbiAgICBpZiAoaWQpIHtcbiAgICAgIHJldHVybiBpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25maWd1cmF0aW9uIGRvZXMgbm90IGhhdmUgYW55IGF0dHJpYnV0ZXMnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmluZHMgZmlyc3QgZ3JvdXAgd2l0aCBhdHRyaWJ1dGVzIGluIGEgbGlzdCBvZiBncm91cHMuIERlcGVuZGVudCBvbiAnaW5jbHVkZUNvbmZsaWN0cycgcGFyYW1ldGVycyBpdCBpbmNsdWRlcyBjb25mbGljdCBncm91cHMgaW4gdGhlIHNlYXJjaCBvciBpdCBpZ25vcmVzIHRoZW0uXG4gICAqIEBwYXJhbSBncm91cHNcbiAgICogQHBhcmFtIGluY2x1ZGVDb25mbGljdHMgc2V0IHRvIHRydWUgaW4gb3JkZXIgdG8gaW5jbHVkZSBjb25mbGljdCBncm91cHMgaW4gdGhlIHNlYWNoXG4gICAqIEByZXR1cm5zIEdyb3VwIGlkXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Rmlyc3RHcm91cFdpdGhBdHRyaWJ1dGVzRm9yTGlzdChcbiAgICBncm91cHM6IENvbmZpZ3VyYXRvci5Hcm91cFtdLFxuICAgIGluY2x1ZGVDb25mbGljdHM6IGJvb2xlYW5cbiAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBsZXQgZ3JvdXBXaXRoQXR0cmlidXRlczogQ29uZmlndXJhdG9yLkdyb3VwIHwgdW5kZWZpbmVkO1xuICAgIGlmIChcbiAgICAgIGluY2x1ZGVDb25mbGljdHMgJiZcbiAgICAgIGdyb3Vwcy5sZW5ndGggPiAwICYmXG4gICAgICBncm91cHNbMF0uZ3JvdXBUeXBlID09PSBDb25maWd1cmF0b3IuR3JvdXBUeXBlLkNPTkZMSUNUX0hFQURFUl9HUk9VUFxuICAgICkge1xuICAgICAgLy9jaGVjayBpZiBjb25mbGljdHMgZXhpc3QgYW5kIHRyeSB0byByZXR1cm4gZmlyc3QgY29uZmxpY3QgZ3JvdXAgd2l0aCBhdHRyaWJ1dGVzXG4gICAgICBncm91cFdpdGhBdHRyaWJ1dGVzID0gZ3JvdXBzWzBdLnN1Ykdyb3Vwc1xuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgIChjdXJyZW50R3JvdXApID0+XG4gICAgICAgICAgICBjdXJyZW50R3JvdXAuYXR0cmlidXRlcyAmJiBjdXJyZW50R3JvdXAuYXR0cmlidXRlcy5sZW5ndGggPiAwXG4gICAgICAgIClcbiAgICAgICAgLnNoaWZ0KCk7XG4gICAgfVxuICAgIGlmIChncm91cFdpdGhBdHRyaWJ1dGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGdyb3VwV2l0aEF0dHJpYnV0ZXMgPSBncm91cHNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoY3VycmVudEdyb3VwKSA9PlxuICAgICAgICAgICAgY3VycmVudEdyb3VwLmF0dHJpYnV0ZXMgJiZcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5hdHRyaWJ1dGVzLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5ncm91cFR5cGUgIT09IENvbmZpZ3VyYXRvci5Hcm91cFR5cGUuQ09ORkxJQ1RfR1JPVVBcbiAgICAgICAgKVxuICAgICAgICAuc2hpZnQoKTtcbiAgICB9XG4gICAgbGV0IGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGdyb3VwV2l0aEF0dHJpYnV0ZXMpIHtcbiAgICAgIGlkID0gZ3JvdXBXaXRoQXR0cmlidXRlcy5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWQgPSBncm91cHNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAoY3VycmVudEdyb3VwKSA9PlxuICAgICAgICAgICAgY3VycmVudEdyb3VwLnN1Ykdyb3VwcyAmJiBjdXJyZW50R3JvdXAuc3ViR3JvdXBzLmxlbmd0aCA+IDBcbiAgICAgICAgKVxuICAgICAgICAuZmxhdE1hcCgoY3VycmVudEdyb3VwKSA9PlxuICAgICAgICAgIHRoaXMuZ2V0Rmlyc3RHcm91cFdpdGhBdHRyaWJ1dGVzRm9yTGlzdChcbiAgICAgICAgICAgIGN1cnJlbnRHcm91cC5zdWJHcm91cHMsXG4gICAgICAgICAgICBpbmNsdWRlQ29uZmxpY3RzXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICAgIC5maWx0ZXIoKGdyb3VwSWQpID0+IGdyb3VwSWQpIC8vRmlsdGVyIHVuZGVmaW5lZCBzdHJpbmdzXG4gICAgICAgIC5zaGlmdCgpO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH1cbn1cbiJdfQ==