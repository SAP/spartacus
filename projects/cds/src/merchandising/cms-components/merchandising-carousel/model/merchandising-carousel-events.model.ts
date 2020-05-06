import { ProfiletagPushEvent } from '../../../../profiletag/index';
import { MerchandisingMetadata } from '../../../model/index';

const CAROUSEL_VIEWED = 'CarouselViewed';
const CAROUSEL_CLICKED = 'CarouselClicked';

export interface CarouselEvent {
  carouselId: string;
  carouselName: string;
  strategyId: string;
  metadata?: MerchandisingMetadata;
}

export class MerchandisingCarouselViewed implements ProfiletagPushEvent {
  name: string = CAROUSEL_VIEWED;
  data: any;
  constructor(carouselEvent: CarouselEvent, productSkus: string[]) {
    this.data = {
      ...carouselEvent,
      productSkus,
    };
  }
}

export class MerchandisingCarouselClicked implements ProfiletagPushEvent {
  name: string = CAROUSEL_CLICKED;
  data: any;
  constructor(
    carouselEvent: CarouselEvent,
    slotId: string,
    sku: string,
    imageUrl: string
  ) {
    this.data = {
      ...carouselEvent,
      slotId,
      sku,
      imageUrl,
    };
  }
}
