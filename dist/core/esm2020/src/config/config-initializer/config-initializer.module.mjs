/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LOCATION_INITIALIZED } from '@angular/common';
import { APP_INITIALIZER, NgModule, Optional, } from '@angular/core';
import { CONFIG_INITIALIZER, CONFIG_INITIALIZER_FORROOT_GUARD, } from './config-initializer';
import { ConfigInitializerService } from './config-initializer.service';
import * as i0 from "@angular/core";
export function configInitializerFactory(configInitializer, initializers) {
    const isReady = () => configInitializer.initialize(initializers);
    return isReady;
}
export function locationInitializedFactory(configInitializer) {
    return configInitializer.getStable().toPromise();
}
export class ConfigInitializerModule {
    static forRoot() {
        return {
            ngModule: ConfigInitializerModule,
            providers: [
                {
                    provide: CONFIG_INITIALIZER_FORROOT_GUARD,
                    useValue: true,
                },
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    useFactory: configInitializerFactory,
                    deps: [
                        ConfigInitializerService,
                        [new Optional(), CONFIG_INITIALIZER],
                    ],
                },
                {
                    // Hold on the initial navigation until the Spartacus configuration is stable
                    provide: LOCATION_INITIALIZED,
                    useFactory: locationInitializedFactory,
                    deps: [ConfigInitializerService],
                },
            ],
        };
    }
}
ConfigInitializerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigInitializerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerModule });
ConfigInitializerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigInitializerModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWluaXRpYWxpemVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWctaW5pdGlhbGl6ZXIvY29uZmlnLWluaXRpYWxpemVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUNMLGVBQWUsRUFFZixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFFTCxrQkFBa0IsRUFDbEIsZ0NBQWdDLEdBQ2pDLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7O0FBRXhFLE1BQU0sVUFBVSx3QkFBd0IsQ0FDdEMsaUJBQTJDLEVBQzNDLFlBQWlDO0lBRWpDLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUN4QyxpQkFBMkM7SUFFM0MsT0FBTyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBR0QsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZ0NBQWdDO29CQUN6QyxRQUFRLEVBQUUsSUFBSTtpQkFDZjtnQkFDRDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsVUFBVSxFQUFFLHdCQUF3QjtvQkFDcEMsSUFBSSxFQUFFO3dCQUNKLHdCQUF3Qjt3QkFDeEIsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGtCQUFrQixDQUFDO3FCQUNyQztpQkFDRjtnQkFDRDtvQkFDRSw2RUFBNkU7b0JBQzdFLE9BQU8sRUFBRSxvQkFBb0I7b0JBQzdCLFVBQVUsRUFBRSwwQkFBMEI7b0JBQ3RDLElBQUksRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNqQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O29IQTFCVSx1QkFBdUI7cUhBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBRG5DLFFBQVE7bUJBQUMsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IExPQ0FUSU9OX0lOSVRJQUxJWkVEIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFQUF9JTklUSUFMSVpFUixcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy10b2tlbnMnO1xuaW1wb3J0IHtcbiAgQ29uZmlnSW5pdGlhbGl6ZXIsXG4gIENPTkZJR19JTklUSUFMSVpFUixcbiAgQ09ORklHX0lOSVRJQUxJWkVSX0ZPUlJPT1RfR1VBUkQsXG59IGZyb20gJy4vY29uZmlnLWluaXRpYWxpemVyJztcbmltcG9ydCB7IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSB9IGZyb20gJy4vY29uZmlnLWluaXRpYWxpemVyLnNlcnZpY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnSW5pdGlhbGl6ZXJGYWN0b3J5KFxuICBjb25maWdJbml0aWFsaXplcjogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBpbml0aWFsaXplcnM6IENvbmZpZ0luaXRpYWxpemVyW11cbik6ICgpID0+IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpc1JlYWR5ID0gKCkgPT4gY29uZmlnSW5pdGlhbGl6ZXIuaW5pdGlhbGl6ZShpbml0aWFsaXplcnMpO1xuICByZXR1cm4gaXNSZWFkeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0aW9uSW5pdGlhbGl6ZWRGYWN0b3J5KFxuICBjb25maWdJbml0aWFsaXplcjogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4pOiBQcm9taXNlPENvbmZpZz4ge1xuICByZXR1cm4gY29uZmlnSW5pdGlhbGl6ZXIuZ2V0U3RhYmxlKCkudG9Qcm9taXNlKCk7XG59XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBDb25maWdJbml0aWFsaXplck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnSW5pdGlhbGl6ZXJNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENvbmZpZ0luaXRpYWxpemVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDT05GSUdfSU5JVElBTElaRVJfRk9SUk9PVF9HVUFSRCxcbiAgICAgICAgICB1c2VWYWx1ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjb25maWdJbml0aWFsaXplckZhY3RvcnksXG4gICAgICAgICAgZGVwczogW1xuICAgICAgICAgICAgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICAgICAgICAgICAgW25ldyBPcHRpb25hbCgpLCBDT05GSUdfSU5JVElBTElaRVJdLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAvLyBIb2xkIG9uIHRoZSBpbml0aWFsIG5hdmlnYXRpb24gdW50aWwgdGhlIFNwYXJ0YWN1cyBjb25maWd1cmF0aW9uIGlzIHN0YWJsZVxuICAgICAgICAgIHByb3ZpZGU6IExPQ0FUSU9OX0lOSVRJQUxJWkVELFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IGxvY2F0aW9uSW5pdGlhbGl6ZWRGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtDb25maWdJbml0aWFsaXplclNlcnZpY2VdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=