/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { USER_PROFILE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class UserPasswordFacade {
}
UserPasswordFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UserPasswordFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: UserPasswordFacade,
        feature: USER_PROFILE_CORE_FEATURE,
        methods: ['update', 'reset', 'requestForgotPasswordEmail'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPasswordFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: UserPasswordFacade,
                        feature: USER_PROFILE_CORE_FEATURE,
                        methods: ['update', 'reset', 'requestForgotPasswordEmail'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wYXNzd29yZC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL3Jvb3QvZmFjYWRlL3VzZXItcGFzc3dvcmQuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFXNUQsTUFBTSxPQUFnQixrQkFBa0I7OytHQUFsQixrQkFBa0I7bUhBQWxCLGtCQUFrQixjQVIxQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGtCQUFrQjtRQUMxQixPQUFPLEVBQUUseUJBQXlCO1FBQ2xDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLENBQUM7S0FDM0QsQ0FBQzsyRkFFZ0Isa0JBQWtCO2tCQVR2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sb0JBQW9CO3dCQUMxQixPQUFPLEVBQUUseUJBQXlCO3dCQUNsQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixDQUFDO3FCQUMzRCxDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBVU0VSX1BST0ZJTEVfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IFVzZXJQYXNzd29yZEZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IFVTRVJfUFJPRklMRV9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbJ3VwZGF0ZScsICdyZXNldCcsICdyZXF1ZXN0Rm9yZ290UGFzc3dvcmRFbWFpbCddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVc2VyUGFzc3dvcmRGYWNhZGUge1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgcGFzc3dvcmQgZm9yIHRoZSB1c2VyXG4gICAqXG4gICAqIFRoZSBtZXRob2QgcmV0dXJucyBhbiBvYnNlcnZhYmxlIHdpdGggYExvYWRlclN0YXRlYCBpbmZvcm1hdGlvbiwgaW5jbHVkaW5nIHRoZVxuICAgKiBhY3R1YWwgdXNlciBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0gb2xkUGFzc3dvcmQgdGhlIGN1cnJlbnQgcGFzc3dvcmQgdGhhdCB3aWxsIGJlIGNoYW5nZWRcbiAgICogQHBhcmFtIG5ld1Bhc3N3b3JkIHRoZSBuZXcgcGFzc3dvcmRcbiAgICovXG4gIGFic3RyYWN0IHVwZGF0ZShcbiAgICBvbGRQYXNzd29yZDogc3RyaW5nLFxuICAgIG5ld1Bhc3N3b3JkOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPjtcblxuICAvKipcbiAgICogUmVzZXQgbmV3IHBhc3N3b3JkLiBQYXJ0IG9mIHRoZSBmb3Jnb3QgcGFzc3dvcmQgZmxvdy5cbiAgICpcbiAgICogQHBhcmFtIHRva2VuXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgYWJzdHJhY3QgcmVzZXQodG9rZW46IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyk6IE9ic2VydmFibGU8dW5rbm93bj47XG5cbiAgLypcbiAgICogUmVxdWVzdCBhbiBlbWFpbCB0byByZXNldCBhIGZvcmdvdHRlbiBwYXNzd29yZC5cbiAgICovXG4gIGFic3RyYWN0IHJlcXVlc3RGb3Jnb3RQYXNzd29yZEVtYWlsKGVtYWlsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVua25vd24+O1xufVxuIl19