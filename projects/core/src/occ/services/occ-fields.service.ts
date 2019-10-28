import { Injectable } from '@angular/core';
import { extractFields, mergeFields, parseFields } from '../utils/occ-fields';
import { ScopedModelData, ScopedProductData } from '@spartacus/core';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface OccFieldsLoadData<T> {
  url?: string;
  fields?: object;
  model: ScopedModelData<T>;
}

interface MergedUrls<T> {
  [url: string]: {
    [scope: string]: OccFieldsLoadData<T>;
  };
}

@Injectable({
  providedIn: 'root',
})
export class OccFieldsService {
  constructor(protected http: HttpClient) {}

  protected FIELDS_PARAM = 'fields';

  /**
   * Optimize occ endpoint calls merging request to the same url by merging field parameters
   *
   * @param loads
   * @param dataFactory
   */
  optimalLoad<T>(
    loads: OccFieldsLoadData<T>[],
    dataFactory?: (url: string) => Observable<T>
  ): ScopedProductData[] {
    const merged = this.getMergedUrls<T>(loads);
    const result = [];

    if (!dataFactory) {
      dataFactory = url => this.http.get<T>(url);
    }

    Object.entries(merged).forEach(
      ([url, scopes]: [
        string,
        {
          [scope: string]: OccFieldsLoadData<T>;
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
                map(product => extractFields(product, modelData.fields))
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
   * @param loads
   */
  getMergedUrls<T>(loads: OccFieldsLoadData<T>[]): MergedUrls<T> {
    const groupedByUrls: MergedUrls<T> = {};
    for (const load of loads) {
      const [urlPart, fields] = this.splitFields(load.url);
      if (!groupedByUrls[urlPart]) {
        groupedByUrls[urlPart] = {};
      }
      load.fields = parseFields(fields);
      groupedByUrls[urlPart][load.model.scope] = load;
    }

    const mergedUrls: MergedUrls<T> = {};
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

    params.split('&').map(pram => {
      const keyValue = pram.split('=');
      paramsMap[keyValue[0]] = keyValue[1];
    });

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
    const merged = mergeFields(fields);

    if (fields) {
      if (url.includes('?')) {
        url += `&${this.FIELDS_PARAM}=${merged}`;
      } else {
        url += `?${this.FIELDS_PARAM}=${merged}`;
      }
    }

    return url;
  }
}
