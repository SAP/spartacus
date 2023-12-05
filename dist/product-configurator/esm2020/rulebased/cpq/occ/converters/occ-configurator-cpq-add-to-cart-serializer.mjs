/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorCpqAddToCartSerializer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.productCode },
            quantity: source.quantity,
            configId: source.configId,
        };
        return resultTarget;
    }
}
OccConfiguratorCpqAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorCpqAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci1jcHEtYWRkLXRvLWNhcnQtc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL29jYy9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItY3BxLWFkZC10by1jYXJ0LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxxQ0FBcUM7SUFPaEQsT0FBTyxDQUNMLE1BQXdDLEVBQ3hDLE1BQStDO1FBRS9DLE1BQU0sWUFBWSxHQUEyQztZQUMzRCxHQUFHLE1BQU07WUFDVCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3JDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDMUIsQ0FBQztRQUVGLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7O2tJQXJCVSxxQ0FBcUM7c0lBQXJDLHFDQUFxQyxjQUR4QixNQUFNOzJGQUNuQixxQ0FBcUM7a0JBRGpELFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkJztcbmltcG9ydCB7IE9jY0NwcUNvbmZpZ3VyYXRvciB9IGZyb20gJy4uL2NwcS1jb25maWd1cmF0b3Itb2NjLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yQ3BxQWRkVG9DYXJ0U2VyaWFsaXplclxuICBpbXBsZW1lbnRzXG4gICAgQ29udmVydGVyPFxuICAgICAgQ29uZmlndXJhdG9yLkFkZFRvQ2FydFBhcmFtZXRlcnMsXG4gICAgICBPY2NDcHFDb25maWd1cmF0b3IuQWRkVG9DYXJ0UGFyYW1ldGVyc1xuICAgID5cbntcbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzLFxuICAgIHRhcmdldD86IE9jY0NwcUNvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzXG4gICk6IE9jY0NwcUNvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzIHtcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IE9jY0NwcUNvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgdXNlcklkOiBzb3VyY2UudXNlcklkLFxuICAgICAgY2FydElkOiBzb3VyY2UuY2FydElkLFxuICAgICAgcHJvZHVjdDogeyBjb2RlOiBzb3VyY2UucHJvZHVjdENvZGUgfSxcbiAgICAgIHF1YW50aXR5OiBzb3VyY2UucXVhbnRpdHksXG4gICAgICBjb25maWdJZDogc291cmNlLmNvbmZpZ0lkLFxuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG59XG4iXX0=