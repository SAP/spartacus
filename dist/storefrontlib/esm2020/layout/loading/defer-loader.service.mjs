/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DeferLoadingStrategy } from '@spartacus/core';
import { of } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../config/layout-config";
import * as i2 from "./intersection.service";
/**
 * The defer loading serivce is used to defer loading of DOM elements
 * until the elements are required for the user experience.
 */
export class DeferLoaderService {
    constructor(platformId, config, intersectionService) {
        this.platformId = platformId;
        this.config = config;
        this.intersectionService = intersectionService;
        this.globalLoadStrategy =
            config.deferredLoading?.strategy ?? DeferLoadingStrategy.INSTANT;
    }
    /**
     * Defer loading till the element intersects the viewport.
     *
     * We evaluate whether we instantly load the element for different reasons:
     * - we run in SSR mode
     * - there's no global strategy given
     * - the global loading strategy is set to INSTANT loading,
     *   and the loading strategy in the given is not set to DEFER
     * - the loading strategy in the given options is set to INSTANT
     */
    load(element, options) {
        if (this.shouldLoadInstantly((options || {}).deferLoading)) {
            return of(true);
        }
        else {
            return this.intersectionService.isIntersected(element, options);
        }
    }
    shouldLoadInstantly(elementLoadingStrategy) {
        return (isPlatformServer(this.platformId) ||
            elementLoadingStrategy === DeferLoadingStrategy.INSTANT ||
            (elementLoadingStrategy !== DeferLoadingStrategy.DEFER &&
                this.globalLoadStrategy === DeferLoadingStrategy.INSTANT));
    }
}
DeferLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeferLoaderService, deps: [{ token: PLATFORM_ID }, { token: i1.LayoutConfig }, { token: i2.IntersectionService }], target: i0.ɵɵFactoryTarget.Injectable });
DeferLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeferLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeferLoaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i1.LayoutConfig }, { type: i2.IntersectionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXItbG9hZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9sb2FkaW5nL2RlZmVyLWxvYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OztBQUt0Qzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBRzdCLFlBQytCLFVBQWtCLEVBQ3JDLE1BQW9CLEVBQ3BCLG1CQUF3QztRQUZyQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ3JDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUVsRCxJQUFJLENBQUMsa0JBQWtCO1lBQ3JCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsUUFBUSxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztJQUNyRSxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxDQUNGLE9BQW9CLEVBQ3BCLE9BQTZCO1FBRTdCLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQzFELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUN6QixzQkFBd0Q7UUFFeEQsT0FBTyxDQUNMLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDakMsc0JBQXNCLEtBQUssb0JBQW9CLENBQUMsT0FBTztZQUN2RCxDQUFDLHNCQUFzQixLQUFLLG9CQUFvQixDQUFDLEtBQUs7Z0JBQ3BELElBQUksQ0FBQyxrQkFBa0IsS0FBSyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FDNUQsQ0FBQztJQUNKLENBQUM7OytHQTFDVSxrQkFBa0Isa0JBSW5CLFdBQVc7bUhBSlYsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBS0ksTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWZlckxvYWRpbmdTdHJhdGVneSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2xheW91dC1jb25maWcnO1xuaW1wb3J0IHsgSW50ZXJzZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJzZWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IEludGVyc2VjdGlvblNlcnZpY2UgfSBmcm9tICcuL2ludGVyc2VjdGlvbi5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGUgZGVmZXIgbG9hZGluZyBzZXJpdmNlIGlzIHVzZWQgdG8gZGVmZXIgbG9hZGluZyBvZiBET00gZWxlbWVudHNcbiAqIHVudGlsIHRoZSBlbGVtZW50cyBhcmUgcmVxdWlyZWQgZm9yIHRoZSB1c2VyIGV4cGVyaWVuY2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEZWZlckxvYWRlclNlcnZpY2Uge1xuICBnbG9iYWxMb2FkU3RyYXRlZ3k6IERlZmVyTG9hZGluZ1N0cmF0ZWd5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHByb3RlY3RlZCBjb25maWc6IExheW91dENvbmZpZyxcbiAgICBwcm90ZWN0ZWQgaW50ZXJzZWN0aW9uU2VydmljZTogSW50ZXJzZWN0aW9uU2VydmljZVxuICApIHtcbiAgICB0aGlzLmdsb2JhbExvYWRTdHJhdGVneSA9XG4gICAgICBjb25maWcuZGVmZXJyZWRMb2FkaW5nPy5zdHJhdGVneSA/PyBEZWZlckxvYWRpbmdTdHJhdGVneS5JTlNUQU5UO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmVyIGxvYWRpbmcgdGlsbCB0aGUgZWxlbWVudCBpbnRlcnNlY3RzIHRoZSB2aWV3cG9ydC5cbiAgICpcbiAgICogV2UgZXZhbHVhdGUgd2hldGhlciB3ZSBpbnN0YW50bHkgbG9hZCB0aGUgZWxlbWVudCBmb3IgZGlmZmVyZW50IHJlYXNvbnM6XG4gICAqIC0gd2UgcnVuIGluIFNTUiBtb2RlXG4gICAqIC0gdGhlcmUncyBubyBnbG9iYWwgc3RyYXRlZ3kgZ2l2ZW5cbiAgICogLSB0aGUgZ2xvYmFsIGxvYWRpbmcgc3RyYXRlZ3kgaXMgc2V0IHRvIElOU1RBTlQgbG9hZGluZyxcbiAgICogICBhbmQgdGhlIGxvYWRpbmcgc3RyYXRlZ3kgaW4gdGhlIGdpdmVuIGlzIG5vdCBzZXQgdG8gREVGRVJcbiAgICogLSB0aGUgbG9hZGluZyBzdHJhdGVneSBpbiB0aGUgZ2l2ZW4gb3B0aW9ucyBpcyBzZXQgdG8gSU5TVEFOVFxuICAgKi9cbiAgbG9hZChcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBvcHRpb25zPzogSW50ZXJzZWN0aW9uT3B0aW9uc1xuICApOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICBpZiAodGhpcy5zaG91bGRMb2FkSW5zdGFudGx5KChvcHRpb25zIHx8IHt9KS5kZWZlckxvYWRpbmcpKSB7XG4gICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVyc2VjdGlvblNlcnZpY2UuaXNJbnRlcnNlY3RlZChlbGVtZW50LCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3VsZExvYWRJbnN0YW50bHkoXG4gICAgZWxlbWVudExvYWRpbmdTdHJhdGVneTogRGVmZXJMb2FkaW5nU3RyYXRlZ3kgfCB1bmRlZmluZWRcbiAgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSB8fFxuICAgICAgZWxlbWVudExvYWRpbmdTdHJhdGVneSA9PT0gRGVmZXJMb2FkaW5nU3RyYXRlZ3kuSU5TVEFOVCB8fFxuICAgICAgKGVsZW1lbnRMb2FkaW5nU3RyYXRlZ3kgIT09IERlZmVyTG9hZGluZ1N0cmF0ZWd5LkRFRkVSICYmXG4gICAgICAgIHRoaXMuZ2xvYmFsTG9hZFN0cmF0ZWd5ID09PSBEZWZlckxvYWRpbmdTdHJhdGVneS5JTlNUQU5UKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==