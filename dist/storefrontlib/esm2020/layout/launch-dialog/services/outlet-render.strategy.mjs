/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { OutletPosition, } from '../../../cms-structure/outlet/index';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/outlet/index";
import * as i2 from "../../../cms-structure/outlet/outlet-renderer.service";
export class OutletRenderStrategy extends LaunchRenderStrategy {
    constructor(document, rendererFactory, outletService, componentFactoryResolver, outletRendererService) {
        super(document, rendererFactory);
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.outletService = outletService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.outletRendererService = outletRendererService;
    }
    /**
     * Renders the element in the configured outlet
     *
     * @param config
     * @param caller
     * @param vcr
     */
    render(config, caller) {
        if (this.shouldRender(caller, config)) {
            const template = this.componentFactoryResolver.resolveComponentFactory(config.component);
            this.outletService.add(config.outlet, template, config.position ? config.position : OutletPosition.BEFORE);
            this.outletRendererService.render(config.outlet);
            this.renderedCallers.push({ caller });
            return this.outletRendererService.getOutletRef(config.outlet).pipe(map((outletDirective) => {
                const components = outletDirective.renderedComponents.get(config.position ? config.position : OutletPosition.BEFORE);
                return components
                    .reverse()
                    .find((component) => component.componentType === template.componentType);
            }), tap((component) => {
                if (config?.dialogType && component) {
                    this.applyClasses(component, config?.dialogType);
                }
            }));
        }
    }
    hasMatch(config) {
        return Boolean(config.outlet);
    }
    remove(caller, config) {
        const template = this.componentFactoryResolver.resolveComponentFactory(config.component);
        this.outletService.remove(config.outlet, config.position ? config.position : OutletPosition.BEFORE, template);
        super.remove(caller, config);
    }
}
OutletRenderStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRenderStrategy, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i1.OutletService }, { token: i0.ComponentFactoryResolver }, { token: i2.OutletRendererService }], target: i0.ɵɵFactoryTarget.Injectable });
OutletRenderStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRenderStrategy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRenderStrategy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i1.OutletService }, { type: i0.ComponentFactoryResolver }, { type: i2.OutletRendererService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LXJlbmRlci5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2xhdW5jaC1kaWFsb2cvc2VydmljZXMvb3V0bGV0LXJlbmRlci5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFJTCxNQUFNLEVBQ04sVUFBVSxHQUVYLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUMsT0FBTyxFQUNMLGNBQWMsR0FFZixNQUFNLHFDQUFxQyxDQUFDO0FBRzdDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBR2hFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxvQkFBb0I7SUFDNUQsWUFDOEIsUUFBYSxFQUMvQixlQUFpQyxFQUNqQyxhQUFtRCxFQUNuRCx3QkFBa0QsRUFDbEQscUJBQTRDO1FBRXRELEtBQUssQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFOTCxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBc0M7UUFDbkQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBR3hELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQ0osTUFBMEIsRUFDMUIsTUFBOEI7UUFFOUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNyQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQ3BFLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsTUFBTSxDQUFDLE1BQU0sRUFDYixRQUFRLEVBQ1IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDMUQsQ0FBQztZQUNGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUV0QyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FDaEUsR0FBRyxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7Z0JBQ3RCLE1BQU0sVUFBVSxHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQ25DLENBQUM7Z0JBRXpCLE9BQU8sVUFBVTtxQkFDZCxPQUFPLEVBQUU7cUJBQ1QsSUFBSSxDQUNILENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQ2xFLENBQUM7WUFDTixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDaEIsSUFBSSxNQUFNLEVBQUUsVUFBVSxJQUFJLFNBQVMsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNsRDtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsTUFBMEI7UUFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBOEIsRUFBRSxNQUEwQjtRQUMvRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQ3BFLE1BQU0sQ0FBQyxTQUFTLENBQ2pCLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FDdkIsTUFBTSxDQUFDLE1BQU0sRUFDYixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUN6RCxRQUFRLENBQ1QsQ0FBQztRQUVGLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7O2lIQXZFVSxvQkFBb0Isa0JBRXJCLFFBQVE7cUhBRlAsb0JBQW9CLGNBRFAsTUFBTTsyRkFDbkIsb0JBQW9CO2tCQURoQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBRzdCLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnksXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBPdXRsZXRQb3NpdGlvbixcbiAgT3V0bGV0U2VydmljZSxcbn0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9vdXRsZXQvaW5kZXgnO1xuaW1wb3J0IHsgT3V0bGV0UmVuZGVyZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0LXJlbmRlcmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGF1bmNoT3V0bGV0RGlhbG9nLCBMQVVOQ0hfQ0FMTEVSIH0gZnJvbSAnLi4vY29uZmlnL2luZGV4JztcbmltcG9ydCB7IExhdW5jaFJlbmRlclN0cmF0ZWd5IH0gZnJvbSAnLi9sYXVuY2gtcmVuZGVyLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBPdXRsZXRSZW5kZXJTdHJhdGVneSBleHRlbmRzIExhdW5jaFJlbmRlclN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIGRvY3VtZW50OiBhbnksXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MixcbiAgICBwcm90ZWN0ZWQgb3V0bGV0U2VydmljZTogT3V0bGV0U2VydmljZTxDb21wb25lbnRGYWN0b3J5PGFueT4+LFxuICAgIHByb3RlY3RlZCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgb3V0bGV0UmVuZGVyZXJTZXJ2aWNlOiBPdXRsZXRSZW5kZXJlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIHJlbmRlcmVyRmFjdG9yeSk7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgZWxlbWVudCBpbiB0aGUgY29uZmlndXJlZCBvdXRsZXRcbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKiBAcGFyYW0gY2FsbGVyXG4gICAqIEBwYXJhbSB2Y3JcbiAgICovXG4gIHJlbmRlcihcbiAgICBjb25maWc6IExhdW5jaE91dGxldERpYWxvZyxcbiAgICBjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDb21wb25lbnRSZWY8YW55PiB8IHVuZGVmaW5lZD4gfCB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG91bGRSZW5kZXIoY2FsbGVyLCBjb25maWcpKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxuICAgICAgICBjb25maWcuY29tcG9uZW50XG4gICAgICApO1xuICAgICAgdGhpcy5vdXRsZXRTZXJ2aWNlLmFkZChcbiAgICAgICAgY29uZmlnLm91dGxldCxcbiAgICAgICAgdGVtcGxhdGUsXG4gICAgICAgIGNvbmZpZy5wb3NpdGlvbiA/IGNvbmZpZy5wb3NpdGlvbiA6IE91dGxldFBvc2l0aW9uLkJFRk9SRVxuICAgICAgKTtcbiAgICAgIHRoaXMub3V0bGV0UmVuZGVyZXJTZXJ2aWNlLnJlbmRlcihjb25maWcub3V0bGV0KTtcbiAgICAgIHRoaXMucmVuZGVyZWRDYWxsZXJzLnB1c2goeyBjYWxsZXIgfSk7XG5cbiAgICAgIHJldHVybiB0aGlzLm91dGxldFJlbmRlcmVyU2VydmljZS5nZXRPdXRsZXRSZWYoY29uZmlnLm91dGxldCkucGlwZShcbiAgICAgICAgbWFwKChvdXRsZXREaXJlY3RpdmUpID0+IHtcbiAgICAgICAgICBjb25zdCBjb21wb25lbnRzID0gb3V0bGV0RGlyZWN0aXZlLnJlbmRlcmVkQ29tcG9uZW50cy5nZXQoXG4gICAgICAgICAgICBjb25maWcucG9zaXRpb24gPyBjb25maWcucG9zaXRpb24gOiBPdXRsZXRQb3NpdGlvbi5CRUZPUkVcbiAgICAgICAgICApIGFzIENvbXBvbmVudFJlZjxhbnk+W107XG5cbiAgICAgICAgICByZXR1cm4gY29tcG9uZW50c1xuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLmZpbmQoXG4gICAgICAgICAgICAgIChjb21wb25lbnQpID0+IGNvbXBvbmVudC5jb21wb25lbnRUeXBlID09PSB0ZW1wbGF0ZS5jb21wb25lbnRUeXBlXG4gICAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgdGFwKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICBpZiAoY29uZmlnPy5kaWFsb2dUeXBlICYmIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5hcHBseUNsYXNzZXMoY29tcG9uZW50LCBjb25maWc/LmRpYWxvZ1R5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaGFzTWF0Y2goY29uZmlnOiBMYXVuY2hPdXRsZXREaWFsb2cpIHtcbiAgICByZXR1cm4gQm9vbGVhbihjb25maWcub3V0bGV0KTtcbiAgfVxuXG4gIHJlbW92ZShjYWxsZXI6IExBVU5DSF9DQUxMRVIgfCBzdHJpbmcsIGNvbmZpZzogTGF1bmNoT3V0bGV0RGlhbG9nKTogdm9pZCB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgIGNvbmZpZy5jb21wb25lbnRcbiAgICApO1xuXG4gICAgdGhpcy5vdXRsZXRTZXJ2aWNlLnJlbW92ZShcbiAgICAgIGNvbmZpZy5vdXRsZXQsXG4gICAgICBjb25maWcucG9zaXRpb24gPyBjb25maWcucG9zaXRpb24gOiBPdXRsZXRQb3NpdGlvbi5CRUZPUkUsXG4gICAgICB0ZW1wbGF0ZVxuICAgICk7XG5cbiAgICBzdXBlci5yZW1vdmUoY2FsbGVyLCBjb25maWcpO1xuICB9XG59XG4iXX0=