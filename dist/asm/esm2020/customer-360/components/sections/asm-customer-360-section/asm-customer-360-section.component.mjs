/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
import * as i1 from "../asm-customer-360-section-context-source.model";
import * as i2 from "@angular/common";
export class AsmCustomer360SectionComponent {
    set customer(customer) {
        this.source.customer$.next(customer);
    }
    set config(config) {
        this.source.config$.next(config);
    }
    set data(data) {
        this.source.data$.next(data);
    }
    constructor(source) {
        this.source = source;
        this.navigate = new EventEmitter();
        this.subscription = new Subscription();
        this.subscription.add(source.navigate$.subscribe((urlCommand) => this.navigate.emit(urlCommand)));
        this.subscription.add(() => {
            this.source.config$.complete();
            this.source.customer$.complete();
            this.source.data$.complete();
            this.source.navigate$.complete();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360SectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionComponent, deps: [{ token: i1.AsmCustomer360SectionContextSource }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360SectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360SectionComponent, selector: "cx-asm-customer-360-section", inputs: { component: "component", customer: "customer", config: "config", data: "data" }, outputs: { navigate: "navigate" }, providers: [
        AsmCustomer360SectionContextSource,
        {
            provide: AsmCustomer360SectionContext,
            useExisting: AsmCustomer360SectionContextSource,
        },
    ], ngImport: i0, template: "<ng-container *ngComponentOutlet=\"component\"></ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-section', providers: [
                        AsmCustomer360SectionContextSource,
                        {
                            provide: AsmCustomer360SectionContext,
                            useExisting: AsmCustomer360SectionContextSource,
                        },
                    ], template: "<ng-container *ngComponentOutlet=\"component\"></ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContextSource }]; }, propDecorators: { component: [{
                type: Input
            }], customer: [{
                type: Input
            }], config: [{
                type: Input
            }], data: [{
                type: Input
            }], navigate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY3VzdG9tZXItMzYwL2NvbXBvbmVudHMvc2VjdGlvbnMvYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVoRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN0RyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7OztBQWF6RixNQUFNLE9BQU8sOEJBQThCO0lBSXpDLElBQ0ksUUFBUSxDQUFDLFFBQWM7UUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxJQUNJLE1BQU0sQ0FBQyxNQUFtQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLElBQXlCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBT0QsWUFBc0IsTUFBbUQ7UUFBbkQsV0FBTSxHQUFOLE1BQU0sQ0FBNkM7UUFKekUsYUFBUSxHQUE2QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQzNFLENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7MkhBdkNVLDhCQUE4QjsrR0FBOUIsOEJBQThCLG1MQVI5QjtRQUNULGtDQUFrQztRQUNsQztZQUNFLE9BQU8sRUFBRSw0QkFBNEI7WUFDckMsV0FBVyxFQUFFLGtDQUFrQztTQUNoRDtLQUNGLDBCQzlCSCxrRUFDQTsyRkQrQmEsOEJBQThCO2tCQVgxQyxTQUFTOytCQUNFLDZCQUE2QixhQUU1Qjt3QkFDVCxrQ0FBa0M7d0JBQ2xDOzRCQUNFLE9BQU8sRUFBRSw0QkFBNEI7NEJBQ3JDLFdBQVcsRUFBRSxrQ0FBa0M7eUJBQ2hEO3FCQUNGO3lIQUlELFNBQVM7c0JBRFIsS0FBSztnQkFJRixRQUFRO3NCQURYLEtBQUs7Z0JBTUYsTUFBTTtzQkFEVCxLQUFLO2dCQU1GLElBQUk7c0JBRFAsS0FBSztnQkFNTixRQUFRO3NCQURQLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9yb290JztcbmltcG9ydCB7IFVybENvbW1hbmQsIFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHRTb3VyY2UgfSBmcm9tICcuLi9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24tY29udGV4dC1zb3VyY2UubW9kZWwnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dCB9IGZyb20gJy4uL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi1jb250ZXh0Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1xuICAgIEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHRTb3VyY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dCxcbiAgICAgIHVzZUV4aXN0aW5nOiBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0U291cmNlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpXG4gIGNvbXBvbmVudDogVHlwZTx1bmtub3duPjtcblxuICBASW5wdXQoKVxuICBzZXQgY3VzdG9tZXIoY3VzdG9tZXI6IFVzZXIpIHtcbiAgICB0aGlzLnNvdXJjZS5jdXN0b21lciQubmV4dChjdXN0b21lcik7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKGNvbmZpZzogQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29uZmlnKSB7XG4gICAgdGhpcy5zb3VyY2UuY29uZmlnJC5uZXh0KGNvbmZpZyk7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZGF0YShkYXRhOiBPYnNlcnZhYmxlPHVua25vd24+KSB7XG4gICAgdGhpcy5zb3VyY2UuZGF0YSQubmV4dChkYXRhKTtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBuYXZpZ2F0ZTogRXZlbnRFbWl0dGVyPFVybENvbW1hbmQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNvdXJjZTogQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dFNvdXJjZTx1bmtub3duPikge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHNvdXJjZS5uYXZpZ2F0ZSQuc3Vic2NyaWJlKCh1cmxDb21tYW5kKSA9PiB0aGlzLm5hdmlnYXRlLmVtaXQodXJsQ29tbWFuZCkpXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCgoKSA9PiB7XG4gICAgICB0aGlzLnNvdXJjZS5jb25maWckLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnNvdXJjZS5jdXN0b21lciQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuc291cmNlLmRhdGEkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLnNvdXJjZS5uYXZpZ2F0ZSQuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiY29tcG9uZW50XCI+PC9uZy1jb250YWluZXI+XG4iXX0=