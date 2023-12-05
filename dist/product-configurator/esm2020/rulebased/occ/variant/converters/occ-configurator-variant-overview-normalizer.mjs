/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER } from './../variant-configurator-occ.converters';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccConfiguratorVariantOverviewNormalizer {
    constructor(translation, converterService) {
        this.translation = translation;
        this.converterService = converterService;
    }
    convert(source, target) {
        const prices = {
            priceSummary: source.pricing,
            configId: source.id,
        };
        const resultTarget = {
            ...target,
            configId: source.id,
            groups: source.groups?.flatMap((group) => this.convertGroup(group)),
            priceSummary: this.converterService.convert(prices, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER),
            productCode: source.productCode,
        };
        this.setIssueCounters(resultTarget, source);
        return resultTarget;
    }
    convertGroup(source) {
        const result = [];
        const characteristicValues = source.characteristicValues;
        const subGroups = source.subGroups;
        const group = {
            id: source.id,
            groupDescription: source.groupDescription,
            attributes: characteristicValues
                ? characteristicValues.map((characteristic) => {
                    return {
                        attribute: characteristic.characteristic,
                        attributeId: characteristic.characteristicId,
                        value: characteristic.value,
                        valueId: characteristic.valueId,
                        valuePrice: characteristic.price,
                    };
                })
                : [],
        };
        this.setGeneralDescription(group);
        if (subGroups) {
            const resultSubGroups = [];
            subGroups.forEach((subGroup) => this.convertGroup(subGroup).forEach((groupArray) => resultSubGroups.push(groupArray)));
            group.subGroups = resultSubGroups;
        }
        result.push(group);
        return result;
    }
    setGeneralDescription(group) {
        if (group.id !== '_GEN') {
            return;
        }
        this.translation
            .translate('configurator.group.general')
            .pipe(take(1))
            .subscribe((generalText) => (group.groupDescription = generalText));
    }
    setIssueCounters(target, source) {
        target.totalNumberOfIssues = source.totalNumberOfIssues;
        target.numberOfConflicts = source.numberOfConflicts;
        target.numberOfIncompleteCharacteristics =
            source.numberOfIncompleteCharacteristics;
    }
}
OccConfiguratorVariantOverviewNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, deps: [{ token: i1.TranslationService }, { token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantOverviewNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW92ZXJ2aWV3LW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW92ZXJ2aWV3LW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3RDLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7QUFHekcsTUFBTSxPQUFPLHdDQUF3QztJQUduRCxZQUNZLFdBQStCLEVBQy9CLGdCQUFrQztRQURsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUMzQyxDQUFDO0lBRUosT0FBTyxDQUNMLE1BQWdDLEVBQ2hDLE1BQThCO1FBRTlCLE1BQU0sTUFBTSxHQUEyQjtZQUNyQyxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7UUFDRixNQUFNLFlBQVksR0FBMEI7WUFDMUMsR0FBRyxNQUFNO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRSxZQUFZLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FDekMsTUFBTSxFQUNOLDZDQUE2QyxDQUM5QztZQUNELFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztTQUNoQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QyxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsWUFBWSxDQUNWLE1BQXFDO1FBRXJDLE1BQU0sTUFBTSxHQUFpQyxFQUFFLENBQUM7UUFDaEQsTUFBTSxvQkFBb0IsR0FFVixNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsTUFBTSxTQUFTLEdBQ2IsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixNQUFNLEtBQUssR0FBK0I7WUFDeEMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2IsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLGdCQUFnQjtZQUN6QyxVQUFVLEVBQUUsb0JBQW9CO2dCQUM5QixDQUFDLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7b0JBQzFDLE9BQU87d0JBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxjQUFjO3dCQUN4QyxXQUFXLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjt3QkFDNUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO3dCQUMzQixPQUFPLEVBQUUsY0FBYyxDQUFDLE9BQU87d0JBQy9CLFVBQVUsRUFBRSxjQUFjLENBQUMsS0FBSztxQkFDakMsQ0FBQztnQkFDSixDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLEVBQUU7U0FDUCxDQUFDO1FBRUYsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxlQUFlLEdBQWlDLEVBQUUsQ0FBQztZQUN6RCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUNqRCxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUNqQyxDQUNGLENBQUM7WUFDRixLQUFLLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztTQUNuQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQWlDO1FBQ3JELElBQUksS0FBSyxDQUFDLEVBQUUsS0FBSyxNQUFNLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVc7YUFDYixTQUFTLENBQUMsNEJBQTRCLENBQUM7YUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRVMsZ0JBQWdCLENBQ3hCLE1BQTZCLEVBQzdCLE1BQWdDO1FBRWhDLE1BQU0sQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDeEQsTUFBTSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztRQUNwRCxNQUFNLENBQUMsaUNBQWlDO1lBQ3RDLE1BQU0sQ0FBQyxpQ0FBaUMsQ0FBQztJQUM3QyxDQUFDOztxSUF2RlUsd0NBQXdDO3lJQUF4Qyx3Q0FBd0MsY0FEM0IsTUFBTTsyRkFDbkIsd0NBQXdDO2tCQURwRCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnZlcnRlcixcbiAgQ29udmVydGVyU2VydmljZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5tb2RlbHMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBWQVJJQU5UX0NPTkZJR1VSQVRPUl9QUklDRV9TVU1NQVJZX05PUk1BTElaRVIgfSBmcm9tICcuLy4uL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5jb252ZXJ0ZXJzJztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPY2NDb25maWd1cmF0b3JWYXJpYW50T3ZlcnZpZXdOb3JtYWxpemVyXG4gIGltcGxlbWVudHMgQ29udmVydGVyPE9jY0NvbmZpZ3VyYXRvci5PdmVydmlldywgQ29uZmlndXJhdG9yLk92ZXJ2aWV3Plxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyU2VydmljZTogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvci5PdmVydmlldyxcbiAgICB0YXJnZXQ/OiBDb25maWd1cmF0b3IuT3ZlcnZpZXdcbiAgKTogQ29uZmlndXJhdG9yLk92ZXJ2aWV3IHtcbiAgICBjb25zdCBwcmljZXM6IE9jY0NvbmZpZ3VyYXRvci5QcmljZXMgPSB7XG4gICAgICBwcmljZVN1bW1hcnk6IHNvdXJjZS5wcmljaW5nLFxuICAgICAgY29uZmlnSWQ6IHNvdXJjZS5pZCxcbiAgICB9O1xuICAgIGNvbnN0IHJlc3VsdFRhcmdldDogQ29uZmlndXJhdG9yLk92ZXJ2aWV3ID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgY29uZmlnSWQ6IHNvdXJjZS5pZCxcbiAgICAgIGdyb3Vwczogc291cmNlLmdyb3Vwcz8uZmxhdE1hcCgoZ3JvdXApID0+IHRoaXMuY29udmVydEdyb3VwKGdyb3VwKSksXG4gICAgICBwcmljZVN1bW1hcnk6IHRoaXMuY29udmVydGVyU2VydmljZS5jb252ZXJ0KFxuICAgICAgICBwcmljZXMsXG4gICAgICAgIFZBUklBTlRfQ09ORklHVVJBVE9SX1BSSUNFX1NVTU1BUllfTk9STUFMSVpFUlxuICAgICAgKSxcbiAgICAgIHByb2R1Y3RDb2RlOiBzb3VyY2UucHJvZHVjdENvZGUsXG4gICAgfTtcbiAgICB0aGlzLnNldElzc3VlQ291bnRlcnMocmVzdWx0VGFyZ2V0LCBzb3VyY2UpO1xuICAgIHJldHVybiByZXN1bHRUYXJnZXQ7XG4gIH1cblxuICBjb252ZXJ0R3JvdXAoXG4gICAgc291cmNlOiBPY2NDb25maWd1cmF0b3IuR3JvdXBPdmVydmlld1xuICApOiBDb25maWd1cmF0b3IuR3JvdXBPdmVydmlld1tdIHtcbiAgICBjb25zdCByZXN1bHQ6IENvbmZpZ3VyYXRvci5Hcm91cE92ZXJ2aWV3W10gPSBbXTtcbiAgICBjb25zdCBjaGFyYWN0ZXJpc3RpY1ZhbHVlczpcbiAgICAgIHwgT2NjQ29uZmlndXJhdG9yLkNoYXJhY3RlcmlzdGljT3ZlcnZpZXdbXVxuICAgICAgfCB1bmRlZmluZWQgPSBzb3VyY2UuY2hhcmFjdGVyaXN0aWNWYWx1ZXM7XG4gICAgY29uc3Qgc3ViR3JvdXBzOiBPY2NDb25maWd1cmF0b3IuR3JvdXBPdmVydmlld1tdIHwgdW5kZWZpbmVkID1cbiAgICAgIHNvdXJjZS5zdWJHcm91cHM7XG4gICAgY29uc3QgZ3JvdXA6IENvbmZpZ3VyYXRvci5Hcm91cE92ZXJ2aWV3ID0ge1xuICAgICAgaWQ6IHNvdXJjZS5pZCxcbiAgICAgIGdyb3VwRGVzY3JpcHRpb246IHNvdXJjZS5ncm91cERlc2NyaXB0aW9uLFxuICAgICAgYXR0cmlidXRlczogY2hhcmFjdGVyaXN0aWNWYWx1ZXNcbiAgICAgICAgPyBjaGFyYWN0ZXJpc3RpY1ZhbHVlcy5tYXAoKGNoYXJhY3RlcmlzdGljKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGU6IGNoYXJhY3RlcmlzdGljLmNoYXJhY3RlcmlzdGljLFxuICAgICAgICAgICAgICBhdHRyaWJ1dGVJZDogY2hhcmFjdGVyaXN0aWMuY2hhcmFjdGVyaXN0aWNJZCxcbiAgICAgICAgICAgICAgdmFsdWU6IGNoYXJhY3RlcmlzdGljLnZhbHVlLFxuICAgICAgICAgICAgICB2YWx1ZUlkOiBjaGFyYWN0ZXJpc3RpYy52YWx1ZUlkLFxuICAgICAgICAgICAgICB2YWx1ZVByaWNlOiBjaGFyYWN0ZXJpc3RpYy5wcmljZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRHZW5lcmFsRGVzY3JpcHRpb24oZ3JvdXApO1xuICAgIGlmIChzdWJHcm91cHMpIHtcbiAgICAgIGNvbnN0IHJlc3VsdFN1Ykdyb3VwczogQ29uZmlndXJhdG9yLkdyb3VwT3ZlcnZpZXdbXSA9IFtdO1xuICAgICAgc3ViR3JvdXBzLmZvckVhY2goKHN1Ykdyb3VwKSA9PlxuICAgICAgICB0aGlzLmNvbnZlcnRHcm91cChzdWJHcm91cCkuZm9yRWFjaCgoZ3JvdXBBcnJheSkgPT5cbiAgICAgICAgICByZXN1bHRTdWJHcm91cHMucHVzaChncm91cEFycmF5KVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgZ3JvdXAuc3ViR3JvdXBzID0gcmVzdWx0U3ViR3JvdXBzO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChncm91cCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHNldEdlbmVyYWxEZXNjcmlwdGlvbihncm91cDogQ29uZmlndXJhdG9yLkdyb3VwT3ZlcnZpZXcpOiB2b2lkIHtcbiAgICBpZiAoZ3JvdXAuaWQgIT09ICdfR0VOJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRyYW5zbGF0aW9uXG4gICAgICAudHJhbnNsYXRlKCdjb25maWd1cmF0b3IuZ3JvdXAuZ2VuZXJhbCcpXG4gICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoZ2VuZXJhbFRleHQpID0+IChncm91cC5ncm91cERlc2NyaXB0aW9uID0gZ2VuZXJhbFRleHQpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRJc3N1ZUNvdW50ZXJzKFxuICAgIHRhcmdldDogQ29uZmlndXJhdG9yLk92ZXJ2aWV3LFxuICAgIHNvdXJjZTogT2NjQ29uZmlndXJhdG9yLk92ZXJ2aWV3XG4gICkge1xuICAgIHRhcmdldC50b3RhbE51bWJlck9mSXNzdWVzID0gc291cmNlLnRvdGFsTnVtYmVyT2ZJc3N1ZXM7XG4gICAgdGFyZ2V0Lm51bWJlck9mQ29uZmxpY3RzID0gc291cmNlLm51bWJlck9mQ29uZmxpY3RzO1xuICAgIHRhcmdldC5udW1iZXJPZkluY29tcGxldGVDaGFyYWN0ZXJpc3RpY3MgPVxuICAgICAgc291cmNlLm51bWJlck9mSW5jb21wbGV0ZUNoYXJhY3RlcmlzdGljcztcbiAgfVxufVxuIl19