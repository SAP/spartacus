import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScopedData } from '../../model/scoped-data';
import { map, shareReplay } from 'rxjs/operators';
import { extractFields } from '../utils/occ-fields';
import {
  OccFieldsModel,
  OccFieldsService,
  ScopedDataWithUrl,
} from './occ-fields.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OccRequestsOptimizerService {
  constructor(
    protected http: HttpClient,
    protected occFields: OccFieldsService
  ) {}

  /**
   * Optimize occ endpoint calls merging requests to the same url by merging field parameters
   *
   * @param scopedDataWithUrls
   * @param dataFactory
   */
  scopedDataLoad<T>(
    scopedDataWithUrls: ScopedDataWithUrl[],
    dataFactory?: (url: string) => Observable<T>
  ): ScopedData<T>[] {
    const result = [];

    if (!dataFactory) {
      dataFactory = (url) => this.http.get<any>(url);
    }

    const mergedUrls = this.occFields.getOptimalUrlGroups(scopedDataWithUrls);

    Object.entries(mergedUrls).forEach(
      ([url, groupedModelsSet]: [
        string,
        {
          [scope: string]: OccFieldsModel;
        }
      ]) => {
        const groupedModels = Object.values(groupedModelsSet);

        if (groupedModels.length === 1) {
          // only one scope for url, we can pass the data straightaway
          result.push({
            ...groupedModels[0].scopedData,
            data$: dataFactory(url),
          });
        } else {
          // multiple scopes per url
          // we have to split the model per each scope
          const data$ = dataFactory(url).pipe(shareReplay(1));

          groupedModels.forEach((modelData) => {
            result.push({
              ...modelData.scopedData,
              data$: data$.pipe(
                map((data) => extractFields<T>(data, modelData.fields))
              ),
            });
          });
        }
      }
    );

    return result;
  }
}
