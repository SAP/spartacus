import { Injectable } from '@angular/core';
import { mergeFields, parseFields } from '../utils/occ-fields';
import { ScopedData } from '../../model/scoped-data';
import { HttpClient } from '@angular/common/http';

export interface ScopedDataWithUrl {
  /** Url (with fields) to load scoped data */
  url?: string;
  /** scoped data model */
  scopedData: ScopedData<any>;
}

/**
 * Intermediate model to accommodate all data needed to perform occ fields optimizations
 * wrapping ScopedData with url and fields
 */
export interface OccFieldsModel extends ScopedDataWithUrl {
  /** extracted fields object, used to extract data from broader model */
  fields?: object;
}

/**
 * Grouped rest calls with optimal urls
 *
 * One url groups all scopes it covers with related occFieldsModels
 */
export interface OccOptimimalUrlGroups {
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
   * Merge similar occ endpoints calls by merging fields parameter
   *
   * We assume that different scopes are defined by different fields parameters,
   * so we are grouping all requests with the same urls (except fields definition)
   * and merging into one request with fields that will satisfy all separate ones.
   *
   * @param models
   */
  getOptimalUrlGroups(models: ScopedDataWithUrl[]): OccOptimimalUrlGroups {
    const groupedByUrls: OccOptimimalUrlGroups = {};
    for (const model of models as OccFieldsModel[]) {
      const [urlPart, fields] = this.splitFields(model.url);
      if (!groupedByUrls[urlPart]) {
        groupedByUrls[urlPart] = {};
      }
      model.fields = fields ? parseFields(fields) : {};
      groupedByUrls[urlPart][model.scopedData.scope] = model;
    }

    const mergedUrls: OccOptimimalUrlGroups = {};
    for (const [url, group] of Object.entries(groupedByUrls)) {
      const urlWithFields = this.getUrlWithFields(
        url,
        Object.values(group).map((lo) => lo.fields)
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
  private getUrlWithFields(url: string, fields: (string | object)[]): string {
    const mergedFields = mergeFields(fields);

    if (mergedFields) {
      url += url.includes('?') ? '&' : '?';
      url += `${this.FIELDS_PARAM}=${mergedFields}`;
    }

    return url;
  }
}
