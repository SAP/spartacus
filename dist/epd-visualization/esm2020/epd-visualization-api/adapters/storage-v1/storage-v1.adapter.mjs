import { Injectable, inject } from '@angular/core';
import { LoggerService, normalizeHttpError, } from '@spartacus/core';
import { NODES_RESPONSE_NORMALIZER, } from '@spartacus/epd-visualization/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/epd-visualization/root";
import * as i3 from "@spartacus/core";
/**
 * This adapter references an API that is expected to be deprecated and relocated
 * since multiple microservice APIs are being combined into a single namespace.
 * A new adapter implementation will be added and this one will be deprecated
 * when the new endpoint is available.
 */
export class StorageV1Adapter {
    constructor(http, epdVisualizationConfig, converter) {
        this.http = http;
        this.epdVisualizationConfig = epdVisualizationConfig;
        this.converter = converter;
        this.logger = inject(LoggerService);
        this.baseUrl = this.getBaseUrl();
    }
    getBaseUrl() {
        const epdVisualization = this.epdVisualizationConfig
            .epdVisualization;
        const visualizationApiConfig = epdVisualization.apis;
        return `${visualizationApiConfig.baseUrl}/vis/public/storage`;
    }
    getUrl(sceneId, nodeIds, $expand, $filter, contentType) {
        const queryParts = [];
        if (nodeIds) {
            nodeIds.forEach((nodeId) => queryParts.push(`id=${nodeId}`));
        }
        if ($expand) {
            queryParts.push(`$expand=${$expand.join(',')}`);
        }
        if ($filter) {
            queryParts.push(`$filter=${$filter.join(',')}`);
        }
        if (contentType) {
            queryParts.push(`contentType=${contentType}`);
        }
        const queryString = queryParts.length
            ? `?${queryParts.join('&')}`
            : '';
        return `${this.baseUrl}/v1/scenes/${sceneId}/nodes${queryString}`;
    }
    /**
     * Used for getting information about scene nodes (such as metadata used to store usage ID values).
     * @param sceneId The scene id to use as the sceneId path parameter.
     * @param nodeIds An array of scene node ids to pass in id query parameters.
     * @param $expand A set of strings to combine to form the $expand query parameter.
     * @param $filter A set of strings to combine to form the $filter query parameter.
     * @param contentType The contentType query parameter.
     * @returns An Observable producing a NodesResponse which contains an array of objects describing scene nodes.
     */
    getNodes(sceneId, nodeIds, $expand, $filter, contentType) {
        return this.http
            .get(this.getUrl(sceneId, nodeIds, $expand, $filter, contentType))
            .pipe(catchError((error) => throwError(normalizeHttpError(error, this.logger))), this.converter.pipeable(NODES_RESPONSE_NORMALIZER));
    }
}
StorageV1Adapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter, deps: [{ token: i1.HttpClient }, { token: i2.EpdVisualizationConfig }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
StorageV1Adapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorageV1Adapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.EpdVisualizationConfig }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS12MS5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9lcGQtdmlzdWFsaXphdGlvbi1hcGkvYWRhcHRlcnMvc3RvcmFnZS12MS9zdG9yYWdlLXYxLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUVMLGFBQWEsRUFDYixrQkFBa0IsR0FDbkIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wseUJBQXlCLEdBRzFCLE1BQU0sbUNBQW1DLENBQUM7QUFNM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBRTVDOzs7OztHQUtHO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUczQixZQUNZLElBQWdCLEVBQ2hCLHNCQUE4QyxFQUM5QyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFMN0IsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQU92QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBSU8sVUFBVTtRQUNoQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0I7YUFDakQsZ0JBQStDLENBQUM7UUFDbkQsTUFBTSxzQkFBc0IsR0FDMUIsZ0JBQWdCLENBQUMsSUFBOEIsQ0FBQztRQUVsRCxPQUFPLEdBQUcsc0JBQXNCLENBQUMsT0FBTyxxQkFBcUIsQ0FBQztJQUNoRSxDQUFDO0lBRVMsTUFBTSxDQUNkLE9BQWUsRUFDZixPQUFrQixFQUNsQixPQUFrQixFQUNsQixPQUFrQixFQUNsQixXQUFvQjtRQUVwQixNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDWCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLE9BQU8sRUFBRTtZQUNYLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUNELElBQUksV0FBVyxFQUFFO1lBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLFdBQVcsR0FBVyxVQUFVLENBQUMsTUFBTTtZQUMzQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDUCxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sY0FBYyxPQUFPLFNBQVMsV0FBVyxFQUFFLENBQUM7SUFDcEUsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUSxDQUNOLE9BQWUsRUFDZixPQUFrQixFQUNsQixPQUFrQixFQUNsQixPQUFrQixFQUNsQixXQUFvQjtRQUVwQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQ2pFLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQixVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUNuRCxFQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQ25ELENBQUM7SUFDTixDQUFDOzs2R0F4RVUsZ0JBQWdCO2lIQUFoQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFENUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIExvZ2dlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE5PREVTX1JFU1BPTlNFX05PUk1BTElaRVIsXG4gIE5vZGVzUmVzcG9uc2UsXG4gIFNjZW5lQWRhcHRlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlJztcbmltcG9ydCB7XG4gIEVwZFZpc3VhbGl6YXRpb25Db25maWcsXG4gIEVwZFZpc3VhbGl6YXRpb25Jbm5lckNvbmZpZyxcbiAgVmlzdWFsaXphdGlvbkFwaUNvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbi8qKlxuICogVGhpcyBhZGFwdGVyIHJlZmVyZW5jZXMgYW4gQVBJIHRoYXQgaXMgZXhwZWN0ZWQgdG8gYmUgZGVwcmVjYXRlZCBhbmQgcmVsb2NhdGVkXG4gKiBzaW5jZSBtdWx0aXBsZSBtaWNyb3NlcnZpY2UgQVBJcyBhcmUgYmVpbmcgY29tYmluZWQgaW50byBhIHNpbmdsZSBuYW1lc3BhY2UuXG4gKiBBIG5ldyBhZGFwdGVyIGltcGxlbWVudGF0aW9uIHdpbGwgYmUgYWRkZWQgYW5kIHRoaXMgb25lIHdpbGwgYmUgZGVwcmVjYXRlZFxuICogd2hlbiB0aGUgbmV3IGVuZHBvaW50IGlzIGF2YWlsYWJsZS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VWMUFkYXB0ZXIgaW1wbGVtZW50cyBTY2VuZUFkYXB0ZXIge1xuICBwcm90ZWN0ZWQgbG9nZ2VyID0gaW5qZWN0KExvZ2dlclNlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBlcGRWaXN1YWxpemF0aW9uQ29uZmlnOiBFcGRWaXN1YWxpemF0aW9uQ29uZmlnLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gdGhpcy5nZXRCYXNlVXJsKCk7XG4gIH1cblxuICBwcml2YXRlIGJhc2VVcmw6IHN0cmluZztcblxuICBwcml2YXRlIGdldEJhc2VVcmwoKSB7XG4gICAgY29uc3QgZXBkVmlzdWFsaXphdGlvbiA9IHRoaXMuZXBkVmlzdWFsaXphdGlvbkNvbmZpZ1xuICAgICAgLmVwZFZpc3VhbGl6YXRpb24gYXMgRXBkVmlzdWFsaXphdGlvbklubmVyQ29uZmlnO1xuICAgIGNvbnN0IHZpc3VhbGl6YXRpb25BcGlDb25maWcgPVxuICAgICAgZXBkVmlzdWFsaXphdGlvbi5hcGlzIGFzIFZpc3VhbGl6YXRpb25BcGlDb25maWc7XG5cbiAgICByZXR1cm4gYCR7dmlzdWFsaXphdGlvbkFwaUNvbmZpZy5iYXNlVXJsfS92aXMvcHVibGljL3N0b3JhZ2VgO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFVybChcbiAgICBzY2VuZUlkOiBzdHJpbmcsXG4gICAgbm9kZUlkcz86IHN0cmluZ1tdLFxuICAgICRleHBhbmQ/OiBzdHJpbmdbXSxcbiAgICAkZmlsdGVyPzogc3RyaW5nW10sXG4gICAgY29udGVudFR5cGU/OiBzdHJpbmdcbiAgKTogc3RyaW5nIHtcbiAgICBjb25zdCBxdWVyeVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGlmIChub2RlSWRzKSB7XG4gICAgICBub2RlSWRzLmZvckVhY2goKG5vZGVJZCkgPT4gcXVlcnlQYXJ0cy5wdXNoKGBpZD0ke25vZGVJZH1gKSk7XG4gICAgfVxuICAgIGlmICgkZXhwYW5kKSB7XG4gICAgICBxdWVyeVBhcnRzLnB1c2goYCRleHBhbmQ9JHskZXhwYW5kLmpvaW4oJywnKX1gKTtcbiAgICB9XG4gICAgaWYgKCRmaWx0ZXIpIHtcbiAgICAgIHF1ZXJ5UGFydHMucHVzaChgJGZpbHRlcj0keyRmaWx0ZXIuam9pbignLCcpfWApO1xuICAgIH1cbiAgICBpZiAoY29udGVudFR5cGUpIHtcbiAgICAgIHF1ZXJ5UGFydHMucHVzaChgY29udGVudFR5cGU9JHtjb250ZW50VHlwZX1gKTtcbiAgICB9XG4gICAgY29uc3QgcXVlcnlTdHJpbmc6IHN0cmluZyA9IHF1ZXJ5UGFydHMubGVuZ3RoXG4gICAgICA/IGA/JHtxdWVyeVBhcnRzLmpvaW4oJyYnKX1gXG4gICAgICA6ICcnO1xuICAgIHJldHVybiBgJHt0aGlzLmJhc2VVcmx9L3YxL3NjZW5lcy8ke3NjZW5lSWR9L25vZGVzJHtxdWVyeVN0cmluZ31gO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgZm9yIGdldHRpbmcgaW5mb3JtYXRpb24gYWJvdXQgc2NlbmUgbm9kZXMgKHN1Y2ggYXMgbWV0YWRhdGEgdXNlZCB0byBzdG9yZSB1c2FnZSBJRCB2YWx1ZXMpLlxuICAgKiBAcGFyYW0gc2NlbmVJZCBUaGUgc2NlbmUgaWQgdG8gdXNlIGFzIHRoZSBzY2VuZUlkIHBhdGggcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gbm9kZUlkcyBBbiBhcnJheSBvZiBzY2VuZSBub2RlIGlkcyB0byBwYXNzIGluIGlkIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSAkZXhwYW5kIEEgc2V0IG9mIHN0cmluZ3MgdG8gY29tYmluZSB0byBmb3JtIHRoZSAkZXhwYW5kIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICogQHBhcmFtICRmaWx0ZXIgQSBzZXQgb2Ygc3RyaW5ncyB0byBjb21iaW5lIHRvIGZvcm0gdGhlICRmaWx0ZXIgcXVlcnkgcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0gY29udGVudFR5cGUgVGhlIGNvbnRlbnRUeXBlIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICogQHJldHVybnMgQW4gT2JzZXJ2YWJsZSBwcm9kdWNpbmcgYSBOb2Rlc1Jlc3BvbnNlIHdoaWNoIGNvbnRhaW5zIGFuIGFycmF5IG9mIG9iamVjdHMgZGVzY3JpYmluZyBzY2VuZSBub2Rlcy5cbiAgICovXG4gIGdldE5vZGVzKFxuICAgIHNjZW5lSWQ6IHN0cmluZyxcbiAgICBub2RlSWRzPzogc3RyaW5nW10sXG4gICAgJGV4cGFuZD86IHN0cmluZ1tdLFxuICAgICRmaWx0ZXI/OiBzdHJpbmdbXSxcbiAgICBjb250ZW50VHlwZT86IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE5vZGVzUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0KHRoaXMuZ2V0VXJsKHNjZW5lSWQsIG5vZGVJZHMsICRleHBhbmQsICRmaWx0ZXIsIGNvbnRlbnRUeXBlKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpKVxuICAgICAgICApLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShOT0RFU19SRVNQT05TRV9OT1JNQUxJWkVSKVxuICAgICAgKTtcbiAgfVxufVxuIl19