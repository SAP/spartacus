/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultConfiguratorCoreConfig } from './config/default-configurator-core.config';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorRouterModule } from './facade/routing/configurator-router.module';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';
import * as i0 from "@angular/core";
import * as i1 from "./events/configurator-logout-event.listener";
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
export class RulebasedConfiguratorCoreModule {
    constructor(_configuratorLogoutEventListener) {
        // Intentional empty constructor
    }
}
RulebasedConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, deps: [{ token: i1.ConfiguratorLogoutEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
RulebasedConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, providers: [
        RulebasedConfiguratorConnector,
        provideDefaultConfig(defaultConfiguratorCoreConfig),
    ], imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule],
                    providers: [
                        RulebasedConfiguratorConnector,
                        provideDefaultConfig(defaultConfiguratorCoreConfig),
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorLogoutEventListener }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29yZS9ydWxlYmFzZWQtY29uZmlndXJhdG9yLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7QUFHL0Y7OztHQUdHO0FBUUgsTUFBTSxPQUFPLCtCQUErQjtJQUMxQyxZQUNFLGdDQUFpRTtRQUVqRSxnQ0FBZ0M7SUFDbEMsQ0FBQzs7NEhBTFUsK0JBQStCOzZIQUEvQiwrQkFBK0IsWUFOaEMsZ0NBQWdDLEVBQUUsd0JBQXdCOzZIQU16RCwrQkFBK0IsYUFML0I7UUFDVCw4QkFBOEI7UUFDOUIsb0JBQW9CLENBQUMsNkJBQTZCLENBQUM7S0FDcEQsWUFKUyxnQ0FBZ0MsRUFBRSx3QkFBd0I7MkZBTXpELCtCQUErQjtrQkFQM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSx3QkFBd0IsQ0FBQztvQkFDckUsU0FBUyxFQUFFO3dCQUNULDhCQUE4Qjt3QkFDOUIsb0JBQW9CLENBQUMsNkJBQTZCLENBQUM7cUJBQ3BEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRDb25maWd1cmF0b3JDb3JlQ29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1jb25maWd1cmF0b3ItY29yZS5jb25maWcnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3J1bGViYXNlZC1jb25maWd1cmF0b3IuY29ubmVjdG9yJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclJvdXRlck1vZHVsZSB9IGZyb20gJy4vZmFjYWRlL3JvdXRpbmcvY29uZmlndXJhdG9yLXJvdXRlci5tb2R1bGUnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yU3RhdGVNb2R1bGUgfSBmcm9tICcuL3N0YXRlL3J1bGViYXNlZC1jb25maWd1cmF0b3Itc3RhdGUubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckxvZ291dEV2ZW50TGlzdGVuZXIgfSBmcm9tICcuL2V2ZW50cy9jb25maWd1cmF0b3ItbG9nb3V0LWV2ZW50Lmxpc3RlbmVyJztcblxuLyoqXG4gKiBFeHBvc2VzIHRoZSBydWxlYmFzZWQgY29uZmlndXJhdG9yIGNvcmUgZW50aXRpZXMuXG4gKiBFeHBsaWNpdCBwcm92aWRpbmcgb2YgY29ubmVjdG9yIGJlY2F1c2Ugb3RoZXJ3aXNlIGxhenkgbG9hZGluZyBkb2VzIG5vdCB3b3JrXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtSdWxlYmFzZWRDb25maWd1cmF0b3JTdGF0ZU1vZHVsZSwgQ29uZmlndXJhdG9yUm91dGVyTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDb25maWd1cmF0b3JDb3JlQ29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29yZU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIF9jb25maWd1cmF0b3JMb2dvdXRFdmVudExpc3RlbmVyOiBDb25maWd1cmF0b3JMb2dvdXRFdmVudExpc3RlbmVyXG4gICkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cbn1cbiJdfQ==