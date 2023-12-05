import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScopedData } from '../../model/scoped-data';
import { OccFieldsService, ScopedDataWithUrl } from './occ-fields.service';
import * as i0 from "@angular/core";
export declare class OccRequestsOptimizerService {
    protected http: HttpClient;
    protected occFields: OccFieldsService;
    constructor(http: HttpClient, occFields: OccFieldsService);
    /**
     * Optimize occ endpoint calls merging requests to the same url by merging field parameters
     *
     * @param scopedDataWithUrls
     * @param dataFactory
     */
    scopedDataLoad<T>(scopedDataWithUrls: ScopedDataWithUrl[], dataFactory?: (url: string) => Observable<T>): ScopedData<T>[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccRequestsOptimizerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccRequestsOptimizerService>;
}
