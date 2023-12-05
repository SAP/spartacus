/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserRegisterFacade {
}
UserRegisterFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserRegisterFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserRegisterFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['register', 'registerGuest', 'getTitles'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegisterFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserRegisterFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['register', 'registerGuest', 'getTitles'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3Rlci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL3Jvb3QvZmFjYWRlL3VzZXItcmVnaXN0ZXIuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUloRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFXNUQsTUFBTSxPQUFnQixrQkFBa0I7OytHQUFsQixrQkFBa0I7bUhBQWxCLGtCQUFrQixjQVIxQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDO0tBQ3BELENBQUM7MkZBRWdCLGtCQUFrQjtrQkFUdkMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLG9CQUFvQjt3QkFDMUIsT0FBTyxFQUFFLHlCQUF5Qjt3QkFDbEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxXQUFXLENBQUM7cUJBQ3BELENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRpdGxlLCBVc2VyU2lnblVwIH0gZnJvbSAnLi4vbW9kZWwvdXNlci1wcm9maWxlLm1vZGVsJztcbmltcG9ydCB7IFVTRVJfUFJPRklMRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogVXNlclJlZ2lzdGVyRmFjYWRlLFxuICAgICAgZmVhdHVyZTogVVNFUl9QUk9GSUxFX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFsncmVnaXN0ZXInLCAncmVnaXN0ZXJHdWVzdCcsICdnZXRUaXRsZXMnXSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXNlclJlZ2lzdGVyRmFjYWRlIHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIuXG4gICAqXG4gICAqIEBwYXJhbSBzdWJtaXRGb3JtRGF0YSBhcyBVc2VyUmVnaXN0ZXJGb3JtRGF0YVxuICAgKi9cbiAgYWJzdHJhY3QgcmVnaXN0ZXIodXNlcjogVXNlclNpZ25VcCk6IE9ic2VydmFibGU8VXNlcj47XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgbmV3IHVzZXIgZnJvbSBndWVzdC5cbiAgICpcbiAgICogQHBhcmFtIGd1aWRcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqL1xuICBhYnN0cmFjdCByZWdpc3Rlckd1ZXN0KGd1aWQ6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlcj47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGl0bGVzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHRoZSB1c2VyIHByb2ZpbGVzLlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0VGl0bGVzKCk6IE9ic2VydmFibGU8VGl0bGVbXT47XG59XG4iXX0=