/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomerTableTextAlign, } from '../../asm-customer-360-table/asm-customer-360-table.model';
import * as i0 from "@angular/core";
import * as i1 from "../asm-customer-360-section-context.model";
import * as i2 from "../../asm-customer-360-table/asm-customer-360-table.component";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class AsmCustomer360SupportTicketsComponent {
    constructor(context) {
        this.context = context;
        this.supportTicketsColumns = [
            {
                property: 'id',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.id',
                navigatable: true,
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'subject',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.headline',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'categoryLabel',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.category',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'createdAt',
                i18nTextKey: 'asmCustomer360.activity.created',
                isDate: true,
            },
            {
                property: 'updatedAt',
                i18nTextKey: 'asmCustomer360.activity.updated',
                isDate: true,
            },
            {
                property: 'statusLabel',
                i18nTextKey: 'asmCustomer360.activity.status',
                headerTextAlign: CustomerTableTextAlign.START,
            },
        ];
    }
    ngOnInit() {
        this.supportTicketsEntries$ = this.context.data$.pipe(map((data) => {
            return (data?.tickets?.map((entry) => {
                return {
                    ...entry,
                    statusLabel: entry.status.name,
                    categoryLabel: entry.category.name,
                };
            }) ?? []);
        }));
    }
    navigateTo(entry) {
        if (entry) {
            this.context.navigate$.next({
                cxRoute: 'supportTicketDetails',
                params: { ticketCode: entry.id },
            });
        }
    }
}
AsmCustomer360SupportTicketsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponent, deps: [{ token: i1.AsmCustomer360SectionContext }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360SupportTicketsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360SupportTicketsComponent, selector: "cx-asm-customer-360-support-tickets", ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.supportTickets.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.supportTickets.header' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"supportTicketsColumns\"\n  [entries]=\"supportTicketsEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: i2.AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-support-tickets', template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.supportTickets.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.supportTickets.header' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"supportTicketsColumns\"\n  [entries]=\"supportTicketsEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContext }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1zdXBwb3J0LXRpY2tldHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtc3VwcG9ydC10aWNrZXRzL2FzbS1jdXN0b21lci0zNjAtc3VwcG9ydC10aWNrZXRzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRzNFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBRUwsc0JBQXNCLEdBQ3ZCLE1BQU0sMkRBQTJELENBQUM7Ozs7OztBQVNuRSxNQUFNLE9BQU8scUNBQXFDO0lBc0NoRCxZQUNZLE9BQXNFO1FBQXRFLFlBQU8sR0FBUCxPQUFPLENBQStEO1FBdENsRiwwQkFBcUIsR0FBK0I7WUFDbEQ7Z0JBQ0UsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsV0FBVyxFQUFFLGdEQUFnRDtnQkFDN0QsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLO2dCQUM3QyxTQUFTLEVBQUUsc0JBQXNCLENBQUMsS0FBSzthQUN4QztZQUNEO2dCQUNFLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixXQUFXLEVBQUUsc0RBQXNEO2dCQUNuRSxlQUFlLEVBQUUsc0JBQXNCLENBQUMsS0FBSzthQUM5QztZQUNEO2dCQUNFLFFBQVEsRUFBRSxlQUFlO2dCQUN6QixXQUFXLEVBQUUsc0RBQXNEO2dCQUNuRSxlQUFlLEVBQUUsc0JBQXNCLENBQUMsS0FBSzthQUM5QztZQUNEO2dCQUNFLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxNQUFNLEVBQUUsSUFBSTthQUNiO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFdBQVcsRUFBRSxpQ0FBaUM7Z0JBQzlDLE1BQU0sRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDRSxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0MsZUFBZSxFQUFFLHNCQUFzQixDQUFDLEtBQUs7YUFDOUM7U0FDRixDQUFDO0lBTUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNYLE9BQU8sQ0FDTCxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUMzQixPQUFPO29CQUNMLEdBQUcsS0FBSztvQkFDUixXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJO29CQUM5QixhQUFhLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJO2lCQUNuQyxDQUFDO1lBQ0osQ0FBQyxDQUFDLElBQUksRUFBRSxDQUNULENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUNELFVBQVUsQ0FBQyxLQUF5QjtRQUNsQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsTUFBTSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUU7YUFDakMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztrSUFoRVUscUNBQXFDO3NIQUFyQyxxQ0FBcUMsMkVDdkJsRCx5YkFXQTsyRkRZYSxxQ0FBcUM7a0JBTGpELFNBQVM7c0NBQ1MsdUJBQXVCLENBQUMsTUFBTSxZQUNyQyxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU3VwcG9ydFRpY2tldExpc3QgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEN1c3RvbWVyVGFibGVDb2x1bW4sXG4gIEN1c3RvbWVyVGFibGVUZXh0QWxpZ24sXG59IGZyb20gJy4uLy4uL2FzbS1jdXN0b21lci0zNjAtdGFibGUvYXNtLWN1c3RvbWVyLTM2MC10YWJsZS5tb2RlbCc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0IH0gZnJvbSAnLi4vYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uLWNvbnRleHQubW9kZWwnO1xuaW1wb3J0IHsgU3VwcG9ydFRpY2tldEVudHJ5IH0gZnJvbSAnLi9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdjeC1hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc20tY3VzdG9tZXItMzYwLXN1cHBvcnQtdGlja2V0cy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwU3VwcG9ydFRpY2tldHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzdXBwb3J0VGlja2V0c0NvbHVtbnM6IEFycmF5PEN1c3RvbWVyVGFibGVDb2x1bW4+ID0gW1xuICAgIHtcbiAgICAgIHByb3BlcnR5OiAnaWQnLFxuICAgICAgaTE4blRleHRLZXk6ICdhc21DdXN0b21lcjM2MC5zdXBwb3J0VGlja2V0cy5jb2x1bW5IZWFkZXJzLmlkJyxcbiAgICAgIG5hdmlnYXRhYmxlOiB0cnVlLFxuICAgICAgaGVhZGVyVGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgICAgdGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdzdWJqZWN0JyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAuc3VwcG9ydFRpY2tldHMuY29sdW1uSGVhZGVycy5oZWFkbGluZScsXG4gICAgICBoZWFkZXJUZXh0QWxpZ246IEN1c3RvbWVyVGFibGVUZXh0QWxpZ24uU1RBUlQsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm9wZXJ0eTogJ2NhdGVnb3J5TGFiZWwnLFxuICAgICAgaTE4blRleHRLZXk6ICdhc21DdXN0b21lcjM2MC5zdXBwb3J0VGlja2V0cy5jb2x1bW5IZWFkZXJzLmNhdGVnb3J5JyxcbiAgICAgIGhlYWRlclRleHRBbGlnbjogQ3VzdG9tZXJUYWJsZVRleHRBbGlnbi5TVEFSVCxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3BlcnR5OiAnY3JlYXRlZEF0JyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAuYWN0aXZpdHkuY3JlYXRlZCcsXG4gICAgICBpc0RhdGU6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm9wZXJ0eTogJ3VwZGF0ZWRBdCcsXG4gICAgICBpMThuVGV4dEtleTogJ2FzbUN1c3RvbWVyMzYwLmFjdGl2aXR5LnVwZGF0ZWQnLFxuICAgICAgaXNEYXRlOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdzdGF0dXNMYWJlbCcsXG4gICAgICBpMThuVGV4dEtleTogJ2FzbUN1c3RvbWVyMzYwLmFjdGl2aXR5LnN0YXR1cycsXG4gICAgICBoZWFkZXJUZXh0QWxpZ246IEN1c3RvbWVyVGFibGVUZXh0QWxpZ24uU1RBUlQsXG4gICAgfSxcbiAgXTtcblxuICBzdXBwb3J0VGlja2V0c0VudHJpZXMkOiBPYnNlcnZhYmxlPEFycmF5PFN1cHBvcnRUaWNrZXRFbnRyeT4+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0PEFzbUN1c3RvbWVyMzYwU3VwcG9ydFRpY2tldExpc3Q+XG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1cHBvcnRUaWNrZXRzRW50cmllcyQgPSB0aGlzLmNvbnRleHQuZGF0YSQucGlwZShcbiAgICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGRhdGE/LnRpY2tldHM/Lm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmVudHJ5LFxuICAgICAgICAgICAgICBzdGF0dXNMYWJlbDogZW50cnkuc3RhdHVzLm5hbWUsXG4gICAgICAgICAgICAgIGNhdGVnb3J5TGFiZWw6IGVudHJ5LmNhdGVnb3J5Lm5hbWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pID8/IFtdXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgbmF2aWdhdGVUbyhlbnRyeTogU3VwcG9ydFRpY2tldEVudHJ5KTogdm9pZCB7XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICB0aGlzLmNvbnRleHQubmF2aWdhdGUkLm5leHQoe1xuICAgICAgICBjeFJvdXRlOiAnc3VwcG9ydFRpY2tldERldGFpbHMnLFxuICAgICAgICBwYXJhbXM6IHsgdGlja2V0Q29kZTogZW50cnkuaWQgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGN4LWFzbS1jdXN0b21lci0zNjAtdGFibGVcbiAgW2VtcHR5U3RhdGVUZXh0XT1cIlxuICAgICdhc21DdXN0b21lcjM2MC5zdXBwb3J0VGlja2V0cy5lbXB0eURlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlXG4gIFwiXG4gIFtoZWFkZXJUZXh0XT1cIidhc21DdXN0b21lcjM2MC5zdXBwb3J0VGlja2V0cy5oZWFkZXInIHwgY3hUcmFuc2xhdGVcIlxuICBzb3J0UHJvcGVydHk9XCJjcmVhdGVkQXRcIlxuICBbY29sdW1uc109XCJzdXBwb3J0VGlja2V0c0NvbHVtbnNcIlxuICBbZW50cmllc109XCJzdXBwb3J0VGlja2V0c0VudHJpZXMkIHwgYXN5bmNcIlxuICBbcGFnZVNpemVdPVwiKGNvbnRleHQuY29uZmlnJCB8IGFzeW5jKT8ucGFnZVNpemVcIlxuICAoc2VsZWN0SXRlbSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxuPjwvY3gtYXNtLWN1c3RvbWVyLTM2MC10YWJsZT5cbiJdfQ==