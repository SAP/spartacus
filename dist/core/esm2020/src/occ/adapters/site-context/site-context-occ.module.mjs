/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '../../../config/config-providers';
import { BASE_SITE_NORMALIZER } from '../../../site-context/connectors/converters';
import { SiteAdapter } from '../../../site-context/connectors/site.adapter';
import { BaseSiteNormalizer } from './converters/base-site-normalizer';
import { defaultOccSiteContextConfig } from './default-occ-site-context-config';
import { OccSiteAdapter } from './occ-site.adapter';
import { SiteContextInterceptor } from './site-context.interceptor';
import * as i0 from "@angular/core";
export class SiteContextOccModule {
}
SiteContextOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SiteContextOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SiteContextOccModule, imports: [CommonModule] });
SiteContextOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextOccModule, providers: [
        provideDefaultConfig(defaultOccSiteContextConfig),
        {
            provide: SiteAdapter,
            useClass: OccSiteAdapter,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: SiteContextInterceptor,
            multi: true,
        },
        {
            provide: BASE_SITE_NORMALIZER,
            useExisting: BaseSiteNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccSiteContextConfig),
                        {
                            provide: SiteAdapter,
                            useClass: OccSiteAdapter,
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: SiteContextInterceptor,
                            multi: true,
                        },
                        {
                            provide: BASE_SITE_NORMALIZER,
                            useExisting: BaseSiteNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvc2l0ZS1jb250ZXh0L3NpdGUtY29udGV4dC1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuRixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDaEYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQXNCcEUsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CLFlBbkJyQixZQUFZO2tIQW1CWCxvQkFBb0IsYUFsQnBCO1FBQ1Qsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7UUFDakQ7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsY0FBYztTQUN6QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsV0FBVyxFQUFFLGtCQUFrQjtZQUMvQixLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFqQlMsWUFBWTsyRkFtQlgsb0JBQW9CO2tCQXBCaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQywyQkFBMkIsQ0FBQzt3QkFDakQ7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFFBQVEsRUFBRSxjQUFjO3lCQUN6Qjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsc0JBQXNCOzRCQUNuQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixXQUFXLEVBQUUsa0JBQWtCOzRCQUMvQixLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZy9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IEJBU0VfU0lURV9OT1JNQUxJWkVSIH0gZnJvbSAnLi4vLi4vLi4vc2l0ZS1jb250ZXh0L2Nvbm5lY3RvcnMvY29udmVydGVycyc7XG5pbXBvcnQgeyBTaXRlQWRhcHRlciB9IGZyb20gJy4uLy4uLy4uL3NpdGUtY29udGV4dC9jb25uZWN0b3JzL3NpdGUuYWRhcHRlcic7XG5pbXBvcnQgeyBCYXNlU2l0ZU5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvYmFzZS1zaXRlLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgZGVmYXVsdE9jY1NpdGVDb250ZXh0Q29uZmlnIH0gZnJvbSAnLi9kZWZhdWx0LW9jYy1zaXRlLWNvbnRleHQtY29uZmlnJztcbmltcG9ydCB7IE9jY1NpdGVBZGFwdGVyIH0gZnJvbSAnLi9vY2Mtc2l0ZS5hZGFwdGVyJztcbmltcG9ydCB7IFNpdGVDb250ZXh0SW50ZXJjZXB0b3IgfSBmcm9tICcuL3NpdGUtY29udGV4dC5pbnRlcmNlcHRvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjU2l0ZUNvbnRleHRDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNpdGVBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1NpdGVBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VFeGlzdGluZzogU2l0ZUNvbnRleHRJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQkFTRV9TSVRFX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogQmFzZVNpdGVOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2l0ZUNvbnRleHRPY2NNb2R1bGUge31cbiJdfQ==