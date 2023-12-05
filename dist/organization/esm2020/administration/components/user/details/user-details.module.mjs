/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CardModule } from '../../shared/card/card.module';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { UserDetailsComponent } from './user-details.component';
import * as i0 from "@angular/core";
export class UserDetailsModule {
}
UserDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, declarations: [UserDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule,
        FeaturesConfigModule], exports: [UserDetailsComponent] });
UserDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, decorators: [{
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
                        DisableInfoModule,
                        KeyboardFocusModule,
                        FeaturesConfigModule,
                    ],
                    declarations: [UserDetailsComponent],
                    exports: [UserDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1kZXRhaWxzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91c2VyL2RldGFpbHMvdXNlci1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQWtCaEUsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUhiLG9CQUFvQixhQVhqQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixvQkFBb0IsYUFHWixvQkFBb0I7K0dBRW5CLGlCQUFpQixZQWQxQixZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixvQkFBb0I7MkZBS1gsaUJBQWlCO2tCQWhCN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLGtCQUFrQjt3QkFDbEIsZ0JBQWdCO3dCQUNoQixpQkFBaUI7d0JBQ2pCLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3FCQUNyQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRmVhdHVyZXNDb25maWdNb2R1bGUsIEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENhcmRNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2FyZC9jYXJkLm1vZHVsZSc7XG5pbXBvcnQgeyBEaXNhYmxlSW5mb01vZHVsZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9kZXRhaWwvZGlzYWJsZS1pbmZvL2Rpc2FibGUtaW5mby5tb2R1bGUnO1xuaW1wb3J0IHsgVG9nZ2xlU3RhdHVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RldGFpbC90b2dnbGUtc3RhdHVzLWFjdGlvbi90b2dnbGUtc3RhdHVzLm1vZHVsZSc7XG5pbXBvcnQgeyBJdGVtRXhpc3RzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2l0ZW0tZXhpc3RzLm1vZHVsZSc7XG5pbXBvcnQgeyBVc2VyRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gJy4vdXNlci1kZXRhaWxzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVG9nZ2xlU3RhdHVzTW9kdWxlLFxuICAgIEl0ZW1FeGlzdHNNb2R1bGUsXG4gICAgRGlzYWJsZUluZm9Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBGZWF0dXJlc0NvbmZpZ01vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbVXNlckRldGFpbHNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVXNlckRldGFpbHNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VyRGV0YWlsc01vZHVsZSB7fVxuIl19