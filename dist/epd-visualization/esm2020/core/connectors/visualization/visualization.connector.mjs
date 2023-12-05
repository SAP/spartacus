/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./visualization.adapter";
export class VisualizationConnector {
    constructor(visualizationAdapter) {
        this.visualizationAdapter = visualizationAdapter;
    }
    /**
     * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
     * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
     * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
     * Only visualizations that have the specified usage ID value will be returned.
     * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
     * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
     * @returns An Observable producing a LookupVisualizationsResponse which contains an array of objects describing matched visualizations.
     */
    lookupVisualization(visualizationUsageId, folderUsageId) {
        return this.visualizationAdapter.lookupVisualization(visualizationUsageId, folderUsageId);
    }
}
VisualizationConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, deps: [{ token: i1.VisualizationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
VisualizationConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualizationConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.VisualizationAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsaXphdGlvbi5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvcmUvY29ubmVjdG9ycy92aXN1YWxpemF0aW9uL3Zpc3VhbGl6YXRpb24uY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFzQixvQkFBMEM7UUFBMUMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtJQUFHLENBQUM7SUFFcEU7Ozs7Ozs7O09BUUc7SUFDSCxtQkFBbUIsQ0FDakIsb0JBQTZCLEVBQzdCLGFBQXNCO1FBRXRCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLG1CQUFtQixDQUNsRCxvQkFBb0IsRUFDcEIsYUFBYSxDQUNkLENBQUM7SUFDSixDQUFDOzttSEFwQlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNhZ2VJZCB9IGZyb20gJ0BzcGFydGFjdXMvZXBkLXZpc3VhbGl6YXRpb24vcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb29rdXBWaXN1YWxpemF0aW9uc1Jlc3BvbnNlIH0gZnJvbSAnLi9sb29rdXAtdmlzdWFsaXphdGlvbnMtcmVzcG9uc2UnO1xuaW1wb3J0IHsgVmlzdWFsaXphdGlvbkFkYXB0ZXIgfSBmcm9tICcuL3Zpc3VhbGl6YXRpb24uYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxpemF0aW9uQ29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHZpc3VhbGl6YXRpb25BZGFwdGVyOiBWaXN1YWxpemF0aW9uQWRhcHRlcikge31cblxuICAvKipcbiAgICogVXNlZCBmb3IgZmluZGluZyBhIHZpc3VhbGl6YXRpb24gYnkgVXNhZ2UgSUQgdGhhdCBoYXMgYW5vbnltb3VzICh1bmF1dGhlbnRpY2F0ZWQpIHJlYWQgYWNjZXNzIGVuYWJsZWQuXG4gICAqIFRoZSBzZWFyY2ggaXMgcGVyZm9ybWVkIGluIHRoZSBTQVAgRVBEIFZpc3VhbGl6YXRpb24gc2VydmljZSBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIFNhYVMgc3Vic2NyaXB0aW9uIGZvciB0aGUgU0FQIEVQRCB0ZW5hbnQuXG4gICAqIEBwYXJhbSB2aXN1YWxpemF0aW9uVXNhZ2VJZCBUaGUgU0FQIEVQRCBWaXN1YWxpemF0aW9uIHVzYWdlIElEIHZhbHVlIGlkZW50aWZ5aW5nIHZpc3VhbGl6YXRpb25zIHRvIG1hdGNoLlxuICAgKiBPbmx5IHZpc3VhbGl6YXRpb25zIHRoYXQgaGF2ZSB0aGUgc3BlY2lmaWVkIHVzYWdlIElEIHZhbHVlIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqIEBwYXJhbSBmb2xkZXJVc2FnZUlkIFRoZSBTQVAgRVBEIFZpc3VhbGl6YXRpb24gdXNhZ2UgSUQgaWRlbnRpZnlpbmcgZm9sZGVycyB0byBzZWFyY2ggZm9yIHZpc3VhbGl6YXRpb25zLlxuICAgKiBPbmx5IGZvbGRlcnMgdGhhdCBhcmUgdGFnZ2VkIHdpdGggdGhlIHNwZWNpZmllZCB1c2FnZSBJRCB2YWx1ZSB0aGF0IGhhdmUgYW5vbnltb3VzIGFjY2VzcyBlbmFibGVkIHdpbGwgYmUgc2VhcmNoZWQuXG4gICAqIEByZXR1cm5zIEFuIE9ic2VydmFibGUgcHJvZHVjaW5nIGEgTG9va3VwVmlzdWFsaXphdGlvbnNSZXNwb25zZSB3aGljaCBjb250YWlucyBhbiBhcnJheSBvZiBvYmplY3RzIGRlc2NyaWJpbmcgbWF0Y2hlZCB2aXN1YWxpemF0aW9ucy5cbiAgICovXG4gIGxvb2t1cFZpc3VhbGl6YXRpb24oXG4gICAgdmlzdWFsaXphdGlvblVzYWdlSWQ6IFVzYWdlSWQsXG4gICAgZm9sZGVyVXNhZ2VJZDogVXNhZ2VJZFxuICApOiBPYnNlcnZhYmxlPExvb2t1cFZpc3VhbGl6YXRpb25zUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxpemF0aW9uQWRhcHRlci5sb29rdXBWaXN1YWxpemF0aW9uKFxuICAgICAgdmlzdWFsaXphdGlvblVzYWdlSWQsXG4gICAgICBmb2xkZXJVc2FnZUlkXG4gICAgKTtcbiAgfVxufVxuIl19