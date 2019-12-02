import { Injectable } from '@angular/core';
import { extractFields, mergeFields, parseFields } from '../utils/occ-fields';
import { ScopedData } from '../../model/scoped-data';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Intermediate model to accommodate all data needed to perform occ fields optimizations
 * wrapping ScopedData with url and fields
 */
export interface OccFieldsModel {
  /** Url (with fields) to load scoped data */
  url?: string;
  /** extracted fields object, used to extract data from broader model */
  fields?: object;
  /** scoped data model */
  scopedData: ScopedData<any>;
}

/**
 * Grouped rest calls with optimal urls
 *
 * One url groups all scopes it covers with related occFieldsModels
 */
export interface OccMergedUrls {
  [optimalUrl: string]: {
    [scope: string]: OccFieldsModel;
  };
}

/**
 * Helper service for optimizing endpoint calls to occ backend
 */
@Injectable({
  providedIn: 'root',
})
export class OccFieldsService {
  constructor(protected http: HttpClient) {}

  protected FIELDS_PARAM = 'fields';

  /**
   * Optimize occ endpoint calls merging requests to the same url by merging field parameters
   *
   * @param occFieldsModels
   * @param dataFactory
   */
  optimalLoad<T>(
    occFieldsModels: OccFieldsModel[],
    dataFactory?: (url: string) => Observable<T>
  ): ScopedData<T>[] {
    const result = [];

    if (!dataFactory) {
      dataFactory = url => this.http.get<any>(url);
    }

    const mergedUrls = this.getMergedUrls(occFieldsModels);

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
          const data$ = dataFactory(url).pipe(
            shareReplay(1),
            // TODO deprecated since 1.4, remove
            map(data => JSON.parse(JSON.stringify(data)))
          );

          groupedModels.forEach(modelData => {
            result.push({
              ...modelData.scopedData,
              data$: data$.pipe(
                map(data => extractFields<T>(data, modelData.fields))
              ),
            });
          });
        }
      }
    );

    return result;
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
  getMergedUrls(models: OccFieldsModel[]): OccMergedUrls {
    const groupedByUrls: OccMergedUrls = {};
    for (const model of models) {
      const [urlPart, fields] = this.splitFields(model.url);
      if (!groupedByUrls[urlPart]) {
        groupedByUrls[urlPart] = {};
      }
      model.fields = fields ? parseFields(fields) : {};
      groupedByUrls[urlPart][model.scopedData.scope] = model;
    }

    const mergedUrls: OccMergedUrls = {};
    for (const [url, group] of Object.entries(groupedByUrls)) {
      const urlWithFields = this.getUrlWithFields(
        url,
        Object.values(group).map(lo => lo.fields)
      );
      mergedUrls[urlWithFields] = group;
    }

    return mergedUrls;
  }

  /**
   * Extract fields parameter from occ endpoint url
   *
   * @param urlWithFields
   */
  private splitFields(urlWithFields: string): [string, string] {
    const [url, params] = urlWithFields.split('?');

    const paramsMap = {};

    if (params) {
      params.split('&').map(param => {
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
  private getUrlWithFields(url: string, fields: (string | object)[]): string {
    const mergedFields = mergeFields(fields);

    if (fields) {
      url += url.includes('?') ? '&' : '?';
      url += `${this.FIELDS_PARAM}=${mergedFields}`;
    }

    return url;
  }
}
