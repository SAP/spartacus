import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  isDevMode,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AutoFocusService } from 'projects/storefrontlib/src/layout/a11y/keyboard-focus/autofocus';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { CarouselNavigationService } from './carousel-navigation.service';
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
})
export class CarouselComponent implements OnInit {
  /**
   * The title is rendered as the carousel heading.
   */
  @Input() title: string;

  /**
   * provides a configuration to add accessibility control to the carousel.
   * The default configuration adds the following:
   * - _locks_ the carousel, so that the carousel can be skipped using the tab key.
   * - traps the focus, which means that the after selecting the last item, the first item is selected
   * - the first item is auto-focused (if it is focusable) is selected.
   *
   * Additionally, a named focus _group_ could be added to refocus the last selected element
   * if the carousel is focussed again.
   */
  @Input() focusConfig: FocusConfig = {
    lock: false,
    autofocus: true,
    focusOnScroll: true,
  };

  /**
   * The items$ represent the carousel items. The items$ are
   * observables so that the items can be loaded on demand.
   */
  items: Observable<any>[];

  @Input('items')
  set setItems(inputItems: Observable<any>[]) {
    this.items = inputItems;
    //Reset slider when changing products
    this.activeSlide = 0;
  }

  /**
   * The template is rendered for each item, so that the actual
   * view can be given by the component that uses the `CarouselComponent`.
   */
  @Input() template: TemplateRef<any>;

  /**
   * Specifies the minimum size of the carousel item, either in px or %.
   * This value is used for the calculation of numbers per carousel, so that
   * the number of carousel items is dynamic. The calculation uses the `itemWidth`
   * and the host element `clientWidth`, so that the carousel is reusable in
   * different layouts (for example in a 50% grid).
   */
  @Input() itemWidth;
  //  = '300px';

  /**
   * Indicates whether the visual indicators are used.
   */
  @Input() hideIndicators = false;

  @Input() indicatorIcon = ICON_TYPE.CIRCLE;
  @Input() previousIcon = ICON_TYPE.CARET_LEFT;
  @Input() nextIcon = ICON_TYPE.CARET_RIGHT;

  activeSlide: number;
  size$: Observable<number>;

  @ViewChild('carousel', { read: ElementRef }) carousel: ElementRef<
    HTMLElement
  >;

  @ViewChild('slides', { read: ElementRef }) slides: ElementRef<HTMLElement>;

  @ViewChildren('item', { read: ElementRef }) itemRefs!: QueryList<
    ElementRef<HTMLElement>
  >;

  protected readonly visible$: BehaviorSubject<
    Map<number, boolean>
  > = new BehaviorSubject(new Map());

  protected readonly visibleItems$ = this.visible$.pipe(
    filter((v) => v.size > 0),
    map((visible) =>
      Array.from(visible)
        .filter((value) => !!value[1])
        .map((value) => value[0])
        .sort((a, b) => a - b)
    ),
    distinctUntilChanged()
  );

  protected readonly slides$ = this.visibleItems$.pipe(
    map(() => this.navigation.slides(this.carouselHost)),
    distinctUntilChanged()
  );

  /**
   * Returns the observed disabled state for the previous button.
   */
  readonly previous$: Observable<any> = this.visibleItems$.pipe(
    map((visible) =>
      this.navigation.previousData(
        visible,
        this.navigation.slides(this.carouselHost)
      )
    ),
    distinctUntilChanged()
  );

  /**
   * Returns the observed disabled state for the next button.
   */
  readonly next$: Observable<any> = this.visibleItems$.pipe(
    map((visible) =>
      this.navigation.nextData(
        visible,
        this.navigation.slides(this.carouselHost),
        this.itemRefs.length - 1
      )
    ),
    distinctUntilChanged()
  );

  readonly indicators$: Observable<any> = this.slides$.pipe(
    map((slides) => this.navigation.indicators(this.carouselHost, slides)),
    filter((i) => i.length > 1)
  );

  /**
   * Maintains the prefetched carousel items.
   */
  protected _prefetch = 0;
  protected _prefetchNum = 0;
  protected _startPrefetching = false;

  protected intersect$: BehaviorSubject<
    Map<HTMLElement, boolean>
  > = new BehaviorSubject(new Map());

  intersectCount$: Observable<number> = this.intersect$.pipe(
    map(
      (intersected) =>
        Array.from(intersected.values()).filter((value) => value === true)
          .length
    )
  );
  protected calcIntersected(): number {
    return Array.from(this.intersect$.value.values()).filter(
      (value) => value === true
    ).length;
  }

