/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfirmationMessageModule } from '../../message/confirmation/confirmation-message.module';
import { MessageModule } from '../../message/message.module';
import { ToggleStatusComponent } from './toggle-status.component';
import * as i0 from "@angular/core";
export class ToggleStatusModule {
}
ToggleStatusModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToggleStatusModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, declarations: [ToggleStatusComponent], imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule], exports: [ToggleStatusComponent] });
ToggleStatusModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
                    declarations: [ToggleStatusComponent],
                    exports: [ToggleStatusComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN0YXR1cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2RldGFpbC90b2dnbGUtc3RhdHVzLWFjdGlvbi90b2dnbGUtc3RhdHVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFPbEUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLGlCQUhkLHFCQUFxQixhQUQxQixZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSx5QkFBeUIsYUFFbEUscUJBQXFCO2dIQUVwQixrQkFBa0IsWUFKbkIsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUseUJBQXlCOzJGQUlqRSxrQkFBa0I7a0JBTDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUseUJBQXlCLENBQUM7b0JBQzdFLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDakMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uTWVzc2FnZU1vZHVsZSB9IGZyb20gJy4uLy4uL21lc3NhZ2UvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBNZXNzYWdlTW9kdWxlIH0gZnJvbSAnLi4vLi4vbWVzc2FnZS9tZXNzYWdlLm1vZHVsZSc7XG5pbXBvcnQgeyBUb2dnbGVTdGF0dXNDb21wb25lbnQgfSBmcm9tICcuL3RvZ2dsZS1zdGF0dXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgTWVzc2FnZU1vZHVsZSwgQ29uZmlybWF0aW9uTWVzc2FnZU1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1RvZ2dsZVN0YXR1c0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtUb2dnbGVTdGF0dXNDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVTdGF0dXNNb2R1bGUge31cbiJdfQ==