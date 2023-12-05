/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, inject, NgModule, Optional, } from '@angular/core';
import { LoggerService } from '../logger';
import { LazyModulesService } from './lazy-modules.service';
import { MODULE_INITIALIZER } from './tokens';
import * as i0 from "@angular/core";
export function moduleInitializersFactory(lazyModuleService, moduleInitializerFunctions) {
    const logger = inject(LoggerService);
    return () => {
        return Promise.all(lazyModuleService.runModuleInitializerFunctions(moduleInitializerFunctions)).catch((error) => {
            logger.error('MODULE_INITIALIZER promise was rejected during app initialization.', error);
            throw error;
        });
    };
}
export class LazyLoadingModule {
    static forRoot() {
        return {
            ngModule: LazyLoadingModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: moduleInitializersFactory,
                    deps: [LazyModulesService, [new Optional(), MODULE_INITIALIZER]],
                    multi: true,
                },
            ],
        };
    }
}
LazyLoadingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyLoadingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
LazyLoadingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: LazyLoadingModule });
LazyLoadingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyLoadingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LazyLoadingModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1sb2FkaW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xhenktbG9hZGluZy9sYXp5LWxvYWRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsZUFBZSxFQUNmLE1BQU0sRUFFTixRQUFRLEVBQ1IsUUFBUSxHQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sVUFBVSxDQUFDOztBQUU5QyxNQUFNLFVBQVUseUJBQXlCLENBQ3ZDLGlCQUFxQyxFQUNyQywwQkFBeUM7SUFFekMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixpQkFBaUIsQ0FBQyw2QkFBNkIsQ0FDN0MsMEJBQTBCLENBQzNCLENBQ0YsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNoQixNQUFNLENBQUMsS0FBSyxDQUNWLG9FQUFvRSxFQUNwRSxLQUFLLENBQ04sQ0FBQztZQUNGLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBR0QsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLHlCQUF5QjtvQkFDckMsSUFBSSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQ2hFLEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7OEdBYlUsaUJBQWlCOytHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBBUFBfSU5JVElBTElaRVIsXG4gIGluamVjdCxcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExvZ2dlclNlcnZpY2UgfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHsgTGF6eU1vZHVsZXNTZXJ2aWNlIH0gZnJvbSAnLi9sYXp5LW1vZHVsZXMuc2VydmljZSc7XG5pbXBvcnQgeyBNT0RVTEVfSU5JVElBTElaRVIgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVJbml0aWFsaXplcnNGYWN0b3J5KFxuICBsYXp5TW9kdWxlU2VydmljZTogTGF6eU1vZHVsZXNTZXJ2aWNlLFxuICBtb2R1bGVJbml0aWFsaXplckZ1bmN0aW9uczogKCgpID0+IGFueSlbXVxuKTogKCkgPT4gYW55IHtcbiAgY29uc3QgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIGxhenlNb2R1bGVTZXJ2aWNlLnJ1bk1vZHVsZUluaXRpYWxpemVyRnVuY3Rpb25zKFxuICAgICAgICBtb2R1bGVJbml0aWFsaXplckZ1bmN0aW9uc1xuICAgICAgKVxuICAgICkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgICdNT0RVTEVfSU5JVElBTElaRVIgcHJvbWlzZSB3YXMgcmVqZWN0ZWQgZHVyaW5nIGFwcCBpbml0aWFsaXphdGlvbi4nLFxuICAgICAgICBlcnJvclxuICAgICAgKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0pO1xuICB9O1xufVxuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgTGF6eUxvYWRpbmdNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPExhenlMb2FkaW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBMYXp5TG9hZGluZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQVBQX0lOSVRJQUxJWkVSLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IG1vZHVsZUluaXRpYWxpemVyc0ZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0xhenlNb2R1bGVzU2VydmljZSwgW25ldyBPcHRpb25hbCgpLCBNT0RVTEVfSU5JVElBTElaRVJdXSxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19