import { ElementRef } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CmsMerchandisingCarouselComponent as model } from '../../../cds-models/cms.model';
import { MerchandisingProduct } from '../../model/index';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import { MerchandisingCarouselModel } from './model/index';
import * as i0 from "@angular/core";
export declare class MerchandisingCarouselComponent {
    protected componentData: CmsComponentData<model>;
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService;
    protected routingService: RoutingService;
    protected intersectionService: IntersectionService;
    protected el: ElementRef;
    protected lastEventModelId: string;
    constructor(componentData: CmsComponentData<model>, merchandisingCarouselComponentService: MerchandisingCarouselComponentService, routingService: RoutingService, intersectionService: IntersectionService, el: ElementRef);
    /**
     * returns an Observable string for the title.
     */
    title$: Observable<string | undefined>;
    private fetchProducts$;
    private intersection$;
    merchandisingCarouselModel$: Observable<MerchandisingCarouselModel>;
    onMerchandisingCarouselItemClick(merchandisingCarouselModel: MerchandisingCarouselModel, clickedProduct: MerchandisingProduct): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MerchandisingCarouselComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MerchandisingCarouselComponent, "cx-merchandising-carousel", never, {}, {}, never, never, false, never>;
}
