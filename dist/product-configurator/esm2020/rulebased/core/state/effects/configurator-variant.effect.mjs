/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { LoggerService, normalizeHttpError } from '@spartacus/core';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { ConfiguratorActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/rulebased-configurator.connector";
import * as i3 from "../../config/configurator-core.config";
/**
 * Rulebased configurator effects related to variant search
 */
export class ConfiguratorVariantEffects {
    constructor(actions$, configuratorCommonsConnector, configuratorCoreConfig) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.configuratorCoreConfig = configuratorCoreConfig;
        this.logger = inject(LoggerService);
        this.searchVariants$ = createEffect(() => this.actions$.pipe(ofType(ConfiguratorActions.SEARCH_VARIANTS), filter(() => this.configuratorCoreConfig.productConfigurator
            ?.enableVariantSearch === true), filter((action) => action.payload.owner.configuratorType === "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */), switchMap((action) => {
            return this.configuratorCommonsConnector
                .searchVariants(action.payload)
                .pipe(switchMap((result) => [
                new ConfiguratorActions.SearchVariantsSuccess({
                    ownerKey: action.payload.owner.key,
                    variants: result,
                }),
            ]), catchError((error) => [
                new ConfiguratorActions.SearchVariantsFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
    }
}
ConfiguratorVariantEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects, deps: [{ token: i1.Actions }, { token: i2.RulebasedConfiguratorConnector }, { token: i3.ConfiguratorCoreConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorVariantEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.RulebasedConfiguratorConnector }, { type: i3.ConfiguratorCoreConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXZhcmlhbnQuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb3JlL3N0YXRlL2VmZmVjdHMvY29uZmlndXJhdG9yLXZhcmlhbnQuZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQVcsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHcEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBR3ZEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDBCQUEwQjtJQXVDckMsWUFDWSxRQUFpQixFQUNqQiw0QkFBNEQsRUFDNUQsc0JBQThDO1FBRjlDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUFnQztRQUM1RCwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBekNoRCxXQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXpDLG9CQUFlLEdBR1gsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxFQUMzQyxNQUFNLENBQ0osR0FBRyxFQUFFLENBQ0gsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQjtZQUM3QyxFQUFFLG1CQUFtQixLQUFLLElBQUksQ0FDbkMsRUFDRCxNQUFNLENBQ0osQ0FBQyxNQUEwQyxFQUFFLEVBQUUsQ0FDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLHFEQUE2QixDQUNyRSxFQUNELFNBQVMsQ0FBQyxDQUFDLE1BQTBDLEVBQUUsRUFBRTtZQUN2RCxPQUFPLElBQUksQ0FBQyw0QkFBNEI7aUJBQ3JDLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2lCQUM5QixJQUFJLENBQ0gsU0FBUyxDQUFDLENBQUMsTUFBOEIsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksbUJBQW1CLENBQUMscUJBQXFCLENBQUM7b0JBQzVDLFFBQVEsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHO29CQUNsQyxRQUFRLEVBQUUsTUFBTTtpQkFDakIsQ0FBQzthQUNILENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDO29CQUN6QyxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRztvQkFDbEMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUM5QyxDQUFDO2FBQ0gsQ0FBQyxDQUNILENBQUM7UUFDTixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFNQyxDQUFDOzt1SEEzQ08sMEJBQTBCOzJIQUExQiwwQkFBMEI7MkZBQTFCLDBCQUEwQjtrQkFKdEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UsIG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUeXBlIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2NvbmZpZ3VyYXRvci1jb3JlLmNvbmZpZyc7XG5pbXBvcnQgeyBSdWxlYmFzZWRDb25maWd1cmF0b3JDb25uZWN0b3IgfSBmcm9tICcuLi8uLi9jb25uZWN0b3JzL3J1bGViYXNlZC1jb25maWd1cmF0b3IuY29ubmVjdG9yJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvciB9IGZyb20gJy4uLy4uL21vZGVsL2NvbmZpZ3VyYXRvci5tb2RlbCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5cbkBJbmplY3RhYmxlKClcbi8qKlxuICogUnVsZWJhc2VkIGNvbmZpZ3VyYXRvciBlZmZlY3RzIHJlbGF0ZWQgdG8gdmFyaWFudCBzZWFyY2hcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclZhcmlhbnRFZmZlY3RzIHtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBzZWFyY2hWYXJpYW50cyQ6IE9ic2VydmFibGU8XG4gICAgfCBDb25maWd1cmF0b3JBY3Rpb25zLlNlYXJjaFZhcmlhbnRzU3VjY2Vzc1xuICAgIHwgQ29uZmlndXJhdG9yQWN0aW9ucy5TZWFyY2hWYXJpYW50c0ZhaWxcbiAgPiA9IGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgIHRoaXMuYWN0aW9ucyQucGlwZShcbiAgICAgIG9mVHlwZShDb25maWd1cmF0b3JBY3Rpb25zLlNFQVJDSF9WQVJJQU5UUyksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgdGhpcy5jb25maWd1cmF0b3JDb3JlQ29uZmlnLnByb2R1Y3RDb25maWd1cmF0b3JcbiAgICAgICAgICAgID8uZW5hYmxlVmFyaWFudFNlYXJjaCA9PT0gdHJ1ZVxuICAgICAgKSxcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKGFjdGlvbjogQ29uZmlndXJhdG9yQWN0aW9ucy5TZWFyY2hWYXJpYW50cykgPT5cbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZC5vd25lci5jb25maWd1cmF0b3JUeXBlID09PSBDb25maWd1cmF0b3JUeXBlLlZBUklBTlRcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbjogQ29uZmlndXJhdG9yQWN0aW9ucy5TZWFyY2hWYXJpYW50cykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0b3JDb21tb25zQ29ubmVjdG9yXG4gICAgICAgICAgLnNlYXJjaFZhcmlhbnRzKGFjdGlvbi5wYXlsb2FkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgc3dpdGNoTWFwKChyZXN1bHQ6IENvbmZpZ3VyYXRvci5WYXJpYW50W10pID0+IFtcbiAgICAgICAgICAgICAgbmV3IENvbmZpZ3VyYXRvckFjdGlvbnMuU2VhcmNoVmFyaWFudHNTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICBvd25lcktleTogYWN0aW9uLnBheWxvYWQub3duZXIua2V5LFxuICAgICAgICAgICAgICAgIHZhcmlhbnRzOiByZXN1bHQsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gW1xuICAgICAgICAgICAgICBuZXcgQ29uZmlndXJhdG9yQWN0aW9ucy5TZWFyY2hWYXJpYW50c0ZhaWwoe1xuICAgICAgICAgICAgICAgIG93bmVyS2V5OiBhY3Rpb24ucGF5bG9hZC5vd25lci5rZXksXG4gICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcm90ZWN0ZWQgY29uZmlndXJhdG9yQ29tbW9uc0Nvbm5lY3RvcjogUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29ubmVjdG9yLFxuICAgIHByb3RlY3RlZCBjb25maWd1cmF0b3JDb3JlQ29uZmlnOiBDb25maWd1cmF0b3JDb3JlQ29uZmlnXG4gICkge31cbn1cbiJdfQ==