/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorVariantUpdateCartEntrySerializer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.configuration.productCode },
            entryNumber: source.cartEntryNumber,
            configId: source.configuration.configId,
            configurationInfos: [{ configuratorType: "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */ }],
        };
        return resultTarget;
    }
}
OccConfiguratorVariantUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXVwZGF0ZS1jYXJ0LWVudHJ5LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LXVwZGF0ZS1jYXJ0LWVudHJ5LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNDLE1BQU0sT0FBTywrQ0FBK0M7SUFPMUQsT0FBTyxDQUNMLE1BQThELEVBQzlELE1BQWtFO1FBRWxFLE1BQU0sWUFBWSxHQUNoQjtZQUNFLEdBQUcsTUFBTTtZQUNULE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFO1lBQ25ELFdBQVcsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRO1lBQ3ZDLGtCQUFrQixFQUFFLENBQUMsRUFBRSxnQkFBZ0Isa0RBQTBCLEVBQUUsQ0FBQztTQUNyRSxDQUFDO1FBRUosT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQzs7NElBdkJVLCtDQUErQztnSkFBL0MsK0NBQStDLGNBRGxDLE1BQU07MkZBQ25CLCtDQUErQztrQkFEM0QsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb252ZXJ0ZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVHlwZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7IE9jY0NvbmZpZ3VyYXRvciB9IGZyb20gJy4uL3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5tb2RlbHMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yIH0gZnJvbSAnLi8uLi8uLi8uLi9jb3JlL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yVmFyaWFudFVwZGF0ZUNhcnRFbnRyeVNlcmlhbGl6ZXJcbiAgaW1wbGVtZW50c1xuICAgIENvbnZlcnRlcjxcbiAgICAgIENvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVycyxcbiAgICAgIE9jY0NvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVyc1xuICAgID5cbntcbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVycyxcbiAgICB0YXJnZXQ/OiBPY2NDb25maWd1cmF0b3IuVXBkYXRlQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeVBhcmFtZXRlcnNcbiAgKTogT2NjQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzIHtcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IE9jY0NvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVycyA9XG4gICAgICB7XG4gICAgICAgIC4uLnRhcmdldCxcbiAgICAgICAgdXNlcklkOiBzb3VyY2UudXNlcklkLFxuICAgICAgICBjYXJ0SWQ6IHNvdXJjZS5jYXJ0SWQsXG4gICAgICAgIHByb2R1Y3Q6IHsgY29kZTogc291cmNlLmNvbmZpZ3VyYXRpb24ucHJvZHVjdENvZGUgfSxcbiAgICAgICAgZW50cnlOdW1iZXI6IHNvdXJjZS5jYXJ0RW50cnlOdW1iZXIsXG4gICAgICAgIGNvbmZpZ0lkOiBzb3VyY2UuY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgICAgY29uZmlndXJhdGlvbkluZm9zOiBbeyBjb25maWd1cmF0b3JUeXBlOiBDb25maWd1cmF0b3JUeXBlLlZBUklBTlQgfV0sXG4gICAgICB9O1xuXG4gICAgcmV0dXJuIHJlc3VsdFRhcmdldDtcbiAgfVxufVxuIl19