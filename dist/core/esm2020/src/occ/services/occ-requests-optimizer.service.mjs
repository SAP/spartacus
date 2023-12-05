import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { extractFields } from '../utils/occ-fields';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./occ-fields.service";
export class OccRequestsOptimizerService {
    constructor(http, occFields) {
        this.http = http;
        this.occFields = occFields;
    }
    /**
     * Optimize occ endpoint calls merging requests to the same url by merging field parameters
     *
     * @param scopedDataWithUrls
     * @param dataFactory
     */
    scopedDataLoad(scopedDataWithUrls, dataFactory) {
        const result = [];
        if (!dataFactory) {
            dataFactory = (url) => this.http.get(url);
        }
        const mergedUrls = this.occFields.getOptimalUrlGroups(scopedDataWithUrls);
        Object.entries(mergedUrls).forEach(([url, groupedModelsSet]) => {
            const groupedModels = Object.values(groupedModelsSet);
            if (groupedModels.length === 1) {
                // only one scope for url, we can pass the data straightaway
                result.push({
                    ...groupedModels[0].scopedData,
                    data$: dataFactory?.(url),
                });
            }
            else {
                // multiple scopes per url
                // we have to split the model per each scope
                const data$ = dataFactory?.(url).pipe(shareReplay(1));
                groupedModels.forEach((modelData) => {
                    result.push({
                        ...modelData.scopedData,
                        data$: data$?.pipe(map((data) => extractFields(data, modelData.fields))),
                    });
                });
            }
        });
        return result;
    }
}
OccRequestsOptimizerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestsOptimizerService, deps: [{ token: i1.HttpClient }, { token: i2.OccFieldsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccRequestsOptimizerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestsOptimizerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccRequestsOptimizerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccFieldsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXJlcXVlc3RzLW9wdGltaXplci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL3NlcnZpY2VzL29jYy1yZXF1ZXN0cy1vcHRpbWl6ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBVXBELE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsWUFDWSxJQUFnQixFQUNoQixTQUEyQjtRQUQzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSjs7Ozs7T0FLRztJQUNILGNBQWMsQ0FDWixrQkFBdUMsRUFDdkMsV0FBNEM7UUFFNUMsTUFBTSxNQUFNLEdBQW9CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQU0sR0FBRyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFMUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQ2hDLENBQUMsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBS3RCLEVBQUUsRUFBRTtZQUNILE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUV0RCxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM5Qiw0REFBNEQ7Z0JBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ1YsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTtvQkFDOUIsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDMUIsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsMEJBQTBCO2dCQUMxQiw0Q0FBNEM7Z0JBQzVDLE1BQU0sS0FBSyxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO3dCQUNWLEdBQUcsU0FBUyxDQUFDLFVBQVU7d0JBQ3ZCLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBSSxJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3hEO3FCQUNGLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUNGLENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzt3SEF6RFUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmVSZXBsYXkgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTY29wZWREYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWwvc2NvcGVkLWRhdGEnO1xuaW1wb3J0IHsgZXh0cmFjdEZpZWxkcyB9IGZyb20gJy4uL3V0aWxzL29jYy1maWVsZHMnO1xuaW1wb3J0IHtcbiAgT2NjRmllbGRzTW9kZWwsXG4gIE9jY0ZpZWxkc1NlcnZpY2UsXG4gIFNjb3BlZERhdGFXaXRoVXJsLFxufSBmcm9tICcuL29jYy1maWVsZHMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPY2NSZXF1ZXN0c09wdGltaXplclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRmllbGRzOiBPY2NGaWVsZHNTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogT3B0aW1pemUgb2NjIGVuZHBvaW50IGNhbGxzIG1lcmdpbmcgcmVxdWVzdHMgdG8gdGhlIHNhbWUgdXJsIGJ5IG1lcmdpbmcgZmllbGQgcGFyYW1ldGVyc1xuICAgKlxuICAgKiBAcGFyYW0gc2NvcGVkRGF0YVdpdGhVcmxzXG4gICAqIEBwYXJhbSBkYXRhRmFjdG9yeVxuICAgKi9cbiAgc2NvcGVkRGF0YUxvYWQ8VD4oXG4gICAgc2NvcGVkRGF0YVdpdGhVcmxzOiBTY29wZWREYXRhV2l0aFVybFtdLFxuICAgIGRhdGFGYWN0b3J5PzogKHVybDogc3RyaW5nKSA9PiBPYnNlcnZhYmxlPFQ+XG4gICk6IFNjb3BlZERhdGE8VD5bXSB7XG4gICAgY29uc3QgcmVzdWx0OiBTY29wZWREYXRhPFQ+W10gPSBbXTtcblxuICAgIGlmICghZGF0YUZhY3RvcnkpIHtcbiAgICAgIGRhdGFGYWN0b3J5ID0gKHVybCkgPT4gdGhpcy5odHRwLmdldDxhbnk+KHVybCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWVyZ2VkVXJscyA9IHRoaXMub2NjRmllbGRzLmdldE9wdGltYWxVcmxHcm91cHMoc2NvcGVkRGF0YVdpdGhVcmxzKTtcblxuICAgIE9iamVjdC5lbnRyaWVzKG1lcmdlZFVybHMpLmZvckVhY2goXG4gICAgICAoW3VybCwgZ3JvdXBlZE1vZGVsc1NldF06IFtcbiAgICAgICAgc3RyaW5nLFxuICAgICAgICB7XG4gICAgICAgICAgW3Njb3BlOiBzdHJpbmddOiBPY2NGaWVsZHNNb2RlbDtcbiAgICAgICAgfVxuICAgICAgXSkgPT4ge1xuICAgICAgICBjb25zdCBncm91cGVkTW9kZWxzID0gT2JqZWN0LnZhbHVlcyhncm91cGVkTW9kZWxzU2V0KTtcblxuICAgICAgICBpZiAoZ3JvdXBlZE1vZGVscy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBvbmx5IG9uZSBzY29wZSBmb3IgdXJsLCB3ZSBjYW4gcGFzcyB0aGUgZGF0YSBzdHJhaWdodGF3YXlcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAuLi5ncm91cGVkTW9kZWxzWzBdLnNjb3BlZERhdGEsXG4gICAgICAgICAgICBkYXRhJDogZGF0YUZhY3Rvcnk/Lih1cmwpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG11bHRpcGxlIHNjb3BlcyBwZXIgdXJsXG4gICAgICAgICAgLy8gd2UgaGF2ZSB0byBzcGxpdCB0aGUgbW9kZWwgcGVyIGVhY2ggc2NvcGVcbiAgICAgICAgICBjb25zdCBkYXRhJCA9IGRhdGFGYWN0b3J5Py4odXJsKS5waXBlKHNoYXJlUmVwbGF5KDEpKTtcblxuICAgICAgICAgIGdyb3VwZWRNb2RlbHMuZm9yRWFjaCgobW9kZWxEYXRhKSA9PiB7XG4gICAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICAgIC4uLm1vZGVsRGF0YS5zY29wZWREYXRhLFxuICAgICAgICAgICAgICBkYXRhJDogZGF0YSQ/LnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChkYXRhKSA9PiBleHRyYWN0RmllbGRzPFQ+KGRhdGEsIG1vZGVsRGF0YS5maWVsZHMpKVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19