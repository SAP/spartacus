/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { PageComponentModule } from '@spartacus/storefront';
import { AsmEnablerService } from './services/asm-enabler.service';
import * as i0 from "@angular/core";
/**
 * The ASM loader module takes care of loading the ASM UI
 * only in case there's a reason to do so.
 */
export class AsmLoaderModule {
}
AsmLoaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmLoaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, imports: [CommonModule, PageComponentModule] });
AsmLoaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: asmFactory,
            deps: [AsmEnablerService],
            multi: true,
        },
    ], imports: [CommonModule, PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PageComponentModule],
                    providers: [
                        {
                            provide: APP_INITIALIZER,
                            useFactory: asmFactory,
                            deps: [AsmEnablerService],
                            multi: true,
                        },
                    ],
                }]
        }] });
/**
 *
 * We do not like to block the UI, which is why we delgate loading of ASM
 * to a real component; the router and state aren't available in an optimized
 * way during the APP_INITIALIZER.
 */
export function asmFactory(asmEnablerService) {
    const isReady = () => {
        asmEnablerService.load();
    };
    return isReady;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWxvYWRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL3Jvb3QvYXNtLWxvYWRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFFbkU7OztHQUdHO0FBWUgsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxZQVZoQixZQUFZLEVBQUUsbUJBQW1COzZHQVVoQyxlQUFlLGFBVGY7UUFDVDtZQUNFLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLElBQUksRUFBRSxDQUFDLGlCQUFpQixDQUFDO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQVJTLFlBQVksRUFBRSxtQkFBbUI7MkZBVWhDLGVBQWU7a0JBWDNCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO29CQUM1QyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGVBQWU7NEJBQ3hCLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixJQUFJLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzs0QkFDekIsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0Y7O0FBR0Q7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLGlCQUFvQztJQUM3RCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDbkIsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBUFBfSU5JVElBTElaRVIsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlQ29tcG9uZW50TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEFzbUVuYWJsZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hc20tZW5hYmxlci5zZXJ2aWNlJztcblxuLyoqXG4gKiBUaGUgQVNNIGxvYWRlciBtb2R1bGUgdGFrZXMgY2FyZSBvZiBsb2FkaW5nIHRoZSBBU00gVUlcbiAqIG9ubHkgaW4gY2FzZSB0aGVyZSdzIGEgcmVhc29uIHRvIGRvIHNvLlxuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQYWdlQ29tcG9uZW50TW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogYXNtRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtBc21FbmFibGVyU2VydmljZV0sXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21Mb2FkZXJNb2R1bGUge31cblxuLyoqXG4gKlxuICogV2UgZG8gbm90IGxpa2UgdG8gYmxvY2sgdGhlIFVJLCB3aGljaCBpcyB3aHkgd2UgZGVsZ2F0ZSBsb2FkaW5nIG9mIEFTTVxuICogdG8gYSByZWFsIGNvbXBvbmVudDsgdGhlIHJvdXRlciBhbmQgc3RhdGUgYXJlbid0IGF2YWlsYWJsZSBpbiBhbiBvcHRpbWl6ZWRcbiAqIHdheSBkdXJpbmcgdGhlIEFQUF9JTklUSUFMSVpFUi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzbUZhY3RvcnkoYXNtRW5hYmxlclNlcnZpY2U6IEFzbUVuYWJsZXJTZXJ2aWNlKTogKCkgPT4gdm9pZCB7XG4gIGNvbnN0IGlzUmVhZHkgPSAoKSA9PiB7XG4gICAgYXNtRW5hYmxlclNlcnZpY2UubG9hZCgpO1xuICB9O1xuICByZXR1cm4gaXNSZWFkeTtcbn1cbiJdfQ==