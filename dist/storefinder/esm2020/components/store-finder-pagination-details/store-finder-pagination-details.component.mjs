/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class StoreFinderPaginationDetailsComponent {
    constructor() {
        // Intentional empty constructor
    }
    getResultsPerPage() {
        if (this.pagination.totalResults > this.pagination.pageSize) {
            const firstItem = this.pagination.currentPage * this.pagination.pageSize + 1;
            let resultsPerPage = (this.pagination.currentPage + 1) * this.pagination.pageSize;
            if (resultsPerPage > this.pagination.totalResults) {
                resultsPerPage = this.pagination.totalResults;
            }
            return `${firstItem} - ${resultsPerPage}`;
        }
        else {
            return `1 - ${this.pagination.totalResults}`;
        }
    }
}
StoreFinderPaginationDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderPaginationDetailsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StoreFinderPaginationDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StoreFinderPaginationDetailsComponent, selector: "cx-store-finder-pagination-details", inputs: { pagination: "pagination" }, ngImport: i0, template: "<span class=\"cx-pagination-details\">\n  {{ getResultsPerPage() }}\n  {{\n    'storeFinder.fromStoresFound'\n      | cxTranslate: { count: pagination.totalResults }\n  }}\n</span>\n", dependencies: [{ kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderPaginationDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-store-finder-pagination-details', template: "<span class=\"cx-pagination-details\">\n  {{ getResultsPerPage() }}\n  {{\n    'storeFinder.fromStoresFound'\n      | cxTranslate: { count: pagination.totalResults }\n  }}\n</span>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { pagination: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLXBhZ2luYXRpb24tZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvc3RvcmVmaW5kZXIvY29tcG9uZW50cy9zdG9yZS1maW5kZXItcGFnaW5hdGlvbi1kZXRhaWxzL3N0b3JlLWZpbmRlci1wYWdpbmF0aW9uLWRldGFpbHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvbXBvbmVudHMvc3RvcmUtZmluZGVyLXBhZ2luYXRpb24tZGV0YWlscy9zdG9yZS1maW5kZXItcGFnaW5hdGlvbi1kZXRhaWxzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBT2pELE1BQU0sT0FBTyxxQ0FBcUM7SUFJaEQ7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDM0QsTUFBTSxTQUFTLEdBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRTdELElBQUksY0FBYyxHQUNoQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRS9ELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFO2dCQUNqRCxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7YUFDL0M7WUFFRCxPQUFPLEdBQUcsU0FBUyxNQUFNLGNBQWMsRUFBRSxDQUFDO1NBQzNDO2FBQU07WUFDTCxPQUFPLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUM5QztJQUNILENBQUM7O2tJQXhCVSxxQ0FBcUM7c0hBQXJDLHFDQUFxQyxnSENibEQsd0xBT0E7MkZETWEscUNBQXFDO2tCQUpqRCxTQUFTOytCQUNFLG9DQUFvQzswRUFLOUMsVUFBVTtzQkFEVCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtc3RvcmUtZmluZGVyLXBhZ2luYXRpb24tZGV0YWlscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zdG9yZS1maW5kZXItcGFnaW5hdGlvbi1kZXRhaWxzLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVGaW5kZXJQYWdpbmF0aW9uRGV0YWlsc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpXG4gIHBhZ2luYXRpb246IFBhZ2luYXRpb25Nb2RlbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgZ2V0UmVzdWx0c1BlclBhZ2UoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uLnRvdGFsUmVzdWx0cyA+IHRoaXMucGFnaW5hdGlvbi5wYWdlU2l6ZSkge1xuICAgICAgY29uc3QgZmlyc3RJdGVtID1cbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uLmN1cnJlbnRQYWdlICogdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplICsgMTtcblxuICAgICAgbGV0IHJlc3VsdHNQZXJQYWdlID1cbiAgICAgICAgKHRoaXMucGFnaW5hdGlvbi5jdXJyZW50UGFnZSArIDEpICogdGhpcy5wYWdpbmF0aW9uLnBhZ2VTaXplO1xuXG4gICAgICBpZiAocmVzdWx0c1BlclBhZ2UgPiB0aGlzLnBhZ2luYXRpb24udG90YWxSZXN1bHRzKSB7XG4gICAgICAgIHJlc3VsdHNQZXJQYWdlID0gdGhpcy5wYWdpbmF0aW9uLnRvdGFsUmVzdWx0cztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGAke2ZpcnN0SXRlbX0gLSAke3Jlc3VsdHNQZXJQYWdlfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgMSAtICR7dGhpcy5wYWdpbmF0aW9uLnRvdGFsUmVzdWx0c31gO1xuICAgIH1cbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9XCJjeC1wYWdpbmF0aW9uLWRldGFpbHNcIj5cbiAge3sgZ2V0UmVzdWx0c1BlclBhZ2UoKSB9fVxuICB7e1xuICAgICdzdG9yZUZpbmRlci5mcm9tU3RvcmVzRm91bmQnXG4gICAgICB8IGN4VHJhbnNsYXRlOiB7IGNvdW50OiBwYWdpbmF0aW9uLnRvdGFsUmVzdWx0cyB9XG4gIH19XG48L3NwYW4+XG4iXX0=