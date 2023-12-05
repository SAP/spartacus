/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerTableTextAlign, } from '../../asm-customer-360-table/asm-customer-360-table.model';
import { TypeCodes } from './asm-customer-360-activity.model';
import * as i0 from "@angular/core";
import * as i1 from "../asm-customer-360-section-context.model";
import * as i2 from "../../asm-customer-360-table/asm-customer-360-table.component";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class AsmCustomer360ActivityComponent {
    constructor(context) {
        this.context = context;
        this.columns = [
            {
                property: 'typeLabel',
                i18nTextKey: 'asmCustomer360.activity.type',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'associatedTypeId',
                text: 'id',
                i18nTextKey: 'asmCustomer360.activity.id',
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
                navigatable: true,
            },
            {
                property: 'description',
                text: 'description',
                i18nTextKey: 'asmCustomer360.activity.description',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'statusLabel',
                text: 'status',
                i18nTextKey: 'asmCustomer360.activity.status',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'createdAt',
                text: 'created',
                i18nTextKey: 'asmCustomer360.activity.created',
                isDate: true,
            },
            {
                property: 'updatedAt',
                text: 'updated',
                i18nTextKey: 'asmCustomer360.activity.updated',
                isDate: true,
            },
        ];
    }
    ngOnInit() {
        let entries = [];
        this.entries$ = combineLatest([this.context.data$]).pipe(map(([data]) => {
            entries = [];
            data.activities.forEach((activity) => {
                entries.push({
                    ...activity,
                    typeLabel: activity.type?.name,
                    statusLabel: activity.status?.name,
                });
            });
            return entries;
        }));
    }
    itemSelected(entry) {
        if (entry) {
            let urlCommand;
            if (entry.type?.code === TypeCodes.SavedCart) {
                urlCommand = {
                    cxRoute: 'savedCartsDetails',
                    params: { savedCartId: entry?.associatedTypeId },
                };
            }
            else if (entry.type?.code === TypeCodes.Cart) {
                urlCommand = {
                    cxRoute: 'cart',
                };
            }
            else if (entry.type?.code === TypeCodes.Order) {
                urlCommand = {
                    cxRoute: 'orderDetails',
                    params: { code: entry?.associatedTypeId },
                };
            }
            else if (entry.type?.code === TypeCodes.Ticket) {
                urlCommand = {
                    cxRoute: 'supportTicketDetails',
                    params: { ticketCode: entry?.associatedTypeId },
                };
            }
            if (urlCommand) {
                this.context.navigate$.next(urlCommand);
            }
        }
    }
}
AsmCustomer360ActivityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityComponent, deps: [{ token: i1.AsmCustomer360SectionContext }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ActivityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ActivityComponent, selector: "cx-asm-customer-360-activity", ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"'asmCustomer360.activity.emptyStateText' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.activity.headerText' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"columns\"\n  [entries]=\"entries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"itemSelected($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: i2.AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-activity', template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"'asmCustomer360.activity.emptyStateText' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.activity.headerText' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"columns\"\n  [entries]=\"entries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"itemSelected($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContext }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkvYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkvYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBRUwsc0JBQXNCLEdBQ3ZCLE1BQU0sMkRBQTJELENBQUM7QUFFbkUsT0FBTyxFQUFpQixTQUFTLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7O0FBTzdFLE1BQU0sT0FBTywrQkFBK0I7SUEwQzFDLFlBQ1ksT0FBaUU7UUFBakUsWUFBTyxHQUFQLE9BQU8sQ0FBMEQ7UUF6QzdFLFlBQU8sR0FBK0I7WUFDcEM7Z0JBQ0UsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFdBQVcsRUFBRSw4QkFBOEI7Z0JBQzNDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLO2FBQzlDO1lBQ0Q7Z0JBQ0UsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsZUFBZSxFQUFF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O2dIQUEvQiwrQkFBK0Isb0VDdkI1QywyWUFTQTsyRkRjYSwrQkFBK0I7a0JBTDNDLFNBQVM7c0NBQ1MsdUJBQXVCLENBQUMsTUFBTSxZQUNyQyw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQWN0aXZpdHlMaXN0IH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY3VzdG9tZXItMzYwL3Jvb3QnO1xuaW1wb3J0IHsgVXJsQ29tbWFuZCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBDdXN0b21lclRhYmxlQ29sdW1uLFxuICBDdXN0b21lclRhYmxlVGV4dEFsaWduLFxufSBmcm9tICcuLi8uLi9hc20tY3VzdG9tZXItMzYwLXRhYmxlL2FzbS1jdXN0b21lci0zNjAtdGFibGUubW9kZWwnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dCB9IGZyb20gJy4uL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi1jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IEFjdGl2aXR5RW50cnksIFR5cGVDb2RlcyB9IGZyb20gJy4vYXNtLWN1c3RvbWVyLTM2MC1hY3Rpdml0eS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdjeC1hc20tY3VzdG9tZXItMzYwLWFjdGl2aXR5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FzbS1jdXN0b21lci0zNjAtYWN0aXZpdHkuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MEFjdGl2aXR5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZW50cmllcyQ6IE9ic2VydmFibGU8QXJyYXk8QWN0aXZpdHlFbnRyeT4+O1xuICBjb2x1bW5zOiBBcnJheTxDdXN0b21lclRhYmxlQ29sdW1uPiA9IFtcbiAgICB7XG4gICAgICBwcm9wZXJ0eTogJ3R5cGVMYWJlbCcsXG4gICAgICBpMThuVGV4dEtleTogJ2FzbUN1c3RvbWVyMzYwLmFjdGl2aXR5LnR5cGUnLFxuICAgICAgaGVhZGVyVGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdhc3NvY2lhdGVkVHlwZUlkJyxcbiAgICAgIHRleHQ6ICdpZCcsXG4gICAgICBpMThuVGV4dEtleTogJ2FzbUN1c3RvbWVyMzYwLmFjdGl2aXR5LmlkJyxcbiAgICAgIGhlYWRlclRleHRBbGlnbjogQ3VzdG9tZXJUYWJsZVRleHRBbGlnbi5TVEFSVCxcbiAgICAgIHRleHRBbGlnbjogQ3VzdG9tZXJUYWJsZVRleHRBbGlnbi5TVEFSVCxcbiAgICAgIG5hdmlnYXRhYmxlOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdkZXNjcmlwdGlvbicsXG4gICAgICB0ZXh0OiAnZGVzY3JpcHRpb24nLFxuICAgICAgaTE4blRleHRLZXk6ICdhc21DdXN0b21lcjM2MC5hY3Rpdml0eS5kZXNjcmlwdGlvbicsXG4gICAgICBoZWFkZXJUZXh0QWxpZ246IEN1c3RvbWVyVGFibGVUZXh0QWxpZ24uU1RBUlQsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm9wZXJ0eTogJ3N0YXR1c0xhYmVsJyxcbiAgICAgIHRleHQ6ICdzdGF0dXMnLFxuICAgICAgaTE4blRleHRLZXk6ICdhc21DdXN0b21lcjM2MC5hY3Rpdml0eS5zdGF0dXMnLFxuICAgICAgaGVhZGVyVGV4dEFsaWduOiBDdXN0b21lclRhYmxlVGV4dEFsaWduLlNUQVJULFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvcGVydHk6ICdjcmVhdGVkQXQnLFxuICAgICAgdGV4dDogJ2NyZWF0ZWQnLFxuICAgICAgaTE4blRleHRLZXk6ICdhc21DdXN0b21lcjM2MC5hY3Rpdml0eS5jcmVhdGVkJyxcbiAgICAgIGlzRGF0ZTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3BlcnR5OiAndXBkYXRlZEF0JyxcbiAgICAgIHRleHQ6ICd1cGRhdGVkJyxcbiAgICAgIGkxOG5UZXh0S2V5OiAnYXNtQ3VzdG9tZXIzNjAuYWN0aXZpdHkudXBkYXRlZCcsXG4gICAgICBpc0RhdGU6IHRydWUsXG4gICAgfSxcbiAgXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29udGV4dDogQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dDxBc21DdXN0b21lcjM2MEFjdGl2aXR5TGlzdD5cbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGxldCBlbnRyaWVzOiBBcnJheTxBY3Rpdml0eUVudHJ5PiA9IFtdO1xuXG4gICAgdGhpcy5lbnRyaWVzJCA9IGNvbWJpbmVMYXRlc3QoW3RoaXMuY29udGV4dC5kYXRhJF0pLnBpcGUoXG4gICAgICBtYXAoKFtkYXRhXSkgPT4ge1xuICAgICAgICBlbnRyaWVzID0gW107XG4gICAgICAgIGRhdGEuYWN0aXZpdGllcy5mb3JFYWNoKChhY3Rpdml0eSkgPT4ge1xuICAgICAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgICAgICAuLi5hY3Rpdml0eSxcbiAgICAgICAgICAgIHR5cGVMYWJlbDogYWN0aXZpdHkudHlwZT8ubmFtZSxcbiAgICAgICAgICAgIHN0YXR1c0xhYmVsOiBhY3Rpdml0eS5zdGF0dXM/Lm5hbWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW50cmllcztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGl0ZW1TZWxlY3RlZChlbnRyeTogQWN0aXZpdHlFbnRyeSB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmIChlbnRyeSkge1xuICAgICAgbGV0IHVybENvbW1hbmQ6IFVybENvbW1hbmQ7XG4gICAgICBpZiAoZW50cnkudHlwZT8uY29kZSA9PT0gVHlwZUNvZGVzLlNhdmVkQ2FydCkge1xuICAgICAgICB1cmxDb21tYW5kID0ge1xuICAgICAgICAgIGN4Um91dGU6ICdzYXZlZENhcnRzRGV0YWlscycsXG4gICAgICAgICAgcGFyYW1zOiB7IHNhdmVkQ2FydElkOiBlbnRyeT8uYXNzb2NpYXRlZFR5cGVJZCB9LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChlbnRyeS50eXBlPy5jb2RlID09PSBUeXBlQ29kZXMuQ2FydCkge1xuICAgICAgICB1cmxDb21tYW5kID0ge1xuICAgICAgICAgIGN4Um91dGU6ICdjYXJ0JyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAoZW50cnkudHlwZT8uY29kZSA9PT0gVHlwZUNvZGVzLk9yZGVyKSB7XG4gICAgICAgIHVybENvbW1hbmQgPSB7XG4gICAgICAgICAgY3hSb3V0ZTogJ29yZGVyRGV0YWlscycsXG4gICAgICAgICAgcGFyYW1zOiB7IGNvZGU6IGVudHJ5Py5hc3NvY2lhdGVkVHlwZUlkIH0sXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKGVudHJ5LnR5cGU/LmNvZGUgPT09IFR5cGVDb2Rlcy5UaWNrZXQpIHtcbiAgICAgICAgdXJsQ29tbWFuZCA9IHtcbiAgICAgICAgICBjeFJvdXRlOiAnc3VwcG9ydFRpY2tldERldGFpbHMnLFxuICAgICAgICAgIHBhcmFtczogeyB0aWNrZXRDb2RlOiBlbnRyeT8uYXNzb2NpYXRlZFR5cGVJZCB9LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKHVybENvbW1hbmQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0Lm5hdmlnYXRlJC5uZXh0KHVybENvbW1hbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGN4LWFzbS1jdXN0b21lci0zNjAtdGFibGVcbiAgW2VtcHR5U3RhdGVUZXh0XT1cIidhc21DdXN0b21lcjM2MC5hY3Rpdml0eS5lbXB0eVN0YXRlVGV4dCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFtoZWFkZXJUZXh0XT1cIidhc21DdXN0b21lcjM2MC5hY3Rpdml0eS5oZWFkZXJUZXh0JyB8IGN4VHJhbnNsYXRlXCJcbiAgc29ydFByb3BlcnR5PVwiY3JlYXRlZEF0XCJcbiAgW2NvbHVtbnNdPVwiY29sdW1uc1wiXG4gIFtlbnRyaWVzXT1cImVudHJpZXMkIHwgYXN5bmNcIlxuICBbcGFnZVNpemVdPVwiKGNvbnRleHQuY29uZmlnJCB8IGFzeW5jKT8ucGFnZVNpemVcIlxuICAoc2VsZWN0SXRlbSk9XCJpdGVtU2VsZWN0ZWQoJGV2ZW50KVwiXG4+PC9jeC1hc20tY3VzdG9tZXItMzYwLXRhYmxlPlxuIl19