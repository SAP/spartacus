/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { QualtricsEmbeddedFeedbackComponent } from './qualtrics-embedded-feedback/qualtrics-embedded-feedback.component';
import { defaultQualtricsConfig } from './qualtrics-loader/config/default-qualtrics-config';
import { QualtricsComponent } from './qualtrics-loader/qualtrics.component';
import * as i0 from "@angular/core";
export class QualtricsComponentsModule {
}
QualtricsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QualtricsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, declarations: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent], imports: [CommonModule], exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent] });
QualtricsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                QualtricsEmbeddedFeedbackComponent: {
                    component: QualtricsEmbeddedFeedbackComponent,
                },
                QualtricsComponent: {
                    component: QualtricsComponent,
                },
            },
        }),
        provideDefaultConfig(defaultQualtricsConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QualtricsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                QualtricsEmbeddedFeedbackComponent: {
                                    component: QualtricsEmbeddedFeedbackComponent,
                                },
                                QualtricsComponent: {
                                    component: QualtricsComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultQualtricsConfig),
                    ],
                    declarations: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
                    exports: [QualtricsComponent, QualtricsEmbeddedFeedbackComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhbHRyaWNzLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3F1YWx0cmljcy9jb21wb25lbnRzL3F1YWx0cmljcy1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0scUVBQXFFLENBQUM7QUFDekgsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDNUYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBb0I1RSxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsaUJBSHJCLGtCQUFrQixFQUFFLGtDQUFrQyxhQWQzRCxZQUFZLGFBZVosa0JBQWtCLEVBQUUsa0NBQWtDO3VIQUVyRCx5QkFBeUIsYUFoQnpCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGtDQUFrQyxFQUFFO29CQUNsQyxTQUFTLEVBQUUsa0NBQWtDO2lCQUM5QztnQkFDRCxrQkFBa0IsRUFBRTtvQkFDbEIsU0FBUyxFQUFFLGtCQUFrQjtpQkFDOUI7YUFDRjtTQUNGLENBQUM7UUFDRixvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQztLQUM3QyxZQWJTLFlBQVk7MkZBaUJYLHlCQUF5QjtrQkFsQnJDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixrQ0FBa0MsRUFBRTtvQ0FDbEMsU0FBUyxFQUFFLGtDQUFrQztpQ0FDOUM7Z0NBQ0Qsa0JBQWtCLEVBQUU7b0NBQ2xCLFNBQVMsRUFBRSxrQkFBa0I7aUNBQzlCOzZCQUNGO3lCQUNGLENBQUM7d0JBQ0Ysb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7cUJBQzdDO29CQUNELFlBQVksRUFBRSxDQUFDLGtCQUFrQixFQUFFLGtDQUFrQyxDQUFDO29CQUN0RSxPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxrQ0FBa0MsQ0FBQztpQkFDbEUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUXVhbHRyaWNzRW1iZWRkZWRGZWVkYmFja0NvbXBvbmVudCB9IGZyb20gJy4vcXVhbHRyaWNzLWVtYmVkZGVkLWZlZWRiYWNrL3F1YWx0cmljcy1lbWJlZGRlZC1mZWVkYmFjay5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdFF1YWx0cmljc0NvbmZpZyB9IGZyb20gJy4vcXVhbHRyaWNzLWxvYWRlci9jb25maWcvZGVmYXVsdC1xdWFsdHJpY3MtY29uZmlnJztcbmltcG9ydCB7IFF1YWx0cmljc0NvbXBvbmVudCB9IGZyb20gJy4vcXVhbHRyaWNzLWxvYWRlci9xdWFsdHJpY3MuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBRdWFsdHJpY3NFbWJlZGRlZEZlZWRiYWNrQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBRdWFsdHJpY3NFbWJlZGRlZEZlZWRiYWNrQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgICBRdWFsdHJpY3NDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFF1YWx0cmljc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFF1YWx0cmljc0NvbmZpZyksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1F1YWx0cmljc0NvbXBvbmVudCwgUXVhbHRyaWNzRW1iZWRkZWRGZWVkYmFja0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtRdWFsdHJpY3NDb21wb25lbnQsIFF1YWx0cmljc0VtYmVkZGVkRmVlZGJhY2tDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWFsdHJpY3NDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=