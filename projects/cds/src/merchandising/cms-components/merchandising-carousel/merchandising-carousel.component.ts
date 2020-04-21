import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { CmsComponentData, IntersectionService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { CmsMerchandisingCarouselComponent } from '../../../cds-models/cms.model';
import { ProfileTagEventService } from '../../../profiletag/services';
import { MerchandisingProduct } from '../../model';
import { MerchandisingCarouselComponentService } from './merchandising-carousel.component.service';
import {
  CarouselEvent,
  MerchandisingCarouselClicked,
  MerchandisingCarouselModel,
  MerchandisingCarouselViewed,
} from './model/index';

//const MERCHANDISING_CAROUSEL_DATA_CLASS_NAME = 'data-cx-merchandising-carousel';

@Component({
  selector: 'cx-merchandising-carousel',
  templateUrl: './merchandising-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MerchandisingCarouselComponent {
  constructor(
    protected componentData: CmsComponentData<
      CmsMerchandisingCarouselComponent
    >,
    protected merchandisingCarouselComponentService: MerchandisingCarouselComponentService,
    protected routingService: RoutingService,
    protected intersectionService: IntersectionService,
    protected profileTagEventService: ProfileTagEventService,
    protected el: ElementRef
  ) {}

  merchandisingCarouselModel$: Observable<
    MerchandisingCarouselModel
  > = this.componentData.data$.pipe(
    filter((data) => Boolean(data)),
    distinctUntilKeyChanged('strategy'),
    switchMap((data) =>
      this.merchandisingCarouselComponentService.getMerchandisingCarouselModel(
        data
      )
    ),
    tap((data) => {
      if (typeof data.backgroundColor === 'string') {
        this.el.nativeElement.style.setProperty(
          '--cx-color-background',
          data.backgroundColor
        );
      }
      if (typeof data.textColor === 'string') {
        this.el.nativeElement.style.setProperty(
          '--cx-color-text',
          data.textColor
        );
      }
    }),
    shareReplay({ refCount: true })
  );

  intersectionEvent$: Observable<
    [boolean, MerchandisingCarouselModel]
  > = this.routingService.getPageContext().pipe(
    switchMap((_) => this.componentData.data$),
    filter((data) => Boolean(data)),
    switchMap((data) =>
      this.merchandisingCarouselComponentService.getMerchandisingCaourselViewportThreshold(
        data
      )
    ),
    switchMap((threshold) =>
      this.intersectionService
        .isIntersected(this.el.nativeElement, {
          threshold,
        })
        .pipe(
          filter((carouselIsVisible) => carouselIsVisible),
          withLatestFrom(this.merchandisingCarouselModel$),
          tap(([_, carouselModel]) => this.sendCarouselViewEvent(carouselModel))
        )
    )
  );

  onMerchandisingCarouselItemClick(
    event: MouseEvent,
    clickedProduct: MerchandisingProduct
  ): void {
    const elemTest = <HTMLElement>event.target;
    const parentCarouselElement: HTMLElement = elemTest.closest(
      'cx-merchandising-carousel'
    );

    const carouselEvent = this.getCarouselEventFromCarouselElement(
      parentCarouselElement
    );

    carouselEvent.metadata = {
      ...carouselEvent.metadata,
      ...clickedProduct.metadata,
    };

    // clickedProduct.metadata.forEach((value, key) =>
    //   carouselEvent.metadata.set(key, value)
    // );

    const clickedEvent: MerchandisingCarouselClicked = new MerchandisingCarouselClicked(
      carouselEvent,
      clickedProduct.metadata.slot,
      clickedProduct.code,
      clickedProduct.images.PRIMARY['product'].url
    );
    console.log('Product images', clickedProduct.images);
    console.log('MerchandisingCarouselClicked', clickedEvent);
    this.profileTagEventService.notifyProfileTagOfEventOccurence(clickedEvent);
  }

  private sendCarouselViewEvent(
    carouselModel: MerchandisingCarouselModel
  ): void {
    const carouselEvent: CarouselEvent = {
      carouselId: carouselModel.metadata.id,
      carouselName: carouselModel.metadata.name,
      strategyId: carouselModel.metadata.strategyid,
      metadata: carouselModel.metadata,
    };
    const productSkus: string[] = [];
    carouselModel.items$.forEach((merchandisingProduct$) =>
      merchandisingProduct$
        .pipe(
          filter((merchandisingProduct) => Boolean(merchandisingProduct.code))
        )
        .subscribe((merchandisingProduct) =>
          productSkus.push(merchandisingProduct.code)
        )
    );

    this.profileTagEventService.notifyProfileTagOfEventOccurence(
      new MerchandisingCarouselViewed(carouselEvent, productSkus)
    );
  }

  private getCarouselEventFromCarouselElement(
    carouselElement: HTMLElement
  ): CarouselEvent {
    console.log(
      'getCarouselEventFromCarouselElement carouselElement: ',
      carouselElement
    );

    // const dataElements: HTMLCollectionOf<Element> = carouselElement.getElementsByClassName(
    //   MERCHANDISING_CAROUSEL_DATA_CLASS_NAME
    // );

    // console.log(
    //   'getCarouselEventFromCarouselElement data elements by class name: ',
    //   JSON.stringify(dataElements)
    // );
    // console.log(
    //   'getCarouselEventFromCarouselElement data elements by class name length: ',
    //   dataElements.length
    // );
    // console.log(
    //   'getCarouselEventFromCarouselElement data elements by class name item 0: ',
    //   dataElements.item(0)
    // );

    // const carouselDataElement: HTMLElement = carouselElement.querySelector(
    //   `.${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}`
    // );

    // console.log(
    //   'getCarouselEventFromCarouselElement carouselDataElement: ',
    //   carouselDataElement
    // );

    // const metadata = new Map<string, string>();
    // carouselElement
    //   .getAttributeNames()
    //   .filter((attributeName) =>
    //     attributeName.startsWith(MERCHANDISING_CAROUSEL_DATA_CLASS_NAME)
    //   )
    //   .map(
    //     (carouselDataAttributeName) => (
    //       carouselDataAttributeName.replace(
    //         `${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}-`,
    //         ''
    //       ),
    //       carouselElement.getAttribute(carouselDataAttributeName)
    //     )
    //   )
    //   .forEach((stripedAttributeName, attributeValue) =>
    //     metadata.set(stripedAttributeName, attributeValue.toString())
    //   );

    // return {
    //   carouselId: carouselDataElement.getAttribute(
    //     `${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}-id`
    //   ),
    //   strategyId: carouselDataElement.getAttribute(
    //     `${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}-strategyid`
    //   ),
    //   carouselName: carouselDataElement.getAttribute(
    //     `${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}-name`
    //   ),
    //   testVariantId: carouselDataElement.getAttribute(
    //     `${MERCHANDISING_CAROUSEL_DATA_CLASS_NAME}-testVariantId`
    //   ),
    //   metadata,
    // };

    return {
      carouselId: 'some-test-carousel-id',
      carouselName: 'Some Test Carousel',
      strategyId: 'some-test-strategy-id',
      metadata: {},
    };
  }
}
