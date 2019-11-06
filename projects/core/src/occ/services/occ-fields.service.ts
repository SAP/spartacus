import { Injectable } from '@angular/core';
import { extractFields, mergeFields, parseFields } from '../utils/occ-fields';
import { ScopedModelData } from '../../model/scoped-model-data';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface OccFieldsModels {
  url?: string;
  fields?: object;
  model: ScopedModelData<any>;
}

export interface OccMergedUrls {
  [url: string]: {
    [scope: string]: OccFieldsModels;
  };
}

/**
 * Helper service for optimizing endpoind calls to occ backend
 */
@Injectable({
  providedIn: 'root',
})
export class OccFieldsService {
  constructor(protected http: HttpClient) {}

  protected FIELDS_PARAM = 'fields';

  /**
   * Optimize occ endpoint calls merging request to the same url by merging field parameters
   *
   * @param occFieldsModels
   * @param dataFactory
   */
  optimalLoad<T>(
    occFieldsModels: OccFieldsModels[],
    dataFactory?: (url: string) => Observable<T>
  ): ScopedModelData<T>[] {
    const result = [];

    if (!dataFactory) {
      dataFactory = url => this.http.get<T>(url);
    }

    const mergedUrls = this.getMergedUrls(occFieldsModels);

    Object.entries(mergedUrls).forEach(
      ([url, scopes]: [
        string,
        {
          [scope: string]: OccFieldsModels;
        }
      ]) => {
        const scopesForUrl = Object.values(scopes);

        if (scopesForUrl.length === 1) {
          // only one scope for url
          result.push({
            ...scopesForUrl[0].model,
            data$: dataFactory(url),
          });
        } else {
          // multiple scopes per url
          const data$ = dataFactory(url).pipe(
            shareReplay(1),
            map(data => JSON.parse(JSON.stringify(data)))
          );

          scopesForUrl.forEach(modelData => {
            result.push({
              ...modelData.model,
              data$: data$.pipe(
                map(product => extractFields<T>(product, modelData.fields))
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
   * @param models
   */
  getMergedUrls(models: OccFieldsModels[]): OccMergedUrls {
    const groupedByUrls: OccMergedUrls = {};
    for (const model of models) {
      const [urlPart, fields] = this.splitFields(model.url);
      if (!groupedByUrls[urlPart]) {
        groupedByUrls[urlPart] = {};
      }
      model.fields = fields ? parseFields(fields) : {};
      groupedByUrls[urlPart][model.model.scope] = model;
    }

    const mergedUrls: OccMergedUrls = {};
    for (const [url, load] of Object.entries(groupedByUrls)) {
      const urlWithFields = this.getUrlWithFields(
        url,
        Object.values(load).map(lo => lo.fields)
      );
      mergedUrls[urlWithFields] = load;
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
      params.split('&').map(pram => {
        const keyValue = pram.split('=');
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
      if (url.includes('?')) {
        url += `&${this.FIELDS_PARAM}=${mergedFields}`;
      } else {
        url += `?${this.FIELDS_PARAM}=${mergedFields}`;
      }
    }

    return url;
  }
}
