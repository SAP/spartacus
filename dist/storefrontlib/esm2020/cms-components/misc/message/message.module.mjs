/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AtMessageModule } from '../../../shared/components/assistive-technology-message/assistive-technology-message.module';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { MessageComponent } from './message.component';
import * as i0 from "@angular/core";
export class MessageComponentModule {
}
MessageComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MessageComponentModule, declarations: [MessageComponent], imports: [AtMessageModule, CommonModule, I18nModule, IconModule], exports: [MessageComponent] });
MessageComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponentModule, imports: [AtMessageModule, CommonModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AtMessageModule, CommonModule, I18nModule, IconModule],
                    declarations: [MessageComponent],
                    exports: [MessageComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL21pc2MvbWVzc2FnZS9tZXNzYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2RkFBNkYsQ0FBQztBQUM5SCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBT3ZELE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixpQkFIbEIsZ0JBQWdCLGFBRHJCLGVBQWUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsYUFFckQsZ0JBQWdCO29IQUVmLHNCQUFzQixZQUp2QixlQUFlLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQUlwRCxzQkFBc0I7a0JBTGxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUNoRSxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7aUJBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEF0TWVzc2FnZU1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9jb21wb25lbnRzL2Fzc2lzdGl2ZS10ZWNobm9sb2d5LW1lc3NhZ2UvYXNzaXN0aXZlLXRlY2hub2xvZ3ktbWVzc2FnZS5tb2R1bGUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLm1vZHVsZSc7XG5pbXBvcnQgeyBNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tZXNzYWdlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtBdE1lc3NhZ2VNb2R1bGUsIENvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01lc3NhZ2VDb21wb25lbnRdLFxuICBleHBvcnRzOiBbTWVzc2FnZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VDb21wb25lbnRNb2R1bGUge31cbiJdfQ==