  constructor(
    protected el: ElementRef,
    protected service: CarouselService,
    protected navigation: CarouselNavigationService,
    protected autoFocusService: AutoFocusService
  ) {}

  // onScroll(event: Event) {
  //   console.log('scroll', event.eventPhase);
  // }

  tabIndex(ref: HTMLElement): Observable<number> {
    return this.intersect$.pipe(
      map((intersectMap) => (intersectMap.get(ref) ? 0 : -1))
    );
  }

  bumpPrefetch(prefetchNum?: number) {
    const bump = this.calcIntersected();
    let bumpTo = this.prefetch || bump;
    bumpTo += prefetchNum ?? bump;
    if (bumpTo <= this.itemRefs.length) {
      this.prefetch = bumpTo;
    }
    console.log(
      'bumped prefetch to',
      this.itemRefs.length,
      this.prefetch,
      bumpTo,
      bump
    );
  }

  set prefetch(item) {
    this._startPrefetching = true;
    if (this._prefetch < item + this._prefetchNum) {
      this._prefetch = item + this._prefetchNum;
    }
  }
  get prefetch(): number {
    return this._prefetch;
  }

  // ngAfterViewInit() {
  //   // // TODO: cleanup
  //   // fromEvent(this.carousel.nativeElement, 'scroll')
  //   //   .pipe(debounceTime(250))
  //   //   .subscribe((scroll) => {
  //   //     const first = this.autoFocusService.findFirstFocusable(
  //   //       this.slides.nativeElement
  //   //     );
  //   //     // console.log(first);
  //   //     first.focus({ preventScroll: true });
  //   //     console.log(scroll);
  //   //   });
  // }

  ngOnInit() {
    if (!this.template) {
      this.renderDxMessage();
      return;
    }
    this.size$ = this.service.getItemsPerSlide(this.host, this.itemWidth).pipe(
      tap(() => {
        if (this.itemWidth) {
          this.activeSlide = 0;
        }
      }),
      map((items) => {
        return this.itemWidth ? items : this.items?.length || 0;
      })
    );
  }

  /**
   * Handles previous button.
   */
  previous() {
    this.carouselHost.scrollBy({
      left: -this.carouselHost.clientWidth,
    });
  }

  /**
   * Handles next button.
   */
  next(_event: MouseEvent) {
    this.bumpPrefetch();

    this.carouselHost.scrollBy({
      left: this.carouselHost.clientWidth,
    });

    // // we focus automatically next for accessibility reasons
    // window.setTimeout(() => {
    //   // const m = this.intersect$.value;
    //   // const f = Array.from(m.keys()).find((key) => m.get(key) === true);
    //   const first = this.autoFocusService.findFirstFocusable(
    //     this.slides.nativeElement
    //   );
    //   console.log(first);
    //   first.focus({ preventScroll: true });
    //   // f.focus({ preventScroll: true });
    // }, 2000);
  }

  /**
   * Handles indicator button.
   */
  scroll(index: number) {
    this.carouselHost.scrollTo({
      left: this.carouselHost.clientWidth * index,
    });
  }

  /**
   * Maintains a map with all the visible slide items. This is stored in
   * a subject, so that we can observe the visible slides and update the
   * buttons and indicators accordingly.
   */
  intersect(intersected: boolean, ref: HTMLElement) {
    const value: Map<HTMLElement, boolean> = this.intersect$.value;
    value.set(ref, intersected);
    this.intersect$.next(value);

    const index = this.itemRefs
      .toArray()
      .findIndex((item) => item.nativeElement === ref);

    // we increase the prefetchNum as long as we haven't started prefetching
    // if (intersected && !this._startPrefetching && this._prefetchNum < index) {
    //   this._prefetchNum = index + 1 + 1;
    // }

    const visibleMap = this.visible$.value;
    visibleMap.set(index, intersected);

    this.visible$.next(visibleMap);
  }

  /**
   * Returns the component native host element.
   */
  private get host(): HTMLElement {
    return this.el.nativeElement;
  }

  /**
   * Returns the carousel native host element.
   */
  private get carouselHost(): HTMLElement {
    return this.carousel.nativeElement;
  }

  private renderDxMessage(): void {
    if (isDevMode()) {
      console.error(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
    }
  }
}
