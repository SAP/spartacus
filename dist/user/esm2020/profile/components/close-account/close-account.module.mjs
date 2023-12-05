/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { IconModule, KeyboardFocusModule, SpinnerModule, } from '@spartacus/storefront';
import { CloseAccountModalComponent } from './components/close-account-modal/close-account-modal.component';
import { defaultCloseDialogModalLayoutConfig } from './components/close-account-modal/default-close-account-modal-layout.config';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import * as i0 from "@angular/core";
export class CloseAccountModule {
}
CloseAccountModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CloseAccountModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, declarations: [CloseAccountComponent, CloseAccountModalComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule] });
CloseAccountModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CloseAccountComponent: {
                    component: CloseAccountComponent,
                    guards: [AuthGuard],
                },
            },
        }),
        provideDefaultConfig(defaultCloseDialogModalLayoutConfig),
    ], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        SpinnerModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CloseAccountModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        SpinnerModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CloseAccountComponent: {
                                    component: CloseAccountComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                        provideDefaultConfig(defaultCloseDialogModalLayoutConfig),
                    ],
                    declarations: [CloseAccountComponent, CloseAccountModalComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2UtYWNjb3VudC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdXNlci9wcm9maWxlL2NvbXBvbmVudHMvY2xvc2UtYWNjb3VudC9jbG9zZS1hY2NvdW50Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxTQUFTLEVBRVQsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixTQUFTLEdBQ1YsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsVUFBVSxFQUNWLG1CQUFtQixFQUNuQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUM1RyxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSw0RUFBNEUsQ0FBQztBQUNqSSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7QUF5QjNGLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFGZCxxQkFBcUIsRUFBRSwwQkFBMEIsYUFuQjlELFlBQVk7UUFDWixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixVQUFVO1FBQ1YsYUFBYTtRQUNiLG1CQUFtQjtnSEFlVixrQkFBa0IsYUFibEI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IscUJBQXFCLEVBQUU7b0JBQ3JCLFNBQVMsRUFBRSxxQkFBcUI7b0JBQ2hDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7UUFDRixvQkFBb0IsQ0FBQyxtQ0FBbUMsQ0FBQztLQUMxRCxZQWxCQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsVUFBVTtRQUNWLGFBQWE7UUFDYixtQkFBbUI7MkZBZVYsa0JBQWtCO2tCQXZCOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixVQUFVO3dCQUNWLGFBQWE7d0JBQ2IsbUJBQW1CO3FCQUNwQjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixxQkFBcUIsRUFBRTtvQ0FDckIsU0FBUyxFQUFFLHFCQUFxQjtvQ0FDaEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLG9CQUFvQixDQUFDLG1DQUFtQyxDQUFDO3FCQUMxRDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSwwQkFBMEIsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDbG9zZUFjY291bnRNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9jbG9zZS1hY2NvdW50LW1vZGFsL2Nsb3NlLWFjY291bnQtbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRDbG9zZURpYWxvZ01vZGFsTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9jb21wb25lbnRzL2Nsb3NlLWFjY291bnQtbW9kYWwvZGVmYXVsdC1jbG9zZS1hY2NvdW50LW1vZGFsLWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgQ2xvc2VBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Nsb3NlLWFjY291bnQvY2xvc2UtYWNjb3VudC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENsb3NlQWNjb3VudENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ2xvc2VBY2NvdW50Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDbG9zZURpYWxvZ01vZGFsTGF5b3V0Q29uZmlnKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2xvc2VBY2NvdW50Q29tcG9uZW50LCBDbG9zZUFjY291bnRNb2RhbENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENsb3NlQWNjb3VudE1vZHVsZSB7fVxuIl19