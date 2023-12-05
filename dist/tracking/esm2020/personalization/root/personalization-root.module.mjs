/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { defaultPersonalizationConfig } from './config/default-personalization-config';
import { PERSONALIZATION_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultPersonalizationComponentsConfig() {
    const config = {
        featureModules: {
            [PERSONALIZATION_FEATURE]: {
                cmsComponents: ['PersonalizationScriptComponent'],
            },
        },
    };
    return config;
}
export class PersonalizationRootModule {
}
PersonalizationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PersonalizationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule });
PersonalizationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultPersonalizationConfig),
        provideDefaultConfigFactory(defaultPersonalizationComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersonalizationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultPersonalizationConfig),
                        provideDefaultConfigFactory(defaultPersonalizationComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uYWxpemF0aW9uLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9yb290L3BlcnNvbmFsaXphdGlvbi1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBRUwsb0JBQW9CLEVBQ3BCLDJCQUEyQixHQUM1QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFFekQsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSxzQ0FBc0M7SUFDcEQsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO2dCQUN6QixhQUFhLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQzthQUNsRDtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFTRCxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUI7dUhBQXpCLHlCQUF5QixhQU56QjtRQUNULEdBQUcsWUFBWTtRQUNmLG9CQUFvQixDQUFDLDRCQUE0QixDQUFDO1FBQ2xELDJCQUEyQixDQUFDLHNDQUFzQyxDQUFDO0tBQ3BFOzJGQUVVLHlCQUF5QjtrQkFQckMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxZQUFZO3dCQUNmLG9CQUFvQixDQUFDLDRCQUE0QixDQUFDO3dCQUNsRCwyQkFBMkIsQ0FBQyxzQ0FBc0MsQ0FBQztxQkFDcEU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdFBlcnNvbmFsaXphdGlvbkNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtcGVyc29uYWxpemF0aW9uLWNvbmZpZyc7XG5pbXBvcnQgeyBQRVJTT05BTElaQVRJT05fRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IGludGVyY2VwdG9ycyB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMvaW5kZXgnO1xuXG4vLyBUT0RPOiBJbmxpbmUgdGhpcyBmYWN0b3J5IHdoZW4gd2Ugc3RhcnQgcmVsZWFzaW5nIEl2eSBjb21waWxlZCBsaWJyYXJpZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UGVyc29uYWxpemF0aW9uQ29tcG9uZW50c0NvbmZpZygpOiBDbXNDb25maWcge1xuICBjb25zdCBjb25maWc6IENtc0NvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW1BFUlNPTkFMSVpBVElPTl9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbJ1BlcnNvbmFsaXphdGlvblNjcmlwdENvbXBvbmVudCddLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmludGVyY2VwdG9ycyxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0UGVyc29uYWxpemF0aW9uQ29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFBlcnNvbmFsaXphdGlvbkNvbXBvbmVudHNDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQZXJzb25hbGl6YXRpb25Sb290TW9kdWxlIHt9XG4iXX0=