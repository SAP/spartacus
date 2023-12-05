/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ComponentFactoryResolver, Injectable, } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Default component handler used for dynamically launching cms components implemented
 * as native Angular components.
 */
export class DefaultComponentHandler {
    hasMatch(componentMapping) {
        return typeof componentMapping.component === 'function';
    }
    getPriority() {
        return -50 /* Priority.FALLBACK */;
    }
    launcher(componentMapping, viewContainerRef, elementInjector, module) {
        return new Observable((subscriber) => {
            let componentRef;
            const injector = elementInjector ?? viewContainerRef.injector;
            const dispose = () => {
                if (componentRef) {
                    componentRef.destroy();
                }
            };
            const factory = this.getComponentFactory(injector, componentMapping.component);
            if (factory) {
                componentRef = viewContainerRef.createComponent(factory, undefined, injector, undefined, module);
                subscriber.next({ elementRef: componentRef.location, componentRef });
            }
            return dispose;
        });
    }
    getComponentFactory(injector, component) {
        if (!component) {
            return null;
        }
        const factory = injector
            .get(ComponentFactoryResolver)
            .resolveComponentFactory(component);
        return factory;
    }
}
DefaultComponentHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultComponentHandler, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DefaultComponentHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultComponentHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DefaultComponentHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1jb21wb25lbnQuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL2NvbXBvbmVudC9oYW5kbGVycy9kZWZhdWx0LWNvbXBvbmVudC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsd0JBQXdCLEVBR3hCLFVBQVUsR0FJWCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUdsQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFFBQVEsQ0FBQyxnQkFBcUM7UUFDNUMsT0FBTyxPQUFPLGdCQUFnQixDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7SUFDMUQsQ0FBQztJQUVELFdBQVc7UUFDVCxtQ0FBeUI7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FDTixnQkFBcUMsRUFDckMsZ0JBQWtDLEVBQ2xDLGVBQTBCLEVBQzFCLE1BQXlCO1FBRXpCLE9BQU8sSUFBSSxVQUFVLENBR2xCLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDaEIsSUFBSSxZQUErQixDQUFDO1lBRXBDLE1BQU0sUUFBUSxHQUFHLGVBQWUsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7WUFFOUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO2dCQUNuQixJQUFJLFlBQVksRUFBRTtvQkFDaEIsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN4QjtZQUNILENBQUMsQ0FBQztZQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FDdEMsUUFBUSxFQUNSLGdCQUFnQixDQUFDLFNBQVMsQ0FDM0IsQ0FBQztZQUVGLElBQUksT0FBTyxFQUFFO2dCQUNYLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzdDLE9BQU8sRUFDUCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFNBQVMsRUFDVCxNQUFNLENBQ1AsQ0FBQztnQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQzthQUN0RTtZQUVELE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLG1CQUFtQixDQUFDLFFBQWtCLEVBQUUsU0FBYztRQUM5RCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE1BQU0sT0FBTyxHQUFHLFFBQVE7YUFDckIsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQzdCLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXRDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O29IQTFEVSx1QkFBdUI7d0hBQXZCLHVCQUF1QixjQUZ0QixNQUFNOzJGQUVQLHVCQUF1QjtrQkFIbkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nTW9kdWxlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbXBvbmVudEhhbmRsZXIgfSBmcm9tICcuL2NvbXBvbmVudC1oYW5kbGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudE1hcHBpbmcsIFByaW9yaXR5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuLyoqXG4gKiBEZWZhdWx0IGNvbXBvbmVudCBoYW5kbGVyIHVzZWQgZm9yIGR5bmFtaWNhbGx5IGxhdW5jaGluZyBjbXMgY29tcG9uZW50cyBpbXBsZW1lbnRlZFxuICogYXMgbmF0aXZlIEFuZ3VsYXIgY29tcG9uZW50cy5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRDb21wb25lbnRIYW5kbGVyIGltcGxlbWVudHMgQ29tcG9uZW50SGFuZGxlciB7XG4gIGhhc01hdGNoKGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvbXBvbmVudE1hcHBpbmcuY29tcG9uZW50ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5GQUxMQkFDSztcbiAgfVxuXG4gIGxhdW5jaGVyKFxuICAgIGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmcsXG4gICAgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBlbGVtZW50SW5qZWN0b3I/OiBJbmplY3RvcixcbiAgICBtb2R1bGU/OiBOZ01vZHVsZVJlZjxhbnk+XG4gICk6IE9ic2VydmFibGU8eyBlbGVtZW50UmVmOiBFbGVtZW50UmVmOyBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55PiB9PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPHtcbiAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG4gICAgICBjb21wb25lbnRSZWY/OiBDb21wb25lbnRSZWY8YW55PjtcbiAgICB9Pigoc3Vic2NyaWJlcikgPT4ge1xuICAgICAgbGV0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgICAgIGNvbnN0IGluamVjdG9yID0gZWxlbWVudEluamVjdG9yID8/IHZpZXdDb250YWluZXJSZWYuaW5qZWN0b3I7XG5cbiAgICAgIGNvbnN0IGRpc3Bvc2UgPSAoKSA9PiB7XG4gICAgICAgIGlmIChjb21wb25lbnRSZWYpIHtcbiAgICAgICAgICBjb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5nZXRDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICBpbmplY3RvcixcbiAgICAgICAgY29tcG9uZW50TWFwcGluZy5jb21wb25lbnRcbiAgICAgICk7XG5cbiAgICAgIGlmIChmYWN0b3J5KSB7XG4gICAgICAgIGNvbXBvbmVudFJlZiA9IHZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIGZhY3RvcnksXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIGluamVjdG9yLFxuICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICBtb2R1bGVcbiAgICAgICAgKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHsgZWxlbWVudFJlZjogY29tcG9uZW50UmVmLmxvY2F0aW9uLCBjb21wb25lbnRSZWYgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXNwb3NlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENvbXBvbmVudEZhY3RvcnkoaW5qZWN0b3I6IEluamVjdG9yLCBjb21wb25lbnQ6IGFueSk6IGFueSB7XG4gICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBmYWN0b3J5ID0gaW5qZWN0b3JcbiAgICAgIC5nZXQoQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKVxuICAgICAgLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gZmFjdG9yeTtcbiAgfVxufVxuIl19