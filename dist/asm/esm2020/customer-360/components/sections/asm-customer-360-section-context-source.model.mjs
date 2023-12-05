/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { AsmCustomer360SectionContext } from './asm-customer-360-section-context.model';
import * as i0 from "@angular/core";
export class AsmCustomer360SectionContextSource extends AsmCustomer360SectionContext {
    constructor() {
        super(...arguments);
        this.customer$ = new ReplaySubject(1);
        this.config$ = new ReplaySubject(1);
        this.navigate$ = new Subject();
        this.data$ = new ReplaySubject(1);
        this.savedCarts$ = new ReplaySubject(1);
        this.activeCart$ = new ReplaySubject(1);
        this.orderHistory$ = new ReplaySubject(1);
    }
}
AsmCustomer360SectionContextSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360SectionContextSource.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1zZWN0aW9uLWNvbnRleHQtc291cmNlLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24tY29udGV4dC1zb3VyY2UubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFOUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMENBQTBDLENBQUM7O0FBR3hGLE1BQU0sT0FBTyxrQ0FFWCxTQUFRLDRCQUFrQztJQUg1Qzs7UUFJVyxjQUFTLEdBQUcsSUFBSSxhQUFhLENBQU8sQ0FBQyxDQUFDLENBQUM7UUFFdkMsWUFBTyxHQUFHLElBQUksYUFBYSxDQUE4QixDQUFDLENBQUMsQ0FBQztRQUU1RCxjQUFTLEdBQXdCLElBQUksT0FBTyxFQUFFLENBQUM7UUFFL0MsVUFBSyxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsSUFBSSxhQUFhLENBQWMsQ0FBQyxDQUFDLENBQUM7UUFFaEQsZ0JBQVcsR0FBRyxJQUFJLGFBQWEsQ0FBTyxDQUFDLENBQUMsQ0FBQztRQUV6QyxrQkFBYSxHQUFHLElBQUksYUFBYSxDQUFtQixDQUFDLENBQUMsQ0FBQztLQUNqRTs7K0hBaEJZLGtDQUFrQzttSUFBbEMsa0NBQWtDOzJGQUFsQyxrQ0FBa0M7a0JBRDlDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFNlY3Rpb25Db25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBDYXJ0IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBVcmxDb21tYW5kLCBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9yZGVySGlzdG9yeUxpc3QgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0IH0gZnJvbSAnLi9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24tY29udGV4dC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0U291cmNlPFxuICBEYXRhXG4+IGV4dGVuZHMgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dDxEYXRhPiB7XG4gIHJlYWRvbmx5IGN1c3RvbWVyJCA9IG5ldyBSZXBsYXlTdWJqZWN0PFVzZXI+KDEpO1xuXG4gIHJlYWRvbmx5IGNvbmZpZyQgPSBuZXcgUmVwbGF5U3ViamVjdDxBc21DdXN0b21lcjM2MFNlY3Rpb25Db25maWc+KDEpO1xuXG4gIHJlYWRvbmx5IG5hdmlnYXRlJDogU3ViamVjdDxVcmxDb21tYW5kPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcmVhZG9ubHkgZGF0YSQgPSBuZXcgUmVwbGF5U3ViamVjdDxEYXRhPigxKTtcblxuICByZWFkb25seSBzYXZlZENhcnRzJCA9IG5ldyBSZXBsYXlTdWJqZWN0PEFycmF5PENhcnQ+PigxKTtcblxuICByZWFkb25seSBhY3RpdmVDYXJ0JCA9IG5ldyBSZXBsYXlTdWJqZWN0PENhcnQ+KDEpO1xuXG4gIHJlYWRvbmx5IG9yZGVySGlzdG9yeSQgPSBuZXcgUmVwbGF5U3ViamVjdDxPcmRlckhpc3RvcnlMaXN0PigxKTtcbn1cbiJdfQ==