/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContextServiceMap, provideDefaultConfig, SiteContextModule, } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { IconModule } from '../icon/index';
import { LanguageCurrencyComponent } from './language-currency.component';
import { SiteContextComponentService } from './site-context-component.service';
import { SiteContextSelectorComponent } from './site-context-selector.component';
import * as i0 from "@angular/core";
export class SiteContextSelectorModule {
}
SiteContextSelectorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SiteContextSelectorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorModule, declarations: [SiteContextSelectorComponent, LanguageCurrencyComponent], imports: [CommonModule, RouterModule, SiteContextModule, IconModule], exports: [SiteContextSelectorComponent, LanguageCurrencyComponent] });
SiteContextSelectorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CMSSiteContextComponent: {
                    component: SiteContextSelectorComponent,
                    providers: [
                        {
                            provide: SiteContextComponentService,
                            useClass: SiteContextComponentService,
                            deps: [CmsComponentData, ContextServiceMap, Injector],
                        },
                    ],
                },
                LanguageCurrencyComponent: {
                    component: LanguageCurrencyComponent,
                },
            },
        }),
        SiteContextComponentService,
    ], imports: [CommonModule, RouterModule, SiteContextModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextSelectorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, SiteContextModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CMSSiteContextComponent: {
                                    component: SiteContextSelectorComponent,
                                    providers: [
                                        {
                                            provide: SiteContextComponentService,
                                            useClass: SiteContextComponentService,
                                            deps: [CmsComponentData, ContextServiceMap, Injector],
                                        },
                                    ],
                                },
                                LanguageCurrencyComponent: {
                                    component: LanguageCurrencyComponent,
                                },
                            },
                        }),
                        SiteContextComponentService,
                    ],
                    declarations: [SiteContextSelectorComponent, LanguageCurrencyComponent],
                    exports: [SiteContextSelectorComponent, LanguageCurrencyComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZS1jb250ZXh0LXNlbGVjdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9zaXRlLWNvbnRleHQtc2VsZWN0b3Ivc2l0ZS1jb250ZXh0LXNlbGVjdG9yLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQixpQkFBaUIsR0FDbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQTJCakYsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCLGlCQUhyQiw0QkFBNEIsRUFBRSx5QkFBeUIsYUFyQjVELFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxhQXNCekQsNEJBQTRCLEVBQUUseUJBQXlCO3VIQUV0RCx5QkFBeUIsYUF2QnpCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHVCQUF1QixFQUFFO29CQUN2QixTQUFTLEVBQUUsNEJBQTRCO29CQUN2QyxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLDJCQUEyQjs0QkFDcEMsUUFBUSxFQUFFLDJCQUEyQjs0QkFDckMsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO3lCQUN0RDtxQkFDRjtpQkFDRjtnQkFDRCx5QkFBeUIsRUFBRTtvQkFDekIsU0FBUyxFQUFFLHlCQUF5QjtpQkFDckM7YUFDRjtTQUNGLENBQUM7UUFDRiwyQkFBMkI7S0FDNUIsWUFwQlMsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxVQUFVOzJGQXdCeEQseUJBQXlCO2tCQXpCckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsQ0FBQztvQkFDcEUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsdUJBQXVCLEVBQUU7b0NBQ3ZCLFNBQVMsRUFBRSw0QkFBNEI7b0NBQ3ZDLFNBQVMsRUFBRTt3Q0FDVDs0Q0FDRSxPQUFPLEVBQUUsMkJBQTJCOzRDQUNwQyxRQUFRLEVBQUUsMkJBQTJCOzRDQUNyQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUM7eUNBQ3REO3FDQUNGO2lDQUNGO2dDQUNELHlCQUF5QixFQUFFO29DQUN6QixTQUFTLEVBQUUseUJBQXlCO2lDQUNyQzs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLDJCQUEyQjtxQkFDNUI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsNEJBQTRCLEVBQUUseUJBQXlCLENBQUM7b0JBQ3ZFLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixFQUFFLHlCQUF5QixDQUFDO2lCQUNuRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3RvciwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIENvbnRleHRTZXJ2aWNlTWFwLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgU2l0ZUNvbnRleHRNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNDb21wb25lbnREYXRhIH0gZnJvbSAnLi4vLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL21vZGVsL2Ntcy1jb21wb25lbnQtZGF0YSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vaWNvbi9pbmRleCc7XG5pbXBvcnQgeyBMYW5ndWFnZUN1cnJlbmN5Q29tcG9uZW50IH0gZnJvbSAnLi9sYW5ndWFnZS1jdXJyZW5jeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi9zaXRlLWNvbnRleHQtY29tcG9uZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRTZWxlY3RvckNvbXBvbmVudCB9IGZyb20gJy4vc2l0ZS1jb250ZXh0LXNlbGVjdG9yLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgU2l0ZUNvbnRleHRNb2R1bGUsIEljb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ01TU2l0ZUNvbnRleHRDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFNpdGVDb250ZXh0U2VsZWN0b3JDb21wb25lbnQsXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IFNpdGVDb250ZXh0Q29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgdXNlQ2xhc3M6IFNpdGVDb250ZXh0Q29tcG9uZW50U2VydmljZSxcbiAgICAgICAgICAgICAgZGVwczogW0Ntc0NvbXBvbmVudERhdGEsIENvbnRleHRTZXJ2aWNlTWFwLCBJbmplY3Rvcl0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIExhbmd1YWdlQ3VycmVuY3lDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IExhbmd1YWdlQ3VycmVuY3lDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIFNpdGVDb250ZXh0Q29tcG9uZW50U2VydmljZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbU2l0ZUNvbnRleHRTZWxlY3RvckNvbXBvbmVudCwgTGFuZ3VhZ2VDdXJyZW5jeUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtTaXRlQ29udGV4dFNlbGVjdG9yQ29tcG9uZW50LCBMYW5ndWFnZUN1cnJlbmN5Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgU2l0ZUNvbnRleHRTZWxlY3Rvck1vZHVsZSB7fVxuIl19