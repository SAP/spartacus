/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT } from '@angular/common';
import { inject, Inject, Injectable, isDevMode, } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { of } from 'rxjs';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export class InlineRenderStrategy extends LaunchRenderStrategy {
    constructor(document, rendererFactory, componentFactoryResolver) {
        super(document, rendererFactory);
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.componentFactoryResolver = componentFactoryResolver;
        this.logger = inject(LoggerService);
    }
    /**
     * Renders the component from the configuration in the view container ref
     *
     * @param config
     * @param caller
     * @param vcr
     */
    render(config, caller, vcr) {
        // Only render if a ViewContainerRef is provided
        if (vcr && this.shouldRender(caller, config)) {
            const template = this.componentFactoryResolver.resolveComponentFactory(config.component);
            const component = vcr.createComponent(template);
            if (config?.dialogType) {
                this.applyClasses(component, config?.dialogType);
            }
            this.renderedCallers.push({ caller, element: vcr.element, component });
            return of(component);
        }
        else if (isDevMode()) {
            if (!vcr) {
                this.logger.warn(`No view container ref provided for ${caller}`);
            }
            else {
                this.logger.warn(`Element for ${caller} already rendered. To allow multi rendering add property multi: true.`);
            }
        }
    }
    hasMatch(config) {
        return Boolean(config.inline);
    }
}
InlineRenderStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRenderStrategy, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
InlineRenderStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRenderStrategy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRenderStrategy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXJlbmRlci5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2xhdW5jaC1kaWFsb2cvc2VydmljZXMvaW5saW5lLXJlbmRlci5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFHTCxNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixTQUFTLEdBR1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBR2hFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxvQkFBb0I7SUFHNUQsWUFDOEIsUUFBYSxFQUMvQixlQUFpQyxFQUNqQyx3QkFBa0Q7UUFFNUQsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUpMLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFMcEQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQVF6QyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUNKLE1BQTBCLEVBQzFCLE1BQThCLEVBQzlCLEdBQXFCO1FBRXJCLGdEQUFnRDtRQUNoRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM1QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQ3BFLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUM7WUFFRixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhELElBQUksTUFBTSxFQUFFLFVBQVUsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2xEO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUV2RSxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QjthQUFNLElBQUksU0FBUyxFQUFFLEVBQUU7WUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNsRTtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCxlQUFlLE1BQU0sdUVBQXVFLENBQzdGLENBQUM7YUFDSDtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUEwQjtRQUNqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7aUhBbkRVLG9CQUFvQixrQkFJckIsUUFBUTtxSEFKUCxvQkFBb0IsY0FEUCxNQUFNOzJGQUNuQixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFLN0IsTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIGluamVjdCxcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBpc0Rldk1vZGUsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTEFVTkNIX0NBTExFUiwgTGF1bmNoSW5saW5lRGlhbG9nIH0gZnJvbSAnLi4vY29uZmlnL2luZGV4JztcbmltcG9ydCB7IExhdW5jaFJlbmRlclN0cmF0ZWd5IH0gZnJvbSAnLi9sYXVuY2gtcmVuZGVyLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBJbmxpbmVSZW5kZXJTdHJhdGVneSBleHRlbmRzIExhdW5jaFJlbmRlclN0cmF0ZWd5IHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcm90ZWN0ZWQgZG9jdW1lbnQ6IGFueSxcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuICApIHtcbiAgICBzdXBlcihkb2N1bWVudCwgcmVuZGVyZXJGYWN0b3J5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBpbiB0aGUgdmlldyBjb250YWluZXIgcmVmXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICogQHBhcmFtIGNhbGxlclxuICAgKiBAcGFyYW0gdmNyXG4gICAqL1xuICByZW5kZXIoXG4gICAgY29uZmlnOiBMYXVuY2hJbmxpbmVEaWFsb2csXG4gICAgY2FsbGVyOiBMQVVOQ0hfQ0FMTEVSIHwgc3RyaW5nLFxuICAgIHZjcjogVmlld0NvbnRhaW5lclJlZlxuICApOiBPYnNlcnZhYmxlPENvbXBvbmVudFJlZjxhbnk+PiB8IHZvaWQge1xuICAgIC8vIE9ubHkgcmVuZGVyIGlmIGEgVmlld0NvbnRhaW5lclJlZiBpcyBwcm92aWRlZFxuICAgIGlmICh2Y3IgJiYgdGhpcy5zaG91bGRSZW5kZXIoY2FsbGVyLCBjb25maWcpKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICBjb25maWcuY29tcG9uZW50XG4gICAgICApO1xuXG4gICAgICBjb25zdCBjb21wb25lbnQgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KHRlbXBsYXRlKTtcblxuICAgICAgaWYgKGNvbmZpZz8uZGlhbG9nVHlwZSkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3Nlcyhjb21wb25lbnQsIGNvbmZpZz8uZGlhbG9nVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZWRDYWxsZXJzLnB1c2goeyBjYWxsZXIsIGVsZW1lbnQ6IHZjci5lbGVtZW50LCBjb21wb25lbnQgfSk7XG5cbiAgICAgIHJldHVybiBvZihjb21wb25lbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgIGlmICghdmNyKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oYE5vIHZpZXcgY29udGFpbmVyIHJlZiBwcm92aWRlZCBmb3IgJHtjYWxsZXJ9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFxuICAgICAgICAgIGBFbGVtZW50IGZvciAke2NhbGxlcn0gYWxyZWFkeSByZW5kZXJlZC4gVG8gYWxsb3cgbXVsdGkgcmVuZGVyaW5nIGFkZCBwcm9wZXJ0eSBtdWx0aTogdHJ1ZS5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzTWF0Y2goY29uZmlnOiBMYXVuY2hJbmxpbmVEaWFsb2cpIHtcbiAgICByZXR1cm4gQm9vbGVhbihjb25maWcuaW5saW5lKTtcbiAgfVxufVxuIl19