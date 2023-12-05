/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { FeatureLevelDirective } from './directives/feature-level.directive';
import { FeatureDirective } from './directives/feature.directive';
import { provideDefaultConfig } from '../config/config-providers';
import * as i0 from "@angular/core";
export class FeaturesConfigModule {
    static forRoot(defaultLevel = '3.0') {
        return {
            ngModule: FeaturesConfigModule,
            providers: [
                provideDefaultConfig({
                    features: {
                        level: defaultLevel || '*',
                    },
                }),
            ],
        };
    }
}
FeaturesConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeaturesConfigModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FeaturesConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FeaturesConfigModule, declarations: [FeatureLevelDirective, FeatureDirective], exports: [FeatureLevelDirective, FeatureDirective] });
FeaturesConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeaturesConfigModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FeaturesConfigModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [FeatureLevelDirective, FeatureDirective],
                    exports: [FeatureLevelDirective, FeatureDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZXMtY29uZmlnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2ZlYXR1cmVzLWNvbmZpZy9mZWF0dXJlcy1jb25maWcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7QUFNbEUsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixNQUFNLENBQUMsT0FBTyxDQUNaLFlBQVksR0FBRyxLQUFLO1FBRXBCLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFDVCxvQkFBb0IsQ0FBaUI7b0JBQ25DLFFBQVEsRUFBRTt3QkFDUixLQUFLLEVBQUUsWUFBWSxJQUFJLEdBQUc7cUJBQzNCO2lCQUNGLENBQUM7YUFDSDtTQUNGLENBQUM7SUFDSixDQUFDOztpSEFkVSxvQkFBb0I7a0hBQXBCLG9CQUFvQixpQkFIaEIscUJBQXFCLEVBQUUsZ0JBQWdCLGFBQzVDLHFCQUFxQixFQUFFLGdCQUFnQjtrSEFFdEMsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSmhDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMscUJBQXFCLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3ZELE9BQU8sRUFBRSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDO2lCQUNuRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZWF0dXJlc0NvbmZpZyB9IGZyb20gJy4vY29uZmlnL2ZlYXR1cmVzLWNvbmZpZyc7XG5pbXBvcnQgeyBGZWF0dXJlTGV2ZWxEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZmVhdHVyZS1sZXZlbC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmVhdHVyZURpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mZWF0dXJlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9jb25maWctcHJvdmlkZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbRmVhdHVyZUxldmVsRGlyZWN0aXZlLCBGZWF0dXJlRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW0ZlYXR1cmVMZXZlbERpcmVjdGl2ZSwgRmVhdHVyZURpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIEZlYXR1cmVzQ29uZmlnTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoXG4gICAgZGVmYXVsdExldmVsID0gJzMuMCdcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxGZWF0dXJlc0NvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgcHJvdmlkZURlZmF1bHRDb25maWcoPEZlYXR1cmVzQ29uZmlnPntcbiAgICAgICAgICBmZWF0dXJlczoge1xuICAgICAgICAgICAgbGV2ZWw6IGRlZmF1bHRMZXZlbCB8fCAnKicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==