/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorCpqUpdateCartEntrySerializer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            entryNumber: source.cartEntryNumber,
            configId: source.configuration.configId,
        };
        return resultTarget;
    }
}
OccConfiguratorCpqUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorCpqUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorCpqUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci1jcHEtdXBkYXRlLWNhcnQtZW50cnktc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY3BxL29jYy9jb252ZXJ0ZXJzL29jYy1jb25maWd1cmF0b3ItY3BxLXVwZGF0ZS1jYXJ0LWVudHJ5LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTywyQ0FBMkM7SUFPdEQsT0FBTyxDQUNMLE1BQThELEVBQzlELE1BQXFFO1FBRXJFLE1BQU0sWUFBWSxHQUNoQjtZQUNFLEdBQUcsTUFBTTtZQUNULE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ25DLFFBQVEsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVE7U0FDeEMsQ0FBQztRQUVKLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7O3dJQXJCVSwyQ0FBMkM7NElBQTNDLDJDQUEyQyxjQUQ5QixNQUFNOzJGQUNuQiwyQ0FBMkM7a0JBRHZELFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkJztcbmltcG9ydCB7IE9jY0NwcUNvbmZpZ3VyYXRvciB9IGZyb20gJy4uL2NwcS1jb25maWd1cmF0b3Itb2NjLm1vZGVscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjQ29uZmlndXJhdG9yQ3BxVXBkYXRlQ2FydEVudHJ5U2VyaWFsaXplclxuICBpbXBsZW1lbnRzXG4gICAgQ29udmVydGVyPFxuICAgICAgQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzLFxuICAgICAgT2NjQ3BxQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzXG4gICAgPlxue1xuICBjb252ZXJ0KFxuICAgIHNvdXJjZTogQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzLFxuICAgIHRhcmdldD86IE9jY0NwcUNvbmZpZ3VyYXRvci5VcGRhdGVDb25maWd1cmF0aW9uRm9yQ2FydEVudHJ5UGFyYW1ldGVyc1xuICApOiBPY2NDcHFDb25maWd1cmF0b3IuVXBkYXRlQ29uZmlndXJhdGlvbkZvckNhcnRFbnRyeVBhcmFtZXRlcnMge1xuICAgIGNvbnN0IHJlc3VsdFRhcmdldDogT2NjQ3BxQ29uZmlndXJhdG9yLlVwZGF0ZUNvbmZpZ3VyYXRpb25Gb3JDYXJ0RW50cnlQYXJhbWV0ZXJzID1cbiAgICAgIHtcbiAgICAgICAgLi4udGFyZ2V0LFxuICAgICAgICB1c2VySWQ6IHNvdXJjZS51c2VySWQsXG4gICAgICAgIGNhcnRJZDogc291cmNlLmNhcnRJZCxcbiAgICAgICAgZW50cnlOdW1iZXI6IHNvdXJjZS5jYXJ0RW50cnlOdW1iZXIsXG4gICAgICAgIGNvbmZpZ0lkOiBzb3VyY2UuY29uZmlndXJhdGlvbi5jb25maWdJZCxcbiAgICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG59XG4iXX0=