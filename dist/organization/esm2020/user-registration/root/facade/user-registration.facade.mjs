/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORGANIZATION_USER_REGISTRATION_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserRegistrationFacade {
}
UserRegistrationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserRegistrationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserRegistrationFacade,
        feature: ORGANIZATION_USER_REGISTRATION_FEATURE,
        methods: ['registerUser'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserRegistrationFacade,
                        feature: ORGANIZATION_USER_REGISTRATION_FEATURE,
                        methods: ['registerUser'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24uZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi91c2VyLXJlZ2lzdHJhdGlvbi9yb290L2ZhY2FkZS91c2VyLXJlZ2lzdHJhdGlvbi5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2hELE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVd6RSxNQUFNLE9BQWdCLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjt1SEFBdEIsc0JBQXNCLGNBUjlCLE1BQU0sY0FDTixHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7UUFDWixNQUFNLEVBQUUsc0JBQXNCO1FBQzlCLE9BQU8sRUFBRSxzQ0FBc0M7UUFDL0MsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO0tBQzFCLENBQUM7MkZBRWdCLHNCQUFzQjtrQkFUM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLHdCQUF3Qjt3QkFDOUIsT0FBTyxFQUFFLHNDQUFzQzt3QkFDL0MsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO3FCQUMxQixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uIH0gZnJvbSAnLi4vbW9kZWwvdXNlci1yZWdpc3RyYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX1VTRVJfUkVHSVNUUkFUSU9OX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IE9SR0FOSVpBVElPTl9VU0VSX1JFR0lTVFJBVElPTl9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydyZWdpc3RlclVzZXInXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXNlclJlZ2lzdHJhdGlvbkZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIG5ldyBvcmdhbml6YXRpb24gdXNlci5cbiAgICpcbiAgICogQHBhcmFtIHVzZXIgYXMgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvblxuICAgKi9cbiAgYWJzdHJhY3QgcmVnaXN0ZXJVc2VyKFxuICAgIHVzZXI6IE9yZ2FuaXphdGlvblVzZXJSZWdpc3RyYXRpb25cbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uPjtcbn1cbiJdfQ==