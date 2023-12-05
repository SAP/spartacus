/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxDatePipe } from '@spartacus/core';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTableTextAlign, } from '../../asm-customer-360-table/asm-customer-360-table.model';
import * as i0 from "@angular/core";
import * as i1 from "../../config/asm-customer-360-config";
import * as i2 from "../asm-customer-360-section-context.model";
import * as i3 from "@spartacus/core";
import * as i4 from "../../asm-customer-360-table/asm-customer-360-table.component";
import * as i5 from "@angular/common";
export class AsmCustomer360ProductReviewsComponent {
    constructor(asmCustomer360Config, context, datePipe, translation) {
        this.asmCustomer360Config = asmCustomer360Config;
        this.context = context;
        this.datePipe = datePipe;
        this.translation = translation;
        this.reviewColumns = [
            {
                property: 'item',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.item',
                navigatable: true,
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'dateAndStatus',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.dateAndStatus',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'rating',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.rating',
                renderAsStarRating: true,
            },
            {
                property: 'reviewText',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.review',
                headerTextAlign: CustomerTableTextAlign.START,
            },
        ];
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.reviewEntries$ = combineLatest([
            this.context.data$,
            this.translation.translate('asmCustomer360.productReviews.sku'),
        ]).pipe(map(([data, skuLabel]) => {
            return data.reviews.map((entry) => ({
                ...entry,
                item: `${entry.productName}, ${skuLabel}: ${entry.productCode}`,
                dateAndStatus: `${this.getLongDate(new Date(entry.createdAt))} / ${entry.localizedReviewStatus}`,
            }));
        }));
    }
    navigateTo(entry) {
        const params = {
            name: entry.productName,
            code: entry.productCode,
        };
        this.context.navigate$.next({ cxRoute: 'product', params });
    }
    getLongDate(date) {
        return date
            ? this.datePipe.transform(date, this.asmCustomer360Config?.asmCustomer360?.dateTimeFormat) ?? ''
            : '';
    }
}
AsmCustomer360ProductReviewsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponent, deps: [{ token: i1.AsmCustomer360Config }, { token: i2.AsmCustomer360SectionContext }, { token: i3.CxDatePipe }, { token: i3.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProductReviewsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProductReviewsComponent, selector: "cx-asm-customer-360-product-reviews", providers: [CxDatePipe], ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.productReviews.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productReviews.header' | cxTranslate\"\n  sortProperty=\"dateAndStatus\"\n  [columns]=\"reviewColumns\"\n  [entries]=\"reviewEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: i4.AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-product-reviews', providers: [CxDatePipe], template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.productReviews.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productReviews.header' | cxTranslate\"\n  sortProperty=\"dateAndStatus\"\n  [columns]=\"reviewColumns\"\n  [entries]=\"reviewEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360Config }, { type: i2.AsmCustomer360SectionContext }, { type: i3.CxDatePipe }, { type: i3.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1wcm9kdWN0LXJldmlld3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtcmV2aWV3cy9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtcmV2aWV3cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzL2FzbS1jdXN0b21lci0zNjAtcHJvZHVjdC1yZXZpZXdzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSxVQUFVLEVBQStCLE1BQU0saUJBQWlCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXJDLE9BQU8sRUFFTCxzQkFBc0IsR0FFdkIsTUFBTSwyREFBMkQsQ0FBQzs7Ozs7OztBQVduRSxNQUFNLE9BQU8scUNBQXFDO0lBOEJoRCxZQUNZLG9CQUEwQyxFQUMxQyxPQUErRCxFQUMvRCxRQUFvQixFQUNwQixXQUErQjtRQUgvQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFlBQU8sR0FBUCxPQUFPLENBQXdEO1FBQy9ELGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBakMzQyxrQkFBYSxHQUErQjtZQUMxQztnQkFDRSxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxFQUFFLGtEQUFrRDtnQkFDL0QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLO2dCQUM3QyxTQUFTLEVBQUUsc0JBQXNCLENBQUMsS0FBSzthQUN4QztZQUNEO2dCQUNFLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsMkRBQTJEO2dCQUN4RSxlQUFlLEVBQUUsc0JBQXNCLENBQUMsS0FBSzthQUM5QztZQUNEO2dCQUNFLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixXQUFXLEVBQUUsb0RBQW9EO2dCQUNqRSxrQkFBa0IsRUFBRSxJQUFJO2FBQ3pCO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFdBQVcsRUFBRSxvREFBb0Q7Z0JBQ2pFLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLO2FBQzlDO1NBQ0YsQ0FBQztRQUlRLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU96QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxtQ0FBbUMsQ0FBQztTQUNoRSxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxLQUFLO2dCQUNSLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxXQUFXLEtBQUssUUFBUSxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQy9ELGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQzNELEtBQUssQ0FBQyxxQkFDUixFQUFFO2FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFpQjtRQUMxQixNQUFNLE1BQU0sR0FBWTtZQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQXFCO1lBQ2pDLElBQUksRUFBRSxLQUFLLENBQUMsV0FBcUI7U0FDbEMsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRVMsV0FBVyxDQUFDLElBQVU7UUFDOUIsT0FBTyxJQUFJO1lBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUNyQixJQUFJLEVBQ0osSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxjQUFjLENBQzFELElBQUksRUFBRTtZQUNULENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDOztrSUFyRVUscUNBQXFDO3NIQUFyQyxxQ0FBcUMsOERBRnJDLENBQUMsVUFBVSxDQUFDLDBCQ3pCekIsNmFBV0E7MkZEZ0JhLHFDQUFxQztrQkFOakQsU0FBUztzQ0FDUyx1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDLHFDQUFxQyxhQUVwQyxDQUFDLFVBQVUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBSZXZpZXdMaXN0IH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY3VzdG9tZXItMzYwL3Jvb3QnO1xuaW1wb3J0IHsgQ3hEYXRlUGlwZSwgUHJvZHVjdCwgVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBDdXN0b21lclRhYmxlQ29sdW1uLFxuICBDdXN0b21lclRhYmxlVGV4dEFsaWduLFxuICBUYWJsZUVudHJ5LFxufSBmcm9tICcuLi8uLi9hc20tY3VzdG9tZXItMzYwLXRhYmxlL2FzbS1jdXN0b21lci0zNjAtdGFibGUubW9kZWwnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dCB9IGZyb20gJy4uL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi1jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IFJldmlld0VudHJ5IH0gZnJvbSAnLi9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtcmV2aWV3cy5tb2RlbCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZy9hc20tY3VzdG9tZXItMzYwLWNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdjeC1hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtcmV2aWV3cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc20tY3VzdG9tZXItMzYwLXByb2R1Y3QtcmV2aWV3cy5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW0N4RGF0ZVBpcGVdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MFByb2R1Y3RSZXZpZXdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcmV2aWV3Q29sdW1uczogQXJyYXk8Q3VzdG9tZXJUYWJsZUNvbHVtbj4gPSBbXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdpdGVtJyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAucHJvZHVjdFJldmlld3MuY29sdW1uSGVhZGVycy5pdGVtJyxcbiAgICAgIG5hdmlnYXRhYmxlOiB0cnVlLFxuICAgICAgaGVhZGVyVGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgICAgdGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdkYXRlQW5kU3RhdHVzJyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAucHJvZHVjdFJldmlld3MuY29sdW1uSGVhZGVycy5kYXRlQW5kU3RhdHVzJyxcbiAgICAgIGhlYWRlclRleHRBbGlnbjogQ3VzdG9tZXJUYWJsZVRleHRBbGlnbi5TVEFSVCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3BlcnR5OiAncmF0aW5nJyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAucHJvZHVjdFJldmlld3MuY29sdW1uSGVhZGVycy5yYXRpbmcnLFxuICAgICAgcmVuZGVyQXNTdGFyUmF0aW5nOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdyZXZpZXdUZXh0JyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAucHJvZHVjdFJldmlld3MuY29sdW1uSGVhZGVycy5yZXZpZXcnLFxuICAgICAgaGVhZGVyVGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgIH0sXG4gIF07XG5cbiAgcmV2aWV3RW50cmllcyQ6IE9ic2VydmFibGU8QXJyYXk8UmV2aWV3RW50cnk+PjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhc21DdXN0b21lcjM2MENvbmZpZzogQXNtQ3VzdG9tZXIzNjBDb25maWcsXG4gICAgcHJvdGVjdGVkIGNvbnRleHQ6IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHQ8QXNtQ3VzdG9tZXIzNjBSZXZpZXdMaXN0PixcbiAgICBwcm90ZWN0ZWQgZGF0ZVBpcGU6IEN4RGF0ZVBpcGUsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmV2aWV3RW50cmllcyQgPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuY29udGV4dC5kYXRhJCxcbiAgICAgIHRoaXMudHJhbnNsYXRpb24udHJhbnNsYXRlKCdhc21DdXN0b21lcjM2MC5wcm9kdWN0UmV2aWV3cy5za3UnKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbZGF0YSwgc2t1TGFiZWxdKSA9PiB7XG4gICAgICAgIHJldHVybiBkYXRhLnJldmlld3MubWFwKChlbnRyeSkgPT4gKHtcbiAgICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgICBpdGVtOiBgJHtlbnRyeS5wcm9kdWN0TmFtZX0sICR7c2t1TGFiZWx9OiAke2VudHJ5LnByb2R1Y3RDb2RlfWAsXG4gICAgICAgICAgZGF0ZUFuZFN0YXR1czogYCR7dGhpcy5nZXRMb25nRGF0ZShuZXcgRGF0ZShlbnRyeS5jcmVhdGVkQXQpKX0gLyAke1xuICAgICAgICAgICAgZW50cnkubG9jYWxpemVkUmV2aWV3U3RhdHVzXG4gICAgICAgICAgfWAsXG4gICAgICAgIH0pKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5hdmlnYXRlVG8oZW50cnk6IFRhYmxlRW50cnkpOiB2b2lkIHtcbiAgICBjb25zdCBwYXJhbXM6IFByb2R1Y3QgPSB7XG4gICAgICBuYW1lOiBlbnRyeS5wcm9kdWN0TmFtZSBhcyBzdHJpbmcsXG4gICAgICBjb2RlOiBlbnRyeS5wcm9kdWN0Q29kZSBhcyBzdHJpbmcsXG4gICAgfTtcbiAgICB0aGlzLmNvbnRleHQubmF2aWdhdGUkLm5leHQoeyBjeFJvdXRlOiAncHJvZHVjdCcsIHBhcmFtcyB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRMb25nRGF0ZShkYXRlOiBEYXRlKSB7XG4gICAgcmV0dXJuIGRhdGVcbiAgICAgID8gdGhpcy5kYXRlUGlwZS50cmFuc2Zvcm0oXG4gICAgICAgICAgZGF0ZSxcbiAgICAgICAgICB0aGlzLmFzbUN1c3RvbWVyMzYwQ29uZmlnPy5hc21DdXN0b21lcjM2MD8uZGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgKSA/PyAnJ1xuICAgICAgOiAnJztcbiAgfVxufVxuIiwiPGN4LWFzbS1jdXN0b21lci0zNjAtdGFibGVcbiAgW2VtcHR5U3RhdGVUZXh0XT1cIlxuICAgICdhc21DdXN0b21lcjM2MC5wcm9kdWN0UmV2aWV3cy5lbXB0eURlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlXG4gIFwiXG4gIFtoZWFkZXJUZXh0XT1cIidhc21DdXN0b21lcjM2MC5wcm9kdWN0UmV2aWV3cy5oZWFkZXInIHwgY3hUcmFuc2xhdGVcIlxuICBzb3J0UHJvcGVydHk9XCJkYXRlQW5kU3RhdHVzXCJcbiAgW2NvbHVtbnNdPVwicmV2aWV3Q29sdW1uc1wiXG4gIFtlbnRyaWVzXT1cInJldmlld0VudHJpZXMkIHwgYXN5bmNcIlxuICBbcGFnZVNpemVdPVwiKGNvbnRleHQuY29uZmlnJCB8IGFzeW5jKT8ucGFnZVNpemVcIlxuICAoc2VsZWN0SXRlbSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxuPjwvY3gtYXNtLWN1c3RvbWVyLTM2MC10YWJsZT5cbiJdfQ==