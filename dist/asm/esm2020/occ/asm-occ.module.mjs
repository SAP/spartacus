/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmAdapter } from '@spartacus/asm/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccAsmConfig } from './adapters/default-occ-asm-config';
import { OccAsmAdapter } from './adapters/occ-asm.adapter';
import * as i0 from "@angular/core";
export class AsmOccModule {
}
AsmOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmOccModule, imports: [CommonModule] });
AsmOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmOccModule, providers: [
        provideDefaultConfig(defaultOccAsmConfig),
        {
            provide: AsmAdapter,
            useClass: OccAsmAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccAsmConfig),
                        {
                            provide: AsmAdapter,
                            useClass: OccAsmAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL29jYy9hc20tb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFZM0QsTUFBTSxPQUFPLFlBQVk7O3lHQUFaLFlBQVk7MEdBQVosWUFBWSxZQVRiLFlBQVk7MEdBU1gsWUFBWSxhQVJaO1FBQ1Qsb0JBQW9CLENBQUMsbUJBQW1CLENBQUM7UUFDekM7WUFDRSxPQUFPLEVBQUUsVUFBVTtZQUNuQixRQUFRLEVBQUUsYUFBYTtTQUN4QjtLQUNGLFlBUFMsWUFBWTsyRkFTWCxZQUFZO2tCQVZ4QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLG1CQUFtQixDQUFDO3dCQUN6Qzs0QkFDRSxPQUFPLEVBQUUsVUFBVTs0QkFDbkIsUUFBUSxFQUFFLGFBQWE7eUJBQ3hCO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBc21BZGFwdGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0T2NjQXNtQ29uZmlnIH0gZnJvbSAnLi9hZGFwdGVycy9kZWZhdWx0LW9jYy1hc20tY29uZmlnJztcbmltcG9ydCB7IE9jY0FzbUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1hc20uYWRhcHRlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjQXNtQ29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBBc21BZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0FzbUFkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQXNtT2NjTW9kdWxlIHt9XG4iXX0=