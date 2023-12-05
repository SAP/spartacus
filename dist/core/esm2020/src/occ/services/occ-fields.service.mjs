import { Injectable } from '@angular/core';
import { mergeFields, parseFields } from '../utils/occ-fields';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
/**
 * Helper service for optimizing endpoint calls to occ backend
 */
export class OccFieldsService {
    constructor(http) {
        this.http = http;
        this.FIELDS_PARAM = 'fields';
    }
    /**
     * Merge similar occ endpoints calls by merging fields parameter
     *
     * We assume that different scopes are defined by different fields parameters,
     * so we are grouping all requests with the same urls (except fields definition)
     * and merging into one request with fields that will satisfy all separate ones.
     *
     * @param models
     */
    getOptimalUrlGroups(models) {
        const groupedByUrls = {};
        for (const model of models) {
            const [urlPart, fields] = this.splitFields(model.url ?? '');
            if (!groupedByUrls[urlPart]) {
                groupedByUrls[urlPart] = {};
            }
            model.fields = fields ? parseFields(fields) : {};
            if (model.scopedData.scope !== undefined) {
                groupedByUrls[urlPart][model.scopedData.scope] = model;
            }
        }
        const mergedUrls = {};
        for (const [url, group] of Object.entries(groupedByUrls)) {
            const urlWithFields = this.getUrlWithFields(url, Object.values(group).map((lo) => lo.fields));
            mergedUrls[urlWithFields] = group;
        }
        return mergedUrls;
    }
    /**
     * Extract fields parameter from occ endpoint url
     *
     * @param urlWithFields
     */
    splitFields(urlWithFields) {
        const [url, params] = urlWithFields.split('?');
        const paramsMap = {};
        if (params) {
            params.split('&').forEach((param) => {
                const keyValue = param.split('=');
                paramsMap[keyValue[0]] = keyValue[1];
            });
        }
        const nonFieldsParams = Object.keys(paramsMap)
            .sort()
            .reduce((id, par) => {
            if (par !== this.FIELDS_PARAM) {
                id.push(paramsMap[par] ? `${par}=${paramsMap[par]}` : par);
            }
            return id;
        }, []);
        const nonFields = nonFieldsParams.join('&');
        return [
            nonFields ? `${url}?${nonFields}` : url,
            paramsMap[this.FIELDS_PARAM],
        ];
    }
    /**
     * Combine url with field parameters
     *
     * @param url
     * @param fields
     */
    getUrlWithFields(url, fields) {
        const mergedFields = mergeFields(fields);
        if (mergedFields) {
            url += url.includes('?') ? '&' : '?';
            url += `${this.FIELDS_PARAM}=${mergedFields}`;
        }
        return url;
    }
}
OccFieldsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFieldsService, deps: [{ token: i1.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
OccFieldsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFieldsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccFieldsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWZpZWxkcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL3NlcnZpY2VzL29jYy1maWVsZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQTZCL0Q7O0dBRUc7QUFJSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQXNCLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFFNUIsaUJBQVksR0FBRyxRQUFRLENBQUM7SUFGTyxDQUFDO0lBSTFDOzs7Ozs7OztPQVFHO0lBQ0gsbUJBQW1CLENBQUMsTUFBMkI7UUFDN0MsTUFBTSxhQUFhLEdBQTBCLEVBQUUsQ0FBQztRQUNoRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQTBCLEVBQUU7WUFDOUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDM0IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUM3QjtZQUNELEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNqRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRTtnQkFDeEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3hEO1NBQ0Y7UUFFRCxNQUFNLFVBQVUsR0FBMEIsRUFBRSxDQUFDO1FBQzdDLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3hELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FDekMsR0FBRyxFQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQzVDLENBQUM7WUFDRixVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxXQUFXLENBQUMsYUFBcUI7UUFDdkMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLE1BQU0sU0FBUyxHQUEyQixFQUFFLENBQUM7UUFFN0MsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNsQyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUMzQyxJQUFJLEVBQUU7YUFDTixNQUFNLENBQUMsQ0FBQyxFQUFZLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDNUIsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDN0IsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1RDtZQUNELE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRVQsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxPQUFPO1lBQ0wsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRztZQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM3QixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssZ0JBQWdCLENBQUMsR0FBVyxFQUFFLE1BQTJCO1FBQy9ELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QyxJQUFJLFlBQVksRUFBRTtZQUNoQixHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDckMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxZQUFZLEVBQUUsQ0FBQztTQUMvQztRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7NkdBeEZVLGdCQUFnQjtpSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjb3BlZERhdGEgfSBmcm9tICcuLi8uLi9tb2RlbC9zY29wZWQtZGF0YSc7XG5pbXBvcnQgeyBtZXJnZUZpZWxkcywgcGFyc2VGaWVsZHMgfSBmcm9tICcuLi91dGlscy9vY2MtZmllbGRzJztcblxuZXhwb3J0IGludGVyZmFjZSBTY29wZWREYXRhV2l0aFVybCB7XG4gIC8qKiBVcmwgKHdpdGggZmllbGRzKSB0byBsb2FkIHNjb3BlZCBkYXRhICovXG4gIHVybD86IHN0cmluZztcbiAgLyoqIHNjb3BlZCBkYXRhIG1vZGVsICovXG4gIHNjb3BlZERhdGE6IFNjb3BlZERhdGE8YW55Pjtcbn1cblxuLyoqXG4gKiBJbnRlcm1lZGlhdGUgbW9kZWwgdG8gYWNjb21tb2RhdGUgYWxsIGRhdGEgbmVlZGVkIHRvIHBlcmZvcm0gb2NjIGZpZWxkcyBvcHRpbWl6YXRpb25zXG4gKiB3cmFwcGluZyBTY29wZWREYXRhIHdpdGggdXJsIGFuZCBmaWVsZHNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBPY2NGaWVsZHNNb2RlbCBleHRlbmRzIFNjb3BlZERhdGFXaXRoVXJsIHtcbiAgLyoqIGV4dHJhY3RlZCBmaWVsZHMgb2JqZWN0LCB1c2VkIHRvIGV4dHJhY3QgZGF0YSBmcm9tIGJyb2FkZXIgbW9kZWwgKi9cbiAgZmllbGRzOiBvYmplY3Q7XG59XG5cbi8qKlxuICogR3JvdXBlZCByZXN0IGNhbGxzIHdpdGggb3B0aW1hbCB1cmxzXG4gKlxuICogT25lIHVybCBncm91cHMgYWxsIHNjb3BlcyBpdCBjb3ZlcnMgd2l0aCByZWxhdGVkIG9jY0ZpZWxkc01vZGVsc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIE9jY09wdGltaW1hbFVybEdyb3VwcyB7XG4gIFtvcHRpbWFsVXJsOiBzdHJpbmddOiB7XG4gICAgW3Njb3BlOiBzdHJpbmddOiBPY2NGaWVsZHNNb2RlbDtcbiAgfTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgc2VydmljZSBmb3Igb3B0aW1pemluZyBlbmRwb2ludCBjYWxscyB0byBvY2MgYmFja2VuZFxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjRmllbGRzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIHByb3RlY3RlZCBGSUVMRFNfUEFSQU0gPSAnZmllbGRzJztcblxuICAvKipcbiAgICogTWVyZ2Ugc2ltaWxhciBvY2MgZW5kcG9pbnRzIGNhbGxzIGJ5IG1lcmdpbmcgZmllbGRzIHBhcmFtZXRlclxuICAgKlxuICAgKiBXZSBhc3N1bWUgdGhhdCBkaWZmZXJlbnQgc2NvcGVzIGFyZSBkZWZpbmVkIGJ5IGRpZmZlcmVudCBmaWVsZHMgcGFyYW1ldGVycyxcbiAgICogc28gd2UgYXJlIGdyb3VwaW5nIGFsbCByZXF1ZXN0cyB3aXRoIHRoZSBzYW1lIHVybHMgKGV4Y2VwdCBmaWVsZHMgZGVmaW5pdGlvbilcbiAgICogYW5kIG1lcmdpbmcgaW50byBvbmUgcmVxdWVzdCB3aXRoIGZpZWxkcyB0aGF0IHdpbGwgc2F0aXNmeSBhbGwgc2VwYXJhdGUgb25lcy5cbiAgICpcbiAgICogQHBhcmFtIG1vZGVsc1xuICAgKi9cbiAgZ2V0T3B0aW1hbFVybEdyb3Vwcyhtb2RlbHM6IFNjb3BlZERhdGFXaXRoVXJsW10pOiBPY2NPcHRpbWltYWxVcmxHcm91cHMge1xuICAgIGNvbnN0IGdyb3VwZWRCeVVybHM6IE9jY09wdGltaW1hbFVybEdyb3VwcyA9IHt9O1xuICAgIGZvciAoY29uc3QgbW9kZWwgb2YgbW9kZWxzIGFzIE9jY0ZpZWxkc01vZGVsW10pIHtcbiAgICAgIGNvbnN0IFt1cmxQYXJ0LCBmaWVsZHNdID0gdGhpcy5zcGxpdEZpZWxkcyhtb2RlbC51cmwgPz8gJycpO1xuICAgICAgaWYgKCFncm91cGVkQnlVcmxzW3VybFBhcnRdKSB7XG4gICAgICAgIGdyb3VwZWRCeVVybHNbdXJsUGFydF0gPSB7fTtcbiAgICAgIH1cbiAgICAgIG1vZGVsLmZpZWxkcyA9IGZpZWxkcyA/IHBhcnNlRmllbGRzKGZpZWxkcykgOiB7fTtcbiAgICAgIGlmIChtb2RlbC5zY29wZWREYXRhLnNjb3BlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZ3JvdXBlZEJ5VXJsc1t1cmxQYXJ0XVttb2RlbC5zY29wZWREYXRhLnNjb3BlXSA9IG1vZGVsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1lcmdlZFVybHM6IE9jY09wdGltaW1hbFVybEdyb3VwcyA9IHt9O1xuICAgIGZvciAoY29uc3QgW3VybCwgZ3JvdXBdIG9mIE9iamVjdC5lbnRyaWVzKGdyb3VwZWRCeVVybHMpKSB7XG4gICAgICBjb25zdCB1cmxXaXRoRmllbGRzID0gdGhpcy5nZXRVcmxXaXRoRmllbGRzKFxuICAgICAgICB1cmwsXG4gICAgICAgIE9iamVjdC52YWx1ZXMoZ3JvdXApLm1hcCgobG8pID0+IGxvLmZpZWxkcylcbiAgICAgICk7XG4gICAgICBtZXJnZWRVcmxzW3VybFdpdGhGaWVsZHNdID0gZ3JvdXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lcmdlZFVybHM7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdCBmaWVsZHMgcGFyYW1ldGVyIGZyb20gb2NjIGVuZHBvaW50IHVybFxuICAgKlxuICAgKiBAcGFyYW0gdXJsV2l0aEZpZWxkc1xuICAgKi9cbiAgcHJpdmF0ZSBzcGxpdEZpZWxkcyh1cmxXaXRoRmllbGRzOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgICBjb25zdCBbdXJsLCBwYXJhbXNdID0gdXJsV2l0aEZpZWxkcy5zcGxpdCgnPycpO1xuXG4gICAgY29uc3QgcGFyYW1zTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG5cbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICBwYXJhbXMuc3BsaXQoJyYnKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgICAgICBjb25zdCBrZXlWYWx1ZSA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICAgIHBhcmFtc01hcFtrZXlWYWx1ZVswXV0gPSBrZXlWYWx1ZVsxXTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG5vbkZpZWxkc1BhcmFtcyA9IE9iamVjdC5rZXlzKHBhcmFtc01hcClcbiAgICAgIC5zb3J0KClcbiAgICAgIC5yZWR1Y2UoKGlkOiBzdHJpbmdbXSwgcGFyKSA9PiB7XG4gICAgICAgIGlmIChwYXIgIT09IHRoaXMuRklFTERTX1BBUkFNKSB7XG4gICAgICAgICAgaWQucHVzaChwYXJhbXNNYXBbcGFyXSA/IGAke3Bhcn09JHtwYXJhbXNNYXBbcGFyXX1gIDogcGFyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBub25GaWVsZHMgPSBub25GaWVsZHNQYXJhbXMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5vbkZpZWxkcyA/IGAke3VybH0/JHtub25GaWVsZHN9YCA6IHVybCxcbiAgICAgIHBhcmFtc01hcFt0aGlzLkZJRUxEU19QQVJBTV0sXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21iaW5lIHVybCB3aXRoIGZpZWxkIHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcGFyYW0gZmllbGRzXG4gICAqL1xuICBwcml2YXRlIGdldFVybFdpdGhGaWVsZHModXJsOiBzdHJpbmcsIGZpZWxkczogKHN0cmluZyB8IG9iamVjdClbXSk6IHN0cmluZyB7XG4gICAgY29uc3QgbWVyZ2VkRmllbGRzID0gbWVyZ2VGaWVsZHMoZmllbGRzKTtcblxuICAgIGlmIChtZXJnZWRGaWVsZHMpIHtcbiAgICAgIHVybCArPSB1cmwuaW5jbHVkZXMoJz8nKSA/ICcmJyA6ICc/JztcbiAgICAgIHVybCArPSBgJHt0aGlzLkZJRUxEU19QQVJBTX09JHttZXJnZWRGaWVsZHN9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9XG59XG4iXX0=