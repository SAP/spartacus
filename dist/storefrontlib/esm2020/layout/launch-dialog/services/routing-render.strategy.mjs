/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class RoutingRenderStrategy extends LaunchRenderStrategy {
    constructor(document, rendererFactory, routingService) {
        super(document, rendererFactory);
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.routingService = routingService;
    }
    /**
     * Navigates to the route configured for the caller
     */
    render(config, _caller) {
        this.routingService.go(config);
    }
    hasMatch(config) {
        return Boolean(config.cxRoute);
    }
}
RoutingRenderStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingRenderStrategy, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingRenderStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingRenderStrategy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingRenderStrategy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1yZW5kZXIuc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9sYXVuY2gtZGlhbG9nL3NlcnZpY2VzL3JvdXRpbmctcmVuZGVyLnN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBR3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7QUFHaEUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLG9CQUFvQjtJQUM3RCxZQUM4QixRQUFhLEVBQy9CLGVBQWlDLEVBQ2pDLGNBQThCO1FBRXhDLEtBQUssQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFKTCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFHMUMsQ0FBQztJQUNEOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE1BQW1CLEVBQUUsT0FBK0I7UUFDekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFtQjtRQUMxQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7a0hBakJVLHFCQUFxQixrQkFFdEIsUUFBUTtzSEFGUCxxQkFBcUIsY0FEUixNQUFNOzJGQUNuQixxQkFBcUI7a0JBRGpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFHN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlckZhY3RvcnkyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hSb3V0ZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJy4uL2NvbmZpZy9pbmRleCc7XG5pbXBvcnQgeyBMYXVuY2hSZW5kZXJTdHJhdGVneSB9IGZyb20gJy4vbGF1bmNoLXJlbmRlci5zdHJhdGVneSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUm91dGluZ1JlbmRlclN0cmF0ZWd5IGV4dGVuZHMgTGF1bmNoUmVuZGVyU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIHJlbmRlcmVyRmFjdG9yeSk7XG4gIH1cbiAgLyoqXG4gICAqIE5hdmlnYXRlcyB0byB0aGUgcm91dGUgY29uZmlndXJlZCBmb3IgdGhlIGNhbGxlclxuICAgKi9cbiAgcmVuZGVyKGNvbmZpZzogTGF1bmNoUm91dGUsIF9jYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcpIHtcbiAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKGNvbmZpZyk7XG4gIH1cblxuICBoYXNNYXRjaChjb25maWc6IExhdW5jaFJvdXRlKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oY29uZmlnLmN4Um91dGUpO1xuICB9XG59XG4iXX0=