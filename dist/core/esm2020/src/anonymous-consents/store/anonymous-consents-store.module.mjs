/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { ANONYMOUS_CONSENTS_STORE_FEATURE } from './anonymous-consents-state';
import { effects } from './effects/index';
import { metaReducers, reducerProvider, reducerToken } from './reducers/index';
import { AnonymousConsentsStatePersistenceService } from '../services/anonymous-consents-state-persistence.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export function anonymousConsentsStatePersistenceFactory(anonymousConsentsStatePersistenceService) {
    const result = () => anonymousConsentsStatePersistenceService.initSync();
    return result;
}
export class AnonymousConsentsStoreModule {
}
AnonymousConsentsStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AnonymousConsentsStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStoreModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
AnonymousConsentsStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStoreModule, providers: [
        reducerProvider,
        {
            provide: APP_INITIALIZER,
            useFactory: anonymousConsentsStatePersistenceFactory,
            deps: [AnonymousConsentsStatePersistenceService],
            multi: true,
        },
    ], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(ANONYMOUS_CONSENTS_STORE_FEATURE, reducerToken, {
            metaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AnonymousConsentsStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(ANONYMOUS_CONSENTS_STORE_FEATURE, reducerToken, {
                            metaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [
                        reducerProvider,
                        {
                            provide: APP_INITIALIZER,
                            useFactory: anonymousConsentsStatePersistenceFactory,
                            deps: [AnonymousConsentsStatePersistenceService],
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5vbnltb3VzLWNvbnNlbnRzLXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Fub255bW91cy1jb25zZW50cy9zdG9yZS9hbm9ueW1vdXMtY29uc2VudHMtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDMUMsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sMERBQTBELENBQUM7Ozs7QUFFcEgsTUFBTSxVQUFVLHdDQUF3QyxDQUN0RCx3Q0FBa0Y7SUFFbEYsTUFBTSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsd0NBQXdDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDekUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXFCRCxNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsWUFqQnJDLFlBQVk7UUFDWixXQUFXOzBIQWdCRiw0QkFBNEIsYUFWNUI7UUFDVCxlQUFlO1FBQ2Y7WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsd0NBQXdDO1lBQ3BELElBQUksRUFBRSxDQUFDLHdDQUF3QyxDQUFDO1lBQ2hELEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQWZDLFlBQVk7UUFDWixXQUFXO1FBQ1gsV0FBVyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSxZQUFZLEVBQUU7WUFDckUsWUFBWTtTQUNiLENBQUM7UUFDRixhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQzsyRkFZeEIsNEJBQTRCO2tCQW5CeEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLEVBQUUsWUFBWSxFQUFFOzRCQUNyRSxZQUFZO3lCQUNiLENBQUM7d0JBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRTt3QkFDVCxlQUFlO3dCQUNmOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixVQUFVLEVBQUUsd0NBQXdDOzRCQUNwRCxJQUFJLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQzs0QkFDaEQsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZU1vZHVsZSB9IGZyb20gJy4uLy4uL3N0YXRlL3N0YXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBBTk9OWU1PVVNfQ09OU0VOVFNfU1RPUkVfRkVBVFVSRSB9IGZyb20gJy4vYW5vbnltb3VzLWNvbnNlbnRzLXN0YXRlJztcbmltcG9ydCB7IGVmZmVjdHMgfSBmcm9tICcuL2VmZmVjdHMvaW5kZXgnO1xuaW1wb3J0IHsgbWV0YVJlZHVjZXJzLCByZWR1Y2VyUHJvdmlkZXIsIHJlZHVjZXJUb2tlbiB9IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgQW5vbnltb3VzQ29uc2VudHNTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Fub255bW91cy1jb25zZW50cy1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGFub255bW91c0NvbnNlbnRzU3RhdGVQZXJzaXN0ZW5jZUZhY3RvcnkoXG4gIGFub255bW91c0NvbnNlbnRzU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IEFub255bW91c0NvbnNlbnRzU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Vcbik6ICgpID0+IHZvaWQge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PiBhbm9ueW1vdXNDb25zZW50c1N0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLmluaXRTeW5jKCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU3RhdGVNb2R1bGUsXG4gICAgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZShBTk9OWU1PVVNfQ09OU0VOVFNfU1RPUkVfRkVBVFVSRSwgcmVkdWNlclRva2VuLCB7XG4gICAgICBtZXRhUmVkdWNlcnMsXG4gICAgfSksXG4gICAgRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlKGVmZmVjdHMpLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICByZWR1Y2VyUHJvdmlkZXIsXG4gICAge1xuICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgdXNlRmFjdG9yeTogYW5vbnltb3VzQ29uc2VudHNTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtBbm9ueW1vdXNDb25zZW50c1N0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFub255bW91c0NvbnNlbnRzU3RvcmVNb2R1bGUge31cbiJdfQ==