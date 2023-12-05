/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSeoConfig } from './config';
import { htmlLangProvider } from './html-lang-provider';
import { SeoMetaService } from './seo-meta.service';
import { StructuredDataModule } from './structured-data/structured-data.module';
import * as i0 from "@angular/core";
export function initSeoService(injector) {
    const result = () => {
        const service = injector.get(SeoMetaService);
        service.init();
    };
    return result;
}
export class SeoModule {
}
SeoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SeoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SeoModule, imports: [StructuredDataModule] });
SeoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoModule, providers: [
        provideDefaultConfig(defaultSeoConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: initSeoService,
            deps: [Injector],
            multi: true,
        },
        htmlLangProvider,
    ], imports: [StructuredDataModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StructuredDataModule],
                    providers: [
                        provideDefaultConfig(defaultSeoConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: initSeoService,
                            deps: [Injector],
                            multi: true,
                        },
                        htmlLangProvider,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vc2VvLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBRWhGLE1BQU0sVUFBVSxjQUFjLENBQUMsUUFBa0I7SUFDL0MsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFlRCxNQUFNLE9BQU8sU0FBUzs7c0dBQVQsU0FBUzt1R0FBVCxTQUFTLFlBWlYsb0JBQW9CO3VHQVluQixTQUFTLGFBWFQ7UUFDVCxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN0QztZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNoQixLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0QsZ0JBQWdCO0tBQ2pCLFlBVlMsb0JBQW9COzJGQVluQixTQUFTO2tCQWJyQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO29CQUMvQixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUM7d0JBQ3RDOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixVQUFVLEVBQUUsY0FBYzs0QkFDMUIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUNoQixLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRCxnQkFBZ0I7cUJBQ2pCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBJbmplY3RvciwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRTZW9Db25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBodG1sTGFuZ1Byb3ZpZGVyIH0gZnJvbSAnLi9odG1sLWxhbmctcHJvdmlkZXInO1xuaW1wb3J0IHsgU2VvTWV0YVNlcnZpY2UgfSBmcm9tICcuL3Nlby1tZXRhLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RydWN0dXJlZERhdGFNb2R1bGUgfSBmcm9tICcuL3N0cnVjdHVyZWQtZGF0YS9zdHJ1Y3R1cmVkLWRhdGEubW9kdWxlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRTZW9TZXJ2aWNlKGluamVjdG9yOiBJbmplY3Rvcik6ICgpID0+IHZvaWQge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VydmljZSA9IGluamVjdG9yLmdldChTZW9NZXRhU2VydmljZSk7XG4gICAgc2VydmljZS5pbml0KCk7XG4gIH07XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtTdHJ1Y3R1cmVkRGF0YU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRTZW9Db25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IGluaXRTZW9TZXJ2aWNlLFxuICAgICAgZGVwczogW0luamVjdG9yXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgaHRtbExhbmdQcm92aWRlcixcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2VvTW9kdWxlIHt9XG4iXX0=