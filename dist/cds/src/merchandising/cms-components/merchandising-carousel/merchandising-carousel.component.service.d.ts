import { ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models';
import { CdsConfig } from '../../../config';
import { ProfileTagEventService } from '../../../profiletag';
import { CdsMerchandisingProductService } from '../../facade';
import { MerchandisingProduct } from '../../model';
import { MerchandisingCarouselModel } from './model';
import * as i0 from "@angular/core";
export declare class MerchandisingCarouselComponentService {
    protected cdsMerchandisingProductService: CdsMerchandisingProductService;
    protected productService: ProductService;
    protected profileTagEventService: ProfileTagEventService;
    protected cdsConfig: CdsConfig;
    constructor(cdsMerchandisingProductService: CdsMerchandisingProductService, productService: ProductService, profileTagEventService: ProfileTagEventService, cdsConfig: CdsConfig);
    getMerchandisingCaourselViewportThreshold(cmsComponent: CmsMerchandisingCarouselComponent): number;
    getMerchandisingCarouselModel(cmsComponent: CmsMerchandisingCarouselComponent): Observable<MerchandisingCarouselModel>;
    sendCarouselViewEvent(lastSendModelId: string, merchandisingCarouselModel$: Observable<MerchandisingCarouselModel>): Observable<MerchandisingCarouselModel>;
    sendCarouselItemClickedEvent(merchandisingCarouselModel: MerchandisingCarouselModel, clickedProduct: MerchandisingProduct): void;
    private getCarouselMetadata;
    private mapStrategyProductsToCarouselItems;
    private mapStrategyProductsToProductIds;
    private getMerchandisingCarouselModelId;
    private getCarouselItemMetadata;
    private getCarouselEventFromCarouselModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<MerchandisingCarouselComponentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MerchandisingCarouselComponentService>;
}
