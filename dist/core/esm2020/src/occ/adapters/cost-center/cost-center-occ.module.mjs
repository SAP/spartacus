/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule } from '../../../config/config.module';
import { COST_CENTERS_NORMALIZER, COST_CENTER_NORMALIZER, COST_CENTER_SERIALIZER, } from '../../../cost-center/connectors/cost-center/converters';
import { OccCostCenterListNormalizer } from './converters/occ-cost-center-list-normalizer';
import { OccCostCenterNormalizer } from './converters/occ-cost-center-normalizer';
import { OccCostCenterSerializer } from './converters/occ-cost-center-serializer';
import { defaultOccCostCentersConfig } from './default-occ-cost-centers-config';
import * as i0 from "@angular/core";
import * as i1 from "../../../config/config.module";
export class CostCenterOccModule {
}
CostCenterOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterOccModule, imports: [CommonModule, i1.ConfigModule] });
CostCenterOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterOccModule, providers: [
        {
            provide: COST_CENTERS_NORMALIZER,
            useExisting: OccCostCenterListNormalizer,
            multi: true,
        },
        {
            provide: COST_CENTER_NORMALIZER,
            useExisting: OccCostCenterNormalizer,
            multi: true,
        },
        {
            provide: COST_CENTER_SERIALIZER,
            useExisting: OccCostCenterSerializer,
            multi: true,
        },
    ], imports: [CommonModule, ConfigModule.withConfig(defaultOccCostCentersConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ConfigModule.withConfig(defaultOccCostCentersConfig)],
                    providers: [
                        {
                            provide: COST_CENTERS_NORMALIZER,
                            useExisting: OccCostCenterListNormalizer,
                            multi: true,
                        },
                        {
                            provide: COST_CENTER_NORMALIZER,
                            useExisting: OccCostCenterNormalizer,
                            multi: true,
                        },
                        {
                            provide: COST_CENTER_SERIALIZER,
                            useExisting: OccCostCenterSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9hZGFwdGVycy9jb3N0LWNlbnRlci9jb3N0LWNlbnRlci1vY2MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIsc0JBQXNCLEdBQ3ZCLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0YsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQXNCaEYsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLFlBbkJwQixZQUFZO2lIQW1CWCxtQkFBbUIsYUFsQm5CO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHNCQUFzQjtZQUMvQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFqQlMsWUFBWSxFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsMkJBQTJCLENBQUM7MkZBbUJqRSxtQkFBbUI7a0JBcEIvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQzdFLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLEVBQUUsMkJBQTJCOzRCQUN4QyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixXQUFXLEVBQUUsdUJBQXVCOzRCQUNwQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsc0JBQXNCOzRCQUMvQixXQUFXLEVBQUUsdUJBQXVCOzRCQUNwQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29uZmlnL2NvbmZpZy5tb2R1bGUnO1xuaW1wb3J0IHtcbiAgQ09TVF9DRU5URVJTX05PUk1BTElaRVIsXG4gIENPU1RfQ0VOVEVSX05PUk1BTElaRVIsXG4gIENPU1RfQ0VOVEVSX1NFUklBTElaRVIsXG59IGZyb20gJy4uLy4uLy4uL2Nvc3QtY2VudGVyL2Nvbm5lY3RvcnMvY29zdC1jZW50ZXIvY29udmVydGVycyc7XG5pbXBvcnQgeyBPY2NDb3N0Q2VudGVyTGlzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2NvbnZlcnRlcnMvb2NjLWNvc3QtY2VudGVyLWxpc3Qtbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NDb3N0Q2VudGVyTm9ybWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29zdC1jZW50ZXItbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NDb3N0Q2VudGVyU2VyaWFsaXplciB9IGZyb20gJy4vY29udmVydGVycy9vY2MtY29zdC1jZW50ZXItc2VyaWFsaXplcic7XG5pbXBvcnQgeyBkZWZhdWx0T2NjQ29zdENlbnRlcnNDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtb2NjLWNvc3QtY2VudGVycy1jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDb25maWdNb2R1bGUud2l0aENvbmZpZyhkZWZhdWx0T2NjQ29zdENlbnRlcnNDb25maWcpXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQ09TVF9DRU5URVJTX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjQ29zdENlbnRlckxpc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDT1NUX0NFTlRFUl9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0Nvc3RDZW50ZXJOb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDT1NUX0NFTlRFUl9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY0Nvc3RDZW50ZXJTZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29zdENlbnRlck9jY01vZHVsZSB7fVxuIl19