/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class OccConfiguratorVariantOverviewSerializer {
    constructor(converterService) {
        this.converterService = converterService;
    }
    convert(source, target) {
        return {
            ...target,
            id: source.configId,
            productCode: source.productCode,
            appliedCsticFilter: this.convertAttributeFilters(source.attributeFilters),
            groupFilterList: this.convertGroupFilters(source.groupFilters),
        };
    }
    convertAttributeFilters(attributeFilters) {
        const result = [];
        attributeFilters?.forEach((filter) => {
            result.push({ key: filter, selected: true });
        });
        return result;
    }
    convertGroupFilters(groupFilters) {
        const result = [];
        groupFilters?.forEach((filter) => {
            result.push({ key: filter, selected: true });
        });
        return result;
    }
}
OccConfiguratorVariantOverviewSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, deps: [{ token: i1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantOverviewSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW92ZXJ2aWV3LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LW92ZXJ2aWV3LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU0zQyxNQUFNLE9BQU8sd0NBQXdDO0lBR25ELFlBQXNCLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztJQUU1RCxPQUFPLENBQ0wsTUFBNkIsRUFDN0IsTUFBaUM7UUFFakMsT0FBTztZQUNMLEdBQUcsTUFBTTtZQUNULEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUNuQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0Isa0JBQWtCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6RSxlQUFlLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7U0FDL0QsQ0FBQztJQUNKLENBQUM7SUFFUyx1QkFBdUIsQ0FDL0IsZ0JBQWdEO1FBRWhELE1BQU0sTUFBTSxHQUFxQyxFQUFFLENBQUM7UUFDcEQsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRVMsbUJBQW1CLENBQzNCLFlBQXVCO1FBRXZCLE1BQU0sTUFBTSxHQUFxQyxFQUFFLENBQUM7UUFDcEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7cUlBcENVLHdDQUF3Qzt5SUFBeEMsd0NBQXdDLGNBRDNCLE1BQU07MkZBQ25CLHdDQUF3QztrQkFEcEQsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIsIENvbnZlcnRlclNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2NjQ29uZmlndXJhdG9yIH0gZnJvbSAnLi4vdmFyaWFudC1jb25maWd1cmF0b3Itb2NjLm1vZGVscyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3IgfSBmcm9tICcuLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yVmFyaWFudE92ZXJ2aWV3U2VyaWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxDb25maWd1cmF0b3IuT3ZlcnZpZXcsIE9jY0NvbmZpZ3VyYXRvci5PdmVydmlldz5cbntcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbnZlcnRlclNlcnZpY2U6IENvbnZlcnRlclNlcnZpY2UpIHt9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvci5PdmVydmlldyxcbiAgICB0YXJnZXQ/OiBPY2NDb25maWd1cmF0b3IuT3ZlcnZpZXdcbiAgKTogT2NjQ29uZmlndXJhdG9yLk92ZXJ2aWV3IHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgaWQ6IHNvdXJjZS5jb25maWdJZCxcbiAgICAgIHByb2R1Y3RDb2RlOiBzb3VyY2UucHJvZHVjdENvZGUsXG4gICAgICBhcHBsaWVkQ3N0aWNGaWx0ZXI6IHRoaXMuY29udmVydEF0dHJpYnV0ZUZpbHRlcnMoc291cmNlLmF0dHJpYnV0ZUZpbHRlcnMpLFxuICAgICAgZ3JvdXBGaWx0ZXJMaXN0OiB0aGlzLmNvbnZlcnRHcm91cEZpbHRlcnMoc291cmNlLmdyb3VwRmlsdGVycyksXG4gICAgfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb252ZXJ0QXR0cmlidXRlRmlsdGVycyhcbiAgICBhdHRyaWJ1dGVGaWx0ZXJzPzogQ29uZmlndXJhdG9yLk92ZXJ2aWV3RmlsdGVyW11cbiAgKTogT2NjQ29uZmlndXJhdG9yLk92ZXJ2aWV3RmlsdGVyW10ge1xuICAgIGNvbnN0IHJlc3VsdDogT2NjQ29uZmlndXJhdG9yLk92ZXJ2aWV3RmlsdGVyW10gPSBbXTtcbiAgICBhdHRyaWJ1dGVGaWx0ZXJzPy5mb3JFYWNoKChmaWx0ZXIpID0+IHtcbiAgICAgIHJlc3VsdC5wdXNoKHsga2V5OiBmaWx0ZXIsIHNlbGVjdGVkOiB0cnVlIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29udmVydEdyb3VwRmlsdGVycyhcbiAgICBncm91cEZpbHRlcnM/OiBzdHJpbmdbXVxuICApOiBPY2NDb25maWd1cmF0b3IuT3ZlcnZpZXdGaWx0ZXJbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBPY2NDb25maWd1cmF0b3IuT3ZlcnZpZXdGaWx0ZXJbXSA9IFtdO1xuICAgIGdyb3VwRmlsdGVycz8uZm9yRWFjaCgoZmlsdGVyKSA9PiB7XG4gICAgICByZXN1bHQucHVzaCh7IGtleTogZmlsdGVyLCBzZWxlY3RlZDogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=