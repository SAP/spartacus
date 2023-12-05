/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { JsonLdDirective } from './json-ld.directive';
import { StructuredDataFactory } from './structured-data.factory';
import * as i0 from "@angular/core";
/**
 * Factory to build the structure data
 * without any interaction with the UI.
 */
export function getStructuredDataFactory(injector) {
    const result = () => {
        const factory = injector.get(StructuredDataFactory);
        factory.build();
    };
    return result;
}
export class StructuredDataModule {
}
StructuredDataModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StructuredDataModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataModule, declarations: [JsonLdDirective], imports: [CommonModule], exports: [JsonLdDirective] });
StructuredDataModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataModule, providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: getStructuredDataFactory,
            deps: [Injector],
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StructuredDataModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [JsonLdDirective],
                    exports: [JsonLdDirective],
                    providers: [
                        {
                            provide: APP_INITIALIZER,
                            useFactory: getStructuredDataFactory,
                            deps: [Injector],
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RydWN0dXJlZC1kYXRhLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vc3RydWN0dXJlZC1kYXRhL3N0cnVjdHVyZWQtZGF0YS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUVsRTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBa0I7SUFDekQsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ2xCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQWVELE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixpQkFYaEIsZUFBZSxhQURwQixZQUFZLGFBRVosZUFBZTtrSEFVZCxvQkFBb0IsYUFUcEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSx3QkFBd0I7WUFDcEMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQVZTLFlBQVk7MkZBWVgsb0JBQW9CO2tCQWJoQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMvQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsVUFBVSxFQUFFLHdCQUF3Qjs0QkFDcEMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDOzRCQUNoQixLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIEluamVjdG9yLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSnNvbkxkRGlyZWN0aXZlIH0gZnJvbSAnLi9qc29uLWxkLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdHJ1Y3R1cmVkRGF0YUZhY3RvcnkgfSBmcm9tICcuL3N0cnVjdHVyZWQtZGF0YS5mYWN0b3J5JztcblxuLyoqXG4gKiBGYWN0b3J5IHRvIGJ1aWxkIHRoZSBzdHJ1Y3R1cmUgZGF0YVxuICogd2l0aG91dCBhbnkgaW50ZXJhY3Rpb24gd2l0aCB0aGUgVUkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJ1Y3R1cmVkRGF0YUZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IHJlc3VsdCA9ICgpID0+IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gaW5qZWN0b3IuZ2V0KFN0cnVjdHVyZWREYXRhRmFjdG9yeSk7XG4gICAgZmFjdG9yeS5idWlsZCgpO1xuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbSnNvbkxkRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0pzb25MZERpcmVjdGl2ZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IGdldFN0cnVjdHVyZWREYXRhRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtJbmplY3Rvcl0sXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTdHJ1Y3R1cmVkRGF0YU1vZHVsZSB7fVxuIl19