/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./default-component.handler";
/**
 * Lazy component handler used for launching lazy loaded cms components implemented
 * as native Angular components.
 */
export class LazyComponentHandler {
    constructor(defaultHandler) {
        this.defaultHandler = defaultHandler;
    }
    /**
     * We want to mach dynamic import signature () => import('')
     */
    hasMatch(componentMapping) {
        return (typeof componentMapping.component === 'function' &&
            this.isNotClass(componentMapping.component));
    }
    isNotClass(symbol) {
        const signature = symbol.toString().substring(0, 20).replace(' ', '');
        return signature.startsWith('function()') || signature.startsWith('()=>');
    }
    getPriority() {
        return -10 /* Priority.LOW */;
    }
    launcher(componentMapping, viewContainerRef, elementInjector, module) {
        return from(componentMapping.component()).pipe(switchMap((component) => this.defaultHandler.launcher({ ...componentMapping, component }, viewContainerRef, elementInjector, module)));
    }
}
LazyComponentHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyComponentHandler, deps: [{ token: i1.DefaultComponentHandler }], target: i0.ɵɵFactoryTarget.Injectable });
LazyComponentHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyComponentHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyComponentHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.DefaultComponentHandler }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1jb21wb25lbnQuaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wYWdlL2NvbXBvbmVudC9oYW5kbGVycy9sYXp5LWNvbXBvbmVudC5oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBR0wsVUFBVSxHQUlYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFeEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFHM0M7OztHQUdHO0FBSUgsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQixZQUFzQixjQUF1QztRQUF2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBeUI7SUFBRyxDQUFDO0lBRWpFOztPQUVHO0lBQ0gsUUFBUSxDQUFDLGdCQUFxQztRQUM1QyxPQUFPLENBQ0wsT0FBTyxnQkFBZ0IsQ0FBQyxTQUFTLEtBQUssVUFBVTtZQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUM1QyxDQUFDO0lBQ0osQ0FBQztJQUVPLFVBQVUsQ0FBQyxNQUFXO1FBQzVCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsT0FBTyxTQUFTLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELFdBQVc7UUFDVCw4QkFBb0I7SUFDdEIsQ0FBQztJQUVELFFBQVEsQ0FDTixnQkFBcUMsRUFDckMsZ0JBQWtDLEVBQ2xDLGVBQTBCLEVBQzFCLE1BQXlCO1FBRXpCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM1QyxTQUFTLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FDMUIsRUFBRSxHQUFHLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxFQUNsQyxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLE1BQU0sQ0FDUCxDQUNGLENBQ0YsQ0FBQztJQUNKLENBQUM7O2lIQXRDVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBOZ01vZHVsZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnRNYXBwaW5nLCBQcmlvcml0eSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEZWZhdWx0Q29tcG9uZW50SGFuZGxlciB9IGZyb20gJy4vZGVmYXVsdC1jb21wb25lbnQuaGFuZGxlcic7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb21wb25lbnRIYW5kbGVyIH0gZnJvbSAnLi9jb21wb25lbnQtaGFuZGxlcic7XG5cbi8qKlxuICogTGF6eSBjb21wb25lbnQgaGFuZGxlciB1c2VkIGZvciBsYXVuY2hpbmcgbGF6eSBsb2FkZWQgY21zIGNvbXBvbmVudHMgaW1wbGVtZW50ZWRcbiAqIGFzIG5hdGl2ZSBBbmd1bGFyIGNvbXBvbmVudHMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXp5Q29tcG9uZW50SGFuZGxlciBpbXBsZW1lbnRzIENvbXBvbmVudEhhbmRsZXIge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZGVmYXVsdEhhbmRsZXI6IERlZmF1bHRDb21wb25lbnRIYW5kbGVyKSB7fVxuXG4gIC8qKlxuICAgKiBXZSB3YW50IHRvIG1hY2ggZHluYW1pYyBpbXBvcnQgc2lnbmF0dXJlICgpID0+IGltcG9ydCgnJylcbiAgICovXG4gIGhhc01hdGNoKGNvbXBvbmVudE1hcHBpbmc6IENtc0NvbXBvbmVudE1hcHBpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgdHlwZW9mIGNvbXBvbmVudE1hcHBpbmcuY29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0aGlzLmlzTm90Q2xhc3MoY29tcG9uZW50TWFwcGluZy5jb21wb25lbnQpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNOb3RDbGFzcyhzeW1ib2w6IGFueSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHNpZ25hdHVyZSA9IHN5bWJvbC50b1N0cmluZygpLnN1YnN0cmluZygwLCAyMCkucmVwbGFjZSgnICcsICcnKTtcbiAgICByZXR1cm4gc2lnbmF0dXJlLnN0YXJ0c1dpdGgoJ2Z1bmN0aW9uKCknKSB8fCBzaWduYXR1cmUuc3RhcnRzV2l0aCgnKCk9PicpO1xuICB9XG5cbiAgZ2V0UHJpb3JpdHkoKTogUHJpb3JpdHkge1xuICAgIHJldHVybiBQcmlvcml0eS5MT1c7XG4gIH1cblxuICBsYXVuY2hlcihcbiAgICBjb21wb25lbnRNYXBwaW5nOiBDbXNDb21wb25lbnRNYXBwaW5nLFxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgZWxlbWVudEluamVjdG9yPzogSW5qZWN0b3IsXG4gICAgbW9kdWxlPzogTmdNb2R1bGVSZWY8YW55PlxuICApOiBPYnNlcnZhYmxlPHsgZWxlbWVudFJlZjogRWxlbWVudFJlZjsgY29tcG9uZW50UmVmPzogQ29tcG9uZW50UmVmPGFueT4gfT4ge1xuICAgIHJldHVybiBmcm9tKGNvbXBvbmVudE1hcHBpbmcuY29tcG9uZW50KCkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNvbXBvbmVudCkgPT5cbiAgICAgICAgdGhpcy5kZWZhdWx0SGFuZGxlci5sYXVuY2hlcihcbiAgICAgICAgICB7IC4uLmNvbXBvbmVudE1hcHBpbmcsIGNvbXBvbmVudCB9LFxuICAgICAgICAgIHZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgZWxlbWVudEluamVjdG9yLFxuICAgICAgICAgIG1vZHVsZVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19