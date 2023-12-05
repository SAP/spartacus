import { ProfileTagPushEvent } from '../../../../profiletag/index';
import { MerchandisingMetadata } from '../../../model/index';
export interface CarouselEvent {
    carouselId: string;
    carouselName: string;
    strategyId: string;
    metadata?: MerchandisingMetadata;
}
export declare class MerchandisingCarouselViewedEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(carouselEvent: CarouselEvent, productSkus: string[]);
}
export declare class MerchandisingCarouselClickedEvent implements ProfileTagPushEvent {
    name: string;
    data: any;
    constructor(carouselEvent: CarouselEvent, slotId: string, sku: string, imageUrl: string);
}
