/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BASE_SITE_CONTEXT_ID } from '../../../site-context/providers/context-ids';
import * as i0 from "@angular/core";
import * as i1 from "../../../site-context/facade/base-site.service";
import * as i2 from "../../../config/config-initializer/config-initializer.service";
export class SecurePortalConfigInitializer {
    constructor(baseSiteService, configInit) {
        this.baseSiteService = baseSiteService;
        this.configInit = configInit;
        this.scopes = ['routing'];
        this.configFactory = () => this.resolveConfig().toPromise();
    }
    /**
     * Emits the Routing config basing on the current base site data.
     *
     * Completes after emitting the value.
     */
    resolveConfig() {
        return this.configInit.getStable('context').pipe(switchMap((config) => {
            const siteUid = config?.context?.[BASE_SITE_CONTEXT_ID]?.[0];
            return this.baseSiteService.get(siteUid).pipe(tap((baseSite) => {
                if (!baseSite) {
                    throw new Error(`Error: Cannot get base site config for ${siteUid}.`);
                }
            }), map((baseSite) => this.getRoutingConfig(baseSite)), take(1));
        }));
    }
    getRoutingConfig(source) {
        const result = {
            routing: {
                protected: source?.requiresAuthentication,
            },
        };
        return result;
    }
}
SecurePortalConfigInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SecurePortalConfigInitializer, deps: [{ token: i1.BaseSiteService }, { token: i2.ConfigInitializerService }], target: i0.ɵɵFactoryTarget.Injectable });
SecurePortalConfigInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SecurePortalConfigInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SecurePortalConfigInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }, { type: i2.ConfigInitializerService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLXBvcnRhbC1jb25maWctaW5pdGlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9yb3V0aW5nL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvc2VjdXJlLXBvcnRhbC1jb25maWcvc2VjdXJlLXBvcnRhbC1jb25maWctaW5pdGlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSzNELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBSW5GLE1BQU0sT0FBTyw2QkFBNkI7SUFJeEMsWUFDWSxlQUFnQyxFQUNoQyxVQUFvQztRQURwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFMdkMsV0FBTSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckIsa0JBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7SUFLN0QsQ0FBQztJQUVKOzs7O09BSUc7SUFDTyxhQUFhO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUM5QyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixNQUFNLE9BQU8sR0FBRyxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUMzQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNiLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLE9BQU8sR0FBRyxDQUNyRCxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDbEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLGdCQUFnQixDQUFDLE1BQTRCO1FBQ3JELE1BQU0sTUFBTSxHQUFHO1lBQ2IsT0FBTyxFQUFFO2dCQUNQLFNBQVMsRUFBRSxNQUFNLEVBQUUsc0JBQXNCO2FBQzFDO1NBQ0YsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OzBIQXhDVSw2QkFBNkI7OEhBQTdCLDZCQUE2QixjQURoQixNQUFNOzJGQUNuQiw2QkFBNkI7a0JBRHpDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXInO1xuaW1wb3J0IHsgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2NvbmZpZy1pbml0aWFsaXplci9jb25maWctaW5pdGlhbGl6ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBCYXNlU2l0ZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsL21pc2MubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVNpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2l0ZS1jb250ZXh0L2ZhY2FkZS9iYXNlLXNpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBCQVNFX1NJVEVfQ09OVEVYVF9JRCB9IGZyb20gJy4uLy4uLy4uL3NpdGUtY29udGV4dC9wcm92aWRlcnMvY29udGV4dC1pZHMnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9yb3V0aW5nLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgU2VjdXJlUG9ydGFsQ29uZmlnSW5pdGlhbGl6ZXIgaW1wbGVtZW50cyBDb25maWdJbml0aWFsaXplciB7XG4gIHJlYWRvbmx5IHNjb3BlcyA9IFsncm91dGluZyddO1xuICByZWFkb25seSBjb25maWdGYWN0b3J5ID0gKCkgPT4gdGhpcy5yZXNvbHZlQ29uZmlnKCkudG9Qcm9taXNlKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb25maWdJbml0OiBDb25maWdJbml0aWFsaXplclNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgUm91dGluZyBjb25maWcgYmFzaW5nIG9uIHRoZSBjdXJyZW50IGJhc2Ugc2l0ZSBkYXRhLlxuICAgKlxuICAgKiBDb21wbGV0ZXMgYWZ0ZXIgZW1pdHRpbmcgdGhlIHZhbHVlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlc29sdmVDb25maWcoKTogT2JzZXJ2YWJsZTxSb3V0aW5nQ29uZmlnPiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnSW5pdC5nZXRTdGFibGUoJ2NvbnRleHQnKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChjb25maWcpID0+IHtcbiAgICAgICAgY29uc3Qgc2l0ZVVpZCA9IGNvbmZpZz8uY29udGV4dD8uW0JBU0VfU0lURV9DT05URVhUX0lEXT8uWzBdO1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNlU2l0ZVNlcnZpY2UuZ2V0KHNpdGVVaWQpLnBpcGUoXG4gICAgICAgICAgdGFwKChiYXNlU2l0ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFiYXNlU2l0ZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYEVycm9yOiBDYW5ub3QgZ2V0IGJhc2Ugc2l0ZSBjb25maWcgZm9yICR7c2l0ZVVpZH0uYFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG1hcCgoYmFzZVNpdGUpID0+IHRoaXMuZ2V0Um91dGluZ0NvbmZpZyhiYXNlU2l0ZSkpLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSb3V0aW5nQ29uZmlnKHNvdXJjZTogQmFzZVNpdGUgfCB1bmRlZmluZWQpOiBSb3V0aW5nQ29uZmlnIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICByb3V0aW5nOiB7XG4gICAgICAgIHByb3RlY3RlZDogc291cmNlPy5yZXF1aXJlc0F1dGhlbnRpY2F0aW9uLFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cbiJdfQ==