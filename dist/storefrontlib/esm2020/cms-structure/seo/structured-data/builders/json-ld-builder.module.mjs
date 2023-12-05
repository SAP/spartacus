/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { BreadcrumbSchemaBuilder } from './breadcrumb/index';
import { JsonLdBaseProductBuilder, JsonLdProductOfferBuilder, JsonLdProductReviewBuilder, ProductSchemaBuilder, } from './product/index';
import { JSONLD_PRODUCT_BUILDER, SCHEMA_BUILDER } from './tokens';
import * as i0 from "@angular/core";
/**
 * Provides several standard json-ld builders that contribute
 * to collecting and building json-ld data.
 */
export class JsonLdBuilderModule {
}
JsonLdBuilderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBuilderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
JsonLdBuilderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBuilderModule });
JsonLdBuilderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBuilderModule, providers: [
        {
            provide: SCHEMA_BUILDER,
            useExisting: ProductSchemaBuilder,
            multi: true,
        },
        {
            provide: SCHEMA_BUILDER,
            useExisting: BreadcrumbSchemaBuilder,
            multi: true,
        },
        // lower level json-ld builder classes offering fine-grained control
        // for product related schemas
        {
            provide: JSONLD_PRODUCT_BUILDER,
            useExisting: JsonLdBaseProductBuilder,
            multi: true,
        },
        {
            provide: JSONLD_PRODUCT_BUILDER,
            useExisting: JsonLdProductOfferBuilder,
            multi: true,
        },
        {
            provide: JSONLD_PRODUCT_BUILDER,
            useExisting: JsonLdProductReviewBuilder,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdBuilderModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            provide: SCHEMA_BUILDER,
                            useExisting: ProductSchemaBuilder,
                            multi: true,
                        },
                        {
                            provide: SCHEMA_BUILDER,
                            useExisting: BreadcrumbSchemaBuilder,
                            multi: true,
                        },
                        // lower level json-ld builder classes offering fine-grained control
                        // for product related schemas
                        {
                            provide: JSONLD_PRODUCT_BUILDER,
                            useExisting: JsonLdBaseProductBuilder,
                            multi: true,
                        },
                        {
                            provide: JSONLD_PRODUCT_BUILDER,
                            useExisting: JsonLdProductOfferBuilder,
                            multi: true,
                        },
                        {
                            provide: JSONLD_PRODUCT_BUILDER,
                            useExisting: JsonLdProductReviewBuilder,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sZC1idWlsZGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vc3RydWN0dXJlZC1kYXRhL2J1aWxkZXJzL2pzb24tbGQtYnVpbGRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDN0QsT0FBTyxFQUNMLHdCQUF3QixFQUN4Qix5QkFBeUIsRUFDekIsMEJBQTBCLEVBQzFCLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7O0FBRWxFOzs7R0FHRztBQWdDSCxNQUFNLE9BQU8sbUJBQW1COztnSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixhQTlCbkI7UUFDVDtZQUNFLE9BQU8sRUFBRSxjQUFjO1lBQ3ZCLFdBQVcsRUFBRSxvQkFBb0I7WUFDakMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGNBQWM7WUFDdkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Qsb0VBQW9FO1FBQ3BFLDhCQUE4QjtRQUM5QjtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRjsyRkFFVSxtQkFBbUI7a0JBL0IvQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsY0FBYzs0QkFDdkIsV0FBVyxFQUFFLG9CQUFvQjs0QkFDakMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGNBQWM7NEJBQ3ZCLFdBQVcsRUFBRSx1QkFBdUI7NEJBQ3BDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNELG9FQUFvRTt3QkFDcEUsOEJBQThCO3dCQUM5Qjs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixXQUFXLEVBQUUsd0JBQXdCOzRCQUNyQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixXQUFXLEVBQUUseUJBQXlCOzRCQUN0QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixXQUFXLEVBQUUsMEJBQTBCOzRCQUN2QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iU2NoZW1hQnVpbGRlciB9IGZyb20gJy4vYnJlYWRjcnVtYi9pbmRleCc7XG5pbXBvcnQge1xuICBKc29uTGRCYXNlUHJvZHVjdEJ1aWxkZXIsXG4gIEpzb25MZFByb2R1Y3RPZmZlckJ1aWxkZXIsXG4gIEpzb25MZFByb2R1Y3RSZXZpZXdCdWlsZGVyLFxuICBQcm9kdWN0U2NoZW1hQnVpbGRlcixcbn0gZnJvbSAnLi9wcm9kdWN0L2luZGV4JztcbmltcG9ydCB7IEpTT05MRF9QUk9EVUNUX0JVSUxERVIsIFNDSEVNQV9CVUlMREVSIH0gZnJvbSAnLi90b2tlbnMnO1xuXG4vKipcbiAqIFByb3ZpZGVzIHNldmVyYWwgc3RhbmRhcmQganNvbi1sZCBidWlsZGVycyB0aGF0IGNvbnRyaWJ1dGVcbiAqIHRvIGNvbGxlY3RpbmcgYW5kIGJ1aWxkaW5nIGpzb24tbGQgZGF0YS5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogU0NIRU1BX0JVSUxERVIsXG4gICAgICB1c2VFeGlzdGluZzogUHJvZHVjdFNjaGVtYUJ1aWxkZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNDSEVNQV9CVUlMREVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IEJyZWFkY3J1bWJTY2hlbWFCdWlsZGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICAvLyBsb3dlciBsZXZlbCBqc29uLWxkIGJ1aWxkZXIgY2xhc3NlcyBvZmZlcmluZyBmaW5lLWdyYWluZWQgY29udHJvbFxuICAgIC8vIGZvciBwcm9kdWN0IHJlbGF0ZWQgc2NoZW1hc1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEpTT05MRF9QUk9EVUNUX0JVSUxERVIsXG4gICAgICB1c2VFeGlzdGluZzogSnNvbkxkQmFzZVByb2R1Y3RCdWlsZGVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBKU09OTERfUFJPRFVDVF9CVUlMREVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IEpzb25MZFByb2R1Y3RPZmZlckJ1aWxkZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEpTT05MRF9QUk9EVUNUX0JVSUxERVIsXG4gICAgICB1c2VFeGlzdGluZzogSnNvbkxkUHJvZHVjdFJldmlld0J1aWxkZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBKc29uTGRCdWlsZGVyTW9kdWxlIHt9XG4iXX0=