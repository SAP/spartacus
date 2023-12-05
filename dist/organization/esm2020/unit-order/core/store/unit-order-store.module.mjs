/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { reducerProvider, reducerToken } from './reducers/index';
import { UNIT_ORDER_FEATURE } from './unit-order-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class UnitOrderStoreModule {
}
UnitOrderStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, imports: [i1.StoreFeatureModule, i2.EffectsFeatureModule] });
UnitOrderStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, providers: [reducerProvider], imports: [StoreModule.forFeature(UNIT_ORDER_FEATURE, reducerToken),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        StoreModule.forFeature(UNIT_ORDER_FEATURE, reducerToken),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [reducerProvider],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1zdG9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvY29yZS9zdG9yZS91bml0LW9yZGVyLXN0b3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7QUFTeEQsTUFBTSxPQUFPLG9CQUFvQjs7aUhBQXBCLG9CQUFvQjtrSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsYUFGcEIsQ0FBQyxlQUFlLENBQUMsWUFIMUIsV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUM7UUFDeEQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7MkZBSXhCLG9CQUFvQjtrQkFQaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUM7d0JBQ3hELGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO3FCQUNsQztvQkFDRCxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVmZmVjdHNNb2R1bGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IFN0b3JlTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgZWZmZWN0cyB9IGZyb20gJy4vZWZmZWN0cy9pbmRleCc7XG5pbXBvcnQgeyByZWR1Y2VyUHJvdmlkZXIsIHJlZHVjZXJUb2tlbiB9IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgVU5JVF9PUkRFUl9GRUFUVVJFIH0gZnJvbSAnLi91bml0LW9yZGVyLXN0YXRlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoVU5JVF9PUkRFUl9GRUFUVVJFLCByZWR1Y2VyVG9rZW4pLFxuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShlZmZlY3RzKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbcmVkdWNlclByb3ZpZGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdE9yZGVyU3RvcmVNb2R1bGUge31cbiJdfQ==