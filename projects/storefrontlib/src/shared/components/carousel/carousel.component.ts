import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { CarouselLoaderService } from './carousel-loader.service';
import { CarouselNavigationService } from './carousel-navigation/carousel-navigation.service';
import { CarouselService } from './carousel.service';

/**
 * Generic carousel component that can be used to render any carousel items,
 * such as products, images, banners, or any component. Carousel items are
 * rendered in so-called carousel slides, and the previous/next buttons as well as
 * the indicator-buttons can used to navigate the slides.
 *
 * The component uses an array of Observables (`items$`) as an input, to allow
 * for lazy loading of items.
 *
 * The number of items per slide is calculated with the `itemWidth`, which can given
 * in pixels or percentage.
 *
 * To allow for flexible rendering of items, the rendering is delegated to the
 * given `template`. This allows for maximum flexibility.
 */
@Component({
  selector: 'cx-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CarouselNavigationService, CarouselLoaderService],
})
export class CarouselComponent<T = Observable<unknown>> {
  constructor(
    protected service: CarouselService,
    protected navigationService: CarouselNavigationService,
    protected carouselLoaderService: CarouselLoaderService
  ) {}

  /**
   * The (optional) title is rendered as the carousel heading.
   */
  @Input() title: string;

  /**
   * The items$ represent the carousel items. The items$ are
   * observables so that the items can be loaded on demand.
   */
  items: T[];

  @Input('items')
  set setItems(value: T[]) {
    if (value) {
      this.items = value;
      this.navigationService.setItemCount(this.items.length);
    }
  }

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the component that uses the `CarouselComponent`.
   */
  @Input() template: TemplateRef<any>;

  /**
   * Provides a configuration to add accessibility control to the carousel.
   *
   * The configuration is applied to the inner carousel-panel and is used to control
   * the focus on the nested items.
   *
   * The default configuration applies focus on scroll for the inner scrollable carousel panel.
   *
   * ```ts
   * { focusOnScroll: true }
   * ```
   */

  @Input() focusConfig: FocusConfig = { focusOnScroll: true };

  /**
   * Maintains the prefetched carousel items.
   */
  prefetchCount$ = this.carouselLoaderService.prefetchCount$;

  /**
   * Will calculate the prefetched carousel item(s) for the next slide.
   *
   * The calculated prefetchCount is passed to the item template. so that
   * the template can decide whether to lazy load the items based on
   * the prefetch flag, or load them regardless.
   */
  prefetch(factor = 1): void {
    this.carouselLoaderService.prefetch(factor);
  }

  /**
   * Maintains an subject with an array of visible item refs (index).
   *
   * The intersected elements are listed in the visible subject.
   */
  onIntersect(intersected: boolean, refIndex: number): void {
    this.carouselLoaderService.setVisibility(refIndex, intersected);
  }

  /**
   * Indicates whether the given item is an observable.
   *
   * @deprecated this is used temporarily to distinguish streams from objects.
   */
  isObservable(item: T): boolean {
    return item instanceof Observable;
  }
}
