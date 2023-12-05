import { HttpClient } from '@angular/common/http';
import { ScopedData } from '../../model/scoped-data';
import * as i0 from "@angular/core";
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
    fields: object;
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
export declare class OccFieldsService {
    protected http: HttpClient;
    constructor(http: HttpClient);
    protected FIELDS_PARAM: string;
    /**
     * Merge similar occ endpoints calls by merging fields parameter
     *
     * We assume that different scopes are defined by different fields parameters,
     * so we are grouping all requests with the same urls (except fields definition)
     * and merging into one request with fields that will satisfy all separate ones.
     *
     * @param models
     */
    getOptimalUrlGroups(models: ScopedDataWithUrl[]): OccOptimimalUrlGroups;
    /**
     * Extract fields parameter from occ endpoint url
     *
     * @param urlWithFields
     */
    private splitFields;
    /**
     * Combine url with field parameters
     *
     * @param url
     * @param fields
     */
    private getUrlWithFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccFieldsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccFieldsService>;
}
