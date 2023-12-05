/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import * as i0 from "@angular/core";
export class OccConfiguratorVariantPriceNormalizer {
    convert(source, target) {
        const priceSupplements = [];
        source.attributes?.forEach((attr) => {
            this.convertAttributeSupplements(attr, priceSupplements);
        });
        //fine to build an incomplete configuratiom here,
        //as we later on only take over the pricing related aspects
        const resultTarget = {
            ...target,
            configId: source.configId,
            productCode: '',
            groups: [],
            flatGroups: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
            interactionState: {},
            priceSummary: source?.priceSummary,
            priceSupplements: priceSupplements,
        };
        return resultTarget;
    }
    convertAttributeSupplements(source, priceSupplements) {
        const attributeSupplement = {
            attributeUiKey: source?.csticUiKey,
            valueSupplements: [],
        };
        source?.priceSupplements?.forEach((value) => {
            this.convertValueSupplement(value, attributeSupplement?.valueSupplements);
        });
        priceSupplements.push(attributeSupplement);
    }
    convertValueSupplement(source, valueSupplements) {
        const valueSupplement = {
            attributeValueKey: source?.attributeValueKey,
            priceValue: source?.priceValue,
            obsoletePriceValue: source?.obsoletePriceValue,
        };
        valueSupplements.push(valueSupplement);
    }
}
OccConfiguratorVariantPriceNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXByaWNlLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXByaWNlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBS2hGLE1BQU0sT0FBTyxxQ0FBcUM7SUFHaEQsT0FBTyxDQUNMLE1BQThCLEVBQzlCLE1BQW1DO1FBRW5DLE1BQU0sZ0JBQWdCLEdBQXVDLEVBQUUsQ0FBQztRQUNoRSxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILGlEQUFpRDtRQUNqRCwyREFBMkQ7UUFDM0QsTUFBTSxZQUFZLEdBQStCO1lBQy9DLEdBQUcsTUFBTTtZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixXQUFXLEVBQUUsRUFBRTtZQUNmLE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxLQUFLLEVBQUUsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUU7WUFDbEQsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixZQUFZLEVBQUUsTUFBTSxFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsMkJBQTJCLENBQ3pCLE1BQW1DLEVBQ25DLGdCQUFvRDtRQUVwRCxNQUFNLG1CQUFtQixHQUFxQztZQUM1RCxjQUFjLEVBQUUsTUFBTSxFQUFFLFVBQVU7WUFDbEMsZ0JBQWdCLEVBQUUsRUFBRTtTQUNyQixDQUFDO1FBRUYsTUFBTSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxzQkFBc0IsQ0FDcEIsTUFBd0MsRUFDeEMsZ0JBQWdEO1FBRWhELE1BQU0sZUFBZSxHQUFpQztZQUNwRCxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsaUJBQWlCO1lBQzVDLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVTtZQUM5QixrQkFBa0IsRUFBRSxNQUFNLEVBQUUsa0JBQWtCO1NBQy9DLENBQUM7UUFDRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7a0lBdERVLHFDQUFxQztzSUFBckMscUNBQXFDLGNBRHhCLE1BQU07MkZBQ25CLHFDQUFxQztrQkFEakQsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yTW9kZWxVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5tb2RlbHMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yVmFyaWFudFByaWNlTm9ybWFsaXplclxuICBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2NDb25maWd1cmF0b3IuUHJpY2VzLCBDb25maWd1cmF0b3IuQ29uZmlndXJhdGlvbj5cbntcbiAgY29udmVydChcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvci5QcmljZXMsXG4gICAgdGFyZ2V0PzogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb25cbiAgKTogQ29uZmlndXJhdG9yLkNvbmZpZ3VyYXRpb24ge1xuICAgIGNvbnN0IHByaWNlU3VwcGxlbWVudHM6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVTdXBwbGVtZW50W10gPSBbXTtcbiAgICBzb3VyY2UuYXR0cmlidXRlcz8uZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgdGhpcy5jb252ZXJ0QXR0cmlidXRlU3VwcGxlbWVudHMoYXR0ciwgcHJpY2VTdXBwbGVtZW50cyk7XG4gICAgfSk7XG5cbiAgICAvL2ZpbmUgdG8gYnVpbGQgYW4gaW5jb21wbGV0ZSBjb25maWd1cmF0aW9tIGhlcmUsXG4gICAgLy9hcyB3ZSBsYXRlciBvbiBvbmx5IHRha2Ugb3ZlciB0aGUgcHJpY2luZyByZWxhdGVkIGFzcGVjdHNcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IENvbmZpZ3VyYXRvci5Db25maWd1cmF0aW9uID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgY29uZmlnSWQ6IHNvdXJjZS5jb25maWdJZCxcbiAgICAgIHByb2R1Y3RDb2RlOiAnJyxcbiAgICAgIGdyb3VwczogW10sXG4gICAgICBmbGF0R3JvdXBzOiBbXSxcbiAgICAgIG93bmVyOiBDb25maWd1cmF0b3JNb2RlbFV0aWxzLmNyZWF0ZUluaXRpYWxPd25lcigpLFxuICAgICAgaW50ZXJhY3Rpb25TdGF0ZToge30sXG4gICAgICBwcmljZVN1bW1hcnk6IHNvdXJjZT8ucHJpY2VTdW1tYXJ5LFxuICAgICAgcHJpY2VTdXBwbGVtZW50czogcHJpY2VTdXBwbGVtZW50cyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdFRhcmdldDtcbiAgfVxuXG4gIGNvbnZlcnRBdHRyaWJ1dGVTdXBwbGVtZW50cyhcbiAgICBzb3VyY2U6IE9jY0NvbmZpZ3VyYXRvci5TdXBwbGVtZW50cyxcbiAgICBwcmljZVN1cHBsZW1lbnRzOiBDb25maWd1cmF0b3IuQXR0cmlidXRlU3VwcGxlbWVudFtdXG4gICkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZVN1cHBsZW1lbnQ6IENvbmZpZ3VyYXRvci5BdHRyaWJ1dGVTdXBwbGVtZW50ID0ge1xuICAgICAgYXR0cmlidXRlVWlLZXk6IHNvdXJjZT8uY3N0aWNVaUtleSxcbiAgICAgIHZhbHVlU3VwcGxlbWVudHM6IFtdLFxuICAgIH07XG5cbiAgICBzb3VyY2U/LnByaWNlU3VwcGxlbWVudHM/LmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICB0aGlzLmNvbnZlcnRWYWx1ZVN1cHBsZW1lbnQodmFsdWUsIGF0dHJpYnV0ZVN1cHBsZW1lbnQ/LnZhbHVlU3VwcGxlbWVudHMpO1xuICAgIH0pO1xuICAgIHByaWNlU3VwcGxlbWVudHMucHVzaChhdHRyaWJ1dGVTdXBwbGVtZW50KTtcbiAgfVxuXG4gIGNvbnZlcnRWYWx1ZVN1cHBsZW1lbnQoXG4gICAgc291cmNlOiBPY2NDb25maWd1cmF0b3IuVmFsdWVTdXBwbGVtZW50cyxcbiAgICB2YWx1ZVN1cHBsZW1lbnRzOiBDb25maWd1cmF0b3IuVmFsdWVTdXBwbGVtZW50W11cbiAgKSB7XG4gICAgY29uc3QgdmFsdWVTdXBwbGVtZW50OiBDb25maWd1cmF0b3IuVmFsdWVTdXBwbGVtZW50ID0ge1xuICAgICAgYXR0cmlidXRlVmFsdWVLZXk6IHNvdXJjZT8uYXR0cmlidXRlVmFsdWVLZXksXG4gICAgICBwcmljZVZhbHVlOiBzb3VyY2U/LnByaWNlVmFsdWUsXG4gICAgICBvYnNvbGV0ZVByaWNlVmFsdWU6IHNvdXJjZT8ub2Jzb2xldGVQcmljZVZhbHVlLFxuICAgIH07XG4gICAgdmFsdWVTdXBwbGVtZW50cy5wdXNoKHZhbHVlU3VwcGxlbWVudCk7XG4gIH1cbn1cbiJdfQ==