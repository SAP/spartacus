/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_SAVED_CART_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class SavedCartFacade {
}
SavedCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: SavedCartFacade,
        feature: CART_SAVED_CART_CORE_FEATURE,
        methods: [
            'editSavedCart',
            'deleteSavedCart',
            'getSavedCart',
            'getSavedCartList',
            'loadSavedCart',
            'clearCloneSavedCart',
            'clearRestoreSavedCart',
            'clearSaveCart',
            'clearSavedCarts',
            'get',
            'getList',
            'getCloneSavedCartProcessError',
            'getCloneSavedCartProcessLoading',
            'getCloneSavedCartProcessSuccess',
            'getRestoreSavedCartProcessError',
            'getRestoreSavedCartProcessLoading',
            'getRestoreSavedCartProcessSuccess',
            'getSaveCartProcessError',
            'getSaveCartProcessLoading',
            'getSaveCartProcessSuccess',
            'getSavedCartListProcess',
            'getSavedCartListProcessLoading',
            'isStable',
            'cloneSavedCart',
            'loadSavedCarts',
            'restoreSavedCart',
            'saveCart',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: SavedCartFacade,
                        feature: CART_SAVED_CART_CORE_FEATURE,
                        methods: [
                            'editSavedCart',
                            'deleteSavedCart',
                            'getSavedCart',
                            'getSavedCartList',
                            'loadSavedCart',
                            'clearCloneSavedCart',
                            'clearRestoreSavedCart',
                            'clearSaveCart',
                            'clearSavedCarts',
                            'get',
                            'getList',
                            'getCloneSavedCartProcessError',
                            'getCloneSavedCartProcessLoading',
                            'getCloneSavedCartProcessSuccess',
                            'getRestoreSavedCartProcessError',
                            'getRestoreSavedCartProcessLoading',
                            'getRestoreSavedCartProcessSuccess',
                            'getSaveCartProcessError',
                            'getSaveCartProcessLoading',
                            'getSaveCartProcessSuccess',
                            'getSavedCartListProcess',
                            'getSavedCartListProcessLoading',
                            'isStable',
                            'cloneSavedCart',
                            'loadSavedCarts',
                            'restoreSavedCart',
                            'saveCart',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9zYXZlZC1jYXJ0L3Jvb3QvZmFjYWRlL3NhdmVkLWNhcnQuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUF3Qy9ELE1BQU0sT0FBZ0IsZUFBZTs7NEdBQWYsZUFBZTtnSEFBZixlQUFlLGNBckN2QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGVBQWU7UUFDdkIsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUU7WUFDUCxlQUFlO1lBQ2YsaUJBQWlCO1lBQ2pCLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsZUFBZTtZQUNmLHFCQUFxQjtZQUNyQix1QkFBdUI7WUFDdkIsZUFBZTtZQUNmLGlCQUFpQjtZQUNqQixLQUFLO1lBQ0wsU0FBUztZQUNULCtCQUErQjtZQUMvQixpQ0FBaUM7WUFDakMsaUNBQWlDO1lBQ2pDLGlDQUFpQztZQUNqQyxtQ0FBbUM7WUFDbkMsbUNBQW1DO1lBQ25DLHlCQUF5QjtZQUN6QiwyQkFBMkI7WUFDM0IsMkJBQTJCO1lBQzNCLHlCQUF5QjtZQUN6QixnQ0FBZ0M7WUFDaEMsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLFVBQVU7U0FDWDtRQUNELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQzsyRkFFZ0IsZUFBZTtrQkF0Q3BDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxpQkFBaUI7d0JBQ3ZCLE9BQU8sRUFBRSw0QkFBNEI7d0JBQ3JDLE9BQU8sRUFBRTs0QkFDUCxlQUFlOzRCQUNmLGlCQUFpQjs0QkFDakIsY0FBYzs0QkFDZCxrQkFBa0I7NEJBQ2xCLGVBQWU7NEJBQ2YscUJBQXFCOzRCQUNyQix1QkFBdUI7NEJBQ3ZCLGVBQWU7NEJBQ2YsaUJBQWlCOzRCQUNqQixLQUFLOzRCQUNMLFNBQVM7NEJBQ1QsK0JBQStCOzRCQUMvQixpQ0FBaUM7NEJBQ2pDLGlDQUFpQzs0QkFDakMsaUNBQWlDOzRCQUNqQyxtQ0FBbUM7NEJBQ25DLG1DQUFtQzs0QkFDbkMseUJBQXlCOzRCQUN6QiwyQkFBMkI7NEJBQzNCLDJCQUEyQjs0QkFDM0IseUJBQXlCOzRCQUN6QixnQ0FBZ0M7NEJBQ2hDLFVBQVU7NEJBQ1YsZ0JBQWdCOzRCQUNoQixnQkFBZ0I7NEJBQ2hCLGtCQUFrQjs0QkFDbEIsVUFBVTt5QkFDWDt3QkFDRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSwgU3RhdGVVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDQVJUX1NBVkVEX0NBUlRfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IFNhdmVkQ2FydEZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IENBUlRfU0FWRURfQ0FSVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdlZGl0U2F2ZWRDYXJ0JyxcbiAgICAgICAgJ2RlbGV0ZVNhdmVkQ2FydCcsXG4gICAgICAgICdnZXRTYXZlZENhcnQnLFxuICAgICAgICAnZ2V0U2F2ZWRDYXJ0TGlzdCcsXG4gICAgICAgICdsb2FkU2F2ZWRDYXJ0JyxcbiAgICAgICAgJ2NsZWFyQ2xvbmVTYXZlZENhcnQnLFxuICAgICAgICAnY2xlYXJSZXN0b3JlU2F2ZWRDYXJ0JyxcbiAgICAgICAgJ2NsZWFyU2F2ZUNhcnQnLFxuICAgICAgICAnY2xlYXJTYXZlZENhcnRzJyxcbiAgICAgICAgJ2dldCcsXG4gICAgICAgICdnZXRMaXN0JyxcbiAgICAgICAgJ2dldENsb25lU2F2ZWRDYXJ0UHJvY2Vzc0Vycm9yJyxcbiAgICAgICAgJ2dldENsb25lU2F2ZWRDYXJ0UHJvY2Vzc0xvYWRpbmcnLFxuICAgICAgICAnZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzU3VjY2VzcycsXG4gICAgICAgICdnZXRSZXN0b3JlU2F2ZWRDYXJ0UHJvY2Vzc0Vycm9yJyxcbiAgICAgICAgJ2dldFJlc3RvcmVTYXZlZENhcnRQcm9jZXNzTG9hZGluZycsXG4gICAgICAgICdnZXRSZXN0b3JlU2F2ZWRDYXJ0UHJvY2Vzc1N1Y2Nlc3MnLFxuICAgICAgICAnZ2V0U2F2ZUNhcnRQcm9jZXNzRXJyb3InLFxuICAgICAgICAnZ2V0U2F2ZUNhcnRQcm9jZXNzTG9hZGluZycsXG4gICAgICAgICdnZXRTYXZlQ2FydFByb2Nlc3NTdWNjZXNzJyxcbiAgICAgICAgJ2dldFNhdmVkQ2FydExpc3RQcm9jZXNzJyxcbiAgICAgICAgJ2dldFNhdmVkQ2FydExpc3RQcm9jZXNzTG9hZGluZycsXG4gICAgICAgICdpc1N0YWJsZScsXG4gICAgICAgICdjbG9uZVNhdmVkQ2FydCcsXG4gICAgICAgICdsb2FkU2F2ZWRDYXJ0cycsXG4gICAgICAgICdyZXN0b3JlU2F2ZWRDYXJ0JyxcbiAgICAgICAgJ3NhdmVDYXJ0JyxcbiAgICAgIF0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2F2ZWRDYXJ0RmFjYWRlIHtcbiAgLyoqXG4gICAqIExvYWRzIGEgc2luZ2xlIHNhdmVkIGNhcnRcbiAgICovXG4gIGFic3RyYWN0IGxvYWRTYXZlZENhcnQoY2FydElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgc2luZ2xlIHNhdmVkIGNhcnRcbiAgICogaXQgd29uJ3QgZW1pdCBpZiB0aGUgZGVsZXRlIHNhdmVkIGNhcnQgZXZlbnQgZ2V0cyB0cmlnZ2VyZWQgdG8gYXZvaWQgcmFjZSBjb25kaXRpb24gYmV0d2VlbiBhY3Rpb25zXG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSB3aXRoIGNhcnRcbiAgICovXG4gIGFic3RyYWN0IGdldChjYXJ0SWQ6IHN0cmluZyk6IE9ic2VydmFibGU8Q2FydCB8IHVuZGVmaW5lZD47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNlbGVjdGVkIGNhcnQgc3RhdGVcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIG9mIHNlbGVjdGVkIGNhcnQgd2l0aCBsb2FkZXIgc3RhdGVcbiAgICovXG4gIGFic3RyYWN0IGdldFNhdmVkQ2FydChcbiAgICBjYXJ0SWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuUHJvY2Vzc2VzTG9hZGVyU3RhdGU8Q2FydCB8IHVuZGVmaW5lZD4+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiB0aGVyZSBhcmUgbm8gb3BlcmF0aW9ucyBvbiB0aGF0IGluIHByb2dyZXNzIGFuZCBpdCBpcyBub3QgY3VycmVudGx5IGxvYWRpbmdcbiAgICpcbiAgICogQHBhcmFtIGNhcnRJZFxuICAgKi9cbiAgYWJzdHJhY3QgaXNTdGFibGUoY2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBMb2FkcyBhIGxpc3Qgb2Ygc2F2ZWQgY2FydHNcbiAgICovXG4gIGFic3RyYWN0IGxvYWRTYXZlZENhcnRzKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBhYnN0cmFjdCBnZXRMaXN0KCk6IE9ic2VydmFibGU8Q2FydFtdPjtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2Ygc2F2ZWQgY2FydHMgZnJvbSBhbGwgY2FydHMgaW4gdGhlIHN0YXRlXG4gICAqIGJ5IGZpbHRlcmluZyB0aHJvdWdoIHRoZSBjYXJ0cyB0aGF0IGFyZSBub3Qgd2lzaGxpc3QgYW5kIG5vdCBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTYXZlZENhcnRMaXN0KCk6IE9ic2VydmFibGU8Q2FydFtdPjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBmbGFnIG9mIGdldHRpbmcgYSBsaXN0IG9mIHNhdmVkIGNhcnRzXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTYXZlZENhcnRMaXN0UHJvY2Vzc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiBnZXR0aW5nIGEgbGlzdCBvZiBzYXZlZCBjYXJ0c1xuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGVyIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTYXZlZENhcnRMaXN0UHJvY2VzcygpOiBPYnNlcnZhYmxlPFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8YW55Pj47XG5cbiAgLyoqXG4gICAqIENsZWFycyB0aGUgcHJvY2VzcyBzdGF0ZSBvZiBwZXJmb3JtaW5nIGEgc2F2ZWQgY2FydFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJTYXZlZENhcnRzKCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgcmVzdG9yZSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGFic3RyYWN0IHJlc3RvcmVTYXZlZENhcnQoY2FydElkOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsb2FkaW5nIHN0YXRlIG9mIHJlc3RvcmluZyBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRSZXN0b3JlU2F2ZWRDYXJ0UHJvY2Vzc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogR2V0cyB0aGUgc3VjY2VzcyBzdGF0ZSBvZiByZXN0b3Jpbmcgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgc3VjY2VzcyBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UmVzdG9yZVNhdmVkQ2FydFByb2Nlc3NTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIHJlc3RvcmluZyBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UmVzdG9yZVNhdmVkQ2FydFByb2Nlc3NFcnJvcigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHByb2Nlc3Mgc3RhdGUgb2YgcGVyZm9ybWluZyBhIHJlc3RvcmUgc2F2ZWQgY2FydFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJSZXN0b3JlU2F2ZWRDYXJ0KCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGRlbGV0ZSBzYXZlZCBjYXJ0XG4gICAqIEBwYXJhbSBjYXJ0SWRcbiAgICovXG4gIGFic3RyYWN0IGRlbGV0ZVNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgc2F2ZWQgY2FydFxuICAgKlxuICAgKi9cbiAgYWJzdHJhY3Qgc2F2ZUNhcnQoe1xuICAgIGNhcnRJZCxcbiAgICBzYXZlQ2FydE5hbWUsXG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbixcbiAgfToge1xuICAgIGNhcnRJZDogc3RyaW5nO1xuICAgIHNhdmVDYXJ0TmFtZT86IHN0cmluZztcbiAgICBzYXZlQ2FydERlc2NyaXB0aW9uPzogc3RyaW5nO1xuICB9KTogdm9pZDtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiBzYXZpbmcgYSBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBsb2FkaW5nIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRTYXZlQ2FydFByb2Nlc3NMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHN1Y2Nlc3Mgc3RhdGUgb2Ygc2F2aW5nIGEgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgc3VjY2VzcyBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0U2F2ZUNhcnRQcm9jZXNzU3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBlcnJvciBzdGF0ZSBvZiBzYXZpbmcgYSBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0U2F2ZUNhcnRQcm9jZXNzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBwcm9jZXNzIHN0YXRlIG9mIHBlcmZvcm1pbmcgYSBzYXZlIGNhcnRcbiAgICovXG4gIGFic3RyYWN0IGNsZWFyU2F2ZUNhcnQoKTogdm9pZDtcblxuICAvKipcbiAgICogVHJpZ2dlcnMgYW4gZWRpdCBzYXZlZCBjYXJ0XG4gICAqXG4gICAqL1xuICBhYnN0cmFjdCBlZGl0U2F2ZWRDYXJ0KHtcbiAgICBjYXJ0SWQsXG4gICAgc2F2ZUNhcnROYW1lLFxuICAgIHNhdmVDYXJ0RGVzY3JpcHRpb24sXG4gIH06IHtcbiAgICBjYXJ0SWQ6IHN0cmluZztcbiAgICBzYXZlQ2FydE5hbWU/OiBzdHJpbmc7XG4gICAgc2F2ZUNhcnREZXNjcmlwdGlvbj86IHN0cmluZztcbiAgfSk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIGEgY2xvbmUgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gY2FydElkXG4gICAqL1xuICBhYnN0cmFjdCBjbG9uZVNhdmVkQ2FydChjYXJ0SWQ6IHN0cmluZywgc2F2ZUNhcnROYW1lPzogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogR2V0cyB0aGUgbG9hZGluZyBzdGF0ZSBvZiBjbG9uaW5nIGEgc2F2ZWQgY2FydFxuICAgKlxuICAgKiBAcmV0dXJucyBvYnNlcnZhYmxlIHdpdGggYm9vbGVhbiBvZiB0aGUgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzdWNjZXNzIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBzdWNjZXNzIHN0YXRlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRDbG9uZVNhdmVkQ2FydFByb2Nlc3NTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGVycm9yIHN0YXRlIG9mIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgd2l0aCBib29sZWFuIG9mIHRoZSBlcnJvciBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q2xvbmVTYXZlZENhcnRQcm9jZXNzRXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBwcm9jZXNzIHN0YXRlIGNsb25pbmcgYSBzYXZlZCBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBjbGVhckNsb25lU2F2ZWRDYXJ0KCk6IHZvaWQ7XG59XG4iXX0=