/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Inject, Injectable, Injector, } from '@angular/core';
import { of } from 'rxjs';
import { LaunchRenderStrategy } from './launch-render.strategy';
import * as i0 from "@angular/core";
export class InlineRootRenderStrategy extends LaunchRenderStrategy {
    constructor(document, rendererFactory, componentFactoryResolver, injector) {
        super(document, rendererFactory);
        this.document = document;
        this.rendererFactory = rendererFactory;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    get hostComponent() {
        return this.injector.get(ApplicationRef)?.components?.[0];
    }
    render(config, caller) {
        if (this.shouldRender(caller, config)) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(config.component);
            const contentInjector = Injector.create({
                providers: [],
            });
            const componentRef = componentFactory.create(contentInjector);
            this.injector.get(ApplicationRef)?.attachView(componentRef.hostView);
            this.renderer.appendChild(this.hostComponent?.location.nativeElement, componentRef.location.nativeElement);
            if (config?.dialogType) {
                this.applyClasses(componentRef, config?.dialogType);
            }
            this.renderedCallers.push({ caller, component: componentRef });
            return of(componentRef);
        }
    }
    hasMatch(config) {
        return Boolean(config.inlineRoot);
    }
}
InlineRootRenderStrategy.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRootRenderStrategy, deps: [{ token: DOCUMENT }, { token: i0.RendererFactory2 }, { token: i0.ComponentFactoryResolver }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
InlineRootRenderStrategy.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRootRenderStrategy, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InlineRootRenderStrategy, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.RendererFactory2 }, { type: i0.ComponentFactoryResolver }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5saW5lLXJvb3QtcmVuZGVyLnN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvbGF1bmNoLWRpYWxvZy9zZXJ2aWNlcy9pbmxpbmUtcm9vdC1yZW5kZXIuc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsY0FBYyxFQUdkLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFdEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBR2hFLE1BQU0sT0FBTyx3QkFBeUIsU0FBUSxvQkFBb0I7SUFDaEUsWUFDOEIsUUFBYSxFQUMvQixlQUFpQyxFQUNqQyx3QkFBa0QsRUFDbEQsUUFBa0I7UUFFNUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUxMLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUc5QixDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsTUFBTSxDQUNKLE1BQThCLEVBQzlCLE1BQThCO1FBRTlCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsTUFBTSxnQkFBZ0IsR0FDcEIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUxRSxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUN0QyxTQUFTLEVBQUUsRUFBRTthQUNkLENBQUMsQ0FBQztZQUVILE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhLEVBQzFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUNwQyxDQUFDO1lBRUYsSUFBSSxNQUFNLEVBQUUsVUFBVSxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDckQ7WUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztZQUUvRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsTUFBOEI7UUFDckMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O3FIQS9DVSx3QkFBd0Isa0JBRXpCLFFBQVE7eUhBRlAsd0JBQXdCLGNBRFgsTUFBTTsyRkFDbkIsd0JBQXdCO2tCQURwQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBRzdCLE1BQU07MkJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIEFwcGxpY2F0aW9uUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgUmVuZGVyZXJGYWN0b3J5Mixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGF1bmNoSW5saW5lUm9vdERpYWxvZywgTEFVTkNIX0NBTExFUiB9IGZyb20gJy4uL2NvbmZpZy9sYXVuY2gtY29uZmlnJztcbmltcG9ydCB7IExhdW5jaFJlbmRlclN0cmF0ZWd5IH0gZnJvbSAnLi9sYXVuY2gtcmVuZGVyLnN0cmF0ZWd5JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBJbmxpbmVSb290UmVuZGVyU3RyYXRlZ3kgZXh0ZW5kcyBMYXVuY2hSZW5kZXJTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudDogYW55LFxuICAgIHByb3RlY3RlZCByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgcHJvdGVjdGVkIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7XG4gICAgc3VwZXIoZG9jdW1lbnQsIHJlbmRlcmVyRmFjdG9yeSk7XG4gIH1cblxuICBnZXQgaG9zdENvbXBvbmVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmplY3Rvci5nZXQoQXBwbGljYXRpb25SZWYpPy5jb21wb25lbnRzPy5bMF07XG4gIH1cblxuICByZW5kZXIoXG4gICAgY29uZmlnOiBMYXVuY2hJbmxpbmVSb290RGlhbG9nLFxuICAgIGNhbGxlcjogTEFVTkNIX0NBTExFUiB8IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPENvbXBvbmVudFJlZjxhbnk+PiB8IHZvaWQge1xuICAgIGlmICh0aGlzLnNob3VsZFJlbmRlcihjYWxsZXIsIGNvbmZpZykpIHtcbiAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPVxuICAgICAgICB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb25maWcuY29tcG9uZW50KTtcblxuICAgICAgY29uc3QgY29udGVudEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbXSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShjb250ZW50SW5qZWN0b3IpO1xuXG4gICAgICB0aGlzLmluamVjdG9yLmdldChBcHBsaWNhdGlvblJlZik/LmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChcbiAgICAgICAgdGhpcy5ob3N0Q29tcG9uZW50Py5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LFxuICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudFxuICAgICAgKTtcblxuICAgICAgaWYgKGNvbmZpZz8uZGlhbG9nVHlwZSkge1xuICAgICAgICB0aGlzLmFwcGx5Q2xhc3Nlcyhjb21wb25lbnRSZWYsIGNvbmZpZz8uZGlhbG9nVHlwZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVuZGVyZWRDYWxsZXJzLnB1c2goeyBjYWxsZXIsIGNvbXBvbmVudDogY29tcG9uZW50UmVmIH0pO1xuXG4gICAgICByZXR1cm4gb2YoY29tcG9uZW50UmVmKTtcbiAgICB9XG4gIH1cblxuICBoYXNNYXRjaChjb25maWc6IExhdW5jaElubGluZVJvb3REaWFsb2cpIHtcbiAgICByZXR1cm4gQm9vbGVhbihjb25maWcuaW5saW5lUm9vdCk7XG4gIH1cbn1cbiJdfQ==