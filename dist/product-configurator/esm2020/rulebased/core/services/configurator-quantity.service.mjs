/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorQuantityService
 */
export class ConfiguratorQuantityService {
    constructor() {
        this._quantity = new ReplaySubject(1);
    }
    /**
     * Sets the configuration quantity.
     *
     * @param quantity
     */
    setQuantity(quantity) {
        this._quantity.next(quantity);
    }
    /**
     * Retrieves the configuration quantity.
     *
     * @returns {Observable<number>} - Configuration quantity.
     */
    getQuantity() {
        return this._quantity;
    }
}
ConfiguratorQuantityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorQuantityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXF1YW50aXR5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvcmUvc2VydmljZXMvY29uZmlndXJhdG9yLXF1YW50aXR5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFakQ7O0dBRUc7QUFJSCxNQUFNLE9BQU8sMkJBQTJCO0lBSHhDO1FBSVUsY0FBUyxHQUF1QixJQUFJLGFBQWEsQ0FBUyxDQUFDLENBQUMsQ0FBQztLQW1CdEU7SUFqQkM7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxRQUFnQjtRQUNoQyxJQUFJLENBQUMsU0FBbUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxXQUFXO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzt3SEFuQlUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG4vKipcbiAqIFRvIGltcGxlbWVudCBjdXN0b20gc29sdXRpb24gcHJvdmlkZSB5b3VyIG93biBpbXBsZW1lbnRhdGlvbiBhbmQgY3VzdG9taXplIHNlcnZpY2VzIHRoYXQgdXNlIENvbmZpZ3VyYXRvclF1YW50aXR5U2VydmljZVxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yUXVhbnRpdHlTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcXVhbnRpdHk6IE9ic2VydmFibGU8bnVtYmVyPiA9IG5ldyBSZXBsYXlTdWJqZWN0PG51bWJlcj4oMSk7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGNvbmZpZ3VyYXRpb24gcXVhbnRpdHkuXG4gICAqXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKi9cbiAgcHVibGljIHNldFF1YW50aXR5KHF1YW50aXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAodGhpcy5fcXVhbnRpdHkgYXMgUmVwbGF5U3ViamVjdDxudW1iZXI+KS5uZXh0KHF1YW50aXR5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGNvbmZpZ3VyYXRpb24gcXVhbnRpdHkuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPG51bWJlcj59IC0gQ29uZmlndXJhdGlvbiBxdWFudGl0eS5cbiAgICovXG4gIHB1YmxpYyBnZXRRdWFudGl0eSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9xdWFudGl0eTtcbiAgfVxufVxuIl19