/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {HttpClient, HttpErrorResponse,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError,} from 'rxjs';
import {map, shareReplay, switchMap,} from 'rxjs/operators';
import { ScopedData } from '../../model/scoped-data';
import { extractFields } from '../utils/occ-fields';
import {
  OccFieldsModel,
  OccFieldsService,
  ScopedDataWithUrl,
} from './occ-fields.service';

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
    const result: ScopedData<T>[] = [];

    if (!dataFactory) {
      dataFactory = (url): any => this.http.get<any>(url)
        .pipe(
          switchMap((x) => {
            const error = new HttpErrorResponse({status: 400, error: 'simulated product error' });

            return of(x);
            return throwError(error);
      })
        );
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
            data$: dataFactory?.(url),
          });
        } else {
          // multiple scopes per url
          // we have to split the model per each scope
          const data$ = dataFactory?.(url).pipe(shareReplay(1));

          groupedModels.forEach((modelData) => {
            result.push({
              ...modelData.scopedData,
              data$: data$?.pipe(
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
