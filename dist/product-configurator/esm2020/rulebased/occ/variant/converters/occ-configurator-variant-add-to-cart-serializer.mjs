/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class OccConfiguratorVariantAddToCartSerializer {
    constructor() {
        // Intentional empty constructor
    }
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
OccConfiguratorVariantAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LWFkZC10by1jYXJ0LXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL29jYy92YXJpYW50L2NvbnZlcnRlcnMvb2NjLWNvbmZpZ3VyYXRvci12YXJpYW50LWFkZC10by1jYXJ0LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyx5Q0FBeUM7SUFPcEQ7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FDTCxNQUF3QyxFQUN4QyxNQUE0QztRQUU1QyxNQUFNLFlBQVksR0FBd0M7WUFDeEQsR0FBRyxNQUFNO1lBQ1QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtZQUNyQixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1NBQzFCLENBQUM7UUFFRixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDOztzSUF6QlUseUNBQXlDOzBJQUF6Qyx5Q0FBeUMsY0FENUIsTUFBTTsyRkFDbkIseUNBQXlDO2tCQURyRCxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnZlcnRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPY2NDb25maWd1cmF0b3IgfSBmcm9tICcuLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vY2MubW9kZWxzJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4vLi4vLi4vLi4vY29yZS9tb2RlbC9jb25maWd1cmF0b3IubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIE9jY0NvbmZpZ3VyYXRvclZhcmlhbnRBZGRUb0NhcnRTZXJpYWxpemVyXG4gIGltcGxlbWVudHNcbiAgICBDb252ZXJ0ZXI8XG4gICAgICBDb25maWd1cmF0b3IuQWRkVG9DYXJ0UGFyYW1ldGVycyxcbiAgICAgIE9jY0NvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzXG4gICAgPlxue1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgY29udmVydChcbiAgICBzb3VyY2U6IENvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzLFxuICAgIHRhcmdldD86IE9jY0NvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzXG4gICk6IE9jY0NvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzIHtcbiAgICBjb25zdCByZXN1bHRUYXJnZXQ6IE9jY0NvbmZpZ3VyYXRvci5BZGRUb0NhcnRQYXJhbWV0ZXJzID0ge1xuICAgICAgLi4udGFyZ2V0LFxuICAgICAgdXNlcklkOiBzb3VyY2UudXNlcklkLFxuICAgICAgY2FydElkOiBzb3VyY2UuY2FydElkLFxuICAgICAgcHJvZHVjdDogeyBjb2RlOiBzb3VyY2UucHJvZHVjdENvZGUgfSxcbiAgICAgIHF1YW50aXR5OiBzb3VyY2UucXVhbnRpdHksXG4gICAgICBjb25maWdJZDogc291cmNlLmNvbmZpZ0lkLFxuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0VGFyZ2V0O1xuICB9XG59XG4iXX0=