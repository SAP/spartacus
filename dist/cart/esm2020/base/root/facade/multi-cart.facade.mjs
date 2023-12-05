/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class MultiCartFacade {
}
MultiCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: MultiCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getCart',
            'getCarts',
            'getCartEntity',
            'isStable',
            'createCart',
            'mergeToCurrentCart',
            'loadCart',
            'getEntries',
            'getLastEntry',
            'addEntry',
            'addEntries',
            'removeEntry',
            'updateEntry',
            'getEntry',
            'assignEmail',
            'removeCart',
            'deleteCart',
            'reloadCart',
            'getCartIdByType',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: MultiCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getCart',
                            'getCarts',
                            'getCartEntity',
                            'isStable',
                            'createCart',
                            'mergeToCurrentCart',
                            'loadCart',
                            'getEntries',
                            'getLastEntry',
                            'addEntry',
                            'addEntries',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                            'assignEmail',
                            'removeCart',
                            'deleteCart',
                            'reloadCart',
                            'getCartIdByType',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL3Jvb3QvZmFjYWRlL211bHRpLWNhcnQuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFpQ3pELE1BQU0sT0FBZ0IsZUFBZTs7NEdBQWYsZUFBZTtnSEFBZixlQUFlLGNBN0J2QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUU7WUFDUCxTQUFTO1lBQ1QsVUFBVTtZQUNWLGVBQWU7WUFDZixVQUFVO1lBQ1YsWUFBWTtZQUNaLG9CQUFvQjtZQUNwQixVQUFVO1lBQ1YsWUFBWTtZQUNaLGNBQWM7WUFDZCxVQUFVO1lBQ1YsWUFBWTtZQUNaLGFBQWE7WUFDYixhQUFhO1lBQ2IsVUFBVTtZQUNWLGFBQWE7WUFDYixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWixpQkFBaUI7U0FDbEI7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLGVBQWU7a0JBOUJwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0saUJBQWlCO3dCQUN2QixPQUFPLEVBQUUsc0JBQXNCO3dCQUMvQixPQUFPLEVBQUU7NEJBQ1AsU0FBUzs0QkFDVCxVQUFVOzRCQUNWLGVBQWU7NEJBQ2YsVUFBVTs0QkFDVixZQUFZOzRCQUNaLG9CQUFvQjs0QkFDcEIsVUFBVTs0QkFDVixZQUFZOzRCQUNaLGNBQWM7NEJBQ2QsVUFBVTs0QkFDVixZQUFZOzRCQUNaLGFBQWE7NEJBQ2IsYUFBYTs0QkFDYixVQUFVOzRCQUNWLGFBQWE7NEJBQ2IsWUFBWTs0QkFDWixZQUFZOzRCQUNaLFlBQVk7NEJBQ1osaUJBQWlCO3lCQUNsQjt3QkFDRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSwgU3RhdGVVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDQVJUX0JBU0VfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IENhcnQsIENhcnRUeXBlLCBPcmRlckVudHJ5IH0gZnJvbSAnLi4vbW9kZWxzL2NhcnQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogTXVsdGlDYXJ0RmFjYWRlLFxuICAgICAgZmVhdHVyZTogQ0FSVF9CQVNFX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFtcbiAgICAgICAgJ2dldENhcnQnLFxuICAgICAgICAnZ2V0Q2FydHMnLFxuICAgICAgICAnZ2V0Q2FydEVudGl0eScsXG4gICAgICAgICdpc1N0YWJsZScsXG4gICAgICAgICdjcmVhdGVDYXJ0JyxcbiAgICAgICAgJ21lcmdlVG9DdXJyZW50Q2FydCcsXG4gICAgICAgICdsb2FkQ2FydCcsXG4gICAgICAgICdnZXRFbnRyaWVzJyxcbiAgICAgICAgJ2dldExhc3RFbnRyeScsXG4gICAgICAgICdhZGRFbnRyeScsXG4gICAgICAgICdhZGRFbnRyaWVzJyxcbiAgICAgICAgJ3JlbW92ZUVudHJ5JyxcbiAgICAgICAgJ3VwZGF0ZUVudHJ5JyxcbiAgICAgICAgJ2dldEVudHJ5JyxcbiAgICAgICAgJ2Fzc2lnbkVtYWlsJyxcbiAgICAgICAgJ3JlbW92ZUNhcnQnLFxuICAgICAgICAnZGVsZXRlQ2FydCcsXG4gICAgICAgICdyZWxvYWRDYXJ0JyxcbiAgICAgICAgJ2dldENhcnRJZEJ5VHlwZScsXG4gICAgICBdLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE11bHRpQ2FydEZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgZnJvbSBzdG9yZSBhcyBhbiBvYnNlcnZhYmxlXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGFic3RyYWN0IGdldENhcnQoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBjYXJ0cyBmcm9tIHN0b3JlIGFzIGFuIG9ic2VydmFibGVcbiAgICpcbiAgICovXG4gIGFic3RyYWN0IGdldENhcnRzKCk6IE9ic2VydmFibGU8Q2FydFtdPjtcblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IGVudGl0eSBmcm9tIHN0b3JlIChjYXJ0IHdpdGggbG9hZGluZywgZXJyb3IsIHN1Y2Nlc3MgZmxhZ3MpIGFzIGFuIG9ic2VydmFibGVcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q2FydEVudGl0eShcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q2FydCB8IHVuZGVmaW5lZD4+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiB0aGVyZSBhcmUgbm8gb3BlcmF0aW9ucyBvbiB0aGF0IGluIHByb2dyZXNzIGFuZCBpdCBpcyBub3QgY3VycmVudGx5IGxvYWRpbmdcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgYWJzdHJhY3QgaXNTdGFibGUoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgb3IgbWVyZ2UgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIE9iamVjdCB3aXRoIHVzZXJJZCwgb2xkQ2FydElkLCB0b01lcmdlQ2FydEd1aWQgYW5kIGV4dHJhRGF0YVxuICAgKi9cbiAgYWJzdHJhY3QgY3JlYXRlQ2FydCh7XG4gICAgdXNlcklkLFxuICAgIG9sZENhcnRJZCxcbiAgICB0b01lcmdlQ2FydEd1aWQsXG4gICAgZXh0cmFEYXRhLFxuICB9OiB7XG4gICAgdXNlcklkOiBzdHJpbmc7XG4gICAgb2xkQ2FydElkPzogc3RyaW5nO1xuICAgIHRvTWVyZ2VDYXJ0R3VpZD86IHN0cmluZztcbiAgICBleHRyYURhdGE/OiB7XG4gICAgICBhY3RpdmU/OiBib29sZWFuO1xuICAgIH07XG4gIH0pOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIC8qKlxuICAgKiBNZXJnZSBwcm92aWRlZCBjYXJ0IHRvIGN1cnJlbnQgdXNlciBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBwYXJhbXMgT2JqZWN0IHdpdGggdXNlcklkLCBjYXJ0SWQgYW5kIGV4dHJhRGF0YVxuICAgKi9cbiAgYWJzdHJhY3QgbWVyZ2VUb0N1cnJlbnRDYXJ0KHtcbiAgICB1c2VySWQsXG4gICAgY2FydElkLFxuICAgIGV4dHJhRGF0YSxcbiAgfToge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIGNhcnRJZDogc3RyaW5nO1xuICAgIGV4dHJhRGF0YT86IHtcbiAgICAgIGFjdGl2ZT86IGJvb2xlYW47XG4gICAgfTtcbiAgfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIExvYWQgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gcGFyYW1zIE9iamVjdCB3aXRoIHVzZXJJZCwgY2FydElkIGFuZCBleHRyYURhdGFcbiAgICovXG4gIGFic3RyYWN0IGxvYWRDYXJ0KHtcbiAgICBjYXJ0SWQsXG4gICAgdXNlcklkLFxuICAgIGV4dHJhRGF0YSxcbiAgfToge1xuICAgIGNhcnRJZDogc3RyaW5nO1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIGV4dHJhRGF0YT86IGFueTtcbiAgfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCBjYXJ0IGVudHJpZXMgYXMgYW4gb2JzZXJ2YWJsZVxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqL1xuICBhYnN0cmFjdCBnZXRFbnRyaWVzKGNhcnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+O1xuXG4gIC8qKlxuICAgKiBHZXQgbGFzdCBlbnRyeSBmb3Igc3BlY2lmaWMgcHJvZHVjdCBjb2RlIGZyb20gY2FydC5cbiAgICogTmVlZGVkIHRvIGNvdmVyIHByb2Nlc3NlcyB3aGVyZSBtdWx0aXBsZSBlbnRyaWVzIGNhbiBzaGFyZSB0aGUgc2FtZSBwcm9kdWN0IGNvZGVcbiAgICogKGUuZy4gcHJvbW90aW9ucyBvciBjb25maWd1cmFibGUgcHJvZHVjdHMpXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRMYXN0RW50cnkoXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBBZGQgZW50cnkgdG8gY2FydFxuICAgKlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKiBAcGFyYW0gcGlja3VwU3RvcmVcbiAgICovXG4gIGFic3RyYWN0IGFkZEVudHJ5KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgcXVhbnRpdHk6IG51bWJlcixcbiAgICBwaWNrdXBTdG9yZT86IHN0cmluZ1xuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBBZGQgbXVsdGlwbGUgZW50cmllcyB0byBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWRcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcGFyYW0gcHJvZHVjdHMgQXJyYXkgd2l0aCBpdGVtcyAocHJvZHVjdENvZGUgYW5kIHF1YW50aXR5KVxuICAgKi9cbiAgYWJzdHJhY3QgYWRkRW50cmllcyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBwcm9kdWN0czogQXJyYXk8eyBwcm9kdWN0Q29kZTogc3RyaW5nOyBxdWFudGl0eTogbnVtYmVyIH0+XG4gICk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBlbnRyeSBmcm9tIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqIEBwYXJhbSBlbnRyeU51bWJlclxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlRW50cnkoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY2FydElkOiBzdHJpbmcsXG4gICAgZW50cnlOdW1iZXI6IG51bWJlclxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgZW50cnkgaW4gY2FydC4gRm9yIHF1YW50aXR5ID0gMCBpdCByZW1vdmVzIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSB1c2VySWRcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcGFyYW0gZW50cnlOdW1iZXJcbiAgICogQHBhcmFtIHF1YW50aXR5XG4gICAqL1xuICBhYnN0cmFjdCB1cGRhdGVFbnRyeShcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBlbnRyeU51bWJlcjogbnVtYmVyLFxuICAgIHF1YW50aXR5PzogbnVtYmVyLFxuICAgIHBpY2t1cFN0b3JlPzogc3RyaW5nLFxuICAgIHBpY2t1cFRvRGVsaXZlcnk/OiBib29sZWFuXG4gICk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldCBmaXJzdCBlbnRyeSBmcm9tIGNhcnQgbWF0Y2hpbmcgdGhlIHNwZWNpZmllZCBwcm9kdWN0IGNvZGVcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICovXG4gIGFic3RyYWN0IGdldEVudHJ5KFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogQXNzaWduIGVtYWlsIHRvIHRoZSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHBhcmFtIHVzZXJJZFxuICAgKiBAcGFyYW0gZW1haWxcbiAgICovXG4gIGFic3RyYWN0IGFzc2lnbkVtYWlsKGNhcnRJZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZywgZW1haWw6IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjYXJ0XG4gICAqXG4gICAqIFJlbW92ZXMgdGhlIGNhcnQgZnJvbSB0aGUgc3RhdGUuXG4gICAqIFRvIHJlbW92ZSBhIGNhcnQgZnJvbSB0aGUgc3RhdGUgYW5kIGJhY2stZW5kLCBwbGVhc2UgdXNlIGBEZWxldGVDYXJ0YCBhY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGFic3RyYWN0IHJlbW92ZUNhcnQoY2FydElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBEZWxldGUgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqIEBwYXJhbSB1c2VySWRcbiAgICovXG4gIGFic3RyYWN0IGRlbGV0ZUNhcnQoY2FydElkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogUmVsb2FkcyB0aGUgY2FydCB3aXRoIHNwZWNpZmllZCBpZC5cbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcGFyYW0gZXh0cmFEYXRhXG4gICAqL1xuICBhYnN0cmFjdCByZWxvYWRDYXJ0KGNhcnRJZDogc3RyaW5nLCBleHRyYURhdGE/OiB7IGFjdGl2ZTogYm9vbGVhbiB9KTogdm9pZDtcblxuICAvKipcbiAgICogR2V0IHRoZSBjYXJ0IGlkIGJhc2VkIG9uIGNhcnQgdHlwZVxuICAgKlxuICAgKiBAcGFyYW0gY2FydFR5cGVcbiAgICovXG4gIGFic3RyYWN0IGdldENhcnRJZEJ5VHlwZShjYXJ0VHlwZTogQ2FydFR5cGUpOiBPYnNlcnZhYmxlPHN0cmluZz47XG59XG4iXX0=