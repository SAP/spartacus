import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationType, ProductInterestEntryRelation, ProductInterestSearchResult } from '../../../model/product-interest.model';
import { UserInterestsAdapter } from '../../../user/connectors/interests/user-interests.adapter';
import { ConverterService } from '../../../util/converter.service';
import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import * as i0 from "@angular/core";
export declare class OccUserInterestsAdapter implements UserInterestsAdapter {
    protected http: HttpClient;
    protected occEndpoints: OccEndpointsService;
    protected config: OccConfig;
    protected converter: ConverterService;
    constructor(http: HttpClient, occEndpoints: OccEndpointsService, config: OccConfig, converter: ConverterService);
    getInterests(userId: string, pageSize?: number, currentPage?: number, sort?: string, productCode?: string, notificationType?: NotificationType): Observable<ProductInterestSearchResult>;
    removeInterest(userId: string, item: ProductInterestEntryRelation): Observable<any[]>;
    addInterest(userId: string, productCode: string, notificationType: NotificationType): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserInterestsAdapter, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserInterestsAdapter>;
}
