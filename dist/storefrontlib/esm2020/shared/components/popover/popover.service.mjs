/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
export class PopoverService {
    /**
     * For a11y improvements method returns different `FocusConfig`
     * based on which event popover was triggered.
     */
    getFocusConfig(event, appendToBody) {
        let config = {};
        if (event === PopoverEvent.OPEN_BY_KEYBOARD && appendToBody) {
            config = {
                trap: true,
                block: true,
                focusOnEscape: false,
                autofocus: true,
            };
        }
        return config;
    }
    setFocusOnElement(element, focusConfig, appendToBody) {
        if (focusConfig && appendToBody) {
            element.nativeElement.focus();
        }
    }
}
PopoverService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PopoverService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PopoverService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBSy9DLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7T0FHRztJQUNILGNBQWMsQ0FBQyxLQUFtQixFQUFFLFlBQXFCO1FBQ3ZELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUVoQixJQUFJLEtBQUssS0FBSyxZQUFZLENBQUMsZ0JBQWdCLElBQUksWUFBWSxFQUFFO1lBQzNELE1BQU0sR0FBRztnQkFDUCxJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsSUFBSTtnQkFDWCxhQUFhLEVBQUUsS0FBSztnQkFDcEIsU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQztTQUNIO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGlCQUFpQixDQUNmLE9BQW1CLEVBQ25CLFdBQXdCLEVBQ3hCLFlBQXNCO1FBRXRCLElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtZQUMvQixPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7MkdBNUJVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFBvcG92ZXJFdmVudCB9IGZyb20gJy4vcG9wb3Zlci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBGb3IgYTExeSBpbXByb3ZlbWVudHMgbWV0aG9kIHJldHVybnMgZGlmZmVyZW50IGBGb2N1c0NvbmZpZ2BcbiAgICogYmFzZWQgb24gd2hpY2ggZXZlbnQgcG9wb3ZlciB3YXMgdHJpZ2dlcmVkLlxuICAgKi9cbiAgZ2V0Rm9jdXNDb25maWcoZXZlbnQ6IFBvcG92ZXJFdmVudCwgYXBwZW5kVG9Cb2R5OiBib29sZWFuKTogRm9jdXNDb25maWcge1xuICAgIGxldCBjb25maWcgPSB7fTtcblxuICAgIGlmIChldmVudCA9PT0gUG9wb3ZlckV2ZW50Lk9QRU5fQllfS0VZQk9BUkQgJiYgYXBwZW5kVG9Cb2R5KSB7XG4gICAgICBjb25maWcgPSB7XG4gICAgICAgIHRyYXA6IHRydWUsXG4gICAgICAgIGJsb2NrOiB0cnVlLFxuICAgICAgICBmb2N1c09uRXNjYXBlOiBmYWxzZSxcbiAgICAgICAgYXV0b2ZvY3VzOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgc2V0Rm9jdXNPbkVsZW1lbnQoXG4gICAgZWxlbWVudDogRWxlbWVudFJlZixcbiAgICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWcsXG4gICAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhblxuICApIHtcbiAgICBpZiAoZm9jdXNDb25maWcgJiYgYXBwZW5kVG9Cb2R5KSB7XG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==