/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CONFIGURATION_TEXTFIELD_FEATURE } from './configuration-textfield-state';
import { configuratorTextfieldEffects } from './effects/index';
import { configuratorTextfieldReducerProvider, configuratorTextfieldReducerToken, } from './reducers/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class ConfiguratorTextfieldStoreModule {
}
ConfiguratorTextfieldStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorTextfieldStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
ConfiguratorTextfieldStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, providers: [configuratorTextfieldReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(CONFIGURATION_TEXTFIELD_FEATURE, configuratorTextfieldReducerToken),
        EffectsModule.forFeature(configuratorTextfieldEffects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(CONFIGURATION_TEXTFIELD_FEATURE, configuratorTextfieldReducerToken),
                        EffectsModule.forFeature(configuratorTextfieldEffects),
                    ],
                    providers: [configuratorTextfieldReducerProvider],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXRleHRmaWVsZC1zdG9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvdGV4dGZpZWxkL2NvcmUvc3RhdGUvY29uZmlndXJhdG9yLXRleHRmaWVsZC1zdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0QsT0FBTyxFQUNMLG9DQUFvQyxFQUNwQyxpQ0FBaUMsR0FDbEMsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQWUxQixNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDOzhIQUFoQyxnQ0FBZ0MsWUFYekMsWUFBWTtRQUVaLFdBQVc7OEhBU0YsZ0NBQWdDLGFBRmhDLENBQUMsb0NBQW9DLENBQUMsWUFUL0MsWUFBWTtRQUVaLFdBQVc7UUFDWCxXQUFXLENBQUMsVUFBVSxDQUNwQiwrQkFBK0IsRUFDL0IsaUNBQWlDLENBQ2xDO1FBQ0QsYUFBYSxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQzsyRkFJN0MsZ0NBQWdDO2tCQWI1QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUVaLFdBQVc7d0JBQ1gsV0FBVyxDQUFDLFVBQVUsQ0FDcEIsK0JBQStCLEVBQy9CLGlDQUFpQyxDQUNsQzt3QkFDRCxhQUFhLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDO3FCQUN2RDtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IFN0b3JlTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgU3RhdGVNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ09ORklHVVJBVElPTl9URVhURklFTERfRkVBVFVSRSB9IGZyb20gJy4vY29uZmlndXJhdGlvbi10ZXh0ZmllbGQtc3RhdGUnO1xuaW1wb3J0IHsgY29uZmlndXJhdG9yVGV4dGZpZWxkRWZmZWN0cyB9IGZyb20gJy4vZWZmZWN0cy9pbmRleCc7XG5pbXBvcnQge1xuICBjb25maWd1cmF0b3JUZXh0ZmllbGRSZWR1Y2VyUHJvdmlkZXIsXG4gIGNvbmZpZ3VyYXRvclRleHRmaWVsZFJlZHVjZXJUb2tlbixcbn0gZnJvbSAnLi9yZWR1Y2Vycy9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG5cbiAgICBTdGF0ZU1vZHVsZSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKFxuICAgICAgQ09ORklHVVJBVElPTl9URVhURklFTERfRkVBVFVSRSxcbiAgICAgIGNvbmZpZ3VyYXRvclRleHRmaWVsZFJlZHVjZXJUb2tlblxuICAgICksXG4gICAgRWZmZWN0c01vZHVsZS5mb3JGZWF0dXJlKGNvbmZpZ3VyYXRvclRleHRmaWVsZEVmZmVjdHMpLFxuICBdLFxuICBwcm92aWRlcnM6IFtjb25maWd1cmF0b3JUZXh0ZmllbGRSZWR1Y2VyUHJvdmlkZXJdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JUZXh0ZmllbGRTdG9yZU1vZHVsZSB7fVxuIl19