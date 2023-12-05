/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../shared/card/card.module';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { UnitDetailsComponent } from './unit-details.component';
import * as i0 from "@angular/core";
export class UnitDetailsModule {
}
UnitDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, declarations: [UnitDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        KeyboardFocusModule,
        DisableInfoModule], exports: [UnitDetailsComponent] });
UnitDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        KeyboardFocusModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        KeyboardFocusModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitDetailsComponent],
                    exports: [UnitDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2RldGFpbHMvdW5pdC1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQWlCaEUsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUhiLG9CQUFvQixhQVZqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsbUJBQW1CO1FBQ25CLGlCQUFpQixhQUdULG9CQUFvQjsrR0FFbkIsaUJBQWlCLFlBYjFCLFlBQVk7UUFDWixVQUFVO1FBQ1YsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1Ysa0JBQWtCO1FBQ2xCLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsaUJBQWlCOzJGQUtSLGlCQUFpQjtrQkFmN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixtQkFBbUI7d0JBQ25CLGlCQUFpQjtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3BDLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBEaXNhYmxlSW5mb01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9kZXRhaWwvZGlzYWJsZS1pbmZvL2Rpc2FibGUtaW5mby5tb2R1bGUnO1xuaW1wb3J0IHsgVG9nZ2xlU3RhdHVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RldGFpbC90b2dnbGUtc3RhdHVzLWFjdGlvbi90b2dnbGUtc3RhdHVzLm1vZHVsZSc7XG5pbXBvcnQgeyBJdGVtRXhpc3RzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2l0ZW0tZXhpc3RzLm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vdW5pdC1kZXRhaWxzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVG9nZ2xlU3RhdHVzTW9kdWxlLFxuICAgIEl0ZW1FeGlzdHNNb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBEaXNhYmxlSW5mb01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVW5pdERldGFpbHNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVW5pdERldGFpbHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0RGV0YWlsc01vZHVsZSB7fVxuIl19