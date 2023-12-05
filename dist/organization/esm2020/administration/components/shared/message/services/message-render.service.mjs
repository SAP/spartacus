/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Injector, } from '@angular/core';
import { MessageData } from '../message.model';
import { NotificationMessageComponent } from '../notification/notification-message.component';
import * as i0 from "@angular/core";
export class MessageRenderService {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    getComponent(msg) {
        return this.componentFactoryResolver.resolveComponentFactory(msg.component || NotificationMessageComponent);
    }
    getInjector(componentData, parent) {
        return Injector.create({
            providers: [
                {
                    provide: MessageData,
                    useValue: componentData,
                },
            ],
            parent,
        });
    }
}
MessageRenderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MessageRenderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1yZW5kZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvbWVzc2FnZS9zZXJ2aWNlcy9tZXNzYWdlLXJlbmRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsVUFBVSxFQUNWLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7O0FBSzlGLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsWUFBc0Isd0JBQWtEO1FBQWxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7SUFBRyxDQUFDO0lBRTVFLFlBQVksQ0FBQyxHQUFnQjtRQUMzQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FDMUQsR0FBRyxDQUFDLFNBQVMsSUFBSSw0QkFBNEIsQ0FDOUMsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsYUFBMEIsRUFBRSxNQUFpQjtRQUN2RCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDckIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxXQUFXO29CQUNwQixRQUFRLEVBQUUsYUFBYTtpQkFDeEI7YUFDRjtZQUNELE1BQU07U0FDUCxDQUFDLENBQUM7SUFDTCxDQUFDOztpSEFuQlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3RhYmxlLFxuICBJbmplY3Rvcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZXNzYWdlRGF0YSB9IGZyb20gJy4uL21lc3NhZ2UubW9kZWwnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4uL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24tbWVzc2FnZS5jb21wb25lbnQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlbmRlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgZ2V0Q29tcG9uZW50KG1zZzogTWVzc2FnZURhdGEpOiBDb21wb25lbnRGYWN0b3J5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIG1zZy5jb21wb25lbnQgfHwgTm90aWZpY2F0aW9uTWVzc2FnZUNvbXBvbmVudFxuICAgICk7XG4gIH1cblxuICBnZXRJbmplY3Rvcihjb21wb25lbnREYXRhOiBNZXNzYWdlRGF0YSwgcGFyZW50PzogSW5qZWN0b3IpOiBJbmplY3RvciB7XG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE1lc3NhZ2VEYXRhLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb21wb25lbnREYXRhLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudCxcbiAgICB9KTtcbiAgfVxufVxuIl19