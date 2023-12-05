/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { MockTranslatePipe } from './mock-translate.pipe';
import { TranslationService } from '../translation.service';
import { MockTranslationService } from './mock-translation.service';
import { MockDatePipe } from './mock-date.pipe';
import * as i0 from "@angular/core";
export class I18nTestingModule {
}
I18nTestingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nTestingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
I18nTestingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: I18nTestingModule, declarations: [MockTranslatePipe, MockDatePipe], exports: [MockTranslatePipe, MockDatePipe] });
I18nTestingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nTestingModule, providers: [
        { provide: TranslationService, useClass: MockTranslationService },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: I18nTestingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MockTranslatePipe, MockDatePipe],
                    exports: [MockTranslatePipe, MockDatePipe],
                    providers: [
                        { provide: TranslationService, useClass: MockTranslationService },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi10ZXN0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vdGVzdGluZy9pMThuLXRlc3RpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7QUFTaEQsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQU5iLGlCQUFpQixFQUFFLFlBQVksYUFDcEMsaUJBQWlCLEVBQUUsWUFBWTsrR0FLOUIsaUJBQWlCLGFBSmpCO1FBQ1QsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFO0tBQ2xFOzJGQUVVLGlCQUFpQjtrQkFQN0IsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUM7b0JBQy9DLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQztvQkFDMUMsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTtxQkFDbEU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9ja1RyYW5zbGF0ZVBpcGUgfSBmcm9tICcuL21vY2stdHJhbnNsYXRlLnBpcGUnO1xuaW1wb3J0IHsgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBNb2NrVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9tb2NrLXRyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9ja0RhdGVQaXBlIH0gZnJvbSAnLi9tb2NrLWRhdGUucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW01vY2tUcmFuc2xhdGVQaXBlLCBNb2NrRGF0ZVBpcGVdLFxuICBleHBvcnRzOiBbTW9ja1RyYW5zbGF0ZVBpcGUsIE1vY2tEYXRlUGlwZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogVHJhbnNsYXRpb25TZXJ2aWNlLCB1c2VDbGFzczogTW9ja1RyYW5zbGF0aW9uU2VydmljZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBJMThuVGVzdGluZ01vZHVsZSB7fVxuIl19