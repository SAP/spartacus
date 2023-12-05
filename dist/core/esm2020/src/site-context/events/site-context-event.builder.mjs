/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { createFrom } from '../../util/create-from';
import { SiteContextActions } from '../store/actions/index';
import { CurrencySetEvent, LanguageSetEvent } from './site-context.events';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../event/event.service";
/**
 * Builds and registers the site context events
 */
export class SiteContextEventBuilder {
    constructor(actionsSubject, eventService) {
        this.actionsSubject = actionsSubject;
        this.eventService = eventService;
        this.register();
    }
    /**
     * Registers the site context events
     */
    register() {
        this.registerSetLanguage();
        this.registerSetCurrency();
    }
    /**
     * Register the language set action
     */
    registerSetLanguage() {
        const languageEvent$ = this.actionsSubject.pipe(ofType(SiteContextActions.SET_ACTIVE_LANGUAGE), map((languageAction) => createFrom(LanguageSetEvent, {
            activeLanguage: languageAction.payload,
        })));
        this.eventService.register(LanguageSetEvent, languageEvent$);
    }
    /**
     * Register the currency set action
     */
    registerSetCurrency() {
        const currencyEvent$ = this.actionsSubject.pipe(ofType(SiteContextActions.SET_ACTIVE_CURRENCY), map((currencyAction) => createFrom(CurrencySetEvent, {
            activeCurrency: currencyAction.payload,
        })));
        this.eventService.register(CurrencySetEvent, currencyEvent$);
    }
}
SiteContextEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextEventBuilder, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LWV2ZW50LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zaXRlLWNvbnRleHQvZXZlbnRzL3NpdGUtY29udGV4dC1ldmVudC5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUUzRTs7R0FFRztBQUlILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFDWSxjQUE4QixFQUM5QixZQUEwQjtRQUQxQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFcEMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7T0FFRztJQUNPLFFBQVE7UUFDaEIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUJBQW1CO1FBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QyxNQUFNLENBQ0osa0JBQWtCLENBQUMsbUJBQW1CLENBQ3ZDLEVBQ0QsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FDckIsVUFBVSxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLGNBQWMsRUFBRSxjQUFjLENBQUMsT0FBTztTQUN2QyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBQ08sbUJBQW1CO1FBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QyxNQUFNLENBQ0osa0JBQWtCLENBQUMsbUJBQW1CLENBQ3ZDLEVBQ0QsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FDckIsVUFBVSxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLGNBQWMsRUFBRSxjQUFjLENBQUMsT0FBTztTQUN2QyxDQUFDLENBQ0gsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7b0hBbERVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCLGNBRnRCLE1BQU07MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi9ldmVudC9ldmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IGNyZWF0ZUZyb20gfSBmcm9tICcuLi8uLi91dGlsL2NyZWF0ZS1mcm9tJztcbmltcG9ydCB7IFNpdGVDb250ZXh0QWN0aW9ucyB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvaW5kZXgnO1xuaW1wb3J0IHsgQ3VycmVuY3lTZXRFdmVudCwgTGFuZ3VhZ2VTZXRFdmVudCB9IGZyb20gJy4vc2l0ZS1jb250ZXh0LmV2ZW50cyc7XG5cbi8qKlxuICogQnVpbGRzIGFuZCByZWdpc3RlcnMgdGhlIHNpdGUgY29udGV4dCBldmVudHNcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNpdGVDb250ZXh0RXZlbnRCdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGlvbnNTdWJqZWN0OiBBY3Rpb25zU3ViamVjdCxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyB0aGUgc2l0ZSBjb250ZXh0IGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJTZXRMYW5ndWFnZSgpO1xuICAgIHRoaXMucmVnaXN0ZXJTZXRDdXJyZW5jeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIHRoZSBsYW5ndWFnZSBzZXQgYWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJTZXRMYW5ndWFnZSgpOiB2b2lkIHtcbiAgICBjb25zdCBsYW5ndWFnZUV2ZW50JCA9IHRoaXMuYWN0aW9uc1N1YmplY3QucGlwZShcbiAgICAgIG9mVHlwZTxTaXRlQ29udGV4dEFjdGlvbnMuU2V0QWN0aXZlTGFuZ3VhZ2U+KFxuICAgICAgICBTaXRlQ29udGV4dEFjdGlvbnMuU0VUX0FDVElWRV9MQU5HVUFHRVxuICAgICAgKSxcbiAgICAgIG1hcCgobGFuZ3VhZ2VBY3Rpb24pID0+XG4gICAgICAgIGNyZWF0ZUZyb20oTGFuZ3VhZ2VTZXRFdmVudCwge1xuICAgICAgICAgIGFjdGl2ZUxhbmd1YWdlOiBsYW5ndWFnZUFjdGlvbi5wYXlsb2FkLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgICB0aGlzLmV2ZW50U2VydmljZS5yZWdpc3RlcihMYW5ndWFnZVNldEV2ZW50LCBsYW5ndWFnZUV2ZW50JCk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgdGhlIGN1cnJlbmN5IHNldCBhY3Rpb25cbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlclNldEN1cnJlbmN5KCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbmN5RXZlbnQkID0gdGhpcy5hY3Rpb25zU3ViamVjdC5waXBlKFxuICAgICAgb2ZUeXBlPFNpdGVDb250ZXh0QWN0aW9ucy5TZXRBY3RpdmVDdXJyZW5jeT4oXG4gICAgICAgIFNpdGVDb250ZXh0QWN0aW9ucy5TRVRfQUNUSVZFX0NVUlJFTkNZXG4gICAgICApLFxuICAgICAgbWFwKChjdXJyZW5jeUFjdGlvbikgPT5cbiAgICAgICAgY3JlYXRlRnJvbShDdXJyZW5jeVNldEV2ZW50LCB7XG4gICAgICAgICAgYWN0aXZlQ3VycmVuY3k6IGN1cnJlbmN5QWN0aW9uLnBheWxvYWQsXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuZXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKEN1cnJlbmN5U2V0RXZlbnQsIGN1cnJlbmN5RXZlbnQkKTtcbiAgfVxufVxuIl19